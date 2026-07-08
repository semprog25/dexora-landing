import { PhoneMockup } from "@/components/phone-mockup"
import { SectionEyebrow } from "@/components/section-eyebrow"
import { SectionShell } from "@/components/section-shell"
import { useTranslation } from "react-i18next"

interface DailyAssistantSectionProps {
  sectionIndex: number
}

export function DailyAssistantSection({ sectionIndex }: DailyAssistantSectionProps) {
  const { t } = useTranslation("landing")

  return (
    <SectionShell index={sectionIndex} id="daily">
      <div className="landing-page-panel landing-page-panel--daily">
        <SectionEyebrow accent="yellow">{t("daily.eyebrow")}</SectionEyebrow>
        <h2 className="landing-page-headline mb-3">
          <span className="text-[#edf0ff]">{t("daily.headline1")} </span>
          <span className="text-gradient-yellow">{t("daily.headlineHighlight")}</span>
        </h2>
        <p className="landing-page-copy">{t("daily.copy")}</p>

        <PhoneMockup className="daily-phone-mockup" />
      </div>
    </SectionShell>
  )
}
