import type { HTMLAttributes } from 'vue'

export type Radius = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
export type Shadow = false | 'sm' | 'md' | 'lg'

export interface BeforeToggleContext {
  to: boolean
}
export interface ClassVariable {
  root?: HTMLAttributes['class']
  header?: HTMLAttributes['class']
  title?: HTMLAttributes['class']
  headerActions?: HTMLAttributes['class']
  toggleButton?: HTMLAttributes['class']
  contentContainer?: HTMLAttributes['class']
  content?: HTMLAttributes['class']
  footer?: HTMLAttributes['class']
}

export interface PanelRootProps {
  defaultOpen?: boolean
  collapsed?: boolean
  collapsible?: boolean
  disabled?: boolean
  radius?: Radius
  shadow?: Shadow
  stickyHeader?: boolean
  stickyFooter?: boolean
  classNames?: ClassVariable
  headerDivider?: boolean
  header?: string
}
