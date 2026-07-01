import { useZoomSceneOptional } from "@/components/zoom-scene"
import { BRAND } from "@/lib/brand-colors"

const SECTION_ORB_HUES = [BRAND.purple, BRAND.blue, BRAND.purple, BRAND.neonBlue] as const

export function DepthLayers() {
  const zoom = useZoomSceneOptional()
  const activeIndex = Math.round(zoom?.progress ?? 0)
  const accent = SECTION_ORB_HUES[Math.min(activeIndex, SECTION_ORB_HUES.length - 1)]

  return (
    <div className="pointer-events-none fixed inset-0 z-[2] overflow-hidden" aria-hidden="true">
      <div
        className="orb-1 absolute -left-[20%] -top-[15%] h-[70vh] w-[70vh] rounded-full opacity-[0.14] transition-[background] duration-1000"
        style={{
          background: `radial-gradient(circle, ${accent}40 0%, transparent 70%)`,
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 62% 58% at 50% 46%, transparent 0%, rgba(7,9,26,0.5) 68%, rgba(7,9,26,0.94) 100%)`,
        }}
      />
    </div>
  )
}
