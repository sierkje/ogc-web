// @ts-check

const rimraf = require('rimraf')

const fileExists = require('./fileExists')
const from = require('./from')
const logger = require('./logger')

/**
 * @param {"app" | "server"} workspace
 */
async function removeBuildFolder(workspace) {
  if (fileExists[workspace]('build')) {
    const path = from[workspace]('build')
    logger[workspace].info(`Removing existing build folder: ${path}`)
    rimraf.sync(path)
  }
}

/**
 * @param {"app" | "server"} workspace
 */
async function removeEnvFile(workspace) {
  if (fileExists[workspace]('.env')) {
    const path = from[workspace]('.env')
    logger[workspace].info(`Removing existing .env file: ${path}`)
    rimraf.sync(path)
  }
}

/**
 * @param {"app" | "server"} workspace
 */
function createWorkspaceRemovers(workspace) {
  return {
    removeBuildFolder: function _removeBuildFolder() {
      return removeBuildFolder(workspace)
    },
    removeEnvFile: function _removeEnvFile() {
      return removeEnvFile(workspace)
    },
  }
}

const cleanWorkspaces = {
  cleanAllWorkspaces: async function cleanAllWorkspaces() {
    await removeBuildFolder('app')
    await removeEnvFile('app')
    await removeBuildFolder('server')
    await removeEnvFile('server')
  },
  app: createWorkspaceRemovers('app'),
  server: createWorkspaceRemovers('server'),
}

module.exports = cleanWorkspaces
