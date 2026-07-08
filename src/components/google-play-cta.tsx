import { PLAY_STORE_URL } from "@/lib/app-links"
import { useTranslation } from "react-i18next"

interface GooglePlayCtaProps {
  variant?: "primary" | "compact"
  className?: string
}

export function GooglePlayCta({ variant = "primary", className = "" }: GooglePlayCtaProps) {
  const { t } = useTranslation("landing")
  const isPrimary = variant === "primary"

  return (
    <a
      href={PLAY_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`google-play-cta ${isPrimary ? "google-play-cta--primary" : "google-play-cta--compact"} ${className}`.trim()}
      aria-label={t("store.googlePlayAria")}
    >
      <svg className="google-play-cta-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M3,20.5V3.5C3,2.91,3.34,2.39,3.84,2.14L13.65,12L3.84,21.86C3.34,21.61,3,21.09,3,20.5z M16.95,15.31L15.41,13.77 L5.48,23.7L16.95,15.31z M5.48,0.3L15.41,10.23L16.95,8.69L5.48,0.3z M18.65,10.4L22.09,12.22c0.78,0.41,0.78,1.15,0,1.57l-3.44,1.82 L16.9,12L18.65,10.4z" />
      </svg>
      <span className="google-play-cta-copy">
        <span className="google-play-cta-sub">{t("store.getItOn")}</span>
        <span className="google-play-cta-title">{t("store.googlePlay")}</span>
      </span>
    </a>
  )
}
