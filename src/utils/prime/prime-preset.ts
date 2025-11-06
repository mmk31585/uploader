import { definePreset } from '@primeuix/themes'
import Aura from '@primeuix/themes/aura'

export const IndigoPreset = definePreset(Aura, {
  semantic: {
    primary: {
      100: 'var(--tw-color-primary-tint-01)',
      200: 'var(--tw-color-primary-tint-02)',
      300: 'var(--tw-color-primary-tint-03)',
      400: 'var(--tw-color-primary-tint-04)',
      500: 'var(--tw-color-primary-main)',
      600: 'var(--tw-color-primary-shade-01)',
      700: 'var(--tw-color-primary-shade-02)',
      800: 'var(--tw-color-primary-shade-03)',
      900: 'var(--tw-color-primary-shade-04)',
    },
    surface: {
      0: '#ffffff',
      50: 'var(--tw-color-neutral-gray-03)',
      100: 'var(--tw-color-neutral-gray-04)',
      200: 'var(--tw-color-neutral-gray-05)',
      300: 'var(--tw-color-neutral-gray-06)',
      400: 'var(--tw-color-neutral-gray-07)',
      500: 'var(--tw-color-neutral-gray-08)',
      600: 'var(--tw-color-neutral-gray-09)',
      700: 'var(--tw-color-neutral-gray-10)',
      800: 'var(--tw-color-neutral-gray-11)',
      900: 'var(--tw-color-neutral-gray-12)',
      950: 'var(--tw-color-neutral-gray-13)',
    },
  },
})
