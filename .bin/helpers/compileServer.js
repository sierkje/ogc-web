// @ts-check

const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages')
const webpack = require('webpack')

const getWebpackServerConfig = require('../config/webpack.server')
const { server: logger } = require('./logger')

/**
 * @param {{isDev: boolean}} options
 */
function compileServer({ isDev }) {
  const mode = isDev ? 'development' : 'production'
  let isFirstCompile = true

  /**
   * @param {webpack.ICompiler.Handler} handler
   */
  function compile(handler) {
    const webpackConfig = getWebpackServerConfig(mode)
    const compiler = webpack(webpackConfig)
    return isDev ? compiler.watch({}, handler) : compiler.run(handler)
  }

  return new Promise(function webpackServer(resolve, reject) {
    compile((error, stats) => {
      if (error) {
        logger.error(error)
        reject(error)
      }

      const { errors, warnings } = formatWebpackMessages(
        stats.toJson({
          all: false,
          warnings: true,
          errors: true,
        })
      )

      if (errors.length === 0 && warnings.length === 0) {
        if (isFirstCompile) {
          logger.spacer()
          logger.success('Compiled successfully.')
          logger.spacer()
        }
        return resolve()
      }

      // If errors exist, only show errors.
      if (errors.length > 0) {
        // Only keep the first error. Others are often indicative
        // of the same problem, but confuse the reader with noise.
        if (errors.length > 1) {
          errors.length = 1
        }
        logger.error('Failed to compile.\n')
        logger.info(errors.join('\n\n'))

        return reject()
      }

      // Show warnings if no errors were found.
      if (warnings.length) {
        logger.warn('Compiled with warnings.\n')
        logger.info(warnings.join('\n\n'))
      }

      resolve()
    })
  })
}

module.exports = compileServer
