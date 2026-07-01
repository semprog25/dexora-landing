import { useZoomSceneOptional } from "@/components/zoom-scene"

const LAYER_COUNT = 6

export function DepthLayers() {
  const zoom = useZoomSceneOptional()
  const progress = zoom?.progress ?? 0

  return (
    <div className="pointer-events-none fixed inset-0 z-[2] overflow-hidden" aria-hidden="true">
      {Array.from({ length: LAYER_COUNT }, (_, i) => {
        const depth = i + 1
        const scale = 1 + depth * 0.18 + progress * 0.06
        const opacity = 0.04 + (LAYER_COUNT - i) * 0.018
        const hue = i % 3 === 0 ? "#3D72FF" : i % 3 === 1 ? "#7C4DFF" : "#FFE500"

        return (
          <div
            key={depth}
            className="depth-ring absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border"
            style={{
              width: `${38 + depth * 14}vmax`,
              height: `${38 + depth * 14}vmax`,
              transform: `translate(-50%, -50%) scale(${scale}) rotate(${depth * 12 + progress * 18}deg)`,
              borderColor: `${hue}${Math.round(opacity * 255).toString(16).padStart(2, "0")}`,
              boxShadow: `0 0 ${24 + depth * 8}px ${hue}22`,
              animationDuration: `${14 + depth * 3}s`,
            }}
          />
        )
      })}

      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 55% 50% at 50% 50%, transparent 0%, rgba(7,9,26,0.55) 72%, rgba(7,9,26,0.92) 100%)`,
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          transform: `scale(${1.2 + progress * 0.08})`,
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(61,114,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(61,114,255,0.8) 1px, transparent 1px)",
          backgroundSize: "96px 96px",
          transform: `scale(${0.9 + progress * 0.05}) rotate(2deg)`,
        }}
      />
    </div>
  )
}
