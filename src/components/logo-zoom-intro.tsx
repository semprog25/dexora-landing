import { useEffect, useState } from "react"
import { motion } from "motion/react"

interface LogoZoomIntroProps {
  onReveal: () => void
  onComplete: () => void
}

const ENTER_S = 0.42
const REVEAL_S = 0.36

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

export function LogoZoomIntro({ onReveal, onComplete }: LogoZoomIntroProps) {
  const [phase, setPhase] = useState<"enter" | "reveal">("enter")

  useEffect(() => {
    const link = document.createElement("link")
    link.rel = "preload"
    link.as = "image"
    link.href = "/dexora-logo.png"
    document.head.appendChild(link)
    return () => {
      document.head.removeChild(link)
    }
  }, [])

  useEffect(() => {
    if (prefersReducedMotion()) {
      onReveal()
      onComplete()
      return
    }

    const revealTimer = window.setTimeout(() => {
      setPhase("reveal")
      onReveal()
    }, ENTER_S * 1000)

    const completeTimer = window.setTimeout(() => {
      onComplete()
    }, (ENTER_S + REVEAL_S) * 1000 + 40)

    return () => {
      window.clearTimeout(revealTimer)
      window.clearTimeout(completeTimer)
    }
  }, [onComplete, onReveal])

  if (prefersReducedMotion()) return null

  const isReveal = phase === "reveal"

  return (
    <motion.div
      className="dexora-intro dexora-intro--motion"
      role="presentation"
      aria-label="Loading Dexora"
      initial={{ opacity: 1 }}
      animate={{ opacity: isReveal ? 0 : 1 }}
      transition={{ duration: REVEAL_S, ease: [0.45, 0, 0.2, 1] }}
      style={{ pointerEvents: isReveal ? "none" : "auto" }}
    >
      <motion.img
        className="dexora-intro__logo dexora-intro__logo--motion"
        src="/dexora-logo.png"
        alt="Dexora"
        draggable={false}
        initial={{ scale: 1.7, opacity: 0 }}
        animate={
          isReveal
            ? { scale: 6.5, opacity: 0 }
            : { scale: 1, opacity: 1 }
        }
        transition={{
          duration: isReveal ? REVEAL_S : ENTER_S,
          ease: isReveal ? [0.45, 0, 0.2, 1] : [0.22, 1, 0.36, 1],
        }}
      />
    </motion.div>
  )
}
