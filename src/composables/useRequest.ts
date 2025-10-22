import { axiosClient, createRequestWrapper } from '@/plugins'
import type { RefreshToken } from '@/plugins/client/types'
import type { AxiosRequestConfig } from 'axios'

let router: unknown | null = null
let toast: unknown | null = null

export function registerRouter(r: unknown) {
  router = r
}

export function registerToast(t: unknown) {
  toast = t
}

/**
 * This MUST implement by real ui route, toast, store and storage
 */
const UIHooks = {
  // ---------------- Toast ----------------
  toast: {
    success(msg: string) {},
    error(msg: string) {},
    info(msg: string) {},
    warning(msg: string) {},
  },

  // ---------------- Maintenance ----------------
  getMaintenanceSecrets: () => null,

  // ---------------- Auth ----------------
  getAuthToken: () => null,
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
