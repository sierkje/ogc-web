import express, { Express } from 'express'
import { existsSync } from 'fs'
import { request } from 'http'
import { join as pathJoin } from 'path'

interface Props {
  apiServer: {
    applyMiddleware: (props: { app: Express }) => void
    graphqlPath: string
  }
  isDev?: boolean
}

const APP_PATH = pathJoin(__dirname, '..', 'app', 'build', 'index.html')

export function createServer({ apiServer, isDev = false }: Props) {
  const IS_DEV = isDev || !existsSync(APP_PATH)
  const IS_PROD = !IS_DEV
  const PORT = IS_DEV ? 4000 : 80

  const app = express()

  apiServer.applyMiddleware({ app })

  if (IS_PROD) {
    app.use('*', express.static(APP_PATH))
  }

  if (IS_DEV) {
    app.get('*', (req, res) => {
      const appUrl = `http://localhost:3000${req.url}`
      request(appUrl).pipe(res)
    })
  }

  return app.listen({ port: PORT }, () => {
    if (IS_DEV) {
      const { graphqlPath } = apiServer
      console.log(
        `API server started on http://localhost:${PORT}${graphqlPath}`
      )
    }
  })
}
