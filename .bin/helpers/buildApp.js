// @ts-check

const {
  app: { removeBuildFolder, removeEnvFile },
} = require('./cleanWorkspaces')
const { app: appFileExists } = require('./fileExists')
const { app: fromApp } = require('./from')
const { printSpacer, app: logger } = require('./logger')
const reactScripts = require('./reactScripts')

/**
 * @param {"production" | "development"} mode
 * @returns {Promise<string>}
 */
function buildApp(mode) {
  const isDev = mode === 'development'
  const script = reactScripts(isDev ? 'start' : 'build')

  removeBuildFolder()
  removeEnvFile()

  return new Promise((resolve, reject) => {
    script
      .then(reason => {
        if (isDev) {
          return resolve(reason)
        }

        if (appFileExists('build')) {
          logger.success(`${mode} build created in: ${fromApp('build')}/`)
          return resolve(reason)
        }

        logger.error('Building APP was unsuccessful.')
        printSpacer()
        reject(Error(reason))
      })
      .catch(reject)
  })
}

module.exports = buildApp
