import { IResolvers } from 'apollo-server-express'

import paginate from '../../../lib/helpers/paginate'

interface PostContent {
  body: string
  title?: string
  type: string
}

interface Post extends PostContent {
  id: string
  slug: string
}

const DATA: Record<string, PostContent> = {
  'hello-world': {
    type: 'blog',
    title: 'Hello World',
    body: `Hello! This is the *first* post.`,
  },
  'another-post': {
    type: 'blog',
    title: 'Another Post',
    body: `This is the second post.`,
  },
}

const CACHE: {
  posts?: Post[]
} = {}

async function findPost(slug: string): Promise<Post | null> {
  return DATA[slug] ? { slug, id: slug, ...DATA[slug] } : null
}

async function getPostArray(): Promise<Post[]> {
  if (CACHE.posts) {
    return CACHE.posts
  }

  const posts = await Promise.all(
    Object.keys(DATA).map(
      async (slug): Promise<Post> => ({ ...DATA[slug], slug, id: slug })
    )
  )

  CACHE.posts = posts
  return posts
}

// Provide resolver functions for your schema fields
const postResolvers: IResolvers = {
  Query: {
    // Returns the post for a given slug.
    getPostBySlug: async function getPostBySlug(
      _parent,
      { slug }: { slug: string },
      _context
    ): Promise<Post | null> {
      return findPost(slug)
    },
    // Returns a list of posts.
    getPosts: async function getPosts(
      _parent,
      { count, afterId }: { count?: number; afterId?: string },
      _context
    ): Promise<{ posts: Post[]; lastId: string | null; hasMore: boolean }> {
      const allPosts = await getPostArray()
      const posts = await paginate({ afterId, results: allPosts, count })
      const lastId = posts.length ? posts[posts.length - 1].id : null
      const hasMore = posts.length
        ? posts[posts.length - 1].id !== allPosts[allPosts.length - 1].id
        : false

      return { posts, lastId, hasMore }
    },
  },
}

export default postResolvers
