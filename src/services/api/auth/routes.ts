import {
  type AuthTokenProps,
  AuthTokenSchema,
  type CaptchaProps,
  CaptchaSchema,
  type LoggedInUserProps,
  LoggedInUserSchema,
  type LoginPayload,
  type MaintenanceRequest,
  type MaintenanceResponse,
} from '@/services/api'
import type { UseRequestConfig } from '@/plugins/client/types.ts'
import { useRequest } from '@/composables'

export const useAuthApi = () => {
  return {
    captcha: (config: UseRequestConfig<CaptchaProps> = {}): Promise<CaptchaProps> => {
      return useRequest<CaptchaProps>('/api/captcha', {}, { ...config, schema: CaptchaSchema })
    },

    login: (
      payload: LoginPayload,
      config: UseRequestConfig<AuthTokenProps> = {},
    ): Promise<AuthTokenProps> => {
      return useRequest<AuthTokenProps>(
        '/api/auth/login',
        {
          method: 'POST',
          data: payload,
        },
        { ...config, schema: AuthTokenSchema },
      )
    },

    logout: (config: UseRequestConfig<void> = {}): Promise<void> => {
      return useRequest<void>(
        '/api/auth/logout',
        {
          method: 'POST',
        },
        config,
      )
    },

    refreshToken: (config: UseRequestConfig<AuthTokenProps> = {}): Promise<AuthTokenProps> => {
      return useRequest<AuthTokenProps>('/api/auth/refresh', {}, { ...config, silent: true })
    },

    me: (config: UseRequestConfig<LoggedInUserProps> = {}): Promise<LoggedInUserProps> => {
      return useRequest<LoggedInUserProps>(
        '/api/auth/me',
        {},
        { ...config, schema: LoggedInUserSchema },
      )
    },

    maintenance: (
      payload: MaintenanceRequest,
      config: UseRequestConfig<MaintenanceResponse> = {},
    ): Promise<MaintenanceResponse> => {
      return useRequest<MaintenanceResponse>(
        '/api/maintenance',
        {
          method: 'POST',
          data: payload,
        },
        {
          ...config,
          silent: true,
        },
      )
    },
  }
}
