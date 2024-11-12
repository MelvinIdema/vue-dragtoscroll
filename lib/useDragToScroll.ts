import type { MaybeRefOrGetter } from 'vue-demi'
import { onMounted, onUnmounted, computed, ref, toValue, getCurrentInstance, watchEffect } from 'vue-demi'

export interface useDragScrollOptions {
  /**
   * Whether to prevent events defauls on the target element.
   *
   * @default false
   */
  preventDefault?: boolean

  /**
   * Whether to stop events propagation on the target element.
   *
   * @default false
   */
  stopPropagation?: boolean

  /**
   * Whether to dispatch events in capturing phase.
   *
   * @default true
   */
  capture?: boolean

  /**
   * Velocity multiplier.
   *
   * @default 10
   */
  velocityMultiplier?: number

  /**
   * Friction.
   *
   * @default 0.95
   */
  friction?: number

  /**
   * Callback when the dragging starts.
   */
  onStart?: (event: PointerEvent) => void

  /**
   * Callback during dragging.
   */
  onMove?: (event: PointerEvent) => void

  /**
   * Callback when dragging end.
   */
  onEnd?: (event: PointerEvent) => void
}

/**
 * Enables scroll on drag.
 *
 * @param target
 * @param options
 */
export function useDragToScroll(
  target: MaybeRefOrGetter<HTMLElement | null | undefined>,
  options: useDragScrollOptions = {},
) {
  const {
    preventDefault = false,
    stopPropagation = false,
    capture = true,
    velocityMultiplier = 10,
    friction = 0.95,
    onStart,
    onMove,
    onEnd,
  } = options
  const isClient = typeof window !== 'undefined'
  const eventListenerConfig = { capture: capture ?? true }

  const position = ref({ top: 0, left: 0, x: 0, y: 0 })

  const positions: { x: number, y: number, time: number }[] = []
  const velocity = {
    x: 0,
    y: 0,
  }
  let animationFrameId: number | null = null
  const isDragging = ref(false)

  const styling = {
    _default: {
      cursor: 'grab',
      overflow: 'auto',
      scrollBehavior: 'auto',
      touchAction: 'none',
    },
    _grabbing: {
      cursor: 'grabbing',
      userSelect: 'none',
    },
    init() {
      const scrollContainer = toValue(target)
      if (scrollContainer) {
        scrollContainer.style.cursor = styling._default.cursor
        scrollContainer.style.overflow = styling._default.overflow
        scrollContainer.style.scrollBehavior = styling._default.scrollBehavior
        scrollContainer.style.touchAction = styling._default.touchAction
      }
    },
    release() {
      const scrollContainer = toValue(target)
      if (scrollContainer) {
        scrollContainer.style.cursor = styling._default.cursor
        scrollContainer.style.removeProperty('user-select')
      }
    },
    grab() {
      const scrollContainer = toValue(target)
      if (scrollContainer) {
        scrollContainer.style.cursor = styling._grabbing.cursor
        scrollContainer.style.userSelect = styling._grabbing.userSelect
      }
    },
    remove() {
      const scrollContainer = toValue(target)
      if (scrollContainer) {
        scrollContainer.style.removeProperty('cursor')
        scrollContainer.style.removeProperty('overflow')
        scrollContainer.style.removeProperty('scroll-behavior')
        scrollContainer.style.removeProperty('touch-action')
      }
    },
  }

  const handleEvent = (event: PointerEvent) => {
    if (toValue(preventDefault))
      event.preventDefault()
    if (toValue(stopPropagation))
      event.stopPropagation()
  }

  const move = (event: PointerEvent) => {
    isDragging.value = true
    const { x, y, top, left } = position.value
    const deltaX = event.clientX - x
    const deltaY = event.clientY - y
    const scrollContainer = toValue(target)
    if (scrollContainer) {
      scrollContainer.scrollTop = top - deltaY
      scrollContainer.scrollLeft = left - deltaX
    }
    positions.push({ x: event.clientX, y: event.clientY, time: event.timeStamp })
    if (positions.length > 5)
      positions.shift()
    onMove?.(event)
    handleEvent(event)
  }

  const animate = () => {
    if (Math.abs(velocity.x) > 0.01 || Math.abs(velocity.y) > 0.01) {
      const frict = toValue(friction)
      velocity.x *= frict
      velocity.y *= frict
      const scrollContainer = toValue(target)
      if (scrollContainer) {
        scrollContainer.scrollLeft -= velocity.x
        scrollContainer.scrollTop -= velocity.y
      }
      animationFrameId = requestAnimationFrame(animate)
    }
    else {
      cancelAnimationFrame(animationFrameId!)
    }
  }

  const end = (event: PointerEvent) => {
    window?.removeEventListener('pointermove', move, eventListenerConfig)
    window?.removeEventListener('pointerup', end, eventListenerConfig)
    styling.release()

    const len = positions.length
    if (len >= 2) {
      const lastPos = positions[len - 1]
      const prevPos = positions[len - 2]
      const deltaX = lastPos.x - prevPos.x
      const deltaY = lastPos.y - prevPos.y
      const deltaTime = lastPos.time - prevPos.time
      if (deltaTime !== 0) {
        const multiplier = toValue(velocityMultiplier)
        velocity.x = (deltaX / deltaTime) * multiplier
        velocity.y = (deltaY / deltaTime) * multiplier
      }
      animate()
      onEnd?.(event)
    }

    positions.length = 0
    handleEvent(event)
  }

  const start = (event: PointerEvent) => {
    isDragging.value = false
    const scrollContainer = toValue(target)
    position.value = {
      top: scrollContainer ? scrollContainer.scrollTop : 0,
      left: scrollContainer ? scrollContainer.scrollLeft : 0,
      x: event.clientX,
      y: event.clientY,
    }
    window?.addEventListener('pointermove', move, eventListenerConfig)
    window?.addEventListener('pointerup', end, eventListenerConfig)
    styling.grab()
    onStart?.(event)
    handleEvent(event)
  }

  const setup = () => {
    if (isClient) {
      styling.init()
      const scrollContainer = toValue(target)
      scrollContainer?.addEventListener('pointerdown', start, eventListenerConfig)
    }
  }

  const cleanup = () => {
    styling.remove()
    if (animationFrameId !== null) {
      cancelAnimationFrame(animationFrameId)
    }
    const scrollContainer = toValue(target)
    scrollContainer?.removeEventListener('pointerdown', start, eventListenerConfig)
  }

  watchEffect(() => {
    if (toValue(target) !== null) {
      cleanup()
      setup();
    }
  })

  return { isDragging: computed(() => isDragging.value), setup, cleanup }
}