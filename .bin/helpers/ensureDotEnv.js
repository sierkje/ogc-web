// @ts-check

const fs = require('fs')

const fileExists = require('./fileExists')
const from = require('./from')
const logger = require('./logger')

/**
 * @typedef {"app" | "server"} Workspace
 */

/**
 * @param {Workspace} workspace
 */
function getRootEnv(workspace) {
  const rootEnv = `.env.${workspace}`
  return fileExists.root(rootEnv) ? rootEnv : `${rootEnv}.txt`
}

/**
 * @param {Workspace} workspace
 */
function createEnsureEnv(workspace) {
  return function _ensureEnv() {
    const rootEnv = getRootEnv(workspace)
    if (fileExists[workspace]('.env')) {
    }
    const sourceEnv = from.root(rootEnv)

    if (!fileExists.root(rootEnv)) {
      return logger[workspace].error(`Could not find: ${sourceEnv}`)
    }

    const targetEnv = from[workspace]('.env')
    fs.copyFileSync(sourceEnv, targetEnv)
    return logger[workspace].info(`Created .env file: ${sourceEnv}`)
  }
}

/**
 * @type {Record<Workspace, () => void>}
 */
const ensureEnv = {
  app: createEnsureEnv('app'),
  server: createEnsureEnv('server'),
}

module.exports = ensureEnv
