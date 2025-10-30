export type Color = 'default' | 'primary' | 'info' | 'success' | 'warning' | 'danger'
export type Variant = 'solid' | 'soft' | 'outlined' | 'ghost'
export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type Radius = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
export type Shadow = false | 'sm' | 'md' | 'lg'

export interface BeforeToggleContext {
  toOpen: boolean
  current: boolean
  isUser: boolean
}

export interface PanelRootProps {
  modelValue?: boolean
  defaultOpen?: boolean
  collapsible?: boolean
  disabled?: boolean
  beforeToggle?: (ctx: BeforeToggleContext) => boolean | Promise<boolean>

  color?: Color
  variant?: Variant
  size?: Size
  radius?: Radius
  shadow?: Shadow
  bordered?: boolean
  padded?: boolean | number
  stickyHeader?: boolean
  stickyFooter?: boolean
  loading?: boolean
  as?: string
  id?: string
  class?: string
  style?: string
}
export interface PanelContext {
  open: boolean
  toggle: (isUser?: boolean) => void
  setOpen: (v: boolean, isUser?: boolean) => void
  id: string
}
