import { EventBridgeEvent } from 'aws-lambda'
import { mocked } from 'jest-mock'
import * as conset from 'conset'
import { lambdaHandler } from '../src/handler'
import { SteamworksApi } from '../src/steamworks-api'
import { GetRecentlyPlayedGamesResponse } from '../src/steamworks-api/get-recently-played-games-response'
import { GamesDatabase, GameRecord } from '../../../layers/games-database'

process.env.DATABASE_BUCKET_NAME = 'bucket'

jest.mock('../src/steamworks-api')
jest.mock('../../../layers/games-database') // This really should be '/opt/games-database', but I cannot get moduleNameMapper within the jest config to function correctly.

const now = new Date().getTime()
jest.useFakeTimers().setSystemTime(now)

const mockedSteamworksApi = mocked(SteamworksApi)
const mockedGamesDatabase = mocked(GamesDatabase)

describe('Unit test for app handler', () => {
  it('verifies successful response', async () => {
    try {
      const mockedResponse: GetRecentlyPlayedGamesResponse = {
        response: {
          total_count: 3,
          games: [
            makeFakeGameFromSteamworks(1, 'one', true),
            makeFakeGameFromSteamworks(2, 'two', true),
            makeFakeGameFromSteamworks(3, 'three', true),
          ],
        },
      }

      mockedSteamworksApi.getRecentlyPlayedGames.mockResolvedValue(mockedResponse)

      const event: EventBridgeEvent<'Scheduled Event', {}> = {
        version: '0',
        id: '53dc4d37-cffa-4f76-80c9-8b7d4a4d2eaa',
        'detail-type': 'Scheduled Event',
        source: 'aws.events',
        account: '123456789012',
        time: '2015-10-08T16:53:06Z',
        region: 'us-east-1',
        resources: ['arn:aws:events:us-east-1:123456789012:rule/my-scheduled-rule'],
        detail: {},
      }

      const gamesFromDb = [
        makeFakeGameFromGamesDatabase(3, 'three', false),
        makeFakeGameFromGamesDatabase(4, 'four', false),
        makeFakeGameFromGamesDatabase(5, 'five', true),
      ]
      mockedGamesDatabase.getGames.mockResolvedValue(gamesFromDb)

      await lambdaHandler(event)

      const postGamesArg = mockedGamesDatabase.postGames.mock.calls[0][1]

      const set = conset.create<GameRecord>((record) => record.appId.toString())

      ;[
        ...gamesFromDb,
        ...mockedResponse.response.games.map(
          (game) =>
            ({
              appId: game.appid,
              name: game.name,
              lastKnownToBeRecentlyPlayed: now,
              totalPlaytimeMinutes: 123,
            } as GameRecord),
        ),
      ].forEach((record) => conset.add(set, record))

      const expectedPostGamesArg: GameRecord[] = conset.getItems(set).sort()

      expect(postGamesArg.sort(gameRecordComparator)).toEqual(expectedPostGamesArg.sort(gameRecordComparator))

      expect.assertions(1)
    } finally {
      mockedSteamworksApi.getRecentlyPlayedGames.mockClear()
    }
  })
})

function makeFakeGameFromSteamworks(
  appId: number,
  name: string,
  recentlyPlayed: boolean,
): ElementOf<GetRecentlyPlayedGamesResponse['response']['games']> {
  return {
    appid: appId,
    name,
    img_icon_url: 'fake_url.png',
    playtime_2weeks: recentlyPlayed ? 10 : 0,
    playtime_forever: 123,
    playtime_linux_forever: 0,
    playtime_mac_forever: 0,
    playtime_windows_forever: 0,
  }
}

function makeFakeGameFromGamesDatabase(appId: number, name: string, recentlyPlayed: boolean): GameRecord {
  return {
    appId,
    name,
    lastKnownToBeRecentlyPlayed: recentlyPlayed
      ? now
      : new Date(now).setDate(new Date(15778800000).getDate() - 30 * 12 * 2),
    totalPlaytimeMinutes: 600,
  }
}

type ElementOf<T extends Array<unknown>> = T extends Array<infer E> ? E : unknown

function gameRecordComparator(a: GameRecord, b: GameRecord) {
  return a.appId - b.appId
}
