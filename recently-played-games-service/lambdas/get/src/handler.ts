import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { inspect } from 'util'
import { GamesDatabase, GameRecord } from '/opt/games-database'
import envVar from 'env-var'

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */

let cache: undefined | { games: GameRecord[]; cachedAt: number }

export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.log('event', inspect(event))
  try {
    const games = (await getGames()).filter((game) => game.totalPlaytimeMinutes >= 150)
    cache = {
      games,
      cachedAt: Date.now(),
    }
    return {
      statusCode: 200,
      body: JSON.stringify(games),
    }
  } catch (err) {
    console.error(err)
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'some error happened',
      }),
    }
  }
}

/**
 * Exists solely for local debugging purposes.
 */
export function clearCache() {
  cache = undefined
}

async function getGames(): Promise<GameRecord[]> {
  if (cacheIsStillValid() && cache != null) {
    return cache.games
  }

  const allGames = await GamesDatabase.getGames(envVar.get('DATABASE_BUCKET_NAME').required().asString())
  const sixMonthsInMilliSeconds = 15778800000
  return allGames.filter((game) => new Date().getTime() - game.lastKnownToBeRecentlyPlayed < sixMonthsInMilliSeconds)
}

function cacheIsStillValid(): boolean {
  if (cache == null) return false

  const timeElapsedSinceCached = Date.now() - cache.cachedAt
  const fifteenMinutes = 15 * 1000 * 60

  return timeElapsedSinceCached < fifteenMinutes
}
