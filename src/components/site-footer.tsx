import { DexoraLogo } from "@/components/dexora-logo"
import { LegalNav } from "@/components/legal-nav"
import { LEGAL_DISCLAIMER, LEGAL_SUBSCRIPTION_NOTE } from "@/lib/legal"
import { useTranslation } from "react-i18next"

export function SiteFooter() {
  const { t } = useTranslation("landing")

  return (
    <footer
      className="footer-section relative z-10 bg-transparent px-5 py-8 text-center md:px-10"
      style={{ paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))" }}
    >
      <div className="footer-logo-wrap mx-auto mb-6 flex justify-center">
        <DexoraLogo fluid className="footer-logo-glow" alt="Dexora" />
      </div>
      <p className="mx-auto max-w-md text-sm leading-relaxed text-[#6b7494]">
        {LEGAL_DISCLAIMER}
      </p>
      <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[#6b7494]">
        {LEGAL_SUBSCRIPTION_NOTE}
      </p>

      <LegalNav variant="footer" />

      <a
        href="mailto:support@dexora.app"
        className="footer-contact-btn mx-auto mt-6 inline-flex min-h-[48px] items-center justify-center rounded-full px-8 py-3 text-sm font-semibold transition"
      >
        {t("footer.contact")}
      </a>

      <p className="mx-auto mt-6 text-xs text-[#6b7494]">
        {t("footer.rights", { year: new Date().getFullYear() })}
      </p>
    </footer>
  )
}
