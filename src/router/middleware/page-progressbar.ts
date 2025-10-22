import type { RouteLocationNormalized } from 'vue-router'
import { usePageLoaderStore } from '@/store'
import { nextTick } from 'vue'

export function startPageLoading(to: RouteLocationNormalized) {
  if (to.meta?.noNeedRouteWaiting) return

  const loadingStore = usePageLoaderStore()

  endPageLoading()

  return nextTick(() => {
    loadingStore.setLoading(true)
  })
}

export function endPageLoading() {
  const loadingStore = usePageLoaderStore()
  loadingStore.setLoading(false)
}
