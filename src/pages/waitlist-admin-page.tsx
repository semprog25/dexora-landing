import { useMemo, useState, type FormEvent } from "react"
import {
  downloadWaitlistCsv,
  fetchWaitlistAdmin,
  type WaitlistSignupRow,
} from "@/lib/waitlist-admin"

function formatDate(value: string): string {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return date.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export function WaitlistAdminPage() {
  const [password, setPassword] = useState("")
  const [storedPassword, setStoredPassword] = useState<string | null>(null)
  const [signups, setSignups] = useState<WaitlistSignupRow[]>([])
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "error">("idle")
  const [message, setMessage] = useState("")
  const [isExporting, setIsExporting] = useState(false)

  const totalLabel = useMemo(() => {
    const count = signups.length
    return count === 1 ? "1 signup" : `${count} signups`
  }, [signups.length])

  async function handleUnlock(event: FormEvent) {
    event.preventDefault()
    if (status === "loading") return

    setStatus("loading")
    setMessage("")
    const result = await fetchWaitlistAdmin(password)

    if (!result.success || !result.signups) {
      setStatus("error")
      setMessage(result.message ?? "Could not unlock admin.")
      return
    }

    setStoredPassword(password)
    setSignups(result.signups)
    setStatus("ready")
    setMessage("")
  }

  async function handleRefresh() {
    if (!storedPassword || status === "loading") return

    setStatus("loading")
    setMessage("")
    const result = await fetchWaitlistAdmin(storedPassword)

    if (!result.success || !result.signups) {
      setStatus("error")
      setMessage(result.message ?? "Could not refresh waitlist.")
      return
    }

    setSignups(result.signups)
    setStatus("ready")
  }

  async function handleDownloadCsv() {
    if (!storedPassword || isExporting) return

    setIsExporting(true)
    setMessage("")
    const result = await downloadWaitlistCsv(storedPassword)
    setIsExporting(false)

    if (!result.success) {
      setMessage(result.message ?? "Could not export CSV.")
    }
  }

  function handleSignOut() {
    setPassword("")
    setStoredPassword(null)
    setSignups([])
    setStatus("idle")
    setMessage("")
  }

  return (
    <div className="min-h-screen bg-[#07091a] px-4 py-10 text-[#edf0ff] sm:px-6">
      <div className="mx-auto w-full max-w-5xl">
        <header className="mb-8 border-b border-white/10 pb-6">
          <p className="text-xs uppercase tracking-[0.25em] text-[#6b7494]">Dexora Ops</p>
          <h1 className="mt-2 text-2xl font-bold sm:text-3xl">Waitlist Admin</h1>
          <p className="mt-2 max-w-2xl text-sm text-[#8892b0]">
            View landing-page waitlist signups and export them as CSV for launch invites or testing.
          </p>
        </header>

        {status !== "ready" ? (
          <section className="mx-auto max-w-md rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <h2 className="text-lg font-semibold">Unlock admin</h2>
            <p className="mt-2 text-sm text-[#8892b0]">
              Enter the waitlist admin password configured in Supabase.
            </p>
            <form onSubmit={handleUnlock} className="mt-5 space-y-4">
              <label htmlFor="waitlist-admin-password" className="block text-sm font-medium">
                Admin password
              </label>
              <input
                id="waitlist-admin-password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
                required
                className="min-h-[48px] w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-base outline-none transition focus:border-[#ffe500]/50"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="min-h-[48px] w-full rounded-full bg-[#ffe500] px-6 py-3 text-base font-semibold text-[#07091a] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "loading" ? "Checking..." : "View waitlist"}
              </button>
            </form>
            {message && (
              <p className="mt-4 text-sm text-[#ff4757]" role="alert">
                {message}
              </p>
            )}
          </section>
        ) : (
          <section className="space-y-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-[#8892b0]">{totalLabel}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleRefresh}
                  disabled={status === "loading"}
                  className="rounded-full border border-white/10 px-5 py-2.5 text-sm font-semibold text-[#edf0ff] transition hover:border-white/20 disabled:opacity-60"
                >
                  Refresh
                </button>
                <button
                  type="button"
                  onClick={handleDownloadCsv}
                  disabled={isExporting}
                  className="rounded-full bg-[#ffe500] px-5 py-2.5 text-sm font-semibold text-[#07091a] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isExporting ? "Exporting..." : "Download CSV"}
                </button>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="rounded-full border border-white/10 px-5 py-2.5 text-sm font-semibold text-[#8892b0] transition hover:border-white/20"
                >
                  Sign out
                </button>
              </div>
            </div>

            {message && (
              <p className="text-sm text-[#ff4757]" role="alert">
                {message}
              </p>
            )}

            {signups.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-white/10 p-10 text-center text-sm text-[#8892b0]">
                No waitlist signups yet.
              </div>
            ) : (
              <div className="overflow-hidden rounded-2xl border border-white/10">
                <div className="overflow-x-auto">
                  <table className="min-w-full text-left text-sm">
                    <thead className="bg-white/[0.04] text-xs uppercase tracking-[0.18em] text-[#6b7494]">
                      <tr>
                        <th className="px-4 py-3 font-semibold">Email</th>
                        <th className="px-4 py-3 font-semibold">Source</th>
                        <th className="px-4 py-3 font-semibold">Signed up</th>
                      </tr>
                    </thead>
                    <tbody>
                      {signups.map((signup) => (
                        <tr key={signup.id} className="border-t border-white/10">
                          <td className="px-4 py-3 font-medium">{signup.email}</td>
                          <td className="px-4 py-3 text-[#8892b0]">{signup.source}</td>
                          <td className="px-4 py-3 text-[#8892b0]">{formatDate(signup.created_at)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  )
}
