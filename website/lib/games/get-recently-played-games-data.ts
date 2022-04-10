import util from 'util'
import fetch from 'node-fetch'
import * as envVar from 'env-var'
import { z } from 'zod'
import streamToString from 'stream-to-string'
import { GameData } from './game-data'

export async function getRecentlyPlayedGamesData() {
  const games = await callGetRecentlyPlayedGamesApi()
  return Promise.all(
    games.map(async (value): Promise<GameData> => {
      const imageData = await getGameCapsuleImageData(value.appId)
      return {
        name: value.name,
        appId: value.appId,
        lastRecentlyPlayed: value.lastKnownToBeRecentlyPlayed,
        image: {
          url: imageData.imageUrl,
          width: imageData.width,
          height: imageData.height,
        },
      }
    }),
  )

  async function callGetRecentlyPlayedGamesApi(): Promise<GetGamesApiGameResponseBody> {
    const response = await fetch(envVar.get('GET_GAMES_API_URL').required().asString(), {
      method: 'GET',
    })

    if (!response.ok) {
      throw Error(`Error response from GetRecentlyPlayedGamesApi: ${util.inspect(response)}`)
    }

    if (response.body == null) {
      throw Error('Response from GetRecentlyPlayedGamesApi.')
    }

    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    return GetGamesApiGameResponseBody.parse(JSON.parse(await streamToString(response.body)))
  }

  async function getGameCapsuleImageData(appId: number) {
    const width = 616
    const height = 353
    const imageUrl = `https://cdn.akamai.steamstatic.com/steam/apps/${appId}/capsule_${width}x${height}.jpg`
    const response = await fetch(imageUrl)

    if (!response.ok) {
      throw Error(`Received non-OK response with trying to receive game capsule image: ${util.inspect(response)}`)
    }

    if (response.body == null) {
      throw Error(`Game capsule image response has no body. ${util.inspect(response)}`)
    }

    return {
      imageUrl,
      width,
      height,
    }
  }
}

const GetGamesApiGameResponseBody = z.array(
  z.object({
    name: z.string().nonempty(),
    appId: z.number(),
    lastKnownToBeRecentlyPlayed: z.number(),
    totalPlaytimeMinutes: z.number(),
  }),
)

type GetGamesApiGameResponseBody = z.infer<typeof GetGamesApiGameResponseBody>
