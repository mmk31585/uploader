/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  useAuthApi,
  type AuthTokenProps,
  type LoggedInUserProps,
  type LoginPlayload,
} from '@/services/api'
import { safeLocalStorage } from '@/services/storage'
import { defineStore } from 'pinia'
import Cookies from 'js-cookie'
import { ref } from 'vue'
import type { UseRequestConfig } from '@/plugins/client/types'
function createSafeNamespace<T>(key: string) {
  return {
    get: (): T | string | null => safeLocalStorage.getItem<T>(key),
    set: (value: T): void => safeLocalStorage.setItem<T>(key, value),
    remove: (): void => safeLocalStorage.removeItem(key),
  }
}
export const useUserAuthStore = defineStore('useUserAuth', () => {
  const cookieName = 'auth_cookie'
  const tokenStorage = createSafeNamespace('user_auth')
  const tokenCookieName = 'token_cookie'
  const storage = createSafeNamespace('user_auth')
  const deviceCookieName = 'token_cookie'
  const deviceStorage = createSafeNamespace('device_id')
  const state = ref(tokenStorage.get() as AuthTokenProps | null)
  const user = ref(storage.get() as LoggedInUserProps | null)
  function persistToken(data: AuthTokenProps) {
    tokenStorage.set(data)
    Cookies.set(tokenCookieName, JSON.stringify(data), { secure: true, sameSite: 'lax' })
  }
  function persistUser(data: LoggedInUserProps) {
    storage.set(data)
    Cookies.set(cookieName, JSON.stringify(data), { secure: true, sameSite: 'lax' })
  }
  function persistdeviceId(deviceId: string) {
    deviceStorage.set(deviceId)
    Cookies.set(deviceCookieName, JSON.stringify(deviceId), { secure: true, sameSite: 'lax' })
  }
  function clearToken() {
    tokenStorage.remove()
    Cookies.remove(tokenCookieName)
  }
  function clearUser() {
    user.value = null
    state.value = null
  }
  async function login(payload: LoginPlayload): Promise<LoggedInUserProps> {
    const tokenResponse = await useAuthApi().login(payload)
    const token = tokenResponse || null
    if (!token) throw new Error('Login failed: no access token received')
    state.value = token
    persistToken(token)

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

  function $reset(): void {
    clearToken()
    clearUser()
  }
})
