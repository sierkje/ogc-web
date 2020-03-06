// @ts-check

const { cleanAllWorkspaces } = require('../helpers/cleanWorkspaces')
const { printHeader } = require('../helpers/logger')

async function clean() {
  printHeader('Removing any existing build folders...')
  await cleanAllWorkspaces()
}

module.exports = clean
