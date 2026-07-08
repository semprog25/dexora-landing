import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { useTranslation } from "react-i18next"
import { PLAY_STORE_URL } from "@/lib/app-links"

interface StoreCtaButtonProps {
  platform: "google" | "apple"
  className?: string
}

export function StoreCtaButton({ platform, className = "" }: StoreCtaButtonProps) {
  const { t } = useTranslation("landing")
  const [showComingSoon, setShowComingSoon] = useState(false)

  const isGoogle = platform === "google"

  function handleAppleClick() {
    setShowComingSoon(true)
    window.setTimeout(() => setShowComingSoon(false), 2800)
  }

  const content = (
    <>
      {isGoogle ? (
        <svg className="store-cta-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M3,20.5V3.5C3,2.91,3.34,2.39,3.84,2.14L13.65,12L3.84,21.86C3.34,21.61,3,21.09,3,20.5z M16.95,15.31L15.41,13.77 L5.48,23.7L16.95,15.31z M5.48,0.3L15.41,10.23L16.95,8.69L5.48,0.3z M18.65,10.4L22.09,12.22c0.78,0.41,0.78,1.15,0,1.57l-3.44,1.82 L16.9,12L18.65,10.4z" />
        </svg>
      ) : (
        <svg className="store-cta-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
        </svg>
      )}
      <span className="store-cta-copy">
        <span className="store-cta-sub">
          {isGoogle ? t("store.getItOn") : t("store.downloadOn")}
        </span>
        <span className="store-cta-title">
          {isGoogle ? t("store.googlePlay") : t("store.appStore")}
        </span>
      </span>
    </>
  )

  return (
    <div className={`store-cta-wrap ${className}`.trim()}>
      {isGoogle ? (
        <a
          href={PLAY_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="store-cta store-cta--glass"
          aria-label={t("store.googlePlayAria")}
        >
          {content}
        </a>
      ) : (
        <button
          type="button"
          onClick={handleAppleClick}
          className="store-cta store-cta--glass store-cta--apple"
          aria-label={t("store.appStoreAria")}
        >
          {content}
        </button>
      )}

      <AnimatePresence>
        {showComingSoon && (
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="store-cta-toast"
            role="status"
          >
            {t("store.comingSoonToast")}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}
