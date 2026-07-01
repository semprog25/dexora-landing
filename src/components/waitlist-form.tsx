import { useState, type FormEvent } from "react"
import { motion, AnimatePresence } from "motion/react"
import { joinWaitlist } from "@/lib/waitlist"

interface WaitlistFormProps {
  variant?: "hero" | "cta"
}

export function WaitlistForm({ variant = "hero" }: WaitlistFormProps) {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (status === "loading") return

    setStatus("loading")
    const result = await joinWaitlist(email)
    setMessage(result.message)
    setStatus(result.success ? "success" : "error")
    if (result.success) setEmail("")
  }

  const isHero = variant === "hero"

  return (
    <div className={isHero ? "w-full max-w-xl" : "w-full max-w-lg mx-auto"}>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 sm:flex-row sm:items-center"
        noValidate
      >
        <label htmlFor={`waitlist-email-${variant}`} className="sr-only">
          Email address
        </label>
        <input
          id={`waitlist-email-${variant}`}
          type="email"
          name="email"
          autoComplete="email"
          required
          placeholder="trainer@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === "loading"}
          className="flex-1 rounded-full border-2 border-white/10 bg-white/5 px-6 py-4 text-[#edf0ff] placeholder:text-[#6b7494] outline-none transition focus:border-[#ffe500] focus:bg-white/[0.08] focus:shadow-[0_0_24px_rgba(255,229,0,0.2)] disabled:opacity-60"
        />
        <motion.button
          type="submit"
          disabled={status === "loading"}
          className="rounded-full bg-[#ffe500] px-8 py-4 font-semibold text-[#07091a] transition hover:shadow-[0_0_32px_rgba(255,229,0,0.45)] disabled:cursor-not-allowed disabled:opacity-60"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {status === "loading" ? "Joining..." : "Join Waitlist"}
        </motion.button>
      </form>

      <AnimatePresence mode="wait">
        {message && (
          <motion.p
            key={message}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`mt-4 text-center text-sm sm:text-left ${
              status === "success" ? "text-[#22d87a]" : "text-[#ff4757]"
            }`}
            role="status"
          >
            {message}
          </motion.p>
        )}
      </AnimatePresence>

      {isHero && (
        <p className="mt-4 text-center text-xs tracking-[0.25em] text-[#6b7494] sm:text-left">
          EARLY ACCESS · NO SPAM
        </p>
      )}
    </div>
  )
}
