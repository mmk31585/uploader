import type { Component, FunctionalComponent, HTMLAttributes } from 'vue'
import type { MenuItem } from 'primevue/menuitem'

export type Direction = 'up' | 'down' | 'left' | 'right'
export type Position = 'top' | 'bottom' | 'left' | 'right'
export type Variant = 'outlined' | 'text' | 'link' | undefined
export type Severity = '' | 'secondary' | 'info' | 'success' | 'warn' | 'danger' | 'contrast'
export interface ClassVariable {
  root?: HTMLAttributes['class']
  icon?: HTMLAttributes['class']
}

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
  direction?: Direction
  mask?: boolean
  tooltipShow?: boolean
  tooltipPosition?: Position
  tooltipEvent?: 'hover' | 'focus'
}
// export interface SplitButtonProps extends ButtonRootProps {}
