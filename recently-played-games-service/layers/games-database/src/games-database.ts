import { GetObjectCommand, ListObjectsCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { z } from 'zod'
import { Readable } from 'stream'
import streamToString from 'stream-to-string'
import { GameRecord } from './game-record'
import { getDateFromFilename } from './db-filename/get-date-from-filename'
import { makeDbFilenameFromDate } from './db-filename'

const s3 = new S3Client({
  region: 'us-east-1',
})

export const GamesDatabase = {
  async getGames(bucketName: string): Promise<GameRecord[]> {
    const files = (
      await s3.send(
        new ListObjectsCommand({
          Bucket: bucketName,
          Prefix: '',
        }),
      )
    ).Contents

    if (files == null) {
      return []
    }

    const filesSortedByDate = files.sort((a, b) => {
      if (a.Key == null || b.Key == null) {
        throw Error('File had an undefined or null Key.')
      }
      const aDate = getDateFromFilename(a.Key)
      const bDate = getDateFromFilename(a.Key)

      if (aDate < bDate) {
        return -1
      }
      if (bDate < aDate) {
        return 1
      }
      return 0
    })

    const mostUpToDateFile = filesSortedByDate[0]

    const contents = (
      await s3.send(
        new GetObjectCommand({
          Bucket: bucketName,
          Key: mostUpToDateFile.Key,
        }),
      )
    ).Body

    if (contents == null) {
      throw Error('DB file contents were null or undefined.')
    }

    const dataParsedFromFile = z.array(GameRecord).parse(JSON.parse(await streamToString(contents as Readable)))

    return dataParsedFromFile
  },

  async postGames(bucketName: string, games: GameRecord[]) {
    return s3.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: makeDbFilenameFromDate(new Date()),
        Body: JSON.stringify(games),
      }),
    )
  },
}
