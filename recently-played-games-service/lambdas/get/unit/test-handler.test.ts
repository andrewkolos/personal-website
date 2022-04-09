import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { mocked } from 'jest-mock'
import { GameRecord, GamesDatabase } from 'games-database'
import { clearCache, lambdaHandler } from '../src/handler'

process.env.DATABASE_BUCKET_NAME = 'bucket'
const now = new Date().getTime()

jest.mock('games-database') // This really should be '/opt/games-database', but I cannot get moduleNameMapper within the jest config to function correctly.

const mockedGamesDatabase = mocked(GamesDatabase)
const aLongTimeAgo = new Date(now).setDate(new Date(15778800000).getDate() - 30 * 12 * 2)

const event: APIGatewayProxyEvent = {
  httpMethod: 'get',
  body: '',
  headers: {},
  isBase64Encoded: false,
  multiValueHeaders: {},
  multiValueQueryStringParameters: {},
  path: '/get',
  pathParameters: {},
  queryStringParameters: {},
  requestContext: {
    accountId: '123456789012',
    apiId: '1234',
    authorizer: {},
    httpMethod: 'get',
    identity: {
      accessKey: '',
      accountId: '',
      apiKey: '',
      apiKeyId: '',
      caller: '',
      clientCert: {
        clientCertPem: '',
        issuerDN: '',
        serialNumber: '',
        subjectDN: '',
        validity: { notAfter: '', notBefore: '' },
      },
      cognitoAuthenticationProvider: '',
      cognitoAuthenticationType: '',
      cognitoIdentityId: '',
      cognitoIdentityPoolId: '',
      principalOrgId: '',
      sourceIp: '',
      user: '',
      userAgent: '',
      userArn: '',
    },
    path: '/hello',
    protocol: 'HTTP/1.1',
    requestId: 'c6af9ac6-7b61-11e6-9a41-93e8deadbeef',
    requestTimeEpoch: 1428582896000,
    resourceId: '123456',
    resourcePath: '/hello',
    stage: 'dev',
  },
  resource: '',
  stageVariables: {},
}

describe('Unit test for app handler', () => {
  beforeEach(() => {
    mockedGamesDatabase.getGames.mockClear()
    jest.useFakeTimers().setSystemTime(now)
    clearCache()
  })

  afterEach(() => {
    mockedGamesDatabase.getGames.mockClear()
  })

  it('verifies successful response', async () => {
    mockedGamesDatabase.getGames.mockResolvedValueOnce([
      { appId: 1, name: 'one', lastKnownToBeRecentlyPlayed: now, totalPlaytimeMinutes: 300 },
      { appId: 2, name: 'two', lastKnownToBeRecentlyPlayed: now, totalPlaytimeMinutes: 300 },
      { appId: 3, name: 'three', lastKnownToBeRecentlyPlayed: aLongTimeAgo, totalPlaytimeMinutes: 300 },
    ])

    const result: APIGatewayProxyResult = await lambdaHandler(event)

    expect(result.statusCode).toEqual(200)
    expect(JSON.parse(result.body)).toEqual([
      { appId: 1, name: 'one', lastKnownToBeRecentlyPlayed: now, totalPlaytimeMinutes: 300 },
      { appId: 2, name: 'two', lastKnownToBeRecentlyPlayed: now, totalPlaytimeMinutes: 300 },
    ])
    expect.assertions(2)
  })

  it('excludes games that have a low play time', async () => {
    const games: GameRecord[] = [
      {
        appId: 1,
        lastKnownToBeRecentlyPlayed: now,
        name: 'one',
        totalPlaytimeMinutes: 10,
      },
      {
        appId: 2,
        lastKnownToBeRecentlyPlayed: now,
        name: 'two',
        totalPlaytimeMinutes: 600,
      },
    ]
    mockedGamesDatabase.getGames.mockResolvedValueOnce(games)

    const result: APIGatewayProxyResult = await lambdaHandler(event)
    expect(result.statusCode).toEqual(200)
    expect(JSON.parse(result.body)).toEqual([games[1]])
  })

  it('returns 500 when database cannot be reached', async () => {
    mockedGamesDatabase.getGames.mockRejectedValueOnce('oh no!')
    const result: APIGatewayProxyResult = await lambdaHandler(event)
    expect(result.statusCode).toBeGreaterThanOrEqual(500)
  })

  it('uses cached value when called again within 15 minutes', async () => {
    mockedGamesDatabase.getGames.mockResolvedValueOnce([
      { appId: 1, name: 'one', lastKnownToBeRecentlyPlayed: now, totalPlaytimeMinutes: 300 },
      { appId: 2, name: 'two', lastKnownToBeRecentlyPlayed: now, totalPlaytimeMinutes: 300 },
      { appId: 3, name: 'three', lastKnownToBeRecentlyPlayed: aLongTimeAgo, totalPlaytimeMinutes: 300 },
    ])

    const firstResult = await lambdaHandler(event)

    mockedGamesDatabase.getGames.mockResolvedValueOnce([
      { appId: 4, name: 'four', lastKnownToBeRecentlyPlayed: now, totalPlaytimeMinutes: 300 },
      { appId: 5, name: 'five', lastKnownToBeRecentlyPlayed: now, totalPlaytimeMinutes: 300 },
      { appId: 6, name: 'six', lastKnownToBeRecentlyPlayed: aLongTimeAgo, totalPlaytimeMinutes: 300 },
    ])

    const secondResult: APIGatewayProxyResult = await lambdaHandler(event)

    expect(firstResult.body).toEqual(secondResult.body)
  })

  it('refetches value if cached value is stale', async () => {
    mockedGamesDatabase.getGames.mockResolvedValueOnce([
      { appId: 1, name: 'one', lastKnownToBeRecentlyPlayed: now, totalPlaytimeMinutes: 300 },
      { appId: 2, name: 'two', lastKnownToBeRecentlyPlayed: now, totalPlaytimeMinutes: 300 },
      { appId: 3, name: 'three', lastKnownToBeRecentlyPlayed: aLongTimeAgo, totalPlaytimeMinutes: 300 },
    ])

    const firstResult = await lambdaHandler(event)

    jest.useFakeTimers().setSystemTime(now + 1000 * 60 * 60 * 60)

    mockedGamesDatabase.getGames.mockResolvedValueOnce([
      { appId: 4, name: 'four', lastKnownToBeRecentlyPlayed: now, totalPlaytimeMinutes: 300 },
      { appId: 5, name: 'five', lastKnownToBeRecentlyPlayed: now, totalPlaytimeMinutes: 300 },
      { appId: 6, name: 'six', lastKnownToBeRecentlyPlayed: aLongTimeAgo, totalPlaytimeMinutes: 300 },
    ])

    const secondResult: APIGatewayProxyResult = await lambdaHandler(event)

    expect(secondResult.body).not.toEqual(firstResult.body)
  })
})
