import React from 'react'

function supportsMatchMedia(): boolean {
  return (
    typeof window !== 'undefined' && typeof window.matchMedia !== 'undefined'
  )
}

export default function useMediaQuery({
  query,
  defaultMatches = false,
}: {
  query: string
  defaultMatches?: boolean
}): boolean {
  const parsedQuery = query.replace(/^@media( ?)/m, '')

  const [match, setMatch] = React.useState(() =>
    supportsMatchMedia()
      ? window.matchMedia(parsedQuery).matches
      : defaultMatches
  )
  const [isActive, setIsActive] = React.useState(true)
  const activate = () => setIsActive(true)
  const deactivate = () => setIsActive(false)

  React.useEffect(() => {
    if (!supportsMatchMedia) {
      return
    }

    activate()

    const { addListener, matches, removeListener } = window.matchMedia(
      parsedQuery
    )

    function updateMatch(): void {
      // Workaround Safari wrong implementation of matchMedia
      // TODO can we remove it?
      // https://github.com/mui-org/material-ui/pull/17315#issuecomment-528286677
      if (isActive) {
        setMatch(matches)
      }
    }

    addListener(updateMatch)

    return () => {
      deactivate()
      removeListener(updateMatch)
    }
  }, [parsedQuery, matchMedia, supportsMatchMedia])

  return match
}
