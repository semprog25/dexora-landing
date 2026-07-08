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
      <div className="landing-page-panel mx-auto w-full max-w-xl px-4 text-center">
        <SectionEyebrow accent="blue">{t("community.eyebrow")}</SectionEyebrow>
        <h2 className="landing-page-headline mb-3 text-[#edf0ff]">{t("community.headline")}</h2>
        <p className="mx-auto mb-8 max-w-md text-sm leading-relaxed text-[#8892b0] md:text-base">
          {t("community.copy")}
        </p>

        <div className="community-cards mx-auto flex max-w-lg flex-col gap-4">
          {cards.map((item, i) => (
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
