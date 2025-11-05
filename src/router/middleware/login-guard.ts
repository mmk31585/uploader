import type { RouteLocationNormalized } from 'vue-router'
import { useUserAuthStore } from '@/stores'

export function checkLoginGuard(to: RouteLocationNormalized) {
  const store = useUserAuthStore()

  if (
    to.matched.some((record) => record.meta.requiresAuth) &&
    to.name !== 'login' &&
    to.name !== 'logout'
  ) {
    if (!store.token) {
      store.$reset()

      return {
        name: 'login',
        query: { redirect: to.fullPath },
      }
    }
  }

  if (to.name === 'login') {
    if (store.user && store.token) {
      return {
        name: 'dashboard',
      }
    }
  }

  return null
}
