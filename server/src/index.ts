import { ApolloServer } from 'apollo-server-express'
import express from 'express'

import apiMiddleware from './lib/middleware/api'

const app = express()

const apiServer = new ApolloServer({})
app.use(apiMiddleware(app, apiServer, '/api'))

const server = app.listen()

if (module.hot) {
  module.hot.accept()
  module.hot.dispose(() => server.close())
}
