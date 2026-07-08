import { useZoomScene } from "@/components/zoom-scene"
import { SECTION } from "@/lib/sections"
import { BRAND } from "@/lib/brand-colors"
import { useTranslation } from "react-i18next"

interface JoinWaitlistButtonProps {
  className?: string
  variant?: "primary" | "outline" | "green" | "purple" | "neonBlue"
}

export function JoinWaitlistButton({
  className = "",
  variant = "primary",
}: JoinWaitlistButtonProps) {
  const { t } = useTranslation("landing")
  const { goTo } = useZoomScene()

  function handleClick() {
    goTo(SECTION.WAITLIST)
  }

  const base =
    "inline-flex min-h-[48px] items-center justify-center rounded-full px-8 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"

  const variantStyles: Record<NonNullable<JoinWaitlistButtonProps["variant"]>, string> = {
    primary: "hover:shadow-[0_0_32px_rgba(255,229,0,0.4)] focus-visible:outline-[#ffe500]",
    green: "hover:shadow-[0_0_32px_rgba(61,189,98,0.35)] focus-visible:outline-[#3dbd62]",
    purple: "hover:shadow-[0_0_32px_rgba(124,77,255,0.4)] focus-visible:outline-[#7c4dff]",
    neonBlue: "hover:shadow-[0_0_32px_rgba(100,217,255,0.45)] focus-visible:outline-[#64d9ff]",
    outline: "border border-white/20 bg-transparent text-[#edf0ff] hover:border-white/40 focus-visible:outline-[#edf0ff]",
  }

  const inlineStyle =
    variant === "primary"
      ? { background: BRAND.yellow, color: BRAND.bg }
      : variant === "green"
        ? { background: BRAND.green, color: BRAND.bg }
        : variant === "purple"
          ? { background: BRAND.purple, color: BRAND.foreground }
          : variant === "neonBlue"
            ? { background: BRAND.neonBlue, color: BRAND.bg }
            : undefined

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`${base} ${variantStyles[variant]} ${className}`}
      style={inlineStyle}
    >
      {t("waitlist.joinButton")}
    </button>
  )
}
