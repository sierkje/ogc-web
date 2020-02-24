/** @jsx jsx */

import React from 'react'

import { css, jsx } from '@emotion/core'

import useSeoTitle from '../../../hooks/useSeoTitle'

const TITLE_CSS = css``

const Title: React.FC<{ children?: string }> = ({ children }) =>
  children ? <h1 css={TITLE_CSS}>{children}</h1> : null

const Page: React.FC<{ title?: string; seoTitle?: string }> = ({
  children,
  title,
  seoTitle,
}) => {
  useSeoTitle(seoTitle)
  return (
    <React.Fragment>
      <Title>{title}</Title>
      {children}
    </React.Fragment>
  )
}

export default Page
