// @ts-check

function startProductionServer() {
  process.env.NODE_ENV = 'production'

  console.clear()
  console.log('Starting the production server.')
  console.log()

  //@ts-ignore
  const { createApiServer } = require('../../api')
  const apiServer = createApiServer({
    enablePlayground: false,
  })

  //@ts-ignore
  const { default: server } = require('../../server')
  server?.start(apiServer)
}

module.exports = { startProductionServer }
