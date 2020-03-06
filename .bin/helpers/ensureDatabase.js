// @ts-check

const fs = require('fs')
const knex = require('knex')
const builder = require('knex-schema-builder')
const path = require('path')

const { root: fileExists } = require('./fileExists')
const { root: fromRoot } = require('./from')
const { server: logger } = require('./logger')

const dbFilename = 'ogc-web-db.sqlite3'
const dbPath = fromRoot(dbFilename)
const schemaPath = path.join(__dirname, '..', 'config', 'database')

const db = knex({
  client: 'sqlite',
  connection: {
    filename: dbPath,
  },
  useNullAsDefault: true,
})

function ensureDatabase() {
  return new Promise(async (resolve, reject) => {
    if (fileExists(dbFilename)) {
      logger.info(`Found database: ${dbPath}`)
    } else {
      // Creates a new db file.
      logger.info(`Creating new database: ${dbPath}`)
      fs.writeFileSync(dbPath, '')

      logger.info('Database needs to initialized...')
      await builder.install(db, schemaPath, (error, arg1) => {
        if (error) {
          console.log('install', { error, arg1 })
          logger.error(`Database initialization error:\n\n${error}`)

          reject(error)
        }
      })

      logger.success('Successfully initialized database schema...')
    }

    await builder.isUpgradeNeeded(db, schemaPath, async (error, required) => {
      if (error) {
        logger.error(`Database upgrade check error:\n\n${error}`)

        reject(error)
      } else if (required) {
        logger.info('Database schema needs upgrade...')

        await builder.upgrade(db, schemaPath, (error, arg1) => {
          console.log('upgrade', { error, arg1 })
          if (error) {
            logger.error(`Database upgrade error:\n\n${error}`)
            reject(error)
          }
        })

        logger.success('Successfully upgraded database schema...')
      }
    })

    return resolve()
  }).then(() => logger.success('Database ready for use...'), logger.error)
}

module.exports = ensureDatabase
