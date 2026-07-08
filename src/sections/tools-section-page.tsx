import { PokemonMarquee } from "@/components/pokemon-marquee"
import { SectionEyebrow } from "@/components/section-eyebrow"
import { SectionShell } from "@/components/section-shell"
import { useTranslation } from "react-i18next"

interface ToolsSectionPageProps {
  sectionIndex: number
}

export function ToolsSectionPage({ sectionIndex }: ToolsSectionPageProps) {
  const { t } = useTranslation("landing")

  return (
    <SectionShell index={sectionIndex} id="tools">
      <div className="landing-page-panel tools-intro">
        <SectionEyebrow accent="pink">{t("tools.eyebrow")}</SectionEyebrow>
        <h2 className="landing-page-headline mb-3 text-[#edf0ff]">
          <span className="block">{t("tools.headline1")}</span>
          <span className="text-gradient-pink block">{t("tools.headline2")}</span>
        </h2>
        <p className="landing-page-copy mx-auto max-w-md">{t("tools.copy")}</p>

        <PokemonMarquee className="tools-marquee" />
      </div>
    </SectionShell>
  )
}
