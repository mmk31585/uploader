<script setup lang="ts">
import SpeedDial from 'primevue/speeddial'
import type { SpeedDialProps } from './types'
import { computed } from 'vue'
import type { MenuItem } from 'primevue/menuitem'
import { cn } from '@/utils'

const props = withDefaults(defineProps<SpeedDialProps>(), {
  direction: 'up',
  mask: false,
})
const defaultItems: MenuItem[] = [
  {
    label: 'Add',
    icon: 'pi pi-pencil',
    command: () => {
      console.log('Add clicked')
    },
  },
  {
    label: 'Update',
    icon: 'pi pi-refresh',
    command: () => {
      console.log('Update clicked')
    },
  },
  {
    label: 'Delete',
    icon: 'pi pi-trash',
    command: () => {
      console.log('Delete clicked')
    },
  },
  {
    label: 'Upload',
    icon: 'pi pi-upload',
    command: () => {
      console.log('Upload clicked')
    },
  },
]
const ptProp = computed(() => {
  const root = props.className?.root ?? undefined
  // const iconCls = props.className?.icon ?? undefined;

  return {
    root: cn(root),
    // icon: cn(iconCls)
  }
})
const model = computed(() => {
  return props.items && props.items.length ? props.items : defaultItems
})
</script>

<template>
  <SpeedDial :model="model" :direction="direction" :mask="mask" :pt="ptProp" />
</template>
