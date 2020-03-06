// @ts-check

const spawn = require('./spawn')

function startServer() {
  return spawn.server('node', '.')
}

module.exports = startServer
