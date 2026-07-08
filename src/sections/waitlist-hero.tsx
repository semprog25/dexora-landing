import { DexoraDLogo } from "@/components/dexora-d-logo"
import { WaitlistForm } from "@/components/waitlist-form"
import { motion } from "motion/react"
import { useTranslation } from "react-i18next"
import { useZoomScene } from "@/components/zoom-scene"
import { SECTION } from "@/lib/sections"

interface WaitlistHeroProps {
  visible: boolean
}

export function WaitlistHero({ visible }: WaitlistHeroProps) {
  const { t } = useTranslation("landing")
  const { activeIndex } = useZoomScene()
  const isActive = activeIndex === SECTION.HOME

  return (
    <div
      className={`home-hero mx-auto flex w-full max-w-lg flex-col items-center justify-center px-2 text-center transition-opacity duration-700 max-md:px-1 sm:px-4 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <motion.div
        initial={false}
        animate={isActive && visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className="home-hero-inner w-full"
      >
        <DexoraDLogo height={52} className="home-hero-logo mx-auto mb-6 max-md:mb-5 max-md:h-[42px]" alt="Dexora" />

        <h1 className="home-hero-headline mb-4 max-md:mb-3">
          <span className="block text-[#edf0ff]">{t("hero.headline1")}</span>
          <span className="text-gradient-yellow block">{t("hero.headline2")}</span>
          <span className="block text-[#edf0ff]">{t("hero.headline3")}</span>
        </h1>

        <p className="home-hero-copy mx-auto mb-6 max-w-md text-base leading-relaxed text-[#8892b0] max-md:mb-5 max-md:text-[0.9rem] md:text-[1.05rem]">
          {t("hero.copy")}
        </p>

        <WaitlistForm variant="hero" />
      </motion.div>
    </div>
  )
}
