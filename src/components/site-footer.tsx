export function SiteFooter() {
  return (
    <footer
      className="relative z-10 border-t border-white/[0.07] bg-transparent px-5 py-8 text-center md:px-10"
      style={{ paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))" }}
    >
      <img
        src="/dexora-logo.png"
        alt="Dexora"
        className="mx-auto mb-4 h-12 w-12 rounded-xl"
        style={{ borderRadius: "22%" }}
      />
      <p className="mx-auto max-w-md text-sm leading-relaxed text-[#6b7494]">
        Dexora is a fan-made companion app for Pokémon GO. By using Dexora, you agree to use it
        for personal, non-commercial reference only.
      </p>
      <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[#6b7494]">
        Dexora is not affiliated with, endorsed by, or sponsored by Niantic, The Pokémon Company,
        Nintendo, or Creatures Inc. Pokémon and Pokémon GO are trademarks of their respective
        owners.
      </p>

      <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-10">
        <a
          href="https://github.com/semprog25/Dexora"
          className="text-sm text-[#edf0ff] transition hover:text-[#ffe500]"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        <a href="#home" className="text-sm text-[#edf0ff] transition hover:text-[#ffe500]">
          Join Waitlist
        </a>
      </div>

      <p className="mx-auto mt-8 text-xs text-[#6b7494]">
        © {new Date().getFullYear()} Dexora. All rights reserved.
      </p>
    </footer>
  )
}
