import { Octokit as OctokitRest } from '@octokit/rest'
import * as envVar from 'env-var'
import * as fse from 'fs-extra'
import * as sodium from 'libsodium-wrappers'
import * as dotEnv from 'dotenv'
import { z } from 'zod'

dotEnv.config()
;(async () => {
  const gitHubToken = envVar.get('GITHUB_TOKEN').required().asString()
  const getApiUrl = await readGetApiUrlFromCfntemplateOutput()
  const { publicKey, publicKeyId: repoPublicKeyId } = await getRepositoryPublicKey(gitHubToken)
  const encryptedGetApiUrlValue = encryptGetApiUrl({ publicKey, getApiUrl })
  await setGetApiUrlSecret({ repoPublicKeyId, gitHubToken, encryptedGetApiUrlValue })
})()

async function readGetApiUrlFromCfntemplateOutput(): Promise<string> {
  const contents = fse.readFileSync('./cdk-outputs.json').toString('utf-8')
  return z.string().parse(JSON.parse(contents).RecentlyPlayedGamesServiceStack.getApiEndpoint)
}

async function getRepositoryPublicKey(gitHubToken: string) {
  const octokit = new OctokitRest({ auth: gitHubToken })
  const response = await octokit.actions.getRepoPublicKey({
    owner: 'andrewkolos',
    repo: 'personal-website',
  })
  const publicKey = response.data.key
  const publicKeyId = response.data.key_id

  return {
    publicKey,
    publicKeyId,
  }
}

async function setGetApiUrlSecret({
  gitHubToken,
  encryptedGetApiUrlValue,
  repoPublicKeyId,
}: {
  repoPublicKeyId: string
  gitHubToken: string
  encryptedGetApiUrlValue: string
}) {
  const octokit = new OctokitRest({ auth: gitHubToken })
  await octokit.actions.createOrUpdateEnvironmentSecret({
    encrypted_value: encryptedGetApiUrlValue,
    environment_name: 'prod',
    key_id: repoPublicKeyId,
    repository_id: 315570092,
    secret_name: 'GET_GAMES_API_URL',
  })
}

function encryptGetApiUrl({ publicKey, getApiUrl }: { publicKey: string; getApiUrl: string }) {
  // Convert the message and key to Uint8Array's (Buffer implements that interface)
  const keyBytes = Buffer.from(publicKey, 'base64')

  // Encrypt using LibSodium.
  const encryptedBytes = sodium.crypto_box_seal(Buffer.from(getApiUrl), keyBytes)

  // Base64 the encrypted secret
  return Buffer.from(encryptedBytes).toString('base64')
}
