import { useEffect, useRef, type ReactNode } from "react"
import Lenis from "lenis"
import { motion } from "motion/react"

interface SectionShellProps {
  id?: string
  children: ReactNode
  className?: string
  delay?: number
}

export function SectionShell({ id, children, className = "", delay = 0 }: SectionShellProps) {
  return (
    <section id={id} className={`snap-section px-5 py-16 md:px-10 lg:px-16 ${className}`}>
      <motion.div
        className="relative z-10 mx-auto w-full max-w-6xl"
        initial={{ opacity: 0, y: 48 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </section>
  )
}

interface UseLenisOptions {
  enabled: boolean
}

export function useLenis({ enabled }: UseLenisOptions) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    if (!enabled) return

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) return

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })
    lenisRef.current = lenis

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
      lenisRef.current = null
    }
  }, [enabled])
}

interface StaggerItemProps {
  children: ReactNode
  index?: number
}

export function StaggerItem({ children, index = 0 }: StaggerItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  )
}
