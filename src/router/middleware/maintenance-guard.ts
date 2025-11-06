import type { RouteLocationNormalized } from 'vue-router'
import { useMaintenanceStore } from '@/stores'

export function checkMaintenanceGuard(to: RouteLocationNormalized) {
  const { isMaintencenane } = useMaintenanceStore()

  // Prevent redirect loop
  if (to.path.startsWith('/maintenance')) return

  if (to.path.startsWith('/api') || to.path.startsWith('/_')) return

  if (isMaintencenane) {
    return { name: 'maintenance' }
  }

  return null
}
