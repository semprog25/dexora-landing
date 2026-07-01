import { useZoomScene } from "@/components/zoom-scene"
import { SECTION } from "@/lib/sections"

const GENGAR_DYNAMAX_SRC = "/pokemon/artwork/dynamax/94.png"

export function HeroGengarReveal() {
  const { activeIndex } = useZoomScene()
  const isHome = activeIndex === SECTION.WAITLIST

  return (
    <div
      className={`hero-gengar-reveal pointer-events-none fixed inset-0 z-[3] overflow-hidden transition-opacity duration-1000 ${
        isHome ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden="true"
    >
      <div className="hero-gengar-vortex" />
      <div className="hero-gengar-smoke hero-gengar-smoke--a" />
      <div className="hero-gengar-smoke hero-gengar-smoke--b" />
      <div className="hero-gengar-smoke hero-gengar-smoke--c" />
      <div className="hero-gengar-ember hero-gengar-ember--left" />
      <div className="hero-gengar-ember hero-gengar-ember--right" />

      <div className="hero-gengar-figure-wrap">
        <img
          src={GENGAR_DYNAMAX_SRC}
          alt=""
          className="hero-gengar-figure"
          loading="eager"
          decoding="async"
          draggable={false}
        />
        <div className="hero-gengar-eye-glow" />
      </div>

      <div className="hero-gengar-floor-mist" />
    </div>
  )
}
