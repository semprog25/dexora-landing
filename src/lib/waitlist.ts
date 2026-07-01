import { createClient } from "@supabase/supabase-js"

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)

const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

export interface WaitlistResult {
  success: boolean
  message: string
  alreadyExists?: boolean
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function joinWaitlist(email: string): Promise<WaitlistResult> {
  const normalized = email.toLowerCase().trim()

  if (!isValidEmail(normalized)) {
    return { success: false, message: "Please enter a valid email address." }
  }

  if (!supabase) {
    return {
      success: false,
      message: "Waitlist is not configured yet. Please try again soon.",
    }
  }

  const { error } = await supabase.from("waitlist_signups").insert({
    email: normalized,
    source: "landing",
  })

  if (error) {
    if (error.code === "23505") {
      return {
        success: true,
        alreadyExists: true,
        message: "You're already on the waitlist!",
      }
    }
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    }
  }

  return {
    success: true,
    message: "You're on the list! We'll notify you at launch.",
  }
}
