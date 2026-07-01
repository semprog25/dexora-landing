import { useEffect, useRef } from "react"
import { useZoomSceneOptional } from "@/components/zoom-scene"

interface AnimatedBackgroundProps {
  className?: string
}

export function AnimatedBackground({ className = "" }: AnimatedBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const zoom = useZoomSceneOptional()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId = 0
    const particles: { x: number; y: number; r: number; vx: number; vy: number; a: number; layer: number }[] = []

    function resize() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    function initParticles() {
      particles.length = 0
      const count = Math.min(120, Math.floor((canvas.width * canvas.height) / 12000))
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 1.4 + 0.2,
          vx: (Math.random() - 0.5) * (0.08 + (i % 3) * 0.06),
          vy: (Math.random() - 0.5) * (0.08 + (i % 3) * 0.06),
          a: Math.random() * 0.3 + 0.05,
          layer: i % 3,
        })
      }
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const zoomShift = (zoom?.progress ?? 0) * 0.5

      for (const p of particles) {
        p.x += p.vx * (1 + p.layer * 0.3)
        p.y += p.vy * (1 + p.layer * 0.3) - zoomShift * 0.02
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        const colors = ["rgba(237,240,255,", "rgba(61,114,255,", "rgba(124,77,255,"]
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r * (1 + p.layer * 0.2), 0, Math.PI * 2)
        ctx.fillStyle = `${colors[p.layer]}${p.a})`
        ctx.fill()
      }
      animationId = requestAnimationFrame(draw)
    }

    resize()
    initParticles()
    draw()

    const onResize = () => {
      resize()
      initParticles()
    }
    window.addEventListener("resize", onResize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", onResize)
    }
  }, [zoom?.progress])

  const progress = zoom?.progress ?? 0

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <div
        className="orb-1 absolute -left-[25%] -top-[20%] h-[80vh] w-[80vh] rounded-full opacity-35"
        style={{
          background: "radial-gradient(circle, rgba(61,114,255,0.4) 0%, transparent 70%)",
          transform: `scale(${1 + progress * 0.08})`,
        }}
      />
      <div
        className="orb-2 absolute -right-[20%] top-[15%] h-[70vh] w-[70vh] rounded-full opacity-30"
        style={{
          background: "radial-gradient(circle, rgba(124,77,255,0.35) 0%, transparent 70%)",
          transform: `scale(${1.1 - progress * 0.05})`,
        }}
      />
      <div
        className="orb-3 absolute bottom-[-15%] left-[25%] h-[60vh] w-[60vh] rounded-full opacity-25"
        style={{
          background: "radial-gradient(circle, rgba(255,229,0,0.15) 0%, transparent 70%)",
        }}
      />
      <div
        className="orb-2 absolute left-[10%] top-[55%] h-[45vh] w-[45vh] rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(255,110,199,0.2) 0%, transparent 70%)",
        }}
      />
      <div
        className="orb-3 absolute right-[8%] bottom-[20%] h-[40vh] w-[40vh] rounded-full opacity-18"
        style={{
          background: "radial-gradient(circle, rgba(61,216,255,0.18) 0%, transparent 70%)",
        }}
      />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-50" />
    </div>
  )
}
