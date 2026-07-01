import { LEGAL_DISCLAIMER, LEGAL_SUBSCRIPTION_NOTE } from "@/lib/go-metadata"

export type LegalSlug = "privacy" | "terms" | "contact" | "feedback"

export interface LegalSection {
  heading: string
  body: string
}

export interface LegalDocument {
  title: string
  description: string
  sections: LegalSection[]
}

export const LEGAL_PAGES: Record<LegalSlug, LegalDocument> = {
  privacy: {
    title: "Privacy Policy",
    description: "How Dexora handles your information on dexora.app and in the app.",
    sections: [
      {
        heading: "Overview",
        body: "Dexora respects your privacy. This policy explains what we collect, why we collect it, and how you can contact us.",
      },
      {
        heading: "Waitlist sign-ups",
        body: "If you join the waitlist, we store your email address in our secure Supabase database so we can notify you about early access. We do not sell or rent waitlist emails to third parties.",
      },
      {
        heading: "App account data",
        body: "When you use the Dexora app, your trainer profile, collection progress, favorites, and settings may be saved to your Dexora cloud account to sync across devices.",
      },
      {
        heading: "Analytics & advertising",
        body: "Dexora does not use third-party advertising trackers on this landing page. The app does not include third-party analytics SDKs in its core shell.",
      },
      {
        heading: "External links",
        body: "Some links (support and app stores) open external websites with their own privacy policies.",
      },
      {
        heading: "Your rights",
        body: "You may request deletion of your waitlist email or app account data by contacting us at support@dexora.app.",
      },
      {
        heading: "Updates",
        body: "We may update this policy as Dexora evolves. Material changes will be reflected on this page with an updated effective date.",
      },
    ],
  },
  terms: {
    title: "Terms & Conditions",
    description: "Rules for using dexora.app and the Dexora companion app.",
    sections: [
      {
        heading: "Acceptance",
        body: `${LEGAL_DISCLAIMER} ${LEGAL_SUBSCRIPTION_NOTE}`,
      },
      {
        heading: "No affiliation",
        body: "Dexora is not affiliated with, endorsed by, or sponsored by Niantic, The Pokémon Company, Nintendo, or Creatures Inc. Pokémon GO and Pokémon are trademarks of their respective owners.",
      },
      {
        heading: "Informational use",
        body: "Game stats, artwork, and reference data are provided for trainer convenience. Dexora does not guarantee that values always match the live game.",
      },
      {
        heading: "Waitlist",
        body: "Joining the waitlist does not guarantee access or a specific launch date. You may unsubscribe from waitlist communications at any time by contacting support@dexora.app.",
      },
      {
        heading: "Subscriptions",
        body: "Dexora Plus is an optional paid subscription for premium features. Billing, renewal, and cancellation are handled through the Apple App Store or Google Play and their respective terms.",
      },
      {
        heading: "Limitation of liability",
        body: "Dexora is provided as-is without warranties. We are not liable for decisions made using reference data from the app or website.",
      },
    ],
  },
  contact: {
    title: "Contact Us",
    description: "Get in touch with the Dexora team.",
    sections: [
      {
        heading: "General support",
        body: "Email us at support@dexora.app for help with the waitlist, app issues, or account questions.",
      },
      {
        heading: "Response time",
        body: "We aim to reply within a few business days. Include your device type and app version when reporting bugs.",
      },
      {
        heading: "Support channels",
        body: "Reach us by email at support@dexora.app for waitlist, app, or account questions.",
      },
    ],
  },
  feedback: {
    title: "Feedback",
    description: "Share ideas, report bugs, or suggest improvements.",
    sections: [
      {
        heading: "Feature requests",
        body: "Tell us what would make Dexora more useful on your daily grind — offline tools, battle helpers, collection features, and more.",
      },
      {
        heading: "Bug reports",
        body: "If something looks wrong, email support@dexora.app with steps to reproduce and screenshots when possible.",
      },
      {
        heading: "Send feedback",
        body: "Email support@dexora.app with your ideas, bug reports, or screenshots. We read every message.",
      },
    ],
  },
}

export const LEGAL_LINKS: { slug: LegalSlug; label: string; href: string }[] = [
  { slug: "privacy", label: "Privacy", href: "/privacy" },
  { slug: "terms", label: "Terms", href: "/terms" },
  { slug: "contact", label: "Contact", href: "/contact" },
  { slug: "feedback", label: "Feedback", href: "/feedback" },
]

export const LEGAL_EFFECTIVE_DATE = "July 1, 2026"

export function getLegalSlug(pathname: string): LegalSlug | null {
  const slug = pathname.replace(/^\/+|\/+$/g, "")
  if (slug === "privacy" || slug === "terms" || slug === "contact" || slug === "feedback") {
    return slug
  }
  return null
}
