// @ts-check
const ensureDatabase = require('../helpers/ensureDatabase')

async function prepareDatabase() {
  return ensureDatabase()
}

module.exports = prepareDatabase
