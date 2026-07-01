import { useEffect, useRef } from "react"
import { BACKGROUND_GRID_SIZE, NEON_COLORS } from "@/lib/grid-config"

interface GridPulse {
  gx: number
  gy: number
  axis: "x" | "y"
  dir: 1 | -1
  cells: number
  maxCells: number
  color: string
  life: number
}

interface GridNode {
  gx: number
  gy: number
  life: number
  color: string
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

function snapGrid(v: number): number {
  return Math.round(v / BACKGROUND_GRID_SIZE) * BACKGROUND_GRID_SIZE
}

function pickColor(): string {
  return NEON_COLORS[Math.floor(Math.random() * NEON_COLORS.length)]
}

function spawnNerveImpulses(gx: number, gy: number, w: number, h: number): GridPulse[] {
  const pulses: GridPulse[] = []
  const maxH = Math.floor(w / BACKGROUND_GRID_SIZE)
  const maxV = Math.floor(h / BACKGROUND_GRID_SIZE)
  const cellX = gx / BACKGROUND_GRID_SIZE
  const cellY = gy / BACKGROUND_GRID_SIZE

  for (const axis of ["x", "y"] as const) {
    for (const dir of [1, -1] as const) {
      const reach =
        axis === "x"
          ? dir > 0
            ? maxH - cellX
            : cellX
          : dir > 0
            ? maxV - cellY
            : cellY
      pulses.push({
        gx,
        gy,
        axis,
        dir,
        cells: 0,
        maxCells: Math.min(reach, 3 + Math.floor(Math.random() * 10)),
        color: pickColor(),
        life: 1,
      })
    }
  }

  return pulses
}

export function NeonLightningField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointerRef = useRef({ px: 0, py: 0, targetPx: 0, targetPy: 0 })
  const pulsesRef = useRef<GridPulse[]>([])
  const nodesRef = useRef<GridNode[]>([])
  const rafRef = useRef(0)
  const timeRef = useRef(0)
  const lastCellRef = useRef({ gx: -1, gy: -1 })

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
      if (ptr.px === 0 && ptr.py === 0) {
        ptr.px = w * 0.5
        ptr.py = h * 0.5
        ptr.targetPx = w * 0.5
        ptr.targetPy = h * 0.5
      }
    }

    function drawGridGlow(w: number, h: number, t: number) {
      ctx.save()
      ctx.globalAlpha = 0.04 + Math.sin(t * 1.5) * 0.01
      ctx.strokeStyle = "rgba(255,255,255,0.15)"
      ctx.lineWidth = 1

      for (let x = 0; x <= w; x += G) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, h)
        ctx.stroke()
      }
      for (let y = 0; y <= h; y += G) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(w, y)
        ctx.stroke()
      }
      ctx.restore()
    }

    function drawLitNode(n: GridNode) {
      const x = n.gx * G
      const y = n.gy * G
      const alpha = n.life * 0.7

      ctx.save()
      ctx.globalAlpha = alpha
      ctx.shadowColor = n.color
      ctx.shadowBlur = 16
      ctx.fillStyle = n.color
      ctx.beginPath()
      ctx.arc(x, y, 3.5, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    }

    function drawPulseSegment(
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      color: string,
      alpha: number
    ) {
      ctx.save()
      ctx.globalAlpha = alpha
      ctx.strokeStyle = color
      ctx.lineWidth = 2
      ctx.shadowColor = color
      ctx.shadowBlur = 12
      ctx.lineCap = "round"
      ctx.beginPath()
      ctx.moveTo(x1, y1)
      ctx.lineTo(x2, y2)
      ctx.stroke()

      ctx.globalAlpha = alpha * 0.45
      ctx.lineWidth = 4
      ctx.shadowBlur = 20
      ctx.stroke()
      ctx.restore()
    }

    function draw() {
      const w = window.innerWidth
      const h = window.innerHeight
      const ptr = pointerRef.current
      const t = timeRef.current

      ptr.px = lerp(ptr.px, ptr.targetPx, prefersReduced ? 1 : 0.09)
      ptr.py = lerp(ptr.py, ptr.targetPy, prefersReduced ? 1 : 0.09)

      ctx.clearRect(0, 0, w, h)
      drawGridGlow(w, h, t)

      const snapX = snapGrid(ptr.px)
      const snapY = snapGrid(ptr.py)
      const pulse = 0.8 + Math.sin(t * 3) * 0.2

      ctx.save()
      const cursorGlow = ctx.createRadialGradient(snapX, snapY, 0, snapX, snapY, G * 2.5 * pulse)
      cursorGlow.addColorStop(0, "rgba(0,240,255,0.12)")
      cursorGlow.addColorStop(0.5, "rgba(124,77,255,0.06)")
      cursorGlow.addColorStop(1, "rgba(12,12,12,0)")
      ctx.fillStyle = cursorGlow
      ctx.fillRect(snapX - G * 3, snapY - G * 3, G * 6, G * 6)
      ctx.restore()

      for (const pulse of pulsesRef.current) {
        const dist = pulse.cells * G * pulse.dir
        const x1 = pulse.gx
        const y1 = pulse.gy
        let x2 = x1
        let y2 = y1

        if (pulse.axis === "x") x2 = x1 + dist
        else y2 = y1 + dist

        drawPulseSegment(x1, y1, x2, y2, pulse.color, pulse.life * 0.65)

        const tipX = pulse.axis === "x" ? x2 : x1
        const tipY = pulse.axis === "y" ? y2 : y1
        if (Math.random() < 0.15) {
          nodesRef.current.push({
            gx: tipX / G,
            gy: tipY / G,
            life: pulse.life * 0.85,
            color: pulse.color,
          })
        }
      }

      for (const n of nodesRef.current) {
        drawLitNode(n)
        n.life -= prefersReduced ? 0.05 : 0.022
      }
      nodesRef.current = nodesRef.current.filter((n) => n.life > 0.02)

      for (const pulse of pulsesRef.current) {
        const cellProgress = Math.min(pulse.maxCells, pulse.cells + 0.12)
        pulse.cells = cellProgress
        pulse.life -= prefersReduced ? 0.04 : 0.018
      }
      pulsesRef.current = pulsesRef.current.filter((p) => p.life > 0.02)

      timeRef.current += 0.016
      rafRef.current = requestAnimationFrame(draw)
    }

    resize()
    draw()

    function igniteAt(clientX: number, clientY: number) {
      const gx = snapGrid(clientX)
      const gy = snapGrid(clientY)
      const cellKey = `${gx},${gy}`

      pointerRef.current.targetPx = clientX
      pointerRef.current.targetPy = clientY

      const last = lastCellRef.current
      if (`${last.gx},${last.gy}` === cellKey && !prefersReduced) return

      lastCellRef.current = { gx, gy }
      const w = window.innerWidth
      const h = window.innerHeight

      const impulses = spawnNerveImpulses(gx, gy, w, h)
      pulsesRef.current.push(...impulses)
      if (pulsesRef.current.length > 24) {
        pulsesRef.current = pulsesRef.current.slice(-24)
      }

      nodesRef.current.push({ gx: gx / G, gy: gy / G, life: 1, color: "#00f0ff" })
    }

    const onResize = () => resize()
    const onMouseMove = (e: MouseEvent) => igniteAt(e.clientX, e.clientY)
    const onTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0]
      if (touch) igniteAt(touch.clientX, touch.clientY)
    }

    window.addEventListener("resize", onResize)
    window.addEventListener("mousemove", onMouseMove, { passive: true })
    window.addEventListener("touchmove", onTouchMove, { passive: true })

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener("resize", onResize)
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("touchmove", onTouchMove)
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
