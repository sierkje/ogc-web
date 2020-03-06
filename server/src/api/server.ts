import { ApolloServer, ApolloServerExpressConfig, ServerRegistration } from 'apollo-server-express'
import { Router } from 'express'

import { Entities } from '../lib/entities'
import { ApiContext } from './context'

export interface ApiServer<MiddlewareOptions extends object> {
  getMiddleware: (options: MiddlewareOptions) => Router
}

export type ApiSchema = {
  resolvers: Required<ApolloServerExpressConfig>['resolvers']
  typeDefs: Required<ApolloServerExpressConfig>['typeDefs']
  schemaDirectives?: ApolloServerExpressConfig['schemaDirectives']
}

const IS_DEV = process.env.NODE_ENV === 'development'
let SERVER: ApolloServer

export default function createServer(
  schema: ApiSchema,
  context: ApiContext,
  entities: Entities,
  config: Omit<
    ApolloServerExpressConfig,
    'resolvers' | 'typeDefs' | 'context' | 'dataSources' | 'schemaDirectives'
  > & { path?: string } = {}
): ApiServer<Partial<Omit<ServerRegistration, 'path' | 'app'>>> {
  const { path = '/api', ...optional } = config
  const parsedConfig = {
    debug: IS_DEV,
    playground: IS_DEV,
    introspection: IS_DEV,
    ...optional,
    context,
    dataSources: entities,
    resolvers: schema.resolvers,
    schemaDirectives: schema.schemaDirectives,
    typeDefs: schema.typeDefs,
  }

  if (!SERVER) {
    SERVER = new ApolloServer(parsedConfig)
  }

  return {
    getMiddleware: function getMiddleware(options) {
      return SERVER.getMiddleware({ ...options, path })
    },
  }
}
