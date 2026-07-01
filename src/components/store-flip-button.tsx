import { useRef, useState } from "react"

interface StoreFlipButtonProps {
  platform: "apple" | "google"
}

export function StoreFlipButton({ platform }: StoreFlipButtonProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [isPortal, setIsPortal] = useState(false)
  const timerRef = useRef<number | null>(null)

  function clearTimer() {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }

  function handleClick() {
    if (isPortal) return

    clearTimer()
    setIsPortal(true)
    window.setTimeout(() => setIsFlipped(true), 300)
    window.setTimeout(() => setIsPortal(false), 750)

    timerRef.current = window.setTimeout(() => {
      setIsFlipped(false)
      timerRef.current = null
    }, 2400)
  }

  const label = platform === "apple" ? "App Store" : "Google Play"
  const subtitle = platform === "apple" ? "Download on the" : "GET IT ON"

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`store-flip-btn ${isFlipped ? "is-flipped" : ""} ${isPortal ? "store-flip-btn--portal" : ""}`}
      aria-label={`${label} — Coming soon`}
      aria-pressed={isFlipped}
    >
      <span className="store-flip-portal-glow" aria-hidden="true" />
      <span className="store-flip-inner">
        <span className="store-flip-face store-flip-front">
          {platform === "apple" ? (
            <svg className="store-flip-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.74 1.18 0 2.21-.93 3.12-.93 2.52.16 3.34 1.73 3.34 1.73-2.6 1.23-2.22 4.63.41 5.7-.47 2.04-1.58 3.5-2.38 4.66-1.02 1.58-1.02 1.58-1.95 2.93.03 0 .03 0 .03 0zM13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.87 1.5-2.95 1.5-.11-1.24.42-2.36 1.05-3.19z" />
            </svg>
          ) : (
            <svg className="store-flip-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M3,20.5V3.5C3,2.91,3.34,2.39,3.84,2.14L13.65,12L3.84,21.86C3.34,21.61,3,21.09,3,20.5z M16.95,15.31L15.41,13.77 L5.48,23.7L16.95,15.31z M5.48,0.3L15.41,10.23L16.95,8.69L5.48,0.3z M18.65,10.4L22.09,12.22c0.78,0.41,0.78,1.15,0,1.57l-3.44,1.82 L16.9,12L18.65,10.4z" />
            </svg>
          )}
          <span className="store-flip-copy">
            <span className="store-flip-sub">{subtitle}</span>
            <span className="store-flip-title">{label}</span>
          </span>
        </span>
        <span className="store-flip-face store-flip-back">
          <span className="store-flip-soon">Coming Soon</span>
        </span>
      </span>
    </button>
  )
}
