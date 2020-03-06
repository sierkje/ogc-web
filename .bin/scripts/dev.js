// @ts-check

const buildApp = require('../helpers/buildApp')
const buildServer = require('../helpers/buildServer')
const { cleanAllWorkspaces } = require('../helpers/cleanWorkspaces')
const { printHeader, printError, printSpacer } = require('../helpers/logger')
const startServer = require('../helpers/startServer')

/**
 * @param {string | Error} error
 */
async function handleError(error) {
  printHeader('Something went wrong...')

  await cleanAllWorkspaces()

  printSpacer()
  printError(error)
  printSpacer()

  process.exit(1)
}

function startApp() {
  return new Promise(resolve => {
    setTimeout(() => resolve(buildApp('development')), 3000)
  })
}

async function dev() {
  try {
    printHeader('Compiling SERVER files...')
    await buildServer('development')

    printHeader('Starting development servers...')
    await Promise.all([startServer(), startApp()])
  } catch (error) {
    await handleError(error)
  }
}

process.on('beforeExit', code => {
  if (code !== 0) {
    printError(`Process exited with code ${code}`)
  }

  cleanAllWorkspaces()
})

module.exports = dev
