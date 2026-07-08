import { SectionShell } from "@/components/section-shell"
import { GooglePlayCta } from "@/components/google-play-cta"
import { StoreBadgesRow } from "@/components/store-badges-row"
import { StaggerItem } from "@/components/section-shell"
import { useTranslation } from "react-i18next"

interface ComingSoonSectionProps {
  sectionIndex: number
}

export function ComingSoonSection({ sectionIndex }: ComingSoonSectionProps) {
  const { t } = useTranslation("landing")

  return (
    <SectionShell index={sectionIndex} id="download">
      <div className="download-section mx-auto w-full max-w-xl px-4 text-center">
        <h2 className="download-headline mb-4">
          <span className="text-[#edf0ff]">{t("download.headlinePrefix")} </span>
          <span className="text-section-purple">{t("download.headlineBrand")}</span>
        </h2>

        <p className="download-copy mx-auto mb-8 max-w-md">
          {t("download.copyPlay")}{" "}
          <span className="text-section-purple">{t("download.copyPlayHighlight")}</span>.{" "}
          <span className="text-[#edf0ff]">{t("download.copyIos")}</span>{" "}
          {t("download.copyIosSuffix")}
        </p>

        <StaggerItem sectionIndex={sectionIndex} index={0}>
          <div className="flex flex-col items-center gap-5">
            <GooglePlayCta />
            <StoreBadgesRow />
          </div>
        </StaggerItem>
      </div>
    </SectionShell>
  )
}
