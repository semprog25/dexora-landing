export function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-white/[0.07] bg-[#07091a]/90 px-5 py-12 backdrop-blur-md md:px-10" style={{ paddingBottom: "max(3rem, env(safe-area-inset-bottom))" }}>
      <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:justify-between">
        <div className="max-w-md">
          <img
            src="/dexora-logo.png"
            alt="Dexora"
            className="mb-4 h-12 w-12 rounded-xl"
            style={{ borderRadius: "22%" }}
          />
          <p className="text-sm leading-relaxed text-[#6b7494]">
            Dexora is a fan-made companion app for Pokémon GO. By using Dexora, you agree to use
            it for personal, non-commercial reference only.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[#6b7494]">
            Dexora is not affiliated with, endorsed by, or sponsored by Niantic, The Pokémon
            Company, Nintendo, or Creatures Inc. Pokémon and Pokémon GO are trademarks of their
            respective owners.
          </p>
        </div>

        <div className="flex flex-col gap-6 sm:flex-row sm:gap-16">
          <div>
            <h4 className="mb-3 text-xs font-semibold tracking-[0.2em] text-[#8892b0]">LINKS</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://github.com/semprog25/Dexora"
                  className="text-[#edf0ff] transition hover:text-[#ffe500]"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a href="#waitlist" className="text-[#edf0ff] transition hover:text-[#ffe500]">
                  Join Waitlist
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-xs font-semibold tracking-[0.2em] text-[#8892b0]">CONTACT</h4>
            <p className="text-sm text-[#6b7494]">
              Questions? Reach out via GitHub issues on the Dexora repository.
            </p>
          </div>
        </div>
      </div>

      <p className="mx-auto mt-10 max-w-6xl text-center text-xs text-[#6b7494]">
        © {new Date().getFullYear()} Dexora. All rights reserved.
      </p>
    </footer>
  )
}
