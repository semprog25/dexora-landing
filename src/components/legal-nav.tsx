import { LegalLink } from "@/components/legal-link"
import { LEGAL_LINKS } from "@/lib/legal-content"

interface LegalNavProps {
  variant?: "header" | "footer"
}

export function LegalNav({ variant = "header" }: LegalNavProps) {
  const isHeader = variant === "header"

  return (
    <nav
      className={
        isHeader
          ? "legal-nav-header pointer-events-auto fixed right-0 top-0 z-[60] flex flex-wrap items-center justify-end gap-x-3 gap-y-1 px-4 py-3 sm:gap-x-4 sm:px-5"
          : "legal-nav-footer mx-auto mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2"
      }
      aria-label="Legal and support"
      style={isHeader ? { paddingTop: "max(0.75rem, env(safe-area-inset-top))" } : undefined}
    >
      {LEGAL_LINKS.map((link) => (
        <LegalLink
          key={link.slug}
          href={link.href}
          className={
            isHeader
              ? "legal-nav-link text-[10px] font-medium uppercase tracking-[0.18em] text-[#6b7494] transition hover:text-[#64d9ff] sm:text-[11px]"
              : "legal-nav-link text-xs text-[#6b7494] transition hover:text-[#64d9ff]"
          }
        >
          {link.label}
        </LegalLink>
      ))}
    </nav>
  )
}
