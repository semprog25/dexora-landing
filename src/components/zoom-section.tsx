import { type ReactNode } from "react"
import { useZoomScene, getZoomSectionStyle } from "@/components/zoom-scene"

interface ZoomSectionProps {
  index: number
  id?: string
  children: ReactNode
  className?: string
}

export function ZoomSection({ index, id, children, className = "" }: ZoomSectionProps) {
  const { progress } = useZoomScene()
  const style = getZoomSectionStyle(index, progress)

  return (
    <section
      id={id}
      className={`zoom-panel safe-section px-5 py-16 md:px-10 lg:px-16 ${className}`}
      style={{
        transform: style.transform,
        opacity: style.opacity,
        filter: style.filter,
        pointerEvents: style.pointerEvents,
        zIndex: style.zIndex,
      }}
      aria-hidden={style.pointerEvents === "none"}
    >
      <div className="relative z-10 mx-auto flex h-full w-full max-w-6xl flex-col justify-center">
        {children}
      </div>
    </section>
  )
}

interface ZoomProgressProps {
  labels?: string[]
}

export function ZoomProgress({ labels }: ZoomProgressProps) {
  const { progress, sectionCount, goTo } = useZoomScene()

  return (
    <nav
      className="zoom-progress safe-bottom-offset fixed right-4 z-50 flex flex-col items-center gap-2 md:right-6"
      aria-label="Section navigation"
    >
      {Array.from({ length: sectionCount }, (_, i) => {
        const isActive = Math.abs(i - progress) < 0.45
        return (
          <button
            key={i}
            type="button"
            onClick={() => goTo(i)}
            className={`min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full transition ${
              isActive ? "scale-110" : "opacity-50 hover:opacity-80"
            }`}
            aria-label={labels?.[i] ?? `Go to section ${i + 1}`}
            aria-current={isActive ? "step" : undefined}
          >
            <span
              className={`block rounded-full transition-all ${
                isActive ? "h-2.5 w-2.5 bg-[#ffe500] shadow-[0_0_12px_rgba(255,229,0,0.6)]" : "h-2 w-2 bg-white/30"
              }`}
            />
          </button>
        )
      })}
    </nav>
  )
}

interface ZoomHintProps {
  show?: boolean
}

export function ZoomHint({ show }: ZoomHintProps) {
  const { goNext, activeIndex } = useZoomScene()

  if (show === false) return null
  if (activeIndex !== 0) return null

  return (
    <button
      type="button"
      onClick={goNext}
      className="scroll-indicator zoom-hint safe-bottom-offset fixed left-1/2 z-50 flex min-h-[44px] min-w-[44px] -translate-x-1/2 flex-col items-center justify-center gap-1 text-[#6b7494] transition active:text-[#ffe500]"
      aria-label="Zoom to explore"
    >
      <span className="text-[10px] tracking-[0.35em] md:text-xs">SCROLL</span>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 5v14M5 12l7 7 7-7"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}
