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
  messageKey?: string
  alreadyExists?: boolean
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function joinWaitlist(email: string): Promise<WaitlistResult> {
  const normalized = email.toLowerCase().trim()

  if (!isValidEmail(normalized)) {
    return { success: false, messageKey: "waitlist.invalidEmail", message: "" }
  }

  if (!supabase) {
    return {
      success: false,
      messageKey: "waitlist.notConfigured",
      message: "",
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
        messageKey: "waitlist.alreadyOnList",
        message: "",
      }
    }
    return {
      success: false,
      messageKey: "waitlist.error",
      message: "",
    }
  }

  return {
    success: true,
    messageKey: "waitlist.success",
    message: "",
  }
}
