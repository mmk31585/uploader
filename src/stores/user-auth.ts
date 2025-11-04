import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { safeLocalStorage } from '@/services/storage'
import {
  type AuthTokenProps,
  type LoggedInUserProps,
  type LoginPayload,
  useAuthApi,
  utils as authUtils,
} from '@/services/api'
import Cookie from 'js-cookie'
import type { UseRequestConfig } from '@/plugins/client/types.ts'

function createSafeNamespace<T>(key: string) {
  return {
    get: (): T | string | null => safeLocalStorage.getItem<T>(key),
    set: (value: T): void => safeLocalStorage.setItem<T>(key, value),
    remove: (): void => safeLocalStorage.removeItem(key),
  }
}

export const useUserAuthStore = defineStore('useUserAuth', () => {
  const cookieName = 'auth_cookie'
  const storage = createSafeNamespace('user_auth')
  const tokenCookieName = 'token_cookie'
  const tokenStorage = createSafeNamespace('user_token')
  const deviceCookieName = 'token_cookie'
  const deviceStorage = createSafeNamespace('device_id')

  const user = ref(storage.get() as LoggedInUserProps | null)
  const state = ref(tokenStorage.get() as AuthTokenProps | null)
  const deviceId = ref(deviceStorage.get() as string | null)

  const loading = ref(false)

  const getUser = computed(() => user.value)
  const token = computed(() => state.value?.access_token ?? null)
  const device = computed(() => deviceId.value ?? null)

  const isLoading = computed(() => loading.value)

  function persistToken(data: AuthTokenProps) {
    tokenStorage.set(data)
    Cookie.set(tokenCookieName, JSON.stringify(data), { secure: true, sameSite: 'lax' })
  }

  function persistUser(data: LoggedInUserProps) {
    storage.set(data)
    Cookie.set(cookieName, JSON.stringify(data), { secure: true, sameSite: 'lax' })
  }

  function persistDeviceId(deviceId: string) {
    deviceStorage.set(deviceId)
    Cookie.set(deviceCookieName, JSON.stringify(deviceId), { secure: true, sameSite: 'lax' })
  }

  function clearToken() {
    tokenStorage.remove()
    Cookie.remove(tokenCookieName)
  }

  function clearUser() {
    user.value = null
    state.value = null
  }

  function setToken(newToken: string) {
    if (!state.value) return
    state.value = {
      ...state.value,
      access_token: newToken,
    }
    persistToken(state.value)
  }

  async function login(payload: LoginPayload): Promise<LoggedInUserProps> {
    // Perform login and get the token response
    const tokenResponse = await useAuthApi().login(payload)
    const token = tokenResponse || null

    if (!token) throw new Error('Login failed: no access token received')

    state.value = token
    persistToken(token)

    // Fetch the user data using the token
    return await me()
  }

  async function me(config: UseRequestConfig<LoggedInUserProps> = {}) {
    const userData = await useAuthApi().me(config)

    if (!userData) throw new Error('Login failed: invalid user response')

    user.value = userData
    persistUser(userData)

    return userData
  }

  function logout(): Promise<void> {
    return useAuthApi().logout({
      success: () => $reset(),
    })
  }

  function createDeviceId() {
    // Create new device id only if there isn't one already
    if (!device.value) {
      deviceId.value = uuidv4()
      persistDeviceId(deviceId.value)
    }
  }

  function restore(): void {
    const storedToken = tokenStorage.get() as AuthTokenProps | null
    if (storedToken) {
      state.value = storedToken
    }

    const storedDevice = deviceStorage.get() as string | null
    if (storedDevice) {
      deviceId.value = storedDevice
    } else {
      createDeviceId()
    }

    if (token.value) {
      loading.value = true

      me().then(() => (loading.value = false))
    }
  }

  function can(place: string | string[], ability: string | string[]): boolean {
    const permissions: string[] = user.value?.permissions ?? []

    if (permissions.length === 0) return false

    const places = Array.isArray(place) ? place : [place]
    const abilities = Array.isArray(ability) ? ability : [ability]

    // remove duplicates
    const uniquePlaces = Array.from(new Set(places))
    const uniqueAbilities = Array.from(new Set(abilities))

    // faster lookup
    const permsSet = new Set(permissions)

    for (const p of uniquePlaces) {
      for (const a of uniqueAbilities) {
        const permission = authUtils.placePermission(p, a)

        if (permsSet.has(permission)) return true
      }
    }

    return false
  }

  function $reset(): void {
    clearUser()
    clearToken()
  }

  restore()

  /* -------------------------------------------------------------------------- */
  /*  Public API                                                               */
  /* -------------------------------------------------------------------------- */

  return {
    loading: isLoading,
    user: getUser,
    entity: state,
    token,
    device,
    login,
    logout,
    restore,
    setToken,
    //
    can,
    //
    clearToken,
    clearUser,
    $reset,
  }
})
