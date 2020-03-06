// @ts-check

const path = require('path')

const ROOT = path.join(__dirname, '..', '..')

/**
 * @param {string[]} segments
 */
function fromRoot(...segments) {
  return path.join(ROOT, ...segments)
}

/**
 * @param {string[]} segments
 */
function fromApp(...segments) {
  return fromRoot('app', ...segments)
}

/**
 * @param {string[]} segments
 */
function fromServer(...segments) {
  return fromRoot('server', ...segments)
}

module.exports = {
  root: fromRoot,
  app: fromApp,
  server: fromServer,
}
