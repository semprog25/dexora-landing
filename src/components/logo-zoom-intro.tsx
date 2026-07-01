import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "motion/react"

interface LogoZoomIntroProps {
  onComplete: () => void
}

export function LogoZoomIntro({ onComplete }: LogoZoomIntroProps) {
  const [visible, setVisible] = useState(true)
  const [phase, setPhase] = useState<"zoom" | "exit">("zoom")

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) {
      onComplete()
      return
    }

    const exitTimer = setTimeout(() => setPhase("exit"), 1400)
    const hideTimer = setTimeout(() => setVisible(false), 2050)
    const doneTimer = setTimeout(onComplete, 2100)

    return () => {
      clearTimeout(exitTimer)
      clearTimeout(hideTimer)
      clearTimeout(doneTimer)
    }
  }, [onComplete])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#07091a]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          role="status"
          aria-label="Loading Dexora"
          style={{
            paddingTop: "env(safe-area-inset-top)",
            paddingBottom: "env(safe-area-inset-bottom)",
          }}
        >
          <motion.img
            src="/dexora-logo.png"
            alt="Dexora"
            className="h-28 w-28 rounded-3xl shadow-[0_0_80px_rgba(255,229,0,0.35)] md:h-36 md:w-36"
            style={{ borderRadius: "22%" }}
            initial={{ scale: 3.8, opacity: 0.5 }}
            animate={{
              scale: phase === "exit" ? 0.75 : 1,
              opacity: phase === "exit" ? 0 : 1,
            }}
            transition={{
              duration: phase === "exit" ? 0.55 : 1.35,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
