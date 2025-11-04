<script setup lang="ts">
import type { PanelRootProps } from './types'
import { computed } from 'vue'
import { radiusMap } from './classMap'
import { cn } from '@/utils'

const props = withDefaults(defineProps<PanelRootProps>(), {
  radius: 'md',
  collapsible: false,
  defaultOpen: true,
  disabled: false,
  collapsed: false,
  stickyHeader: false,
  stickyFooter: false,
})

const emit = defineEmits<{
  (e: 'update:collapsed', v: boolean): void
  (e: 'toggle', v: boolean): void
  (e: 'open'): void
  (e: 'close'): void
}>()

const collapsedProxy = computed<boolean>({
  get: () => props.collapsed,
  set: async (v) => {
    emit('update:collapsed', v)

    if (!v) emit('open')
    else emit('close')
  },
})

function canChangePanel(): boolean {
  return !props.disabled && !!props.collapsible
}

const radiusClass = radiusMap[props.radius]

const rootClasses = cn('tw:w-full tw:relative tw:bg-background', radiusClass)

const headerClass = computed(() => (props.stickyHeader ? 'tw:sticky tw:top-0  tw:z-20' : ''))
const footerClass = computed(() => (props.stickyFooter ? 'tw:sticky tw:bottom-0 tw:z-10' : ''))
</script>
<template>
  <Panel
    v-model:collapsed="collapsedProxy"
    :toggleable="canChangePanel()"
    @toggle="(evt) => emit('toggle', evt.value)"
    :class="rootClasses"
    :pt="{
      root: cn(classNames?.root),
      header: cn(headerClass, classNames?.header),
      title: cn(classNames?.root),
      headerActions: cn(classNames?.root),
      pcToggleButton: cn(classNames?.root),
      contentContainer: cn(classNames?.root),
      content: cn(classNames?.root),
      footer: cn(footerClass, classNames?.root),
    }"
  >
    <template #header="{ collapsed: isCollapsed }">
      <slot name="header" :open="!isCollapsed" />
    </template>

    <template #icons>
      <slot name="icons" />
    </template>

    <template #default>
      <div class="tw:flex tw:flex-col tw:gap-3">
        <div v-if="$slots.subheader" class="tw:-mt-1">
          <slot name="subheader" />
          <div class="tw:border-t tw:border-border tw:mt-2"></div>
        </div>
      </div>
    </template>

    <template #footer>
      <slot name="footer" />
    </template>
  </Panel>
</template>
