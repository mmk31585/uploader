type AnyObject = Record<string, unknown>

export const nestedArray = {
  /**
   *  Retrieve a deep value from an object using a dot‑separated path.
   */
  get<T = unknown>(obj: AnyObject, path: string): T | undefined {
    return path.split('.').reduce<unknown>((acc, segment) => {
      if (acc === undefined || acc === null) return undefined
      return (acc as AnyObject)[segment]
    }, obj) as T | undefined
  },

  /**
   * Set a deep value on an object, creating intermediate objects as needed.
   */
  set<T = unknown>(obj: AnyObject, path: string, value: T): AnyObject {
    const segments = path.split('.')
    const last = segments.pop() as string

    const target = segments.reduce<AnyObject>((acc, seg) => {
      if (
        typeof acc[seg] !== 'object' ||
        acc[seg] === null ||
        Array.isArray(acc) ||
        ['__proto__', 'prototype', 'constructor'].includes(seg)
      ) {
        acc[seg] = {}
      }
      return acc[seg] as AnyObject
    }, obj)

    target[last] = value
    return obj
  },

  /**
   * Remove a deep property from an object.
   */
  remove(obj: AnyObject, path: string): AnyObject {
    const segments = path.split('.')
    const last = segments.pop() as string

    const parent = segments.reduce<AnyObject | undefined>((acc, seg) => {
      if (acc && typeof acc[seg] === 'object' && acc[seg] !== null) {
        return acc[seg] as AnyObject
      }
      return undefined
    }, obj)

    if (
      parent &&
      !['__proto__', 'prototype', 'constructor'].includes(last) &&
      Object.prototype.hasOwnProperty.call(parent, last)
    ) {
      delete parent[last]
    }
    return obj
  },
}
