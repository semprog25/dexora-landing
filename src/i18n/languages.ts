export interface DexoraLanguage {
  code: string
  englishName: string
  nativeName: string
  flag: string
  intlLocale: string
  direction: "ltr" | "rtl"
  fontFamily: string
}

export const DEXORA_LANGUAGES: DexoraLanguage[] = [
  {
    code: "en",
    englishName: "English",
    nativeName: "English",
    flag: "🇬🇧",
    intlLocale: "en-US",
    direction: "ltr",
    fontFamily: "'Inter', 'SF Pro Text', system-ui, sans-serif",
  },
  {
    code: "de",
    englishName: "German",
    nativeName: "Deutsch",
    flag: "🇩🇪",
    intlLocale: "de-DE",
    direction: "ltr",
    fontFamily: "'Inter', 'SF Pro Text', system-ui, sans-serif",
  },
  {
    code: "fr",
    englishName: "French",
    nativeName: "Français",
    flag: "🇫🇷",
    intlLocale: "fr-FR",
    direction: "ltr",
    fontFamily: "'Inter', 'SF Pro Text', system-ui, sans-serif",
  },
  {
    code: "es",
    englishName: "Spanish",
    nativeName: "Español",
    flag: "🇪🇸",
    intlLocale: "es-ES",
    direction: "ltr",
    fontFamily: "'Inter', 'SF Pro Text', system-ui, sans-serif",
  },
  {
    code: "it",
    englishName: "Italian",
    nativeName: "Italiano",
    flag: "🇮🇹",
    intlLocale: "it-IT",
    direction: "ltr",
    fontFamily: "'Inter', 'SF Pro Text', system-ui, sans-serif",
  },
  {
    code: "pt",
    englishName: "Portuguese",
    nativeName: "Português",
    flag: "🇵🇹",
    intlLocale: "pt-PT",
    direction: "ltr",
    fontFamily: "'Inter', 'SF Pro Text', system-ui, sans-serif",
  },
  {
    code: "ru",
    englishName: "Russian",
    nativeName: "Русский",
    flag: "🇷🇺",
    intlLocale: "ru-RU",
    direction: "ltr",
    fontFamily: "'Inter', 'SF Pro Text', system-ui, sans-serif",
  },
  {
    code: "ja",
    englishName: "Japanese",
    nativeName: "日本語",
    flag: "🇯🇵",
    intlLocale: "ja-JP",
    direction: "ltr",
    fontFamily: "'Noto Sans JP', 'Hiragino Sans', 'Yu Gothic', sans-serif",
  },
  {
    code: "ko",
    englishName: "Korean",
    nativeName: "한국어",
    flag: "🇰🇷",
    intlLocale: "ko-KR",
    direction: "ltr",
    fontFamily: "'Noto Sans KR', 'Apple SD Gothic Neo', sans-serif",
  },
  {
    code: "zh-Hans",
    englishName: "Chinese (Simplified)",
    nativeName: "简体中文",
    flag: "🇨🇳",
    intlLocale: "zh-CN",
    direction: "ltr",
    fontFamily: "'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', sans-serif",
  },
  {
    code: "zh-Hant",
    englishName: "Chinese (Traditional)",
    nativeName: "繁體中文",
    flag: "🇹🇼",
    intlLocale: "zh-TW",
    direction: "ltr",
    fontFamily: "'Noto Sans TC', 'PingFang TC', 'Microsoft JhengHei', sans-serif",
  },
  {
    code: "ar",
    englishName: "Arabic",
    nativeName: "العربية",
    flag: "🇸🇦",
    intlLocale: "ar-SA",
    direction: "rtl",
    fontFamily: "'Noto Sans Arabic', 'SF Arabic', system-ui, sans-serif",
  },
  {
    code: "he",
    englishName: "Hebrew",
    nativeName: "עברית",
    flag: "🇮🇱",
    intlLocale: "he-IL",
    direction: "rtl",
    fontFamily: "'Noto Sans Hebrew', 'SF Hebrew', system-ui, sans-serif",
  },
]

export const DEFAULT_LANGUAGE_CODE = "en"

const languageByCode = new Map(DEXORA_LANGUAGES.map(lang => [lang.code, lang]))

export function normalizeLanguageCode(value: string | null | undefined): string {
  if (!value) return DEFAULT_LANGUAGE_CODE
  if (languageByCode.has(value)) return value

  const lower = value.toLowerCase()
  if (lower.startsWith("zh")) {
    if (lower.includes("hans") || lower === "zh-cn" || lower === "zh-sg") return "zh-Hans"
    if (lower.includes("hant") || lower === "zh-tw" || lower === "zh-hk" || lower === "zh-mo") {
      return "zh-Hant"
    }
  }

  const baseCode = value.split("-")[0]
  if (languageByCode.has(baseCode)) return baseCode

  return DEFAULT_LANGUAGE_CODE
}

export function getLanguage(code: string): DexoraLanguage {
  return languageByCode.get(normalizeLanguageCode(code)) ?? languageByCode.get(DEFAULT_LANGUAGE_CODE)!
}

export function isRtlLanguage(code: string): boolean {
  return getLanguage(code).direction === "rtl"
}
