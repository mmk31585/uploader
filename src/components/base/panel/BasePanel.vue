<script setup lang="ts">
import type { PanelRootProps } from './types'
import { computed } from 'vue'
import { radiusMap } from './classMap'
import { cn } from '@/utils'

const props = withDefaults(defineProps<PanelRootProps>(), {
  radius: 'xl',
  collapsible: false,
  defaultOpen: true,
  disabled: false,
  collapsed: false,
  stickyHeader: true,
  stickyFooter: false,
  headerDivider: true,
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

const rootClasses = ['tw:w-full tw:relative tw:bg-background tw:text-foreground ', radiusClass]

const headerClass = computed(() =>
  props.stickyHeader
    ? 'tw:sticky tw:top-0 tw:z-20 tw:bg-background! tw:bg-backdrop-blur-md ' + radiusClass
    : '',
)
const footerClass = computed(() => (props.stickyFooter ? 'tw:sticky tw:bottom-0 tw:z-10' : ''))
</script>
<template>
  <Panel
    v-model:collapsed="collapsedProxy"
    :toggleable="canChangePanel()"
    @toggle="(evt) => emit('toggle', evt.value)"
    :pt="{
      root: cn(rootClasses, classNames?.root),
      header: cn('tw:flex tw:flex-col tw:w-full tw:items-start', headerClass, classNames?.header),
      title: cn(classNames?.title),
      headerActions: cn(classNames?.headerActions),
      pcToggleButton: cn(classNames?.toggleButton),
      contentContainer: cn(
        'tw:flex tw:flex-col tw:gap-4 tw:flex-1 tw:overflow-y-auto',
        classNames?.contentContainer,
      ),
      content: cn(classNames?.content),
      footer: cn(footerClass, classNames?.footer),
    }"
  >
    <template #header="{ collapsed: isCollapsed }">
      <slot name="header" :open="!isCollapsed" />
      <Divider v-if="headerDivider" class="tw:mb-0" />
      <div v-if="$slots.subheader" class="tw:mt-3 tw:w-full">
        <slot name="subheader" />
      </div>
    </template>

    <template #icons>
      <slot name="icons" />
    </template>

    <template #default v-if="$slots.content">
      <slot name="content" />
    </template>

    <template #footer v-if="$slots.footer">
      <slot name="footer" />
    </template>
  </Panel>
</template>
