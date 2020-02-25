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
  apiPath: () => ApolloServer['graphqlPath']
}

let SERVER: ApolloServer | null = null

export function createApiServer({
  enablePlayground = true,
}: ApiServerConfig): ApiServer {
  if (SERVER === null) {
    const config: ApolloServerExpressConfig = {
      typeDefs,
      resolvers,
      playground: enablePlayground,
    }

    SERVER = new ApolloServer(config)
  }

  return {
    applyMiddleware: function applyMiddleware({
      path: _,
      ...config
    }: ApplyMiddleware): void {
      SERVER!.applyMiddleware({ ...config, path: '/api' })
    },
    apiPath: () => SERVER!.graphqlPath,
  }
}
