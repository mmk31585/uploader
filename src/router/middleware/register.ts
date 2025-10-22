import { endPageLoading, startPageLoading } from './index'
import type { RouteLocationNormalized } from 'vue-router'

/**
 * In each hook, priority is important(from upper middleware to lower one)
 */
export default {
  beforeEach: [async (to: RouteLocationNormalized) => await startPageLoading(to)],

  beforeResolve: [() => endPageLoading()],

  afterEach: [],
}
