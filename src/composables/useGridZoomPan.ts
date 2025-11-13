import { ref, type Ref, computed, watch } from 'vue'
import { useEventListener, useKeyModifier, useMouseInElement } from '@vueuse/core'

type Opts = {
  baseMin?: number
  minScale?: number
  maxScale?: number
  wheelFactor?: number
  step?: number
}
type Pivot = 'center' | 'mouse' | { x: number; y: number }

export function useGridZoomPan(
  scroller: Ref<HTMLElement | null>,
  grid: Ref<HTMLElement | null>,
  opts: Opts = {},
) {
  const baseMin = opts.baseMin ?? 250
  const minScaleProp = opts.minScale ?? 1
  const maxScaleProp = opts.maxScale ?? 4.5
  const wheelFactor = opts.wheelFactor ?? 0.0015
  const step = opts.step ?? 0.1

  const scale = ref(1)
  const ctrl = useKeyModifier('Control')
  const { elementX, elementY } = useMouseInElement(scroller)

  const applySize = () => grid.value?.style.setProperty('--col-min', `${baseMin * scale.value}px`)
  const clamp = (v: number) => Math.min(maxScaleProp, Math.max(minScaleProp, v))

  const getPivotXY = (pivot?: Pivot) => {
    const el = scroller.value
    if (!el) return { sx: 0, sy: 0 }
    if (pivot === 'mouse') return { sx: elementX.value, sy: elementY.value }
    if (pivot && typeof pivot === 'object') return { sx: pivot.x, sy: pivot.y }
    return { sx: el.clientWidth / 2, sy: el.clientHeight / 2 } // center
  }

  const zoomAt = (sx: number, sy: number, next: number) => {
    const el = scroller.value
    if (!el) return
    const old = scale.value
    const clamped = clamp(next)
    if (clamped === old) return
    scale.value = clamped
    applySize()
    const r = scale.value / old
    el.scrollLeft = (el.scrollLeft + sx) * r - sx
    el.scrollTop = (el.scrollTop + sy) * r - sy
  }

  // ★ متدی که خواستی: افزایش/کاهش پله‌ایِ «ضربی»
  // deltaSteps: تعداد پله‌ها (+1 یعنی بزرگ‌نمایی، -1 یعنی کوچک‌نمایی)
  // pivot: 'center' | 'mouse' | {x,y}
  const applyScale = (deltaSteps = 1, pivot: Pivot = 'center') => {
    const { sx, sy } = getPivotXY(pivot)
    const factor = Math.pow(1 + step, deltaSteps)
    const next = scale.value * factor
    zoomAt(sx, sy, next)
  }

  useEventListener(
    scroller,
    'wheel',
    (e: WheelEvent) => {
      if (!e.ctrlKey) return
      e.preventDefault()
      // همچنان نرمِ نمایی با محور موس:
      const { sx, sy } = getPivotXY('mouse')
      const next = scale.value * Math.exp(-e.deltaY * wheelFactor)
      zoomAt(sx, sy, next)
    },
    { passive: false },
  )

  useEventListener(window, 'keydown', (e: KeyboardEvent) => {
    if (!e.ctrlKey) return
    if (e.key === '0') {
      e.preventDefault()
      const { sx, sy } = getPivotXY('center')
      zoomAt(sx, sy, 1)
    } else if (e.key === '+' || e.key === '=') {
      e.preventDefault()
      applyScale(+1, 'center')
    } else if (e.key === '-' || e.key === '_') {
      e.preventDefault()
      applyScale(-1, 'center')
    }
  })

  // Middle-click pan
  let panning = false
  let startX = 0,
    startY = 0,
    startSL = 0,
    startST = 0

  useEventListener(scroller, 'mousedown', (e: MouseEvent) => {
    if (e.button !== 1) return
    e.preventDefault()
    const el = scroller.value
    if (!el) return
    panning = true
    startX = e.clientX
    startY = e.clientY
    startSL = el.scrollLeft
    startST = el.scrollTop
    el.style.cursor = 'grabbing'
  })

  useEventListener(
    window,
    'mousemove',
    (e: MouseEvent) => {
      if (!panning) return
      const el = scroller.value
      if (!el) return
      el.scrollLeft = startSL - (e.clientX - startX)
      el.scrollTop = startST - (e.clientY - startY)
    },
    { passive: true },
  )

  useEventListener(window, 'mouseup', () => {
    if (!panning) return
    panning = false
    const el = scroller.value
    if (el) el.style.cursor = ''
  })

  const setScale = (v: number, pivot: Pivot = 'center') => {
    const { sx, sy } = getPivotXY(pivot)
    zoomAt(sx, sy, v)
  }
  const reset = () => setScale(1, 'center')

  const scaleModel = computed<number>({
    get: () => scale.value,
    set: (v) => setScale(v, 'center'),
  })

  watch([grid, scroller], () => applySize(), { immediate: true })

  applySize()
  return {
    scale,
    scaleModel,
    ctrl,
    setScale,
    reset,
    applyScale, // ★ بیرون در دسترسه
    minScaleProp,
    maxScaleProp,
    step,
  }
}
