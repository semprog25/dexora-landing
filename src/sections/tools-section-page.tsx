import { FeatureHighlightCard } from "@/components/feature-highlight-card"
import { PokemonMarquee } from "@/components/pokemon-marquee"
import { SectionEyebrow } from "@/components/section-eyebrow"
import { SectionShell } from "@/components/section-shell"
import { useSpeciesCount } from "@/i18n/use-species-count"
import { useTranslation } from "react-i18next"

interface ToolsSectionPageProps {
  sectionIndex: number
}

export function ToolsSectionPage({ sectionIndex }: ToolsSectionPageProps) {
  const { t } = useTranslation("landing")
  const speciesCount = useSpeciesCount()

  const tools = [
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
  ] as const

  return (
    <SectionShell index={sectionIndex} id="tools">
      <div className="landing-page-panel mx-auto w-full min-w-0 max-w-3xl px-1 text-center sm:px-2">
        <SectionEyebrow accent="pink">{t("tools.eyebrow")}</SectionEyebrow>
        <h2 className="landing-page-headline mb-3 text-[#edf0ff]">{t("tools.headline")}</h2>
        <p className="landing-page-copy mx-auto max-w-md">{t("tools.copy")}</p>

        <PokemonMarquee className="tools-marquee" />

        <div className="tools-grid mx-auto w-full max-w-2xl">
          {tools.map((item, i) => (
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
