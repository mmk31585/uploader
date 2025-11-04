import type { RouteLocationNormalized, RouteLocationNormalizedLoaded } from 'vue-router'
import { useUserAuthStore } from '@/store'
import { endPageLoading } from '@/router/middleware/page-progressbar.ts'

export function checkAuthGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalizedLoaded,
  result: object | null,
) {
  const store = useUserAuthStore()

  if (null !== result) {
    return result
  }

  if (
    to.name !== 'dashboard' &&
    to.meta?.placeTag &&
    to.meta?.placePermission &&
    !store.can(to.meta.placeTag.toString(), to.meta.placePermission.toString())
  ) {
    endPageLoading()
    return {
      name: 'dashboard',
    }
  }

  return null
}
