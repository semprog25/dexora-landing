import { FeatureHighlightCard } from "@/components/feature-highlight-card"
import { SectionEyebrow } from "@/components/section-eyebrow"
import { SectionShell } from "@/components/section-shell"
import { useTranslation } from "react-i18next"

interface CommunitySectionPageProps {
  sectionIndex: number
}

export function CommunitySectionPage({ sectionIndex }: CommunitySectionPageProps) {
  const { t } = useTranslation("landing")

  const cards = [
    {
      title: t("showcase.highlightCommunityTitle"),
      text: t("showcase.highlightCommunityText"),
      accent: "#FF6EC7",
    },
    {
      title: t("showcase.highlightLanguagesTitle"),
      text: t("showcase.highlightLanguagesText"),
      accent: "#FFE500",
    },
  ] as const

  return (
    <SectionShell index={sectionIndex} id="community">
      <div className="landing-page-panel mx-auto w-full max-w-xl px-3 text-center max-md:px-2 sm:px-4">
        <SectionEyebrow accent="blue">{t("community.eyebrow")}</SectionEyebrow>
        <h2 className="landing-page-headline mb-3 text-[#edf0ff]">{t("community.headline")}</h2>
        <p className="landing-page-copy mx-auto max-w-md">{t("community.copy")}</p>

        <div className="community-cards mx-auto grid w-full max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2">
          {cards.map((item, i) => (
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
    </SectionShell>
  )
}
