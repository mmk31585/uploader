// import{
//   type MaintenanceRequest,
//   type MaintenanceResponse,
//   type AuthTokenProps,
//   type LoginPlayload,
//   type LoggedInUserProps,
//   type CaptchaProps,
//   AuthTokenSchema,
//   CaptchaSchema,
//   LoggedInUserSchrema
// } from '@/services/api'

import type { UseRequestConfig } from '@/plugins/client/types'
import { useRequest } from '@/composables'
import {
  AuthTokenSchema,
  CaptchaSchema,
  LoggedInUserSchrema,
  type AuthTokenProps,
  type CaptchaProps,
  type LoggedInUserProps,
  type LoginPlayload,
  type MaintenanceRequest,
  type MaintenanceResponse,
} from './types'

export const useAuthApi = () => {
  return {
    capthca: (config: UseRequestConfig<CaptchaProps> = {}): Promise<CaptchaProps> => {
      return useRequest<CaptchaProps>('/api/captcha', {}, { ...config, schema: CaptchaSchema })
    },
    login: (
      payload: LoginPlayload,
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
    me: (config: UseRequestConfig<LoggedInUserProps> = {}): Promise<LoggedInUserProps> => {
      return useRequest<LoggedInUserProps>(
        '/api/auth/me',
        {},
        { ...config, schema: LoggedInUserSchrema },
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
