import { FeatureHighlightCard } from "@/components/feature-highlight-card"
import { PhoneMockup } from "@/components/phone-mockup"
import { SectionEyebrow } from "@/components/section-eyebrow"
import { SectionShell } from "@/components/section-shell"
import { useTranslation } from "react-i18next"

interface DailyAssistantSectionProps {
  sectionIndex: number
}

export function DailyAssistantSection({ sectionIndex }: DailyAssistantSectionProps) {
  const { t } = useTranslation("landing")

  const pillars = [
    {
      title: t("showcase.coreDailyTitle"),
      text: t("showcase.coreDailyText"),
      accent: "#FFE500",
    },
    {
      title: t("showcase.coreCollectionTitle"),
      text: t("showcase.coreCollectionText"),
      accent: "#3D8EFF",
    },
    {
      title: t("showcase.coreBattleTitle"),
      text: t("showcase.coreBattleText"),
      accent: "#9575CD",
    },
  ] as const

  return (
    <SectionShell index={sectionIndex} id="daily">
      <div className="landing-page-panel mx-auto w-full max-w-3xl px-4 text-center">
        <SectionEyebrow accent="yellow">{t("daily.eyebrow")}</SectionEyebrow>
        <h2 className="landing-page-headline mb-3">
          <span className="text-[#edf0ff]">{t("daily.headline1")} </span>
          <span className="text-gradient-yellow">{t("daily.headlineHighlight")}</span>
        </h2>
        <p className="mx-auto mb-8 max-w-md text-sm leading-relaxed text-[#8892b0] md:text-base">
          {t("daily.copy")}
        </p>

        <PhoneMockup className="mx-auto mb-8 max-w-xs" />

        <div className="daily-pillars mx-auto flex max-w-xl flex-col gap-3">
          {pillars.map((item, i) => (
            <FeatureHighlightCard
              key={item.title}
              title={item.title}
              text={item.text}
              accent={item.accent}
              index={i}
              sectionIndex={sectionIndex}
            />
          ))}
        </div>
      </div>
    </SectionShell>
  )
}
