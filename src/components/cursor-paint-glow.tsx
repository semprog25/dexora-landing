import { useEffect, useRef } from "react"
import { useZoomSceneOptional } from "@/components/zoom-scene"
import { BACKGROUND_GRID_SIZE } from "@/lib/grid-config"
import { BRAND } from "@/lib/brand-colors"
import { subscribeGlowBursts, KEYSTROKE_NEON_COLORS, type GlowBurst } from "@/lib/glow-bus"

const NEON_COLORS = [...KEYSTROKE_NEON_COLORS, BRAND.purple] as const

interface SmokeWisp {
  x: number
  y: number
  life: number
  maxLife: number
  radius: number
  stretchX: number
  stretchY: number
  rotation: number
  driftX: number
  driftY: number
  wobble: number[]
  color: string
  blur: number
}

interface NeonRipple {
  x: number
  y: number
  life: number
  maxLife: number
  color: string
}

interface AmbientGlow {
  x: number
  y: number
  life: number
  maxLife: number
  radius: number
  color: string
  pulse: number
}

function pickNeonColor(): string {
  return NEON_COLORS[Math.floor(Math.random() * NEON_COLORS.length)]
}

function hexToRgba(hex: string, alpha: number): string {
  const h = hex.replace("#", "")
  const r = parseInt(h.slice(0, 2), 16)
  const g = parseInt(h.slice(2, 4), 16)
  const b = parseInt(h.slice(4, 6), 16)
  return `rgba(${r},${g},${b},${alpha})`
}

function createWobble(): number[] {
  return Array.from({ length: 7 }, () => 0.55 + Math.random() * 0.7)
}

function drawBlobPath(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  stretchX: number,
  stretchY: number,
  rotation: number,
  wobble: number[]
) {
  const segments = wobble.length
  ctx.beginPath()
  for (let i = 0; i <= segments; i++) {
    const angle = (i / segments) * Math.PI * 2
    const w = wobble[i % segments]
    const px = x + Math.cos(angle + rotation) * radius * stretchX * w
    const py = y + Math.sin(angle + rotation) * radius * stretchY * w
    if (i === 0) ctx.moveTo(px, py)
    else ctx.lineTo(px, py)
  }
  ctx.closePath()
}

export function CursorPaintGlow() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const wispsRef = useRef<SmokeWisp[]>([])
  const ripplesRef = useRef<NeonRipple[]>([])
  const ambientRef = useRef<AmbientGlow[]>([])
  const rafRef = useRef(0)
  const zoom = useZoomSceneOptional()
  const sectionIndex = Math.round(zoom?.progress ?? 0)
  const lastMoveRef = useRef({ x: 0, y: 0, t: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const G = BACKGROUND_GRID_SIZE

    function resize() {
      const w = window.innerWidth
      const h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    function spawnWisp(x: number, y: number, color: string, size = 1) {
      wispsRef.current.push({
        x: x + (Math.random() - 0.5) * 28,
        y: y + (Math.random() - 0.5) * 28,
        life: 1,
        maxLife: 1,
        radius: (16 + Math.random() * 22) * size,
        stretchX: 0.6 + Math.random() * 0.9,
        stretchY: 0.45 + Math.random() * 0.75,
        rotation: Math.random() * Math.PI * 2,
        driftX: (Math.random() - 0.5) * 0.35,
        driftY: (Math.random() - 0.5) * 0.25 - 0.1,
        wobble: createWobble(),
        color,
        blur: 18 + Math.random() * 14,
      })
      if (wispsRef.current.length > 22) {
        wispsRef.current = wispsRef.current.slice(-22)
      }
    }

    function spawnBurst(burst: GlowBurst) {
      const w = window.innerWidth
      const h = window.innerHeight
      const x = burst.x ?? Math.random() * w
      const y = burst.y ?? Math.random() * h
      const size = burst.size ?? 1.2
      spawnWisp(x, y, hexToRgba(burst.color, 0.55), size)
      spawnWisp(x + (Math.random() - 0.5) * 80, y + (Math.random() - 0.5) * 60, hexToRgba(burst.color, 0.35), size * 0.85)
      spawnWisp(x + (Math.random() - 0.5) * 120, y + (Math.random() - 0.5) * 90, hexToRgba(burst.color, 0.22), size * 1.3)
    }

    function spawnAmbient() {
      const w = window.innerWidth
      const h = window.innerHeight
      ambientRef.current.push({
        x: Math.random() * w,
        y: Math.random() * h,
        life: 1,
        maxLife: 1,
        radius: 60 + Math.random() * 100,
        color: pickNeonColor(),
        pulse: Math.random() * Math.PI * 2,
      })
      if (ambientRef.current.length > 8) {
        ambientRef.current = ambientRef.current.slice(-8)
      }
    }

    function drawGrid(w: number, h: number) {
      ctx.save()
      ctx.globalAlpha = 0.028
      ctx.strokeStyle = "rgba(255,255,255,0.4)"
      ctx.lineWidth = 1
      for (let x = 0; x <= w; x += G) {
        ctx.beginPath()
        ctx.moveTo(x + 0.5, 0)
        ctx.lineTo(x + 0.5, h)
        ctx.stroke()
      }
      for (let y = 0; y <= h; y += G) {
        ctx.beginPath()
        ctx.moveTo(0, y + 0.5)
        ctx.lineTo(w, y + 0.5)
        ctx.stroke()
      }
      ctx.restore()
    }

    function drawWisp(wisp: SmokeWisp) {
      const t = wisp.life / wisp.maxLife
      const alpha = t * 0.42

      ctx.save()
      ctx.filter = `blur(${wisp.blur}px)`
      ctx.globalAlpha = alpha
      ctx.globalCompositeOperation = "screen"
      ctx.fillStyle = wisp.color
      drawBlobPath(
        ctx,
        wisp.x,
        wisp.y,
        wisp.radius * (1 + (1 - t) * 0.2),
        wisp.stretchX,
        wisp.stretchY,
        wisp.rotation,
        wisp.wobble
      )
      ctx.fill()
      ctx.restore()
    }

    function drawAmbient(glow: AmbientGlow, time: number) {
      const t = glow.life / glow.maxLife
      const pulse = 0.55 + Math.sin(time * 0.0015 + glow.pulse) * 0.25
      const radius = glow.radius * pulse

      ctx.save()
      ctx.filter = "blur(42px)"
      ctx.globalAlpha = t * 0.14
      ctx.globalCompositeOperation = "screen"
      ctx.fillStyle = hexToRgba(glow.color, 0.7)
      ctx.beginPath()
      ctx.ellipse(glow.x, glow.y, radius * 1.1, radius * 0.75, glow.pulse, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    }

    function drawRipple(ripple: NeonRipple) {
      const t = 1 - ripple.life / ripple.maxLife
      const radius = 10 + t * 80
      const alpha = ripple.life * 0.65

      ctx.save()
      ctx.globalAlpha = alpha
      ctx.strokeStyle = ripple.color
      ctx.lineWidth = 2
      ctx.shadowColor = ripple.color
      ctx.shadowBlur = 16
      ctx.beginPath()
      ctx.arc(ripple.x, ripple.y, radius, 0, Math.PI * 2)
      ctx.stroke()
      ctx.restore()
    }

    let ambientTimer = 0

    function draw(time: number) {
      const w = window.innerWidth
      const h = window.innerHeight

      ctx.clearRect(0, 0, w, h)
      drawGrid(w, h)

      if (!prefersReduced && time - ambientTimer > 2200) {
        spawnAmbient()
        ambientTimer = time
      }

      for (const glow of ambientRef.current) {
        drawAmbient(glow, time)
        glow.life -= 0.0018
      }
      ambientRef.current = ambientRef.current.filter((g) => g.life > 0.05)

      for (const wisp of wispsRef.current) {
        drawWisp(wisp)
        wisp.life -= prefersReduced ? 0.03 : 0.011
        wisp.x += wisp.driftX
        wisp.y += wisp.driftY
        wisp.rotation += 0.003
      }
      wispsRef.current = wispsRef.current.filter((w) => w.life > 0.04)

      for (const ripple of ripplesRef.current) {
        drawRipple(ripple)
        ripple.life -= prefersReduced ? 0.04 : 0.02
      }
      ripplesRef.current = ripplesRef.current.filter((r) => r.life > 0.03)

      rafRef.current = requestAnimationFrame(draw)
    }

    resize()
    for (let i = 0; i < 4; i++) spawnAmbient()
    rafRef.current = requestAnimationFrame(draw)

    const unsubGlow = subscribeGlowBursts(spawnBurst)

    function moveSmoke(clientX: number, clientY: number) {
      const now = performance.now()
      const last = lastMoveRef.current
      const dist = Math.hypot(clientX - last.x, clientY - last.y)

      if (now - last.t < 55 || dist < 10) return

      const prevX = last.x
      const prevY = last.y
      lastMoveRef.current = { x: clientX, y: clientY, t: now }
      if (prefersReduced) return

      const color = pickNeonColor()
      spawnWisp(clientX, clientY, hexToRgba(color, 0.4), 0.9)
      if (dist > 24) {
        spawnWisp(
          clientX - (clientX - prevX) * 0.4,
          clientY - (clientY - prevY) * 0.4,
          hexToRgba(pickNeonColor(), 0.28),
          0.75
        )
      }
    }

    function spawnRipple(clientX: number, clientY: number) {
      const color = pickNeonColor()
      ripplesRef.current.push({ x: clientX, y: clientY, life: 1, maxLife: 1, color })
      spawnWisp(clientX, clientY, hexToRgba(color, 0.45), 1)
    }

    const onResize = () => resize()
    const onMouseMove = (e: MouseEvent) => moveSmoke(e.clientX, e.clientY)
    const onTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0]
      if (!touch) return
      spawnRipple(touch.clientX, touch.clientY)
    }

    window.addEventListener("resize", onResize)
    window.addEventListener("mousemove", onMouseMove, { passive: true })
    window.addEventListener("touchstart", onTouchStart, { passive: true })

    return () => {
      cancelAnimationFrame(rafRef.current)
      unsubGlow()
      window.removeEventListener("resize", onResize)
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("touchstart", onTouchStart)
    }
  }, [sectionIndex])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[3]"
      aria-hidden="true"
    />
  )
}
