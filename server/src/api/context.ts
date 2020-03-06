import { ApolloServerExpressConfig } from 'apollo-server-express'

interface Context {}

export type ApiContext = ApolloServerExpressConfig['context'] &
  ((...args: any[]) => Context)

export type CreateApiContext<Params = any, Context extends object = any> = (
  context: Params
) => Promise<Context> | Context

export default function createContext(): ApiContext {
  return () => ({})
}
