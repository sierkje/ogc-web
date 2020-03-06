import { KeyValueCache } from 'apollo-server-caching'

type PartialCache<T> = {
  [P in keyof T]?: T[P] & string
}

class DefaultCache<T extends Record<string, string> = any>
  implements KeyValueCache {
  private cache: PartialCache<T> = {}

  async get(key: keyof T): Promise<T[typeof key] | undefined> {
    return this.cache[key]
  }

  async delete(key: keyof T) {
    if (this.cache[key]) {
      const { [key]: _, ...cache } = this.cache
      this.cache = cache as PartialCache<T>
    }
  }

  async set(key: keyof T, value: T[typeof key]) {
    this.cache[key] = value
  }
}

export function getServices() {
  return {
    cache: new DefaultCache(),
  }
}
