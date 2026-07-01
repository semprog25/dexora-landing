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

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3)
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
  const lastNavRef = useRef(0)

  const maxIndex = sectionCount - 1

  const animateTo = useCallback(
    (target: number) => {
      const clamped = clamp(target, 0, maxIndex)
      if (animatingRef.current && Math.abs(targetRef.current - clamped) < 0.01) return

      targetRef.current = clamped
      const start = progressRef.current
      const distance = clamped - start
      if (Math.abs(distance) < 0.001) return

      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      const duration = prefersReduced ? 200 : 950

      animatingRef.current = true
      setIsAnimating(true)
      const startTime = performance.now()

      function tick(now: number) {
        const t = clamp((now - startTime) / duration, 0, 1)
        const eased = easeOutCubic(t)
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
      }

      cancelAnimationFrame(animFrameRef.current)
      animFrameRef.current = requestAnimationFrame(tick)
    },
    [maxIndex]
  )

  const goTo = useCallback(
    (index: number) => {
      const now = Date.now()
      if (now - lastNavRef.current < 400) return
      lastNavRef.current = now
      animateTo(index)
    },
    [animateTo]
  )

  const goNext = useCallback(() => {
    goTo(Math.ceil(progressRef.current + 0.05))
  }, [goTo])

  const goPrev = useCallback(() => {
    goTo(Math.floor(progressRef.current - 0.05))
  }, [goTo])

  useEffect(() => {
    document.documentElement.style.setProperty("--zoom-progress", String(progress))
  }, [progress])

  useEffect(() => {
    if (!enabled) return

    document.body.classList.add("zoom-scene-active")

    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      if (animatingRef.current) return
      if (Math.abs(e.deltaY) < 12) return

      if (e.deltaY > 0) goNext()
      else goPrev()
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
    }

    const onTouchEnd = (e: TouchEvent) => {
      if (animatingRef.current) return
      const endY = e.changedTouches[0]?.clientY ?? 0
      const delta = touchStartYRef.current - endY
      if (Math.abs(delta) < 48) return
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

  let scale: number
  let translateZ: number
  let opacity: number

  if (delta <= 0) {
    const passed = Math.min(1, -delta)
    scale = 1 + passed * 2.2
    translateZ = delta * 420
    opacity = Math.max(0, 1 - passed * 1.35)
  } else {
    scale = 1 / (1 + delta * 0.72)
    translateZ = -delta * 1100
    opacity = Math.max(0, 1 - delta * 0.92)
  }

  const blur = Math.max(0, abs - 0.25) * 5
  const pointerEvents = abs < 0.45 ? "auto" : "none"

  return {
    transform: `translate3d(0, 0, ${translateZ}px) scale(${scale})`,
    opacity,
    filter: blur > 0.1 ? `blur(${blur}px)` : "none",
    pointerEvents: pointerEvents as "auto" | "none",
    zIndex: 100 - Math.round(abs * 10),
  }
}
