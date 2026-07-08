import { DexoraDLogo } from "@/components/dexora-d-logo"
import { GooglePlayCta } from "@/components/google-play-cta"
import { PhoneMockup } from "@/components/phone-mockup"
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
  const isActive = activeIndex === SECTION.WAITLIST

  const benefits = [
    { emoji: "📅", label: t("hero.benefitDaily"), color: "#FFE500" },
    { emoji: "🏆", label: t("hero.benefitCollection"), color: "#3D8EFF" },
    { emoji: "⚔️", label: t("hero.benefitBattle"), color: "#9575CD" },
  ] as const

  return (
    <div
      className={`hero-waitlist mx-auto flex w-full max-w-5xl flex-col items-center justify-center px-4 transition-opacity duration-700 sm:px-6 lg:flex-row lg:items-center lg:gap-12 lg:text-left ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <motion.div
        initial={false}
        animate={isActive && visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="flex w-full max-w-xl flex-col items-center lg:items-start lg:flex-1"
      >
        <DexoraDLogo height={56} className="mb-6 sm:mb-7 lg:mx-0" alt="Dexora" />
        <p className="section-eyebrow mb-4 text-[#8892b0]">{t("hero.eyebrow")}</p>
        <h1 className="display-headline mb-5 w-full text-center lg:text-left sm:mb-6">
          <span className="block text-[#edf0ff]">{t("hero.headline1")}</span>
          <span className="text-gradient-yellow block">{t("hero.headline2")}</span>
          <span className="block text-[#edf0ff]">{t("hero.headline3")}</span>
        </h1>

        <p className="hero-waitlist-copy mx-auto mb-6 max-w-md text-base leading-relaxed text-[#8892b0] lg:mx-0 md:text-lg">
          {t("hero.copy")}
        </p>

        <div className="mb-6 flex w-full flex-wrap justify-center gap-2 lg:justify-start">
          {benefits.map(({ emoji, label, color }) => (
            <span
              key={label}
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold"
              style={{ color, background: `${color}14`, border: `1px solid ${color}30` }}
            >
              <span aria-hidden>{emoji}</span>
              {label}
            </span>
          ))}
        </div>

        <div className="mb-5 flex w-full flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
          <GooglePlayCta />
          <p className="text-xs text-[#6b7494]">{t("hero.playStoreNote")}</p>
        </div>

        <div className="w-full max-w-md">
          <p className="mb-3 text-center text-xs font-semibold uppercase tracking-[0.2em] text-[#6b7494] lg:text-left">
            {t("hero.waitlistEyebrow")}
          </p>
          <WaitlistForm variant="hero" />
        </div>
      </motion.div>

      <motion.div
        initial={false}
        animate={isActive && visible ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 24, scale: 0.96 }}
        transition={{ duration: 0.9, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        className="mt-10 w-full max-w-sm shrink-0 lg:mt-0"
      >
        <PhoneMockup />
      </motion.div>
    </div>
  )
}
