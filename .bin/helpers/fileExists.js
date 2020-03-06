// @ts-check

const fs = require('fs')

const from = require('./from')

/**
 * @param {"app" | "server" | "root"} workspace
 *
 * @returns {(...segments: string[]) => boolean}
 */
function createFileExists(workspace) {
  return function _fileExists(...segments) {
    return fs.existsSync(from[workspace](...segments))
  }
}

const fileExists = {
  app: createFileExists('app'),
  root: createFileExists('root'),
  server: createFileExists('server'),
}

module.exports = fileExists
