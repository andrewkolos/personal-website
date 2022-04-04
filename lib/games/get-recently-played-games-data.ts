import util from 'util'
import fetch from 'node-fetch'
import { readEnvVarUnsafe } from '../read-env-var-unsafe'
import { GetRecentlyPlayedGamesResponse } from './get-recently-played-games-response'
import { GameData } from './game-data'

const MY_PLAYER_ID = '76561198049300555'

export async function getRecentlyPlayedGamesData() {
  const steamworksResponse = await callSteamworksGetRecentlyPlayedGamesApi()
  const parsedResponse = GetRecentlyPlayedGamesResponse.parse(await steamworksResponse.json())


  return Promise.all(
    parsedResponse.response.games.map(
      async (value): Promise<GameData> => {
        const imageData = await getGameCapsuleImageData(value.appid)
        return {
          name: value.name,
          image: {
            url: imageData.imageUrl,
            width: imageData.width,
            height: imageData.height
          }
        }
      },
    ),
  )

  async function callSteamworksGetRecentlyPlayedGamesApi() {
    const steamworksToken = readEnvVarUnsafe('STEAMWORKS_TOKEN')
    const input = { steamid: MY_PLAYER_ID, count: 20 }
    const endpoint = `https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v1/?key=${steamworksToken}&input_json=${JSON.stringify(input)}`
    const response = await fetch(endpoint)
    if (!response.ok) {
      throw Error(`Received non-OK response from Steamworks API: ${util.inspect(response)}`)
    }
    return response
  }

  async function getGameCapsuleImageData(appId: number) {
    const width = 616;
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
      height
    }
  }
}
