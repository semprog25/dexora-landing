import { useEffect, useRef } from "react"
import { useZoomSceneOptional } from "@/components/zoom-scene"
import { BACKGROUND_GRID_SIZE } from "@/lib/grid-config"
import { SECTION_SMOKE } from "@/lib/brand-colors"

interface SmokePuff {
  x: number
  y: number
  life: number
  size: number
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

function snapGrid(v: number): number {
  return Math.round(v / BACKGROUND_GRID_SIZE) * BACKGROUND_GRID_SIZE
}

export function CursorSmokeGlow() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointerRef = useRef({ px: 0, py: 0, tx: 0, ty: 0, active: false })
  const puffsRef = useRef<SmokePuff[]>([])
  const rafRef = useRef(0)
  const zoom = useZoomSceneOptional()
  const sectionIndex = Math.round(zoom?.progress ?? 0)

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

      const ptr = pointerRef.current
      if (!ptr.active) {
        ptr.px = w * 0.5
        ptr.py = h * 0.65
        ptr.tx = ptr.px
        ptr.ty = ptr.py
      }
    }

    function drawGrid(w: number, h: number) {
      ctx.save()
      ctx.globalAlpha = 0.035
      ctx.strokeStyle = "rgba(255,255,255,0.35)"
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

    function drawSmokePuff(puff: SmokePuff, colors: (typeof SECTION_SMOKE)[number]) {
      const grad = ctx.createRadialGradient(puff.x, puff.y, 0, puff.x, puff.y, puff.size)
      grad.addColorStop(0, colors.core)
      grad.addColorStop(0.45, colors.mid)
      grad.addColorStop(1, colors.edge)

      ctx.save()
      ctx.globalAlpha = puff.life * 0.75
      ctx.globalCompositeOperation = "screen"
      ctx.fillStyle = grad
      ctx.beginPath()
      ctx.arc(puff.x, puff.y, puff.size, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    }

    function drawCursorGlow(x: number, y: number, colors: (typeof SECTION_SMOKE)[number]) {
      const gx = snapGrid(x)
      const gy = snapGrid(y)
      const radius = G * 2.2

      ctx.save()
      ctx.globalCompositeOperation = "screen"
      const glow = ctx.createRadialGradient(gx, gy, 0, gx, gy, radius)
      glow.addColorStop(0, colors.core)
      glow.addColorStop(0.55, colors.mid)
      glow.addColorStop(1, colors.edge)
      ctx.fillStyle = glow
      ctx.fillRect(gx - radius, gy - radius, radius * 2, radius * 2)
      ctx.restore()
    }

    function draw() {
      const w = window.innerWidth
      const h = window.innerHeight
      const ptr = pointerRef.current
      const colors = SECTION_SMOKE[Math.min(sectionIndex, SECTION_SMOKE.length - 1)]

      ptr.px = lerp(ptr.px, ptr.tx, prefersReduced ? 1 : 0.12)
      ptr.py = lerp(ptr.py, ptr.ty, prefersReduced ? 1 : 0.12)

      ctx.clearRect(0, 0, w, h)
      drawGrid(w, h)

      for (const puff of puffsRef.current) {
        drawSmokePuff(puff, colors)
        puff.life -= prefersReduced ? 0.04 : 0.012
        puff.size += 0.35
      }
      puffsRef.current = puffsRef.current.filter((p) => p.life > 0.02)

      if (ptr.active) {
        drawCursorGlow(ptr.px, ptr.py, colors)
      }

      rafRef.current = requestAnimationFrame(draw)
    }

    resize()
    draw()

    let spawnTimer = 0

    function moveTo(clientX: number, clientY: number) {
      const ptr = pointerRef.current
      ptr.active = true
      ptr.tx = clientX
      ptr.ty = clientY

      const now = performance.now()
      if (now - spawnTimer < 48) return
      spawnTimer = now

      if (prefersReduced) return

      const colors = SECTION_SMOKE[Math.min(sectionIndex, SECTION_SMOKE.length - 1)]
      puffsRef.current.push({
        x: clientX + (Math.random() - 0.5) * 12,
        y: clientY + (Math.random() - 0.5) * 12,
        life: 0.85,
        size: 18 + Math.random() * 14,
      })

      if (puffsRef.current.length > 18) {
        puffsRef.current = puffsRef.current.slice(-18)
      }
    }

    const onResize = () => resize()
    const onMouseMove = (e: MouseEvent) => moveTo(e.clientX, e.clientY)
    const onTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0]
      if (touch) moveTo(touch.clientX, touch.clientY)
    }
    const onLeave = () => {
      pointerRef.current.active = false
    }

    window.addEventListener("resize", onResize)
    window.addEventListener("mousemove", onMouseMove, { passive: true })
    window.addEventListener("touchmove", onTouchMove, { passive: true })
    document.documentElement.addEventListener("mouseleave", onLeave)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener("resize", onResize)
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("touchmove", onTouchMove)
      document.documentElement.removeEventListener("mouseleave", onLeave)
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
