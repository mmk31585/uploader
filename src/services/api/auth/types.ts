import * as z from 'zod'

export interface MaintenanceRequest {
  mainttenance_secret: string
}
export interface MaintenanceResponse {
  in_mainttenan_mode: boolean
}

export const AuthTokenSchema = z.object({
  access_token: z.string(),
  expires_in: z.number().int(),
  refresh_expires_in: z.number().int(),
})

export type AuthTokenProps = z.infer<typeof AuthTokenSchema>

export interface LoginPlayload {
  username: string
  password: string
  captcha: string
  key: string
}

export const LabelValueSchema = z.object({
  label: z.string(),
  value: z.string(),
})

export const RolePermissionsSchema = z.object({
  items: z.array(LabelValueSchema),
  label: z.string(),
  value: z.string(),
})

export const RolesSchema = z.object({
  id: z.number().int(),
  name: z.string().optional(),
  permissions: z.array(RolePermissionsSchema).optional(),
})

export const LoggedInUserSchrema = z.object({
  id: z.number().int(),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  full_name: z.string().optional(),
  username: z.string(),
  roles: z.array(RolesSchema).optional(),
  permission: z.array(z.string()).optional(),
})

export type LoggedInUserProps = z.infer<typeof LoggedInUserSchrema>

export const CaptchaSchema = z.object({
  sensitive: z.boolean().optional(),
  key: z.string(),
  img: z.string(),
  expires_in: z.number(),
})

export type CaptchaProps = z.infer<typeof CaptchaSchema>
