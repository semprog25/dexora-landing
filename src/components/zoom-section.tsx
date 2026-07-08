import { type ReactNode } from "react"
import { useZoomScene, getZoomSectionStyle } from "@/components/zoom-scene"

interface ZoomSectionProps {
  index: number
  id?: string
  children: ReactNode
  className?: string
  contentOverflow?: "hidden" | "visible"
}

export function ZoomSection({
  index,
  id,
  children,
  className = "",
  contentOverflow = "hidden",
}: ZoomSectionProps) {
  const { progress, activeIndex } = useZoomScene()
  const isActive = activeIndex === index
  const style = getZoomSectionStyle(index, progress)

  const contentOverflowClass = isActive
    ? "justify-start overflow-x-hidden overflow-y-auto overscroll-y-contain max-md:pt-0.5 max-md:pb-3"
    : contentOverflow === "visible"
      ? "justify-center overflow-visible"
      : "justify-center overflow-hidden"

  return (
    <section
      id={id}
      className={`zoom-panel safe-section relative z-20 px-4 py-8 max-md:py-3 md:px-10 md:py-14 lg:px-16 ${className}`}
      style={{
        transform: style.transform,
        opacity: style.opacity,
        filter: style.filter,
        pointerEvents: style.pointerEvents,
        zIndex: style.zIndex,
      }}
      aria-hidden={style.pointerEvents === "none"}
    >
      <div
        className={`zoom-section-content relative z-10 mx-auto flex h-full w-full max-w-3xl flex-col items-center px-1 text-center sm:px-0 ${contentOverflowClass}`}
        data-zoom-scroll={isActive ? "true" : undefined}
      >
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
      className="scroll-indicator zoom-hint safe-bottom-offset fixed left-1/2 z-50 flex min-h-[44px] min-w-[44px] -translate-x-1/2 flex-col items-center justify-center gap-3 transition hover:opacity-90 active:opacity-70"
      aria-label="Scroll to explore"
    >
      <span className="zoom-hint-label">scroll to explore</span>
      <div className="zoom-hint-line" />
    </button>
  )
}
