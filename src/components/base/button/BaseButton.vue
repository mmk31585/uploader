<script setup lang="ts">
import Button from 'primevue/button'
import type { ButtonProps } from './types.ts'
// import { cn } from '@/utils'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = withDefaults(defineProps<ButtonProps>(), {
  label: '',
  disabled: false,
  severity: '',
  loading: false,
  icon: '',
  shadow: true,
  rounded: false,
  text: false,
  variant: undefined,
  badge: undefined,
  className: undefined,
})
</script>

<template>
  <Button
    v-bind="$attrs"
    :label="label"
    :disabled="disabled"
    :loading="loading"
    :severity="severity"
    :raised="shadow"
    :rounded="rounded"
    :text="text"
    :variant="variant"
    :badge="badge"
    :pt="{
      root: className.root,
      icon: className.icon,
      label: className.label,
    }"
  >
    <template #icon="{ class: iconClass }">
      <slot name="icon" :class="iconClass">
        <component
          v-if="icon && typeof icon !== 'string'"
          :is="icon"
          :class="iconClass || className?.icon"
        />
        <span v-else-if="icon" :class="[iconClass, icon, className?.icon]" />
      </slot>
    </template>
  </Button>
</template>
