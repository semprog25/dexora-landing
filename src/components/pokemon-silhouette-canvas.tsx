import { useCallback, useEffect, useRef, useState } from "react"
import { SILHOUETTE_DEX_IDS, getSilhouetteSrc } from "@/lib/pokemon-silhouettes"

interface SilhouetteInstance {
  id: number
  dexId: number
  x: number
  y: number
  targetX: number
  targetY: number
  opacity: number
  scale: number
  active: boolean
}

const POOL_SIZE = 10

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

export function PokemonSilhouetteCanvas() {
  const [instances, setInstances] = useState<SilhouetteInstance[]>([])
  const mouseRef = useRef({ x: -9999, y: -9999 })
  const poolIndexRef = useRef(0)
  const rafRef = useRef(0)
  const reducedMotionRef = useRef(false)
  const lastSpawnRef = useRef(0)

  const initPool = useCallback(() => {
    const pool: SilhouetteInstance[] = []
    for (let i = 0; i < POOL_SIZE; i++) {
      pool.push({
        id: i,
        dexId: SILHOUETTE_DEX_IDS[i % SILHOUETTE_DEX_IDS.length],
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        targetX: Math.random() * window.innerWidth,
        targetY: Math.random() * window.innerHeight,
        opacity: 0,
        scale: 0.6,
        active: false,
      })
    }
    setInstances(pool)
  }, [])

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
    initPool()

    const spawnAmbient = () => {
      if (reducedMotionRef.current) {
        setInstances((prev) =>
          prev.map((s, i) => ({
            ...s,
            x: (window.innerWidth / POOL_SIZE) * i + 40,
            y: window.innerHeight * 0.3 + (i % 3) * 120,
            opacity: 0.08,
            scale: 0.5 + (i % 3) * 0.15,
            active: false,
          }))
        )
        return
      }

      const tick = () => {
        const now = performance.now()
        const { x: mx, y: my } = mouseRef.current

        setInstances((prev) =>
          prev.map((s) => {
            if (s.active) {
              const nx = lerp(s.x, s.targetX, 0.06)
              const ny = lerp(s.y, s.targetY, 0.06)
              const dist = Math.hypot(s.targetX - nx, s.targetY - ny)
              const opacity = dist < 20 ? lerp(s.opacity, 0, 0.04) : lerp(s.opacity, 0.18, 0.08)
              const scale = lerp(s.scale, 0.55, 0.03)
              const done = opacity < 0.02 && dist < 30
              return {
                ...s,
                x: nx,
                y: ny,
                opacity,
                scale,
                active: !done,
              }
            }

            const dx = mx - s.x
            const dy = my - s.y
            const driftX = lerp(s.x, s.x + dx * 0.002, 0.02)
            const driftY = lerp(s.y, s.y + dy * 0.002, 0.02)
            return { ...s, x: driftX, y: driftY, opacity: lerp(s.opacity, 0.04, 0.02) }
          })
        )

        if (mx > 0 && now - lastSpawnRef.current > 280) {
          lastSpawnRef.current = now
          const idx = poolIndexRef.current % POOL_SIZE
          poolIndexRef.current += 1
          const offsetX = (Math.random() - 0.5) * 180
          const offsetY = (Math.random() - 0.5) * 180
          const dexId =
            SILHOUETTE_DEX_IDS[Math.floor(Math.random() * SILHOUETTE_DEX_IDS.length)]

          setInstances((prev) =>
            prev.map((s, i) =>
              i === idx
                ? {
                    ...s,
                    dexId,
                    targetX: mx + offsetX,
                    targetY: my + offsetY,
                    x: mx + offsetX * 1.5,
                    y: my + offsetY * 1.5,
                    opacity: 0.22,
                    scale: 0.85,
                    active: true,
                  }
                : s
            )
          )
        }

        rafRef.current = requestAnimationFrame(tick)
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    spawnAmbient()

    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0]
      if (t) mouseRef.current = { x: t.clientX, y: t.clientY }
    }

    window.addEventListener("mousemove", onMove, { passive: true })
    window.addEventListener("touchmove", onTouch, { passive: true })

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("touchmove", onTouch)
    }
  }, [initPool])

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1] overflow-hidden"
      aria-hidden="true"
    >
      {instances.map((s) => (
        <img
          key={s.id}
          src={getSilhouetteSrc(s.dexId)}
          alt=""
          className="absolute -translate-x-1/2 -translate-y-1/2 select-none"
          style={{
            left: s.x,
            top: s.y,
            width: 140,
            height: 140,
            objectFit: "contain",
            opacity: s.opacity,
            transform: `translate(-50%, -50%) scale(${s.scale})`,
            filter: "brightness(0) saturate(100%)",
            transition: s.active ? "none" : "opacity 0.3s ease",
          }}
          draggable={false}
        />
      ))}
    </div>
  )
}
