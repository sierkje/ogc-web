import { ApolloServer, ApolloServerExpressConfig, ServerRegistration } from 'apollo-server-express'

import resolvers from './resolvers'
import typeDefs from './typeDefs'

interface ApiServerConfig {
  enablePlayground?: boolean
}

interface ApplyMiddleware extends ServerRegistration {
  path?: undefined
}
interface ApiServer {
  applyMiddleware: (config: ApplyMiddleware) => void
  apiPath: ApolloServer['graphqlPath']
}

let SERVER: ApolloServer | null = null
let SERVER_HAS_MIDDLEWARE: boolean = false

function needsMiddleware() {
  return !!SERVER && !SERVER_HAS_MIDDLEWARE
}

function applyMiddleware({ path, ...config }: ApplyMiddleware): void {
  if (needsMiddleware) {
    SERVER.applyMiddleware({ ...config, path: 'api' })
  }
}

export default function createApiServer({
  enablePlayground = false,
}: ApiServerConfig): ApiServer {
  if (SERVER === null) {
    const config: ApolloServerExpressConfig = {
      typeDefs,
      resolvers,
      playground: enablePlayground,
    }

    SERVER = new ApolloServer(config)
  }

  const apiPath = SERVER.graphqlPath

  return { applyMiddleware, apiPath }
}
