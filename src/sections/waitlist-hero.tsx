import { WaitlistForm } from "@/components/waitlist-form"
import { LogoWordmark } from "@/components/logo-wordmark"
import { motion } from "motion/react"
import { useZoomScene } from "@/components/zoom-scene"
import { SECTION } from "@/lib/sections"

interface WaitlistHeroProps {
  visible: boolean
}

export function WaitlistHero({ visible }: WaitlistHeroProps) {
  const { activeIndex, goNext } = useZoomScene()
  const isActive = activeIndex === SECTION.WAITLIST

  return (
    <>
      <div
        className={`flex flex-col items-center text-center transition-opacity duration-700 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        <motion.div
          initial={false}
          animate={isActive && visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-6 flex flex-col items-center gap-4"
        >
          <img
            src="/dexora-logo.png"
            alt=""
            className="h-20 w-20 rounded-2xl shadow-[0_0_48px_rgba(255,229,0,0.25)] md:h-24 md:w-24"
            style={{ borderRadius: "22%" }}
          />
          <LogoWordmark />
        </motion.div>

        <motion.p
          className="font-mono mb-3 text-[11px] tracking-[0.35em] text-[#3d72ff] md:text-xs"
          initial={false}
          animate={isActive && visible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.2 }}
        >
          AI TRAINER ASSISTANT
        </motion.p>

        <motion.h1
          className="mb-4 max-w-3xl text-[clamp(1.75rem,6vw,3.5rem)] font-extrabold leading-[1.08] tracking-tight text-[#edf0ff]"
          initial={false}
          animate={isActive && visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.65, delay: 0.25 }}
        >
          Your offline{" "}
          <span className="bg-gradient-to-r from-[#ffe500] to-[#ffa800] bg-clip-text text-transparent">
            Pokémon GO
          </span>{" "}
          companion
        </motion.h1>

        <motion.p
          className="mb-8 max-w-lg text-base leading-relaxed text-[#8892b0] md:text-lg"
          initial={false}
          animate={isActive && visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          Join the waitlist for early access. Track your collection, plan battles, and make
          smarter decisions — offline-first.
        </motion.p>

        <motion.div
          className="w-full max-w-md px-2"
          initial={false}
          animate={isActive && visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.6, delay: 0.45 }}
        >
          <WaitlistForm variant="hero" />
        </motion.div>
      </div>

      {isActive && (
        <button
          type="button"
          onClick={goNext}
          className="scroll-indicator safe-bottom-offset absolute left-1/2 flex min-h-[44px] min-w-[44px] -translate-x-1/2 flex-col items-center justify-center gap-1 text-[#6b7494] transition active:text-[#ffe500] md:hidden"
          aria-label="Zoom to explore"
        >
          <span className="text-[10px] tracking-[0.35em]">SCROLL</span>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M12 5v14M5 12l7 7 7-7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}
    </>
  )
}
