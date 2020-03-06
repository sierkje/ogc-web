import { IResolvers } from 'apollo-server-express'
import { DocumentNode } from 'graphql'

import resolvers from './resolvers'
import typeDefs from './typeDefs'

type Resolvers<C, S = any> = IResolvers<S, C> | IResolvers<S, C>[]

export interface ApiSchema<TContext, TSource = any> {
  typeDefs: DocumentNode | DocumentNode[]
  resolvers: Resolvers<TSource, TContext>
}

function getSchema<TContext, TSource = any>(): ApiSchema<TContext, TSource> {
  return { typeDefs, resolvers }
}

export default getSchema
