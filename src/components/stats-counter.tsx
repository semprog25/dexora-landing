import { useEffect, useState } from "react"
import { motion } from "motion/react"
import { useZoomScene } from "@/components/zoom-scene"

interface StatsCounterProps {
  sectionIndex: number
  value: number
  suffix?: string
  label: string
  decimals?: number
}

export function StatsCounter({
  sectionIndex,
  value,
  suffix = "",
  label,
  decimals = 0,
}: StatsCounterProps) {
  const { activeIndex } = useZoomScene()
  const isActive = activeIndex === sectionIndex
  const [display, setDisplay] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (!isActive || hasAnimated) return

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) {
      setDisplay(value)
      setHasAnimated(true)
      return
    }

    const duration = 1800
    const start = performance.now()

    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(eased * value)
      if (progress < 1) requestAnimationFrame(tick)
      else setHasAnimated(true)
    }

    requestAnimationFrame(tick)
  }, [isActive, hasAnimated, value])

  const formatted =
    decimals > 0 ? display.toFixed(decimals) : Math.floor(display).toLocaleString()

  return (
    <motion.div
      className="text-center"
      initial={false}
      animate={{ opacity: isActive ? 1 : 0.3, scale: isActive ? 1 : 0.92 }}
      transition={{ duration: 0.5 }}
    >
      <p className="font-mono text-4xl font-medium text-[#ffe500] md:text-5xl lg:text-6xl">
        {formatted}
        {suffix}
      </p>
      <p className="mt-2 text-sm tracking-wide text-[#6b7494] md:text-base">{label}</p>
    </motion.div>
  )
}
