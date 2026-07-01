import { useZoomSceneOptional } from "@/components/zoom-scene"
import { BRAND } from "@/lib/brand-colors"

interface AnimatedBackgroundProps {
  className?: string
}

const SECTION_ORBS = [
  [BRAND.purple, BRAND.yellow],
  [BRAND.blue, BRAND.purple],
  [BRAND.purple, BRAND.blue],
  [BRAND.neonBlue, BRAND.purple],
] as const

export function AnimatedBackground({ className = "" }: AnimatedBackgroundProps) {
  const zoom = useZoomSceneOptional()
  const sectionIndex = Math.round(zoom?.progress ?? 0)
  const [orbA, orbB] = SECTION_ORBS[Math.min(sectionIndex, SECTION_ORBS.length - 1)]

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-0 overflow-hidden ${className}`}
      aria-hidden="true"
      style={{ background: BRAND.bg }}
    >
      <div
        className="orb-1 absolute -left-[25%] -top-[20%] h-[75vh] w-[75vh] rounded-full opacity-20 transition-[background] duration-1000"
        style={{
          background: `radial-gradient(circle, ${orbA}30 0%, transparent 70%)`,
        }}
      />
      <div
        className="orb-2 absolute -right-[18%] top-[12%] h-[60vh] w-[60vh] rounded-full opacity-15 transition-[background] duration-1000"
        style={{
          background: `radial-gradient(circle, ${orbB}25 0%, transparent 70%)`,
        }}
      />
      <div
        className="orb-3 absolute bottom-[-12%] left-[20%] h-[50vh] w-[50vh] rounded-full opacity-12"
        style={{
          background: `radial-gradient(circle, ${BRAND.charcoal}00 0%, transparent 70%)`,
        }}
      />
    </div>
  )
}
