import { useEffect, useRef } from "react"

interface AnimatedBackgroundProps {
  className?: string
}

export function AnimatedBackground({ className = "" }: AnimatedBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId = 0
    const particles: { x: number; y: number; r: number; vx: number; vy: number; a: number }[] = []

    function resize() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    function initParticles() {
      particles.length = 0
      const count = Math.min(80, Math.floor((canvas.width * canvas.height) / 18000))
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 1.2 + 0.3,
          vx: (Math.random() - 0.5) * 0.15,
          vy: (Math.random() - 0.5) * 0.15,
          a: Math.random() * 0.35 + 0.1,
        })
      }
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(237, 240, 255, ${p.a})`
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
  }, [])

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <div
        className="orb-1 absolute -left-[20%] -top-[15%] h-[70vh] w-[70vh] rounded-full opacity-30"
        style={{
          background:
            "radial-gradient(circle, rgba(61,114,255,0.35) 0%, transparent 70%)",
        }}
      />
      <div
        className="orb-2 absolute -right-[15%] top-[20%] h-[60vh] w-[60vh] rounded-full opacity-25"
        style={{
          background:
            "radial-gradient(circle, rgba(124,77,255,0.3) 0%, transparent 70%)",
        }}
      />
      <div
        className="orb-3 absolute bottom-[-10%] left-[30%] h-[50vh] w-[50vh] rounded-full opacity-20"
        style={{
          background:
            "radial-gradient(circle, rgba(255,229,0,0.12) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-40" />
    </div>
  )
}
