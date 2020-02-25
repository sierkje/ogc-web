import { fork } from 'child_process'
import { join as pathJoin } from 'path'

import { createApiServer } from '../../server/src/api/index'
import server from '../../server/src/index'
import { clean } from './clean'
import { APP } from './workspaces'

let appDevServerHasStarted: boolean = false

function startAppDevServer() {
  if (!appDevServerHasStarted) {
    const startAppDevServer = pathJoin(__dirname, 'startAppDevServer.js')
    const appDevServer = fork(startAppDevServer)
    appDevServer.send('startApp')
    appDevServerHasStarted = true
  }
}

function startApiServer() {
  const apiServer = createApiServer({ enablePlayground: true })

  server.start(apiServer, {
    onListen: (port: number) => {
      const apiPath = apiServer.apiPath()

      console.clear()
      console.log(
        `API server has started on http://localhost:${port}${apiPath}.`
      )
    },
    isDev: true,
  })
}

export function startDevServer() {
  clean(APP)
  startApiServer()
  startAppDevServer()
}
