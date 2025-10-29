export type ColorScheme = 'default' | 'primary' | 'info' | 'success' | 'warning' | 'danger'
export type Variant = 'solid' | 'soft' | 'outlined' | 'ghost'
export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type Radius = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
export type Elevation = false | 'sm' | 'md' | 'lg'

export interface BeforeToggleContext {
  toOpen: boolean
  current: boolean
  isUser: boolean
}

export interface PanelRootProps {
  modelValue?: boolean
  defaultOpen?: boolean
  collapsible?: boolean
  lazy?: boolean
  keepAlive?: boolean
  disabled?: boolean
  beforeToggle?: (ctx: BeforeToggleContext) => boolean | Promise<boolean>

  colorScheme?: ColorScheme
  Variant?: Variant
  size?: Size
  radius?: Radius
  elevation?: Elevation
  bordered?: boolean
  padded?: boolean | number
  gap?: number
  stickyHeader?: boolean
  stickySubheader?: boolean
  stickyFooter?: boolean
  loading?: boolean
  state?: 'idle' | 'loading' | 'empty' | 'error'

  as?: string
  id?: string
  class?: string
  style?: string
}

export type ToolbarVariant = Variant
export type ToolbarIntent = ColorScheme

export interface ToolbarAction {
  id: string
  label: string
  icon?: string
  intent?: ToolbarIntent
  variant?: ToolbarVariant
  disabled?: boolean
  tooltip?: string
}

export type FilterKind = 'text' | 'select' | 'date' | 'custom'
export interface FilterOption {
  label: string
  value: string | number | boolean
}

export interface ToolbarFilter {
  key: string
  label?: string
  kind: FilterKind
  placeholder?: string
  options?: FilterOption[]
}

export interface PanelContext {
  open: boolean
  toggle: (isUser?: boolean) => void
  setOpen: (v: boolean, isUser?: boolean) => void
  id: string
}
