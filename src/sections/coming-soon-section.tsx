import { SectionShell } from "@/components/section-shell"
import { StoreCtaButton } from "@/components/store-cta-button"
import { StaggerItem } from "@/components/section-shell"
import { useTranslation } from "react-i18next"

interface ComingSoonSectionProps {
  sectionIndex: number
}

export function ComingSoonSection({ sectionIndex }: ComingSoonSectionProps) {
  const { t } = useTranslation("landing")

  return (
    <SectionShell index={sectionIndex} id="download">
      <div className="download-section download-cta-panel">
        <p className="download-explore-label zoom-hint-label mb-4 max-md:mb-3">
          {t("download.exploreLabel")}
        </p>

        <h2 className="download-headline mb-3 max-md:mb-2">
          <span className="text-[#edf0ff]">{t("download.headlinePrefix")} </span>
          <span className="text-section-purple">{t("download.headlineBrand")}</span>
        </h2>

        <p className="download-copy mb-5 max-md:mb-4">{t("download.copy")}</p>

        <StaggerItem sectionIndex={sectionIndex} index={0}>
          <div className="store-cta-row">
            <StoreCtaButton platform="google" />
            <StoreCtaButton platform="apple" />
          </div>
        </StaggerItem>
      </div>
    </SectionShell>
  )
}
