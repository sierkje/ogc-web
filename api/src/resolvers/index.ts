import { IResolvers } from 'apollo-server-express'

import postResolvers from './posts'

const resolvers: IResolvers[] = [postResolvers]

export default resolvers
