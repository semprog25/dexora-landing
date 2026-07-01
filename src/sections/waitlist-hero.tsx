import { DexoraDLogo } from "@/components/dexora-d-logo"
import { WaitlistForm } from "@/components/waitlist-form"
import { motion } from "motion/react"
import { useZoomScene } from "@/components/zoom-scene"
import { SECTION } from "@/lib/sections"
import { GO_AVAILABLE_OR_PLANNED_SPECIES } from "@/lib/go-metadata"

interface WaitlistHeroProps {
  visible: boolean
}

export function WaitlistHero({ visible }: WaitlistHeroProps) {
  const { activeIndex } = useZoomScene()
  const isActive = activeIndex === SECTION.WAITLIST

  return (
    <div
      className={`hero-waitlist mx-auto flex w-full max-w-2xl flex-col items-center justify-center px-4 text-center transition-opacity duration-700 sm:px-6 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <motion.div
        initial={false}
        animate={isActive && visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="flex w-full max-w-xl flex-col items-center"
      >
        <DexoraDLogo height={56} className="mb-6 sm:mb-7" alt="Dexora" />
        <h1 className="display-headline mb-5 w-full text-center sm:mb-6">
          <span className="block text-[#edf0ff]">Your offline</span>
          <span className="text-gradient-yellow block">Pokémon GO</span>
          <span className="block text-[#edf0ff]">companion</span>
        </h1>

        <p className="hero-waitlist-copy mx-auto mb-7 max-w-md text-base leading-relaxed text-[#8892b0] sm:mb-8 md:text-lg">
          Join the waitlist for early access.{" "}
          <span className="text-[#edf0ff]">{GO_AVAILABLE_OR_PLANNED_SPECIES} species</span>, offline
          stats, and smarter battle tools — no signal required.
        </p>

        <WaitlistForm variant="hero" />
      </motion.div>
    </div>
  )
}
