import React from 'react'

import site from '../constants/site'

const DEFAULT_TITLE = `${site.name} ${site.nameSuffix} | ${site.nameShort}`
const SUFFIX = `${site.name} | ${site.nameShort}`

export default function useSeoTitle(title: string = DEFAULT_TITLE) {
  const [seoTitle, updateSeoTitle] = React.useState(title)

  React.useEffect(() => {
    if (!window) {
      return
    }
    document.title = `${seoTitle} | ${SUFFIX}`
    return () => {
      document.title = DEFAULT_TITLE
    }
  }, [seoTitle])

  return updateSeoTitle
}
