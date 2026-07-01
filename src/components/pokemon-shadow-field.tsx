import { useEffect, useRef } from "react"
import { SILHOUETTE_DEX_IDS, getSilhouetteSrc } from "@/lib/pokemon-silhouettes"

interface ShadowSprite {
  dexId: number
  orbitRadius: number
  orbitSpeed: number
  orbitPhase: number
  yOffset: number
  ySpeed: number
  size: number
  depth: number
  img: HTMLImageElement | null
}

const SPRITE_COUNT = 22

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

export function PokemonShadowField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const spritesRef = useRef<ShadowSprite[]>([])
  const pointerRef = useRef({ x: 0.5, y: 0.5 })
  const scrollRef = useRef(0)
  const rafRef = useRef(0)
  const timeRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    function createSprites(): ShadowSprite[] {
      return Array.from({ length: SPRITE_COUNT }, (_, i) => ({
        dexId: SILHOUETTE_DEX_IDS[i % SILHOUETTE_DEX_IDS.length],
        orbitRadius: 0.25 + Math.random() * 0.45,
        orbitSpeed: 0.08 + Math.random() * 0.18,
        orbitPhase: Math.random() * Math.PI * 2,
        yOffset: (Math.random() - 0.5) * 0.6,
        ySpeed: 0.05 + Math.random() * 0.12,
        size: 72 + Math.random() * 88,
        depth: 0.3 + Math.random() * 0.7,
        img: null,
      }))
    }

    spritesRef.current = createSprites()

    spritesRef.current.forEach((sprite) => {
      const img = new Image()
      img.src = getSilhouetteSrc(sprite.dexId)
      img.onload = () => {
        sprite.img = img
      }
    })

    function resize() {
      const w = window.innerWidth
      const h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    function draw() {
      const w = window.innerWidth
      const h = window.innerHeight
      const cx = w * 0.5
      const cy = h * 0.48
      const t = timeRef.current
      const scrollShift = scrollRef.current * 0.0004
      const px = pointerRef.current.x
      const py = pointerRef.current.y

      ctx.clearRect(0, 0, w, h)

      const sorted = [...spritesRef.current].sort((a, b) => a.depth - b.depth)

      for (const sprite of sorted) {
        if (!sprite.img?.complete) continue

        const angle =
          sprite.orbitPhase +
          t * sprite.orbitSpeed * (prefersReduced ? 0.2 : 1) +
          scrollShift * 2
        const yWave =
          sprite.yOffset +
          Math.sin(t * sprite.ySpeed + sprite.orbitPhase) * 0.18

        const parallaxX = (px - 0.5) * 0.12 * sprite.depth
        const parallaxY = (py - 0.5) * 0.1 * sprite.depth

        const orbitScale = Math.min(w, h) * sprite.orbitRadius
        const x = cx + Math.cos(angle) * orbitScale + parallaxX * w
        const y = cy + yWave * h + Math.sin(angle) * orbitScale * 0.35 + parallaxY * h

        const depthScale = 0.45 + sprite.depth * 0.85
        const size = sprite.size * depthScale
        const alpha = 0.1 + sprite.depth * 0.22

        ctx.save()
        ctx.globalAlpha = alpha
        ctx.filter = "brightness(0) saturate(100%)"
        ctx.drawImage(sprite.img, x - size / 2, y - size / 2, size, size)

        ctx.globalAlpha = alpha * 0.45
        ctx.filter = "blur(18px) brightness(0)"
        ctx.drawImage(sprite.img, x - size / 2, y - size / 2, size, size)

        ctx.restore()

        if (!prefersReduced) {
          ctx.save()
          ctx.globalAlpha = alpha * 0.15
          ctx.shadowColor = sprite.depth > 0.6 ? "#7c4dff" : "#3d72ff"
          ctx.shadowBlur = 24
          ctx.filter = "brightness(0)"
          ctx.drawImage(sprite.img, x - size / 2, y - size / 2, size * 0.3, size * 0.3)
          ctx.restore()
        }
      }

      timeRef.current += prefersReduced ? 0.008 : 0.016
      rafRef.current = requestAnimationFrame(draw)
    }

    resize()
    draw()

    const onResize = () => resize()
    const onScroll = () => {
      scrollRef.current = window.scrollY
    }
    const onMove = (e: MouseEvent) => {
      pointerRef.current = { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight }
    }
    const onTouch = (e: TouchEvent) => {
      const touch = e.touches[0]
      if (!touch) return
      pointerRef.current = {
        x: touch.clientX / window.innerWidth,
        y: touch.clientY / window.innerHeight,
      }
    }

    window.addEventListener("resize", onResize)
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("mousemove", onMove, { passive: true })
    window.addEventListener("touchmove", onTouch, { passive: true })

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener("resize", onResize)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("touchmove", onTouch)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[1]"
      aria-hidden="true"
    />
  )
}
