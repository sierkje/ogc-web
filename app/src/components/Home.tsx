/** @jsx jsx */
import { gql } from 'apollo-boost'
import React from 'react'
import { Link } from 'react-router-dom'

import { useQuery } from '@apollo/react-hooks'
import { css, jsx } from '@emotion/core'

import NotFound from './NotFound'
import Page from './Page'

const BLOG_POSTS = gql`
  {
    getBlogPosts(count: 5) {
      hasMore
      last
      posts {
        id
        title
        slug
        body
      }
    }
  }
`

const Home: React.FC = () => {
  const { loading, error, data } = useQuery<{
    getBlogPosts: {
      hasMore: boolean
      last: string | null
      posts: { title?: string; id: string; slug: string; body: string }[]
    }
  }>(BLOG_POSTS)

  if (error) {
    return <NotFound />
  }

  if (data) {
    console.log(data.getBlogPosts)
  }

  return (
    <Page>
      {loading && <p>Loading</p>}
      {!loading && (
        <ul
          css={css`
            list-style: none;
            padding: 0;
            margin: 0;
          `}
        >
          {data!.getBlogPosts.posts.map(({ title, id, slug, body }) => (
            <li key={id}>
              <article
                css={css`
                  padding: 0;
                  margin: 0 0 1rem;
                `}
              >
                {title && <h1>{title}</h1>}
                <p>{body}</p>
                <p>
                  <Link to={`/blog/${slug}`}>Read more...</Link>
                </p>
              </article>
            </li>
          ))}
        </ul>
      )}
    </Page>
  )
}

export default Home
