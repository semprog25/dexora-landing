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
      <div className="download-section mx-auto w-full min-w-0 max-w-sm px-1 text-center sm:px-2">
        <h2 className="download-headline mb-3 max-md:mb-2">
          <span className="text-[#edf0ff]">{t("download.headlinePrefix")} </span>
          <span className="text-section-purple">{t("download.headlineBrand")}</span>
        </h2>

        <p className="download-copy mx-auto mb-5 max-w-md max-md:mb-4">{t("download.copy")}</p>

        <StaggerItem sectionIndex={sectionIndex} index={0}>
          <div className="store-cta-row mx-auto flex w-full max-w-xs flex-col items-stretch gap-2.5 sm:max-w-sm sm:flex-row sm:items-start sm:justify-center sm:gap-3">
            <StoreCtaButton platform="google" />
            <StoreCtaButton platform="apple" />
          </div>
        </StaggerItem>
      </div>
    </SectionShell>
  )
}
