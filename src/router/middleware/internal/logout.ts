import { useUserAuthStore } from '@/store'
import { isValidInternalRedirectLink } from '@/utils'
import type {
  NavigationGuardNext,
  RouteLocationNormalized,
  RouteLocationNormalizedLoaded,
} from 'vue-router'
import { endPageLoading } from '@/router/middleware'

export const logoutMiddleware = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalizedLoaded,
  next: NavigationGuardNext,
) => {
  const store = useUserAuthStore()

  let route = null

  // Check if the user is authenticated
  if (!store.user || !store.token) {
    // User is authenticated, continue navigation to the original destination
    next(from)
    endPageLoading()
    return
  }

  // Logout the user
  await store.logout().then(() => {
    if (from.meta.requiresAuth) {
      // If the original route requires authentication, redirect to log in
      route = { name: 'login', query: {} }

      // @ts-expect-error It may have redirect in query
      if ('redirect' in to.query && isValidInternalRedirectLink(to.query?.redirect)) {
        route.query = { redirect: to.query.redirect }
      }
    }
  })

  if (route) {
    location.reload()
  }

  return next(from)
}
