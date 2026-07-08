import { useEffect, useState, type ReactNode } from "react"
import { I18nextProvider } from "react-i18next"
import { initI18n, getI18n } from "@/i18n/config"

interface I18nProviderProps {
  children: ReactNode
}

export function I18nProvider({ children }: I18nProviderProps) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    void initI18n().then(() => setReady(true))
  }, [])

  if (!ready) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-[#07091a]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#64d9ff]/30 border-t-[#64d9ff]" />
      </div>
    )
  }

  return <I18nextProvider i18n={getI18n()}>{children}</I18nextProvider>
}
