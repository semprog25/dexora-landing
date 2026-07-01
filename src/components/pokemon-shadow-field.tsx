import { useEffect, useRef } from "react"
import { SECTION_COUNT } from "@/lib/sections"
import {
  getSectionPokemon,
  getSilhouetteSrc,
  type SectionPokemonConfig,
} from "@/lib/pokemon-silhouettes"
import { useZoomSceneOptional } from "@/components/zoom-scene"

interface LoadedPokemon {
  dexId: number
  img: HTMLImageElement | null
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

function drawOutlineGlowSilhouette(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  cx: number,
  cy: number,
  size: number,
  glow: SectionPokemonConfig["glow"],
  alpha: number
) {
  const x = cx - size / 2
  const y = cy - size / 2

  for (const color of glow) {
    ctx.save()
    ctx.globalAlpha = alpha * 0.55
    ctx.shadowColor = color
    ctx.shadowBlur = size * 0.09
    ctx.filter = "brightness(0) saturate(100%)"
    ctx.drawImage(img, x, y, size, size)
    ctx.restore()
  }

  ctx.save()
  ctx.globalAlpha = alpha * 0.35
  ctx.shadowColor = glow[0]
  ctx.shadowBlur = size * 0.045
  ctx.filter = "brightness(0) saturate(100%)"
  ctx.drawImage(img, x, y, size, size)
  ctx.restore()

  ctx.save()
  ctx.globalAlpha = alpha * 0.72
  ctx.filter = "brightness(0) saturate(100%)"
  ctx.shadowBlur = 0
  ctx.drawImage(img, x, y, size, size)
  ctx.restore()
}

export function PokemonShadowField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const cacheRef = useRef<Map<number, LoadedPokemon>>(new Map())
  const zoomProgressRef = useRef(0)
  const pointerRef = useRef({ x: 0.5, y: 0.5 })
  const zoomScene = useZoomSceneOptional()
  const rafRef = useRef(0)
  const timeRef = useRef(0)

  useEffect(() => {
    zoomProgressRef.current = zoomScene?.progress ?? 0
  }, [zoomScene?.progress])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    function loadPokemon(dexId: number) {
      if (cacheRef.current.has(dexId)) return
      const entry: LoadedPokemon = { dexId, img: null }
      cacheRef.current.set(dexId, entry)
      const img = new Image()
      img.src = getSilhouetteSrc(dexId)
      img.onload = () => {
        entry.img = img
      }
    }

    for (let i = 0; i < SECTION_COUNT; i++) {
      loadPokemon(getSectionPokemon(i).dexId)
    }

    function resize() {
      const w = window.innerWidth
      const h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    function drawHero(
      config: SectionPokemonConfig,
      cx: number,
      cy: number,
      size: number,
      alpha: number,
      float: number
    ) {
      const cached = cacheRef.current.get(config.dexId)
      if (!cached?.img?.complete || alpha < 0.02) return

      const px = (pointerRef.current.x - 0.5) * size * 0.04
      const py = (pointerRef.current.y - 0.5) * size * 0.03

      drawOutlineGlowSilhouette(
        ctx,
        cached.img,
        cx + px,
        cy + py + float,
        size,
        config.glow,
        alpha
      )
    }

    function draw() {
      const w = window.innerWidth
      const h = window.innerHeight
      const cx = w * 0.5
      const cy = h * 0.5
      const t = timeRef.current
      const progress = zoomProgressRef.current
      const baseSize = Math.min(w, h) * 0.88

      ctx.clearRect(0, 0, w, h)

      const idx = Math.floor(progress)
      const frac = progress - idx
      const current = getSectionPokemon(idx)
      const next = getSectionPokemon(Math.min(idx + 1, SECTION_COUNT - 1))

      const floatA = prefersReduced ? 0 : Math.sin(t * 0.9) * 12
      const floatB = prefersReduced ? 0 : Math.sin(t * 0.9 + 1.2) * 12

      const currentSize = baseSize * lerp(1, 1.35, frac)
      const currentAlpha = lerp(1, 0, Math.pow(frac, 0.85))

      drawHero(current, cx, cy, currentSize, currentAlpha, floatA)

      if (frac > 0.001 && idx < SECTION_COUNT - 1) {
        const nextSize = baseSize * lerp(0.55, 1, Math.pow(frac, 0.75))
        const nextAlpha = lerp(0, 1, Math.pow(frac, 0.9))
        drawHero(next, cx, cy, nextSize, nextAlpha, floatB)
      }

      timeRef.current += prefersReduced ? 0.006 : 0.014
      rafRef.current = requestAnimationFrame(draw)
    }

    resize()
    draw()

    const onResize = () => resize()
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
    window.addEventListener("mousemove", onMove, { passive: true })
    window.addEventListener("touchmove", onTouch, { passive: true })

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener("resize", onResize)
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
