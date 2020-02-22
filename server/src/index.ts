import { Express } from 'express'
import { existsSync } from 'fs'
import { join as pathJoin } from 'path'

// @ts-check
const express = require('express')

interface ApiServer {
  applyMiddleware: (props: { app: Express }) => void
  apiPath: () => string
}

type OnListen = (port: number) => void

interface StartOptions {
  isDev?: boolean
  onListen?: OnListen
}

let SERVER: Express | false = false
let API_SERVER: ApiServer | false = false
let ON_LISTEN: OnListen = function noop() {}

function isDevServer() {
  return process.env.SERVER_ENV === 'development'
}

function getPort(): number {
  return isDevServer() ? 4000 : 80
}

function createServer() {
  if (SERVER) {
    return SERVER
  }

  SERVER = express() as Express

  if (API_SERVER) {
    API_SERVER.applyMiddleware({ app: SERVER })
  }

  if (!isDevServer()) {
    const appPath = pathJoin(__dirname, '..', 'app', 'build', 'index.html')
    if (existsSync(appPath)) {
      SERVER.use('*', express.static(appPath))
    }
  }

  return SERVER
}

function startServer(onListen: OnListen = ON_LISTEN) {
  const server = createServer()
  const port = getPort()
  ON_LISTEN = onListen

  server.listen(port, () => ON_LISTEN(port))
}

function stopServer() {
  SERVER = false
  return { start: startServer }
}

function restartServer(onListen?: OnListen) {
  stopServer().start(onListen)
  return { stop: stopServer, restart: restartServer }
}

export default {
  start: (
    apiServer: ApiServer,
    { isDev = false, onListen }: StartOptions = {}
  ) => {
    if (isDev) {
      process.env.SERVER_ENV = 'development'
    }
    API_SERVER = apiServer
    startServer(onListen)

    return { stop: stopServer, restart: restartServer }
  },
}
