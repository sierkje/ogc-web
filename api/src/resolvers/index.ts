import { IResolvers } from 'apollo-server-express'

interface BlogPostContent {
  title?: string
  body: string
}

interface BlogPost extends BlogPostContent {
  id: string
  slug: string
}

const blogPosts: Record<string, BlogPostContent> = {
  'hello-world': {
    title: 'Hello World',
    body: `Hello! This is the first post.`,
  },
}

function paginateResults<T = any>({
  after: cursor,
  count: pageSize = 20,
  results,
}: {
  after?: string
  count?: number
  results: (T & { id: string })[]
}): T[] {
  if (pageSize < 1) return []

  if (!cursor) return results.slice(0, pageSize)

  const cursorIndex = results.findIndex(item => {
    // if an item has a `cursor` on it, use that, otherwise try to generate one
    let itemCursor = item.id

    // if there's still not a cursor, return false by default
    return itemCursor ? cursor === itemCursor : false
  })

  return cursorIndex >= 0
    ? cursorIndex === results.length - 1 // don't let us overflow
      ? []
      : results.slice(
          cursorIndex + 1,
          Math.min(results.length, cursorIndex + 1 + pageSize)
        )
    : results.slice(0, pageSize)
}

const cache: {
  blogPosts?: BlogPost[]
} = {}

function allBlogPosts(): BlogPost[] {
  if (!cache.blogPosts) {
    cache.blogPosts = Object.keys(blogPosts).reduce<BlogPost[]>(
      (posts, slug) => {
        const post = getBlogPostBySlug(slug)

        return post ? [...posts, post] : posts
      },
      []
    )
  }

  return cache.blogPosts
}

function getBlogPostBySlug(slug: string): BlogPost | null {
  if (!blogPosts[slug]) {
    return null
  }

  return { slug, id: slug, ...blogPosts[slug] }
}

function getBlogPosts(count: number = 5, after?: string) {
  return paginateResults({ after, results: allBlogPosts(), count })
}

// Provide resolver functions for your schema fields
const resolvers: IResolvers | IResolvers[] = {
  Query: {
    getBlogPosts: (
      _parent,
      { count, after }: { count?: number; after?: string },
      _context
    ): { posts: BlogPost[]; last: string | null; hasMore: boolean } => {
      const allPosts = allBlogPosts()
      const posts = getBlogPosts(count, after)
      const last = posts.length ? posts[posts.length - 1].id : null
      const hasMore = posts.length
        ? posts[posts.length - 1].id !== allPosts[allPosts.length - 1].id
        : false
      return { posts, last, hasMore }
    },
    getBlogPostBySlug: (
      _parent,
      { slug }: { slug: string },
      _context
    ): BlogPost | null => getBlogPostBySlug(slug),
    getBlogPostById: (
      _parent,
      { id }: { id: string },
      _context
    ): BlogPost | null => getBlogPostBySlug(id),
  },
}

export default resolvers
