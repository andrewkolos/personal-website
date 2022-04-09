import { GetParameterCommand, SSMClient } from '@aws-sdk/client-ssm'
import fetch from 'node-fetch'
import { GetRecentlyPlayedGamesResponse } from './get-recently-played-games-response'

export const SteamworksApi = {
  async getRecentlyPlayedGames(playerId: string) {
    const ssmClient = new SSMClient({ region: 'us-east-1' })
    const steamworksToken = (
      await ssmClient.send(
        new GetParameterCommand({
          Name: 'STEAMWORKS_TOKEN',
        }),
      )
    ).Parameter?.Value

    if (steamworksToken == null) {
      throw Error('Steamworks API token was not found in SSM.')
    }

    const input = { steamid: playerId, count: 20 }
    const endpoint = `https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v1/?key=${steamworksToken}&input_json=${JSON.stringify(
      input,
    )}`
    const response = await fetch(endpoint)
    const parsedResponse = GetRecentlyPlayedGamesResponse.parse(await response.json())
    return parsedResponse
  },
}
