// @ts-check

const { root: fromRoot } = require('./from')
const { app: spawn } = require('./spawn')

const REACT_SCRIPTS_BIN = fromRoot(
  'node_modules',
  'react-scripts',
  'bin',
  'react-scripts.js'
)

/**
 * @param {"build" | "start" | "test"} script
 */
function reactScripts(script) {
  return spawn(REACT_SCRIPTS_BIN, script)
}

module.exports = reactScripts
