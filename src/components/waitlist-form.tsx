import { useRef, useState, type FormEvent } from "react"
import { motion, AnimatePresence } from "motion/react"
import { useTranslation } from "react-i18next"
import { joinWaitlist } from "@/lib/waitlist"
import { emitGlowBurst, KEYSTROKE_NEON_COLORS } from "@/lib/glow-bus"

interface WaitlistFormProps {
  variant?: "hero" | "cta"
}

export function WaitlistForm({ variant = "hero" }: WaitlistFormProps) {
  const { t } = useTranslation("landing")
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")
  const keystrokeColorRef = useRef(0)

  function handleEmailChange(next: string) {
    if (next.length > email.length) {
      const color = KEYSTROKE_NEON_COLORS[keystrokeColorRef.current % KEYSTROKE_NEON_COLORS.length]
      keystrokeColorRef.current += 1
      emitGlowBurst({
        color,
        size: 1.1 + Math.random() * 0.5,
      })
    }
    setEmail(next)
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (status === "loading") return

    setStatus("loading")
    const result = await joinWaitlist(email)
    const translatedMessage = result.messageKey ? t(result.messageKey) : result.message
    setMessage(translatedMessage)
    setStatus(result.success ? "success" : "error")
    if (result.success) setEmail("")
  }

  const isHero = variant === "hero"

  return (
    <div className={isHero ? "hero-waitlist-form w-full max-w-xl mx-auto" : "w-full max-w-lg mx-auto"}>
      <form
        onSubmit={handleSubmit}
        className="mx-auto grid w-full max-w-xl grid-cols-1 gap-3 md:grid-cols-[minmax(0,1fr)_auto]"
        noValidate
      >
        <label htmlFor={`waitlist-email-${variant}`} className="sr-only">
          {t("waitlist.emailLabel")}
        </label>
        <input
          id={`waitlist-email-${variant}`}
          type="email"
          name="email"
          inputMode="email"
          enterKeyHint="done"
          autoComplete="email"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          required
          placeholder={t("waitlist.emailPlaceholder")}
          value={email}
          onChange={(e) => handleEmailChange(e.target.value)}
          disabled={status === "loading"}
          className="min-h-[48px] w-full min-w-0 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-base text-[#edf0ff] placeholder:text-[#6b7494] outline-none transition focus:border-[#ffe500]/50 focus:bg-white/[0.08] focus:shadow-[0_0_24px_rgba(255,229,0,0.15)] disabled:opacity-60 sm:px-6"
        />
        <motion.button
          type="submit"
          disabled={status === "loading"}
          className="min-h-[48px] w-full rounded-full bg-[#ffe500] px-8 py-3 text-base font-semibold text-[#07091a] transition hover:shadow-[0_0_32px_rgba(255,229,0,0.45)] disabled:cursor-not-allowed disabled:opacity-60 md:w-auto md:justify-self-center"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {status === "loading" ? t("waitlist.joining") : t("waitlist.join")}
        </motion.button>
      </form>

      <AnimatePresence mode="wait">
        {message && (
          <motion.p
            key={message}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`mt-4 text-center text-sm ${
              status === "success" ? "text-[#3dbd62]" : "text-[#ff4757]"
            }`}
            role="status"
          >
            {message}
          </motion.p>
        )}
      </AnimatePresence>

      {isHero && (
        <p className="mt-4 text-center text-xs tracking-[0.25em] text-[#6b7494]">
          {t("hero.waitlistHint")}
        </p>
      )}
    </div>
  )
}
