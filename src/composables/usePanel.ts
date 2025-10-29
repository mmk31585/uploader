import type { BeforeToggleContext, PanelRootProps } from '@/components/base/panel/types'
import { computed, ref, watch } from 'vue'

export function usePanel(props: PanelRootProps, emit: (e: string, ...a: boolean[]) => void) {
  const uncontrolled = ref(props.defaultOpen ?? true)
  const isControlled = computed(() => props.modelValue !== undefined)

  const open = computed<boolean>({
    get: () => (isControlled.value ? !!props.modelValue : uncontrolled.value),
    set: (v) => {
      if (isControlled.value) emit('update:modelValue', v)
      else uncontrolled.value = v

      emit('toggle', v)
      if (v) emit('open')
      else emit('close')
    },
  })

  async function setOpen(next: boolean, isUser = false) {
    if (props.disabled || !props.collapsible) return
    if (next === open.value) return
    if (props.beforeToggle) {
      const ctx: BeforeToggleContext = { toOpen: next, current: open.value, isUser }
      const ok = await props.beforeToggle(ctx)
      if (!ok) return
    }
    open.value = next
  }

  function toggle(isUser = false) {
    setOpen(!open.value, isUser)
  }

  watch(
    () => props.modelValue,
    (v) => {
      if (isControlled.value && typeof v === 'boolean' && v !== open.value) open.value = v
    },
  )

  return { open, toggle, setOpen }
}

export function usePanelId(seed?: string) {
  return seed ?? `panel-${Math.random().toString(36).slice(2, 9)}`
}
