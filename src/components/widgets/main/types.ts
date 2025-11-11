export interface CardProps {
  imageUrl: string
  imageAlt?: string
  imagePreview?: boolean
  chips?: ChipCfg[]
  typeLabel?: string
  typeValue: string
  categoryLabel?: string
  categoryValue?: string
  actions?: ActionCfg[]
}

type ChipCfg = { label: string; icon?: string }
type ActionCfg = {
  label?: string
  icon?: string
  severity?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'help' | 'danger'
  variant?: 'outlined' | 'text' | 'link' | 'standard'
  onClick?: () => void
}
