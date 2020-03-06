// @ts-check

const {
  server: { removeBuildFolder, removeEnvFile },
} = require('./cleanWorkspaces')
const compileServer = require('./compileServer')
const ensureDatabase = require('./ensureDatabase')
const fileExists = require('./fileExists')
const from = require('./from')
const { server: logger, printSpacer } = require('./logger')

/**
 * @typedef {"development" | "production"} Mode
 */

/**
 * @param {Mode} mode
 */
function compile(mode) {
  const isDev = mode === 'development'
  logger.info(
    `Creating ${isDev ? 'a development' : 'an optimized production'} build...`
  )

  return () => compileServer({ isDev })
}

/**
 * @param {Mode} mode
 * @returns {Promise<string>}
 */
function buildServer(mode) {
  return new Promise((resolve, reject) => {
    removeBuildFolder()
      .then(removeEnvFile)
      .then(ensureDatabase)
      .then(compile(mode))
      .then(reason => {
        if (fileExists.server('build')) {
          logger.success(
            `${mode.charAt(0).toUpperCase}${mode.slice(
              1
            )} build created in: ${from.server('build')}/`
          )
          resolve()
        } else {
          logger.error('Building SERVER was unsuccessful.')
          printSpacer()
          reject(Error(reason))
        }
      })
      .catch(reject)
  })
}

module.exports = buildServer
