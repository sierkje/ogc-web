export default async function paginate<T = any>({
  afterId,
  count = 5,
  results,
}: {
  afterId?: string
  count?: number
  results: (T & { id: string })[]
}): Promise<(T & { id: string })[]> {
  if (count < 1) return []

  if (!afterId) return results.slice(0, count)

  const cursorIndex = results.findIndex(item => {
    // if an item has a `cursor` on it, use that, otherwise try to generate one
    let itemCursor = item.id

    // if there's still not a cursor, return false by default
    return itemCursor ? afterId === itemCursor : false
  })

  return cursorIndex >= 0
    ? cursorIndex === results.length - 1 // don't let us overflow
      ? []
      : results.slice(
          cursorIndex + 1,
          Math.min(results.length, cursorIndex + 1 + count)
        )
    : results.slice(0, count)
}
