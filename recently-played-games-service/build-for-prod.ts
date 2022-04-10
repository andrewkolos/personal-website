import { exec } from 'child_process'
import util = require('util')

const execp = util.promisify(exec)

go()

async function go() {
  const commonPackages = ['common/games-database']
  const lambdaFunctionSources = ['lambdas/get', 'lambdas/trigger-update']

  await execp(`cd aws-sdk-v3-layer/nodejs && npm i --only=prod`)

  console.log('Building common pakages...')

  await Promise.all<void>(
    commonPackages.map(async (layer) => {
      await execp(
        `cd ${layer} && git clean -dfX && npm install && npm run build && rm -rf node_modules && npm install --only=prod`,
      )
    }),
  )

  console.log('Building lambda functions...')

  await Promise.all<void>(
    lambdaFunctionSources.map(async (layer) => {
      await execp(
        `cd ${layer} && git clean -dfX && npm install && npm run build && rm -rf node_modules && npm install --only=prod`,
      )
    }),
  )
}
