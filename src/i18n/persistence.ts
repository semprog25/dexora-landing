const STORAGE_KEY = "dexora.landing.locale"

export function loadPersistedLanguageSync(): string {
  if (typeof window === "undefined") return "en"
  try {
    return localStorage.getItem(STORAGE_KEY) ?? "en"
  } catch {
    return "en"
  }
}

export function persistLanguageSync(code: string): void {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(STORAGE_KEY, code)
  } catch {
    // ignore quota / private mode
  }
}
