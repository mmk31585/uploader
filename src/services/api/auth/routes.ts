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
import { CaptchaSchema, type CaptchaProps } from './types'

export const useAuthApi = () => {
  return {
    capthca: (config: UseRequestConfig<CaptchaProps> = {}): Promise<CaptchaProps> => {
      return useRequest<CaptchaProps>('/api/captcha', {}, { ...config, schema: CaptchaSchema })
    },
  }
}
