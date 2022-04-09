import { EventBridgeEvent } from 'aws-lambda'
import * as conset from 'conset'
import envVar from 'env-var'
import { inspect } from 'util'
import { SteamworksApi } from './steamworks-api'
import { GameRecord, GamesDatabase } from '/opt/games-database'

const MY_PLAYER_ID = '76561198049300555'

export const lambdaHandler = async (event: EventBridgeEvent<string, unknown>): Promise<void> => {
  const bucketName = envVar.get('DATABASE_BUCKET_NAME').required().asString()
  console.log('event', inspect(event))

  const gamesFromDb = await GamesDatabase.getGames(bucketName)
  const recentlyPlayedGamesAccordingToSteam: GameRecord[] = (
    await SteamworksApi.getRecentlyPlayedGames(MY_PLAYER_ID)
  ).response.games.map(
    (game): GameRecord => ({
      appId: game.appid,
      lastKnownToBeRecentlyPlayed: new Date().getTime(),
      name: game.name,
      totalPlaytimeMinutes: game.playtime_forever,
    }),
  )

  const allGames = conset.create<GameRecord>((gameRecord) => gameRecord.appId.toString())
  gamesFromDb.forEach((gameFromDb) => conset.add(allGames, gameFromDb))
  recentlyPlayedGamesAccordingToSteam.forEach((rpg) => conset.add(allGames, rpg))

  await GamesDatabase.postGames(bucketName, conset.getItems(allGames))
}
