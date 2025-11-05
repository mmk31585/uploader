<script setup lang="ts">
import SpeedDial from 'primevue/speeddial'
import type { SpeedDialProps } from './types'
import { computed } from 'vue'
import { cn } from '@/utils'

const props = withDefaults(defineProps<SpeedDialProps>(), {
  direction: 'up',
  mask: false,
  tooltipShow: true,
  tooltipEvent: 'hover',
})

const ptProp = computed(() => {
  const root = props.className?.root ?? undefined

  return {
    root: cn(root),
  }
})
const model = computed(() => {
  return props.items
})

const tpPosition = computed(() => {
  if (!props.tooltipShow) return undefined
  if (!props.tooltipPosition) return 'right'
  return props.tooltipPosition
})
</script>

<template>
  <SpeedDial
    :model="model"
    :direction="direction"
    :mask="mask"
    :pt="ptProp"
    :tooltipOptions="{
      event: tooltipEvent,
      position: tpPosition,
    }"
  />
</template>
