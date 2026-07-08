import { DexoraLogo } from "@/components/dexora-logo"
import { LegalLink } from "@/components/legal-link"
import { LegalNav } from "@/components/legal-nav"
import { LanguageSwitcher } from "@/components/language-switcher"
import {
  LEGAL_EFFECTIVE_DATE,
  LEGAL_PAGES,
  type LegalSlug,
} from "@/lib/legal-content"
import { useTranslation } from "react-i18next"

interface LegalPageProps {
  slug: LegalSlug
}

const LEGAL_SLUGS: LegalSlug[] = ["privacy", "terms", "delete-account", "contact", "feedback"]

export function LegalPage({ slug }: LegalPageProps) {
  const { t } = useTranslation("landing")
  const doc = LEGAL_PAGES[slug]

  return (
    <div className="legal-page min-h-dvh bg-[#07091a] text-[#edf0ff]">
      <LanguageSwitcher />
      <LegalNav variant="header" />

      <main className="mx-auto max-w-2xl px-5 pb-16 pt-20 sm:px-6 sm:pt-24">
        <div className="mb-8 flex justify-center">
          <LegalLink href="/">
            <DexoraLogo height={64} className="footer-logo-glow" alt="Dexora home" />
          </LegalLink>
        </div>

        <p className="section-eyebrow mb-3 text-center text-[#64d9ff]">{t("legalPage.brand")}</p>
        <h1 className="mb-2 text-center text-2xl font-bold tracking-tight sm:text-3xl">
          {t(`legal.${slug}.title`)}
        </h1>
        <p className="mx-auto mb-2 max-w-lg text-center text-sm leading-relaxed text-[#8892b0]">
          {t(`legal.${slug}.description`)}
        </p>
        <p className="mb-8 text-center text-xs text-[#6b7494]">
          {t("legalPage.effective", { date: LEGAL_EFFECTIVE_DATE })}
        </p>

        <div className="space-y-4">
          {doc.sections.map((section) => (
            <section
              key={section.heading}
              className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4 sm:p-5"
            >
              <h2 className="mb-2 text-sm font-bold text-[#edf0ff]">{section.heading}</h2>
              <p className="text-sm leading-relaxed text-[#8892b0]">{section.body}</p>
            </section>
          ))}
        </div>

        {(slug === "contact" || slug === "feedback" || slug === "delete-account") && (
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <a
              href="mailto:support@dexora.app?subject=Dexora%20Account%20Deletion%20Request"
              className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-[#64d9ff] px-6 py-3 text-sm font-semibold text-[#07091a] transition hover:shadow-[0_0_24px_rgba(100,217,255,0.35)]"
            >
              {t("legalPage.emailSupport")}
            </a>
            {slug === "delete-account" && (
              <a
                href="/privacy"
                className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-white/10 px-6 py-3 text-sm font-semibold text-[#edf0ff] transition hover:border-[#64d9ff]/40"
              >
                {t("legalPage.privacyPolicy")}
              </a>
            )}
          </div>
        )}

        <div className="mt-10 flex flex-wrap justify-center gap-4 border-t border-white/[0.06] pt-8">
          <LegalLink href="/" className="text-sm font-semibold text-[#ffe500] hover:underline">
            {t("legalPage.backHome")}
          </LegalLink>
          {LEGAL_SLUGS.filter(linkSlug => linkSlug !== slug).map(linkSlug => (
            <LegalLink
              key={linkSlug}
              href={`/${linkSlug}`}
              className="text-sm text-[#6b7494] transition hover:text-[#64d9ff]"
            >
              {t(`nav.${linkSlug === "delete-account" ? "deleteAccount" : linkSlug}`)}
            </LegalLink>
          ))}
        </div>
      </main>
    </div>
  )
}
