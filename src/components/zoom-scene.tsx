import { createContext, useContext, useCallback, useEffect, useRef, useState, type ReactNode } from "react"

interface ZoomSceneContextValue {
  progress: number
  activeIndex: number
  sectionCount: number
  isAnimating: boolean
  goTo: (index: number) => void
  goNext: () => void
  goPrev: () => void
}

const ZoomSceneContext = createContext<ZoomSceneContextValue | null>(null)

export function useZoomScene(): ZoomSceneContextValue {
  const ctx = useContext(ZoomSceneContext)
  if (!ctx) throw new Error("useZoomScene must be used within ZoomSceneProvider")
  return ctx
}

export function useZoomSceneOptional(): ZoomSceneContextValue | null {
  return useContext(ZoomSceneContext)
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

function findZoomScrollContainer(node: EventTarget | null): HTMLElement | null {
  let element = node as HTMLElement | null
  while (element && element !== document.body) {
    if (element.dataset.zoomScroll === "true") return element
    element = element.parentElement
  }
  return null
}

interface ZoomSceneProviderProps {
  sectionCount: number
  enabled: boolean
  children: ReactNode
}

export function ZoomSceneProvider({ sectionCount, enabled, children }: ZoomSceneProviderProps) {
  const [progress, setProgress] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const progressRef = useRef(0)
  const targetRef = useRef(0)
  const animFrameRef = useRef(0)
  const animatingRef = useRef(false)
  const touchStartYRef = useRef(0)
  const touchStartScrollTopRef = useRef(0)
  const touchScrollContainerRef = useRef<HTMLElement | null>(null)
  const lastNavRef = useRef(0)
  const wheelAccumRef = useRef(0)
  const wheelDirRef = useRef<0 | 1 | -1>(0)

  const maxIndex = sectionCount - 1

  const animateTo = useCallback(
    (target: number) => {
      const clamped = clamp(target, 0, maxIndex)
      targetRef.current = clamped

      const start = progressRef.current
      const distance = clamped - start
      if (Math.abs(distance) < 0.001) {
        progressRef.current = clamped
        setProgress(clamped)
        return
      }

      cancelAnimationFrame(animFrameRef.current)

      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      const duration = prefersReduced ? 280 : 1050

      animatingRef.current = true
      setIsAnimating(true)
      const startTime = performance.now()

      function tick(now: number) {
        const t = clamp((now - startTime) / duration, 0, 1)
        const eased = easeInOutCubic(t)
        const next = start + distance * eased
        progressRef.current = next
        setProgress(next)

        if (t < 1) {
          animFrameRef.current = requestAnimationFrame(tick)
          return
        }

        progressRef.current = clamped
        setProgress(clamped)
        animatingRef.current = false
        setIsAnimating(false)
        wheelAccumRef.current = 0
        wheelDirRef.current = 0
      }

      animFrameRef.current = requestAnimationFrame(tick)
    },
    [maxIndex]
  )

  const goTo = useCallback(
    (index: number) => {
      const now = Date.now()
      if (now - lastNavRef.current < 520) return
      lastNavRef.current = now
      animateTo(index)
    },
    [animateTo]
  )

  const goNext = useCallback(() => {
    const snapped = Math.round(progressRef.current)
    const base = Math.abs(progressRef.current - snapped) < 0.08 ? snapped : Math.floor(progressRef.current + 0.001)
    const next = clamp(base + 1, 0, maxIndex)
    if (next === base && progressRef.current >= maxIndex - 0.01) return
    goTo(next)
  }, [goTo, maxIndex])

  const goPrev = useCallback(() => {
    const snapped = Math.round(progressRef.current)
    const base = Math.abs(progressRef.current - snapped) < 0.08 ? snapped : Math.ceil(progressRef.current - 0.001)
    const prev = clamp(base - 1, 0, maxIndex)
    if (prev === base && progressRef.current <= 0.01) return
    goTo(prev)
  }, [goTo, maxIndex])

  useEffect(() => {
    document.documentElement.style.setProperty("--zoom-progress", String(progress))
  }, [progress])

  useEffect(() => {
    if (!enabled) return

    document.body.classList.add("zoom-scene-active")

    const onWheel = (e: WheelEvent) => {
      e.preventDefault()

      const dir: 1 | -1 = e.deltaY > 0 ? 1 : -1
      if (wheelDirRef.current !== 0 && wheelDirRef.current !== dir) {
        wheelAccumRef.current = 0
      }
      wheelDirRef.current = dir
      wheelAccumRef.current += e.deltaY

      const threshold = 72
      if (Math.abs(wheelAccumRef.current) < threshold) return

      if (animatingRef.current) {
        wheelAccumRef.current = 0
        return
      }

      if (wheelAccumRef.current > 0) goNext()
      else goPrev()

      wheelAccumRef.current = 0
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ") {
        e.preventDefault()
        goNext()
      }
      if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault()
        goPrev()
      }
      if (e.key === "Home") goTo(0)
      if (e.key === "End") goTo(maxIndex)
    }

    const onTouchStart = (e: TouchEvent) => {
      touchStartYRef.current = e.touches[0]?.clientY ?? 0
      touchScrollContainerRef.current = findZoomScrollContainer(e.target)
      touchStartScrollTopRef.current = touchScrollContainerRef.current?.scrollTop ?? 0
    }

    const onTouchEnd = (e: TouchEvent) => {
      if (animatingRef.current) return
      const endY = e.changedTouches[0]?.clientY ?? 0
      const delta = touchStartYRef.current - endY
      if (Math.abs(delta) < 56) return

      const scrollable = touchScrollContainerRef.current
      if (scrollable) {
        const maxScroll = scrollable.scrollHeight - scrollable.clientHeight
        if (maxScroll > 4) {
          if (Math.abs(scrollable.scrollTop - touchStartScrollTopRef.current) > 8) return

          const atTop = scrollable.scrollTop <= 2
          const atBottom = scrollable.scrollTop >= maxScroll - 2
          if (delta > 0 && !atBottom) return
          if (delta < 0 && !atTop) return
        }
      }

      if (delta > 0) goNext()
      else goPrev()
    }

    window.addEventListener("wheel", onWheel, { passive: false })
    window.addEventListener("keydown", onKeyDown)
    window.addEventListener("touchstart", onTouchStart, { passive: true })
    window.addEventListener("touchend", onTouchEnd, { passive: true })

    return () => {
      document.body.classList.remove("zoom-scene-active")
      cancelAnimationFrame(animFrameRef.current)
      window.removeEventListener("wheel", onWheel)
      window.removeEventListener("keydown", onKeyDown)
      window.removeEventListener("touchstart", onTouchStart)
      window.removeEventListener("touchend", onTouchEnd)
    }
  }, [enabled, goNext, goPrev, goTo, maxIndex])

  const activeIndex = Math.round(progress)

  return (
    <ZoomSceneContext.Provider
      value={{
        progress,
        activeIndex,
        sectionCount,
        isAnimating,
        goTo,
        goNext,
        goPrev,
      }}
    >
      {children}
    </ZoomSceneContext.Provider>
  )
}

export function getZoomSectionStyle(index: number, progress: number) {
  const delta = index - progress
  const abs = Math.abs(delta)
  const isMobile =
    typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches

  if (isMobile) {
    if (abs > 0.52) {
      return {
        transform: `translate3d(0, ${delta > 0 ? "12%" : "-12%"}, 0)`,
        opacity: 0,
        filter: "none",
        pointerEvents: "none" as const,
        zIndex: 100 - Math.round(abs * 10),
      }
    }

    const t = abs / 0.52
    const translateY = delta * 6
    const opacity = Math.max(0, 1 - t * 1.65)
    const pointerEvents = abs < 0.42 ? ("auto" as const) : ("none" as const)

    return {
      transform: `translate3d(0, ${translateY}%, 0)`,
      opacity,
      filter: "none",
      pointerEvents,
      zIndex: 100 - Math.round(abs * 10),
    }
  }

  if (abs > 0.52) {
    return {
      transform: `translate3d(0, 0, ${delta > 0 ? -1100 : 320}px) scale(${delta > 0 ? 0.78 : 1.5})`,
      opacity: 0,
      filter: "none",
      pointerEvents: "none" as const,
      zIndex: 100 - Math.round(abs * 10),
    }
  }

  const t = abs / 0.52
  const scale = 1 - t * 0.12
  const translateZ = -delta * 820
  const opacity = Math.max(0, 1 - t * 1.65)
  const pointerEvents = abs < 0.42 ? ("auto" as const) : ("none" as const)

  return {
    transform: `translate3d(0, 0, ${translateZ}px) scale(${scale})`,
    opacity,
    filter: "none",
    pointerEvents,
    zIndex: 100 - Math.round(abs * 10),
  }
}
