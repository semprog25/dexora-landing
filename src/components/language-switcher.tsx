import { useEffect, useMemo, useRef, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { useTranslation } from "react-i18next"
import { changeLanguage } from "@/i18n/config"
import { DEXORA_LANGUAGES, getLanguage, type DexoraLanguage } from "@/i18n/languages"

export function LanguageSwitcher() {
  const { t, i18n } = useTranslation("landing")
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState("")
  const panelRef = useRef<HTMLDivElement>(null)
  const current = getLanguage(i18n.language)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return [...DEXORA_LANGUAGES].sort((a, b) => a.englishName.localeCompare(b.englishName))
    return DEXORA_LANGUAGES.filter(
      lang =>
        lang.englishName.toLowerCase().includes(q)
        || lang.nativeName.toLowerCase().includes(q)
        || lang.code.toLowerCase().includes(q),
    ).sort((a, b) => a.englishName.localeCompare(b.englishName))
  }, [query])

  useEffect(() => {
    if (!isOpen) return

    function handlePointerDown(event: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false)
    }

    document.addEventListener("mousedown", handlePointerDown)
    document.addEventListener("keydown", handleEscape)
    return () => {
      document.removeEventListener("mousedown", handlePointerDown)
      document.removeEventListener("keydown", handleEscape)
    }
  }, [isOpen])

  async function handleSelect(lang: DexoraLanguage) {
    await changeLanguage(lang.code)
    setIsOpen(false)
    setQuery("")
  }

  return (
    <div ref={panelRef} className="language-switcher pointer-events-auto fixed left-0 top-0 z-[70]">
      <button
        type="button"
        onClick={() => setIsOpen(open => !open)}
        className="language-switcher-trigger m-3 flex min-h-[40px] items-center gap-2 rounded-full border border-white/10 bg-[#07091a]/80 px-3 py-2 text-xs font-semibold text-[#edf0ff] backdrop-blur-md transition hover:border-[#64d9ff]/40 hover:text-[#64d9ff] sm:m-4 sm:px-4 sm:text-sm"
        style={{ marginTop: "max(0.75rem, env(safe-area-inset-top))" }}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={t("language.choose")}
      >
        <span aria-hidden>{current.flag}</span>
        <span className="hidden sm:inline">{current.nativeName}</span>
        <span className="sm:hidden">{current.code.toUpperCase()}</span>
        <svg
          className={`h-3.5 w-3.5 opacity-70 transition ${isOpen ? "rotate-180" : ""}`}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="language-switcher-panel absolute left-3 top-full mt-1 w-[min(calc(100vw-1.5rem),320px)] overflow-hidden rounded-2xl border border-white/10 bg-[#0a0e22]/95 shadow-[0_24px_64px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:left-4"
            role="dialog"
            aria-label={t("language.title")}
          >
            <div className="border-b border-white/[0.06] p-3">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#64d9ff]">
                {t("language.title")}
              </p>
              <input
                type="search"
                value={query}
                onChange={event => setQuery(event.target.value)}
                placeholder={t("language.searchPlaceholder")}
                aria-label={t("language.searchPlaceholder")}
                className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm text-[#edf0ff] outline-none placeholder:text-[#6b7494] focus:border-[#64d9ff]/40"
              />
              <p className="mt-2 text-[10px] text-[#6b7494]">{t("language.previewHint")}</p>
            </div>

            <ul
              className="max-h-[min(60vh,420px)] overflow-y-auto p-2"
              role="listbox"
              aria-label={t("language.title")}
            >
              {filtered.map(lang => {
                const isSelected = lang.code === i18n.language
                return (
                  <li key={lang.code}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => void handleSelect(lang)}
                      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-start transition ${
                        isSelected
                          ? "bg-[#ffe500]/12 text-[#ffe500]"
                          : "text-[#edf0ff] hover:bg-white/[0.06]"
                      }`}
                    >
                      <span className="text-lg" aria-hidden>
                        {lang.flag}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-semibold">{lang.nativeName}</span>
                        <span className="block truncate text-xs text-[#6b7494]">{lang.englishName}</span>
                      </span>
                      {isSelected && (
                        <span className="text-xs font-bold text-[#ffe500]" aria-hidden>
                          ✓
                        </span>
                      )}
                    </button>
                  </li>
                )
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
