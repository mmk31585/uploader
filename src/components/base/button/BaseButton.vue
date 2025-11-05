<script setup lang="ts">
import Button from 'primevue/button'
import type { ButtonProps } from '@/components/base/button/types.ts'
import { cn } from '@/utils'
import { computed } from 'vue'
const props = withDefaults(defineProps<ButtonProps>(), {
  label: 'Button',
  disabled: false,
  severity: '',
  loading: false,
  icon: '',
  shadow: true,
  rounded: false,
  text: false,
  variant: 'outlined',
  badge: undefined,
  className: undefined,
})
const ptProp = computed(() => {
  const root = props.className?.root ?? undefined
  const iconCls = props.className?.icon ?? undefined

  return {
    root: cn(root),
    icon: cn(iconCls),
  }
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
    :pt="ptProp"
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
