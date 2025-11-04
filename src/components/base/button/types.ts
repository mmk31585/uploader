import type { Component, FunctionalComponent, HTMLAttributes } from 'vue'
import type { MenuItem } from 'primevue/menuitem'

export interface ButtonRootProps {
  label?: string
  icon?: string | FunctionalComponent | Component
  badgeSeverity?: Severity
  loading?: boolean
  severity?: Severity
  rounded?: boolean
  text?: boolean
  variant?: Variant
  disabled?: boolean
  shadow?: boolean
  className?: ClassVariable
}
export interface ButtonProps extends ButtonRootProps {
  badge?: string | undefined
}
export type ButtonItem =
  | Component
  | {
      component?: Component
      props?: Partial<ButtonRootProps>
    }

export interface GroupButtonProps {
  items?: ButtonItem[]
}
export interface SpeedDialProps {
  className?: ClassVariable
  items?: MenuItem[]
  direction?: 'up' | 'down'
  mask: boolean
}
// export interface SplitButtonProps extends ButtonRootProps {}
export type Type = 'default' | 'groupBtn' | 'splitBtn' | 'speedDial'
export type Variant = 'outlined' | 'text' | 'link'
export type Severity = '' | 'secondary' | 'info' | 'success' | 'warn' | 'danger' | 'contrast'
export interface ClassVariable {
  root?: HTMLAttributes['class']
  icon?: HTMLAttributes['class']
}
