import { gql } from 'apollo-server-express'
import { DocumentNode } from 'graphql'

// Construct a schema, using GraphQL schema language
const typeDefs: DocumentNode | DocumentNode[] = gql`
  type BlogPost {
    id: ID!
    slug: ID!
    title: String
    body: String
  }

  type BlogPostSet {
    last: String!
    hasMore: Boolean!
    posts: [BlogPost]!
  }

  type Query {
    getBlogPosts(count: Int, after: String): BlogPostSet!
    getBlogPostById(id: ID!): BlogPost
    getBlogPostBySlug(slug: ID!): BlogPost
  }
`
export default typeDefs
