import { AwsStub, mockClient } from 'aws-sdk-client-mock'
import {
  GetObjectCommand,
  GetObjectCommandInput,
  ListObjectsCommand,
  PutObjectCommand,
  PutObjectCommandInput,
  S3Client,
  ServiceInputTypes,
  ServiceOutputTypes,
} from '@aws-sdk/client-s3'
import { Readable } from 'stream'
import { GamesDatabase } from '../src/games-database'
import { makeDbFilenameFromDate } from '../src/db-filename'
import { GameRecord } from '../src/game-record'

describe('GamesDatabase', () => {
  let s3ClientMock: AwsStub<ServiceInputTypes, ServiceOutputTypes>

  beforeEach(() => {
    s3ClientMock = mockClient(S3Client)
    s3ClientMock.reset()
  })

  describe('getGames', () => {
    it('Games from the most recent file', async () => {
      const games: GameRecord[] = [
        { appId: 1, lastKnownToBeRecentlyPlayed: new Date().getTime(), name: 'super game!', totalPlaytimeMinutes: 999 },
      ]
      const gamesAsFileContents = stringToStream(JSON.stringify(games))

      s3ClientMock.on(GetObjectCommand).callsFakeOnce((input: GetObjectCommandInput) => {
        expect(input.Key).toEqual(makeDbFilenameFromDate(nDaysAgo(0)))
        return { Body: gamesAsFileContents }
      })

      s3ClientMock.on(ListObjectsCommand).resolvesOnce({
        Contents: [
          {
            Key: makeDbFilenameFromDate(nDaysAgo(0)),
          },
          {
            Key: makeDbFilenameFromDate(nDaysAgo(1)),
          },
          {
            Key: makeDbFilenameFromDate(nDaysAgo(2)),
          },
        ],
      })

      expect.assertions(1)
      await GamesDatabase.getGames('hi')
    })
  })

  describe('postGames', () => {
    beforeEach(() => {
      jest.useFakeTimers().setSystemTime(new Date(2022, 11, 3))
    })

    afterEach(() => {
      jest.useRealTimers()
    })
    it('Writes games to the correct file based on the current date', async () => {
      s3ClientMock.on(PutObjectCommand).callsFakeOnce((input: PutObjectCommandInput) => {
        if (input.Key == null) throw Error('Key is null or undefined.')
        expect(input.Key.includes('2022-12-03')).toBe(true)
      })

      expect.assertions(1)
      await GamesDatabase.postGames('bucket', [])
    })
  })
})

function nDaysAgo(n: number) {
  const now = new Date()
  return new Date(now.getDate() - n)
}

function stringToStream(str: string): Readable {
  const result = new Readable()
  result.push(str)
  result.push(null)
  return result
}
