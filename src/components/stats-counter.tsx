import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "motion/react"

interface StatsCounterProps {
  value: number
  suffix?: string
  label: string
  decimals?: number
}

export function StatsCounter({ value, suffix = "", label, decimals = 0 }: StatsCounterProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!isInView) return

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) {
      setDisplay(value)
      return
    }

    const duration = 1800
    const start = performance.now()

    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(eased * value)
      if (progress < 1) requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
  }, [isInView, value])

  const formatted =
    decimals > 0 ? display.toFixed(decimals) : Math.floor(display).toLocaleString()

  return (
    <motion.div
      ref={ref}
      className="text-center"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
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
