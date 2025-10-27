/* eslint-disable @typescript-eslint/no-unused-vars */
import { axiosClient, createRequestWrapper } from '@/plugins'
import type { RefreshToken } from '@/plugins/client/types'
import { type Router } from 'vue-router'
import type { ToastServiceMethods } from 'primevue/toastservice'
import type { AxiosRequestConfig } from 'axios'
import { useMaintenace } from '@/composables/index'
import { useAuthApi } from '@/services/api'

let router: Router | null = null
let toast: ToastServiceMethods | null = null

export function registerRouter(r: Router) {
  router = r
}

export function registerToast(t: ToastServiceMethods) {
  toast = t
}
/**
 * This MUST implement by real ui route, toast, store and storage
 */
const UIHooks = {
  // ---------------- Toast ----------------
  toast: {
    success(msg: string) {
      toast?.add({ summary: msg, severity: 'success', life: 4000 })
    },
    error(msg: string) {
      toast?.add({ summary: msg, severity: 'error', life: 6000 })
    },
    info(msg: string) {
      toast?.add({ summary: msg, severity: 'info', life: 5000 })
    },
    warning(msg: string) {
      toast?.add({ summary: msg, severity: 'warn', life: 5000 })
    },
  },

  // ---------------- Maintenance ----------------
  getMaintenanceSecrets: () => {
    return useMaintenace().getSecret.value
  },

  // ---------------- Auth ----------------
  getAuthToken: () => {
    useAuthStore()
  },
  setAuthToken(token: string) {},
  clearAuthToken() {},
  resetAuthStore() {},
  async redirectToLogin() {},

  // ---------------- Refresh token ----------------
  async refreshToken(): Promise<RefreshToken> {
    return { access_token: 'temp' }
  },
  refreshTokenUrlRejecter(config: AxiosRequestConfig): boolean {
    return false
  },

  // ---------------- Extras ----------------
  extraHeaders(): Record<string, string> {
    return {}
  },
}

export const { useRequest, client } = createRequestWrapper(axiosClient, UIHooks)
