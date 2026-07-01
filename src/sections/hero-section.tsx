import { SectionShell } from "@/components/section-shell"
import { WaitlistForm } from "@/components/waitlist-form"
import { LogoWordmark } from "@/components/logo-wordmark"
import { motion } from "motion/react"

export function HeroSection() {
  function scrollToAbout() {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <SectionShell id="home" className="!justify-center pt-24">
      <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 flex items-center gap-4"
        >
          <img
            src="/dexora-logo.png"
            alt=""
            className="h-16 w-16 rounded-2xl shadow-[0_0_40px_rgba(255,229,0,0.2)]"
            style={{ borderRadius: "22%" }}
          />
          <LogoWordmark />
        </motion.div>

        <motion.p
          className="font-mono mb-4 text-xs tracking-[0.35em] text-[#3d72ff]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
        >
          AI TRAINER ASSISTANT
        </motion.p>

        <motion.h1
          className="mb-6 max-w-4xl text-4xl font-extrabold leading-[1.1] tracking-tight text-[#edf0ff] md:text-6xl lg:text-7xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          Your offline{" "}
          <span className="bg-gradient-to-r from-[#ffe500] to-[#ffa800] bg-clip-text text-transparent">
            Pokémon GO
          </span>{" "}
          companion
        </motion.h1>

        <motion.p
          className="mb-10 max-w-2xl text-lg text-[#8892b0] md:text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
        >
          Track your collection, plan battles, and make smarter decisions — your progress syncs
          to the cloud automatically.
        </motion.p>

        <motion.div
          className="w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <WaitlistForm variant="hero" />
        </motion.div>
      </div>

      <button
        type="button"
        onClick={scrollToAbout}
        className="scroll-indicator absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[#6b7494] transition hover:text-[#ffe500]"
        aria-label="Scroll to learn more"
      >
        <span className="text-xs tracking-[0.3em]">SCROLL</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M12 5v14M5 12l7 7 7-7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </SectionShell>
  )
}
