import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import {
  DEFAULT_LANGUAGE_CODE,
  DEXORA_LANGUAGES,
  getLanguage,
  isRtlLanguage,
  normalizeLanguageCode,
} from "./languages"
import { loadPersistedLanguageSync, persistLanguageSync } from "./persistence"

import enLanding from "../locales/en/landing.json"
import deLanding from "../locales/de/landing.json"
import frLanding from "../locales/fr/landing.json"
import esLanding from "../locales/es/landing.json"
import itLanding from "../locales/it/landing.json"
import ptLanding from "../locales/pt/landing.json"
import ruLanding from "../locales/ru/landing.json"
import jaLanding from "../locales/ja/landing.json"
import koLanding from "../locales/ko/landing.json"
import zhHansLanding from "../locales/zh-Hans/landing.json"
import zhHantLanding from "../locales/zh-Hant/landing.json"
import arLanding from "../locales/ar/landing.json"
import heLanding from "../locales/he/landing.json"

const resources = {
  en: { landing: enLanding },
  de: { landing: deLanding },
  fr: { landing: frLanding },
  es: { landing: esLanding },
  it: { landing: itLanding },
  pt: { landing: ptLanding },
  ru: { landing: ruLanding },
  ja: { landing: jaLanding },
  ko: { landing: koLanding },
  "zh-Hans": { landing: zhHansLanding },
  "zh-Hant": { landing: zhHantLanding },
  ar: { landing: arLanding },
  he: { landing: heLanding },
}

function applyDocumentLanguage(code: string): void {
  if (typeof document === "undefined") return
  const lang = getLanguage(code)
  document.documentElement.lang = code
  document.documentElement.dir = lang.direction
  document.documentElement.dataset.locale = code
  document.documentElement.style.setProperty("--dexora-font-family", lang.fontFamily)
  document.body.style.fontFamily = lang.fontFamily
}

let initPromise: Promise<typeof i18n> | null = null

export async function initI18n(preferredCode?: string): Promise<typeof i18n> {
  if (initPromise) return initPromise

  initPromise = (async () => {
    const savedCode = preferredCode ?? loadPersistedLanguageSync()
    const browserLang = typeof navigator !== "undefined" ? navigator.language : "en"
    const matchedBrowser = DEXORA_LANGUAGES.find(
      lang => browserLang === lang.code || browserLang.startsWith(`${lang.code}-`),
    )?.code
    const normalizedSaved = normalizeLanguageCode(savedCode)
    const normalizedBrowser = matchedBrowser ? normalizeLanguageCode(matchedBrowser) : null
    const initialCode =
      resources[normalizedSaved as keyof typeof resources]
        ? normalizedSaved
        : normalizedBrowser && resources[normalizedBrowser as keyof typeof resources]
          ? normalizedBrowser
          : DEFAULT_LANGUAGE_CODE

    await i18n.use(initReactI18next).init({
      lng: initialCode,
      fallbackLng: DEFAULT_LANGUAGE_CODE,
      supportedLngs: Object.keys(resources),
      nonExplicitSupportedLngs: true,
      load: "languageOnly",
      ns: ["landing"],
      defaultNS: "landing",
      resources,
      interpolation: { escapeValue: false },
      react: { useSuspense: false, bindI18n: "languageChanged", bindI18nStore: "added removed" },
      returnEmptyString: false,
    })

    applyDocumentLanguage(initialCode)
    return i18n
  })()

  return initPromise
}

export async function changeLanguage(code: string): Promise<void> {
  const normalizedCode = normalizeLanguageCode(code)
  persistLanguageSync(normalizedCode)
  applyDocumentLanguage(normalizedCode)
  await i18n.changeLanguage(normalizedCode)
}

export function getI18n() {
  return i18n
}

export { applyDocumentLanguage, isRtlLanguage }
