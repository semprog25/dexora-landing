import { LogoWordmark } from "@/components/logo-wordmark"

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#features", label: "Features" },
  { href: "#tools", label: "Tools" },
  { href: "#waitlist", label: "Waitlist" },
]

export function SiteHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.05] bg-[#07091a]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-10">
        <a href="#home" className="flex items-center gap-3" aria-label="Dexora home">
          <img
            src="/dexora-logo.png"
            alt=""
            className="h-9 w-9 rounded-lg"
            style={{ borderRadius: "22%" }}
          />
          <LogoWordmark size="sm" />
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[#8892b0] transition hover:text-[#ffe500]"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#waitlist"
            className="rounded-full bg-[#ffe500] px-5 py-2 text-sm font-semibold text-[#07091a] transition hover:shadow-[0_0_24px_rgba(255,229,0,0.4)]"
          >
            Join Waitlist
          </a>
        </nav>
      </div>
    </header>
  )
}
