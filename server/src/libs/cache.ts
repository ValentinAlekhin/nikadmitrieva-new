import NodeCache from 'node-cache'

const { ENABLE_CACHE, TTL } = process.env

class Cache {
  private readonly cache: NodeCache

  constructor(ttlSeconds: number) {
    this.cache = new NodeCache({
      stdTTL: ttlSeconds,
      checkperiod: ttlSeconds * 0.2,
      useClones: false,
    })
  }

  async get(key: string, storeFunction: () => Promise<any>) {
    if (ENABLE_CACHE === 'false') {
      return await storeFunction()
    }

    const value = this.cache.get(key)
    if (value) {
      return value
    }

    const result = await storeFunction()
    this.cache.set(key, result)
    return result
  }

  del(keys: string) {
    this.cache.del(keys)
  }

  delStartWith(startStr = '') {
    if (!startStr) {
      return
    }

    const keys = this.cache.keys()
    for (const key of keys) {
      if (key.indexOf(startStr) === 0) {
        this.del(key)
      }
    }
  }

  flush() {
    this.cache.flushAll()
  }
}

export default new Cache(+TTL)
