import { exec } from 'child_process'
import util = require('util')

const execp = util.promisify(exec)

go()

async function go() {
  const layerSources = ['layers/games-database']
  const lambdaFunctionSources = ['lambdas/get', 'lambdas/trigger-update']

  console.log('Building layers...')

  await Promise.all<void>(
    layerSources.map(async (layer) => {
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
