import { SectionShell } from "@/components/section-shell"
import { SectionEyebrow } from "@/components/section-eyebrow"
import { FeatureHighlightCard } from "@/components/feature-highlight-card"
import { GooglePlayCta } from "@/components/google-play-cta"
import { PhoneMockup } from "@/components/phone-mockup"
import { useSpeciesCount } from "@/i18n/use-species-count"
import { useTranslation } from "react-i18next"

interface ShowcaseSectionProps {
  sectionIndex: number
}

export function ShowcaseSection({ sectionIndex }: ShowcaseSectionProps) {
  const { t } = useTranslation("landing")
  const speciesCount = useSpeciesCount()

  const coreBenefits = [
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

  const highlights = [
    {
      title: t("showcase.highlightVisionTitle"),
      text: t("showcase.highlightVisionText"),
      accent: "#FF6EC7",
    },
    {
      title: t("showcase.highlightCatchTitle"),
      text: t("showcase.highlightCatchText"),
      accent: "#FF8C42",
    },
    {
      title: t("showcase.highlightPokedexTitle"),
      text: t("showcase.highlightPokedexText", { speciesCount }),
      accent: "#3DBD62",
    },
    {
      title: t("showcase.highlightEventsTitle"),
      text: t("showcase.highlightEventsText"),
      accent: "#64D9FF",
    },
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
    <SectionShell index={sectionIndex} id="explore">
      <div className="showcase-panel mx-auto w-full max-w-5xl px-2 text-center">
        <SectionEyebrow accent="blue">{t("showcase.eyebrow")}</SectionEyebrow>
        <h2 className="showcase-headline mb-2">
          <span className="block text-[#edf0ff]">{t("showcase.headline1")}</span>
          <span className="block text-[#edf0ff]">
            {t("showcase.headline2")}{" "}
            <span className="text-section-blue">{t("showcase.headlineHighlight")}</span>
          </span>
        </h2>
        <p className="mx-auto mb-8 max-w-lg text-sm leading-relaxed text-[#8892b0] md:text-base">
          {t("showcase.copy")}
        </p>

        <div className="showcase-split mx-auto mb-8 grid max-w-4xl grid-cols-1 items-center gap-8 md:grid-cols-2 md:text-left">
          <PhoneMockup className="mx-auto md:mx-0" />
          <div className="feature-blocks-grid mx-auto md:mx-0">
            {coreBenefits.map((item, i) => (
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

        <div className="feature-blocks-grid mx-auto mt-2 max-w-3xl">
          {highlights.map((item, i) => (
            <FeatureHighlightCard
              key={item.title}
              title={item.title}
              text={item.text}
              accent={item.accent}
              index={i + 3}
              sectionIndex={sectionIndex}
            />
          ))}
        </div>

        <div className="mt-8 flex flex-col items-center gap-3">
          <GooglePlayCta />
          <p className="text-xs text-[#6b7494]">
            {t("showcase.ctaNote", { speciesCount })}
          </p>
        </div>
      </div>
    </SectionShell>
  )
}
