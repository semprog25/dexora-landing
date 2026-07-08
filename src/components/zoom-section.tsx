import { type ReactNode } from "react"
import { useTranslation } from "react-i18next"
import { useZoomScene, getZoomSectionStyle } from "@/components/zoom-scene"

interface ZoomSectionProps {
  index: number
  id?: string
  children: ReactNode
  className?: string
  contentOverflow?: "hidden" | "visible"
  footerBleed?: ReactNode
}

export function ZoomSection({
  index,
  id,
  children,
  className = "",
  contentOverflow = "hidden",
  footerBleed,
}: ZoomSectionProps) {
  const { progress, activeIndex } = useZoomScene()
  const isActive = activeIndex === index
  const style = getZoomSectionStyle(index, progress)

  const contentOverflowClass = isActive
    ? "justify-center overflow-y-auto overscroll-y-contain max-md:pt-2 max-md:pb-4"
    : contentOverflow === "visible"
      ? "justify-center overflow-y-hidden"
      : "justify-center overflow-hidden"

  return (
    <section
      id={id}
      className={`zoom-panel safe-section relative z-20 flex flex-col items-center px-4 py-8 max-md:px-3 max-md:py-2 md:px-10 md:py-14 lg:px-16 ${className}`}
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
        className={`zoom-section-content relative z-10 mx-auto flex h-full w-full min-w-0 max-w-3xl flex-col items-center px-0 text-center sm:px-0 ${contentOverflowClass}`}
        data-zoom-scroll={isActive ? "true" : undefined}
      >
        {children}
      </div>
      {footerBleed ? (
        <div className="zoom-section-bleed relative z-10 w-full shrink-0">{footerBleed}</div>
      ) : null}
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
  const { t } = useTranslation("landing")
  const { goNext, activeIndex } = useZoomScene()

  if (show === false) return null
  if (activeIndex !== 0) return null

  return (
    <button
      type="button"
      onClick={goNext}
      className="scroll-indicator zoom-hint safe-bottom-offset fixed left-1/2 z-50 flex min-h-[44px] min-w-[44px] -translate-x-1/2 flex-col items-center justify-center gap-3 transition hover:opacity-90 active:opacity-70"
      aria-label={t("nav.explore")}
    >
      <span className="zoom-hint-label">{t("nav.explore")}</span>
      <div className="zoom-hint-line" />
    </button>
  )
}
