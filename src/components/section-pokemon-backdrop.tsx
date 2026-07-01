import { useEffect, useState } from "react"
import { useZoomScene } from "@/components/zoom-scene"
import { SECTION_COUNT } from "@/lib/sections"
import { SECTION_BACKDROPS } from "@/lib/section-backdrops"

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => setPrefersReducedMotion(media.matches)
    update()
    media.addEventListener("change", update)
    return () => media.removeEventListener("change", update)
  }, [])

  return prefersReducedMotion
}

export function SectionPokemonBackdrop() {
  const { progress, activeIndex } = useZoomScene()
  const prefersReducedMotion = usePrefersReducedMotion()

  return (
    <div className="section-backdrop-root pointer-events-none fixed inset-0 z-[1] overflow-hidden" aria-hidden="true">
      {Array.from({ length: SECTION_COUNT }, (_, index) => {
        const config = SECTION_BACKDROPS[index]
        if (!config) return null

        const distance = Math.abs(progress - index)
        const opacity = distance < 0.4 ? 1 : distance < 0.72 ? Math.max(0, 1 - (distance - 0.4) * 3.1) : 0
        const isActive = activeIndex === index
        const wallpaperPosition = config.wallpaperPosition ?? "center 35%"
        const showVideo = Boolean(config.wallpaperVideo) && !prefersReducedMotion

        if (opacity <= 0.01) return null

        return (
          <div
            key={index}
            className="section-backdrop-layer absolute inset-0"
            style={{ opacity }}
          >
            {showVideo ? (
              <video
                src={config.wallpaperVideo}
                poster={config.wallpaper}
                className={`section-backdrop-wallpaper section-backdrop-wallpaper--video ${isActive ? "is-active" : ""}`}
                style={{ objectPosition: wallpaperPosition }}
                autoPlay
                loop
                muted
                playsInline
                preload={index === 0 ? "auto" : "metadata"}
              />
            ) : (
              <img
                src={config.wallpaper}
                alt=""
                className={`section-backdrop-wallpaper ${isActive ? "is-active" : ""}`}
                style={{ objectPosition: wallpaperPosition }}
                loading={index === 0 ? "eager" : "lazy"}
                decoding="async"
                draggable={false}
              />
            )}

            {config.figure ? (
              <img
                src={config.figure}
                alt=""
                className={`section-backdrop-figure section-backdrop-figure--${config.figurePosition ?? "bottom"} ${
                  isActive ? "is-active" : ""
                }`}
                loading={index === 0 ? "eager" : "lazy"}
                decoding="async"
                draggable={false}
              />
            ) : null}

            <div
              className={`section-backdrop-smoke ${isActive ? "is-active" : ""}`}
              style={{ "--smoke-hue": config.smokeHue }}
            />
            <div className="section-backdrop-vignette" />
            {isActive ? <div className="section-backdrop-scrim" /> : null}
          </div>
        )
      })}
    </div>
  )
}
