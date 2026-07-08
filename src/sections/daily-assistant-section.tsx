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
      <div className="landing-page-panel mx-auto w-full max-w-3xl px-3 text-center max-md:px-2 sm:px-4">
        <SectionEyebrow accent="yellow">{t("daily.eyebrow")}</SectionEyebrow>
        <h2 className="landing-page-headline mb-3">
          <span className="text-[#edf0ff]">{t("daily.headline1")} </span>
          <span className="text-gradient-yellow">{t("daily.headlineHighlight")}</span>
        </h2>
        <p className="landing-page-copy mx-auto max-w-md">{t("daily.copy")}</p>

        <div className="daily-split mx-auto grid w-full max-w-4xl grid-cols-1 items-center gap-6 md:grid-cols-[minmax(0,240px)_1fr] md:gap-8">
          <PhoneMockup className="mx-auto w-full max-w-[240px] md:mx-0 md:justify-self-center" />

          <div className="daily-pillars flex w-full flex-col gap-3">
            {pillars.map((item, i) => (
              <FeatureHighlightCard
                key={item.title}
                title={item.title}
                text={item.text}
                accent={item.accent}
                index={i}
                sectionIndex={sectionIndex}
                variant="landing"
              />
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  )
}
