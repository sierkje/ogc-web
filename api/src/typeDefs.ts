import { gql } from 'apollo-server-express'
import { DocumentNode } from 'graphql'

// Construct a schema, using GraphQL schema language
const typeDefs: DocumentNode | DocumentNode[] = gql`
  """
  A post.
  """
  type Post {
    id: ID!
    slug: ID!
    title: String
    type: String!
    body: String
  }

  """
  A list of posts.
  """
  type PostList {
    count: Int!
    hasMore: Boolean!
    lastId: String
    posts: [Post]!
  }

  type Query {
    """
    Returns a single post.
    """
    getPostBySlug(slug: ID!): Post

    """
    Returns a list of blog posts.
    """
    getPosts(
      """
      Number of posts to return.
      """
      count: Int
      afterId: String
    ): PostList!
  }
`

export default typeDefs
