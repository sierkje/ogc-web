/** @jsx jsx */
import { gql } from 'apollo-boost'
import React from 'react'
import { Link } from 'react-router-dom'

import { useQuery } from '@apollo/react-hooks'
import { css, jsx } from '@emotion/core'

import NotFound from './NotFound'
import Page from './shared/Page'

interface GetPostsQuery {
  getPosts: {
    hasMore: boolean
    last: string | null
    posts: { title?: string; id: string; slug: string; body: string }[]
  }
}

const GET_POSTS_QUERY = gql`
  {
    getPosts(count: 5) {
      hasMore
      last
      posts {
        body
        id
        slug
        title
      }
    }
  }
`

const Home: React.FC = () => {
  const { loading, error, data } = useQuery<GetPostsQuery>(GET_POSTS_QUERY)

  if (error) {
    return <NotFound />
  }

  if (process.env.NODE_ENV === 'development') {
    if (data) {
      console.log(data.getPosts)
    }
    if (error) {
      console.error(error)
    }
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
          {data!.getPosts.posts.map(({ body, id, slug, title }) => (
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
