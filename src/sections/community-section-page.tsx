import { FeatureHighlightCard } from "@/components/feature-highlight-card"
import { SectionEyebrow } from "@/components/section-eyebrow"
import { SectionShell } from "@/components/section-shell"
import { useToolHighlights } from "@/lib/tool-highlights"
import { useTranslation } from "react-i18next"

interface CommunitySectionPageProps {
  sectionIndex: number
}

export function CommunitySectionPage({ sectionIndex }: CommunitySectionPageProps) {
  const { t } = useTranslation("landing")
  const tools = useToolHighlights().slice(0, 3)

  return (
    <SectionShell index={sectionIndex} id="community">
      <div className="landing-page-panel landing-page-panel--community">
        <SectionEyebrow accent="blue">{t("community.eyebrow")}</SectionEyebrow>
        <h2 className="landing-page-headline mb-3 text-[#edf0ff]">{t("community.headline")}</h2>
        <p className="landing-page-copy">{t("community.copy")}</p>

        <div className="community-cards">
          {tools.map((item, i) => (
            <FeatureHighlightCard
              key={item.id}
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
    </SectionShell>
  )
}
