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
      <div className="download-section mx-auto w-full max-w-xl px-3 text-center max-md:px-2 sm:px-4">
        <h2 className="download-headline mb-4">
          <span className="text-[#edf0ff]">{t("download.headlinePrefix")} </span>
          <span className="text-section-purple">{t("download.headlineBrand")}</span>
        </h2>

        <p className="download-copy mx-auto mb-8 max-w-md">{t("download.copy")}</p>

        <StaggerItem sectionIndex={sectionIndex} index={0}>
          <div className="store-cta-row mx-auto flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-start sm:justify-center">
            <StoreCtaButton platform="google" />
            <StoreCtaButton platform="apple" />
          </div>
        </StaggerItem>
      </div>
    </SectionShell>
  )
}
