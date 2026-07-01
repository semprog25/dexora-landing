import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "motion/react"

interface IntroLoaderProps {
  onComplete: () => void
}

const BOOT_LINES = [
  "> DEXORA SYS v0.0.1",
  "> MEMORY CHECK: OK",
  "> POKEDEX ENGINE: INITIALIZED",
  "> OFFLINE MODE: READY",
  "> TRAINER INTERFACE: LOADING...",
]

export function IntroLoader({ onComplete }: IntroLoaderProps) {
  const [visibleLines, setVisibleLines] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) {
      onComplete()
      return
    }

    const timers: ReturnType<typeof setTimeout>[] = []
    BOOT_LINES.forEach((_, i) => {
      timers.push(
        setTimeout(() => setVisibleLines(i + 1), 320 + i * 280)
      )
    })
    timers.push(
      setTimeout(() => {
        setDone(true)
        setTimeout(onComplete, 600)
      }, 320 + BOOT_LINES.length * 280 + 400)
    )

    return () => timers.forEach(clearTimeout)
  }, [onComplete])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#07091a] px-6"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: "easeInOut" }}
          role="status"
          aria-label="Loading Dexora"
        >
          <img
            src="/dexora-logo.png"
            alt=""
            className="mb-10 h-20 w-20 rounded-2xl"
            style={{ borderRadius: "22%" }}
          />
          <div className="font-mono w-full max-w-md space-y-2 text-sm text-[#6b7494]">
            {BOOT_LINES.slice(0, visibleLines).map((line) => (
              <motion.p
                key={line}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
              >
                {line}
              </motion.p>
            ))}
            {visibleLines < BOOT_LINES.length && (
              <span className="inline-block h-4 w-2 animate-pulse bg-[#ffe500]" />
            )}
          </div>
          <p className="font-mono mt-8 text-xs tracking-[0.3em] text-[#6b7494]">
            (C) DEXORA
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
