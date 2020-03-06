// @ts-check

const buildApp = require('../helpers/buildApp')
const buildServer = require('../helpers/buildServer')
const { cleanAllWorkspaces } = require('../helpers/cleanWorkspaces')
const { printHeader, printSpacer, printError } = require('../helpers/logger')

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

async function build() {
  try {
    printHeader('Compiling APP files...')
    await buildApp('production')

    printHeader('Compiling SERVER files...')
    await buildServer('production')
  } catch (error) {
    await handleError(error)
  }
}

module.exports = build
