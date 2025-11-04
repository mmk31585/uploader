import { useAuthApi, type MaintenanceRequest } from '@/services/api'
import { safeLocalStorage } from '@/services/storage'
import { useMaintenanceStore } from '@/stores/maintenance'
import { computed, type Ref, ref } from 'vue'

export function useMaintenace() {
  const secret: Ref<string | null> = ref(
    (safeLocalStorage.getItem('maintenace_secret') as string | null) || null,
  )
  const getSecret = computed(() => {
    return secret.value
  })

  function setSecret(newSecret: string | null) {
    secret.value = newSecret
    safeLocalStorage.setItem('maintenace_secret', newSecret)
  }

  function removeSecret() {
    secret.value = ''
    safeLocalStorage.setItem('maintenace_secret', '')
  }

  const check = async () => {
    const maintenaceState = useMaintenanceStore()
    const secret = getSecret.value

    if (import.meta.env.VITE_IN_MAINTENANCE_MODE === 'true') {
      const bypassCode = import.meta.env.VITE_IN_MAINTENANCE_MODE_CODE
      if (!(secret && bypassCode && bypassCode === secret)) {
        maintenaceState.state = { inMaintenance: true, checked: true }
        return
      }
    }
    try {
      const data = {} as MaintenanceRequest
      if (secret) {
        data.maintenance_secret = secret
      }
      const res = await useAuthApi().maintenance(data)
      if (!res?.in_maintenance_mode) {
        removeSecret()
        maintenaceState.state = { inMaintenance: false, checked: true }
        return
      }
      if (secret) {
        setSecret(secret)
        maintenaceState.state = { inMaintenance: false, checked: true }
        return
      }
      maintenaceState.state = { inMaintenance: true, checked: true }
    } catch (e) {
      console.warn('Maitenanace check failed', e)
      removeSecret()
      maintenaceState.state = { inMaintenance: false, checked: true }
    }
  }
  return {
    check,
    getSecret,
  }
}
