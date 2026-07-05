const supabaseUrl = import.meta.env.VITE_SUPABASE_URL

export const WAITLIST_ADMIN_PATH =
  import.meta.env.VITE_WAITLIST_ADMIN_PATH ?? "ops/waitlist-d7x9m2"

export function getWaitlistAdminPathname(): string {
  const normalized = WAITLIST_ADMIN_PATH.replace(/^\/+|\/+$/g, "")
  return `/${normalized}`
}

export function isWaitlistAdminPath(pathname: string): boolean {
  const target = getWaitlistAdminPathname()
  const current = pathname.endsWith("/") && pathname.length > 1
    ? pathname.slice(0, -1)
    : pathname
  return current === target
}

export interface WaitlistSignupRow {
  id: string
  email: string
  source: string
  created_at: string
}

export interface WaitlistAdminResult {
  success: boolean
  message?: string
  count?: number
  signups?: WaitlistSignupRow[]
}

function getAdminFunctionUrl(): string | null {
  if (!supabaseUrl) return null
  return `${supabaseUrl.replace(/\/+$/, "")}/functions/v1/waitlist-admin`
}

export async function fetchWaitlistAdmin(
  password: string,
): Promise<WaitlistAdminResult> {
  const url = getAdminFunctionUrl()
  if (!url) {
    return { success: false, message: "Supabase is not configured." }
  }

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password, format: "json" }),
  })

  if (response.status === 401) {
    return { success: false, message: "Incorrect password." }
  }

  if (!response.ok) {
    return { success: false, message: "Could not load waitlist. Try again." }
  }

  const data = await response.json() as { count: number; signups: WaitlistSignupRow[] }
  return {
    success: true,
    count: data.count,
    signups: data.signups,
  }
}

export async function downloadWaitlistCsv(password: string): Promise<WaitlistAdminResult> {
  const url = getAdminFunctionUrl()
  if (!url) {
    return { success: false, message: "Supabase is not configured." }
  }

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password, format: "csv" }),
  })

  if (response.status === 401) {
    return { success: false, message: "Incorrect password." }
  }

  if (!response.ok) {
    return { success: false, message: "Could not export CSV. Try again." }
  }

  const blob = await response.blob()
  const objectUrl = URL.createObjectURL(blob)
  const anchor = document.createElement("a")
  anchor.href = objectUrl
  anchor.download = `dexora-waitlist-${new Date().toISOString().slice(0, 10)}.csv`
  anchor.click()
  URL.revokeObjectURL(objectUrl)

  return { success: true }
}
