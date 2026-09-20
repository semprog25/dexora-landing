/**
 * Generates static legal HTML pages for GitHub Pages.
 * GitHub Pages returns HTTP 404 for SPA-only routes; Play Store requires HTTP 200.
 * Keep content in sync with src/lib/legal-content.ts
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.resolve(__dirname, "../dist")

const SITE_ORIGIN = "https://www.dexora.app"
const EFFECTIVE_DATE = "September 20, 2026"
const SUPPORT_EMAIL = "support@dexora.app"

const LEGAL_DISCLAIMER =
  "Dexora is an independent fan-made companion app for Pokémon GO. Not affiliated with, endorsed by, or sponsored by Niantic, Inc., The Pokémon Company, Nintendo, or Creatures Inc. Pokémon GO and Pokémon are trademarks of their respective owners."

const LEGAL_SUBSCRIPTION_NOTE =
  "Dexora Plus is an optional paid subscription for premium features. Reference data is provided for trainer convenience."

const LEGAL_PAGES = {
  privacy: {
    title: "Privacy Policy",
    description: "How Dexora handles your information on dexora.app and in the Dexora app.",
    sections: [
      {
        heading: "Overview",
        body: "Dexora respects your privacy. This policy describes what information we process when you use dexora.app or the Dexora mobile app, why we process it, and the choices you have. Dexora is an independent Pokémon GO companion and is not affiliated with, endorsed by, or sponsored by Niantic, The Pokémon Company, Nintendo, or Creatures Inc.",
      },
      {
        heading: "Account and profile",
        body: "When you use the app, Dexora creates a cloud account through Supabase Auth (an anonymous account on first use, or the same account linked to Google Sign-In if you choose). We store your trainer profile (display name, trainer code, team, level, points, avatar, language, and onboarding preferences), synced collection progress (species caught, shiny, shadow, lucky, and related flags), favorites, and structured scan history metadata (species, CP, IV-related fields, timestamps — not full OCR text) in Supabase so your data can sync across devices. Optional Google sign-in may provide your email and name to Supabase as part of authentication.",
      },
      {
        heading: "Trainer Vision, scanning, and Live Companion",
        body: "When you import a Pokémon GO screenshot or use Live Scanner / Live Companion on Android, image and screen frames are processed on your device with OCR and related analysis to identify Pokémon and stats. Raw screenshots, screen recordings, and live camera frames are not uploaded to Dexora servers. Structured results from scans may be saved to your cloud profile and to local storage on your device. Full OCR raw text is not synced to Supabase; it may remain in local scan history on your device (for example Recent Scans) until you clear app data or uninstall. Live Companion may continuously process frames on-device while a session is active, only when you enable it.",
      },
      {
        heading: "Android permissions (Live Scanner / Live Companion)",
        body: "Live Scanner and Live Companion are optional and Android-only. If you enable them, Dexora may request: notifications (scanner status); display over other apps (overlay while playing); accessibility (detect when Pokémon GO is in the foreground — Dexora does not automate gameplay or read game UI text through accessibility); and screen capture / Media Projection (read the game screen for on-device analysis when you scan). Dexora may run a foreground service while the overlay is active. You can revoke permissions in Android Settings or in Dexora → Settings → App Permissions.",
      },
      {
        heading: "Community and support",
        body: "If you use community features, public feed messages, groups, group chat, mini-game scores, or share a public trainer code, that content is stored in our Supabase database. Community chat may be moderated with automated filters; you can report messages and block users. If you contact support through the app or website, we store the email and message you submit in support_requests.",
      },
      {
        heading: "Subscriptions and purchases",
        body: "Dexora Plus is an optional subscription. Purchases are processed by Google Play Billing (Android) or the Apple App Store (iOS). RevenueCat helps us verify subscription status and entitlements; we store a subscription status flag in your profile but do not persist Google Play purchase tokens in Dexora cloud after verification. Billing history and payment methods are managed by the store.",
      },
      {
        heading: "Analytics and diagnostics",
        body: "The Dexora app uses Google Firebase Analytics to understand product usage and Vision reliability (for example session metrics, device model, OS version, screen characteristics, and event names related to features — not OCR text or uploaded screenshots). Firebase Crashlytics collects crash reports and diagnostic information (such as stack traces) to improve stability. These services are operated by Google and are subject to Google's policies.",
      },
      {
        heading: "Advertising",
        body: "On the free tier, Dexora shows ads through Google AdMob. AdMob and related Google services may use advertising identifiers and device signals as permitted by your device settings and consent choices. Before ads load, the app uses Google's User Messaging Platform (UMP) to present privacy and consent choices where required, including European regulations and US state privacy controls. Dexora Plus subscribers do not see banners or interstitials; Plus removes ad surfaces in the app but does not delete all identifiers that Google or Firebase may already have collected for analytics or prior ad activity.",
      },
      {
        heading: "Consent and privacy controls",
        body: "Where Google's UMP indicates it is required or available, you can review or change advertising and privacy choices in Dexora → Settings (Privacy options) or through system ad settings on your device. Declining or limiting consent may mean ads are not shown even on the free tier.",
      },
      {
        heading: "Third-party processors",
        body: "We use service providers that process data on our behalf, including: Supabase (authentication, database, and edge functions); Google Firebase Analytics and Firebase Crashlytics; Google AdMob; RevenueCat (subscription status); Google Play (purchases on Android); Google Sign-In (optional login); and api.qrserver.com (generates a QR image when you open your trainer code — only your trainer code string is sent to that service). This marketing site may use Supabase for waitlist sign-ups only.",
      },
      {
        heading: "Waitlist (website)",
        body: "If you join the waitlist on dexora.app, we store your email in Supabase to notify you about Dexora. Waitlist data is separate from in-app accounts. We do not sell waitlist emails.",
      },
      {
        heading: "Location",
        body: "Dexora does not collect precise or approximate location from your device for companion features. Trainer Vision reads on-screen game information only.",
      },
      {
        heading: "Data retention and account deletion",
        body: `Cloud data in Supabase is kept until you delete your account or we no longer need it for the service. Deleting your account in the app (Profile → Settings → Delete Account) or at ${SITE_ORIGIN}/delete-account triggers deletion of your auth user and cascades to profile, collection, community content tied to your account, and related app data. Support requests may be retained in anonymized form after deletion. Waitlist emails are not removed by in-app account deletion — email ${SUPPORT_EMAIL} to remove waitlist data. Google (Analytics, Crashlytics, AdMob), RevenueCat, and app stores may retain data under their own retention and legal obligations; deletion in Dexora does not instantly erase all copies at those providers.`,
      },
      {
        heading: "Security",
        body: "We use encryption in transit for cloud sync. Sensitive local data is excluded from Android cloud backup where configured. Authorized waitlist export via automated admin tools is disabled; authorized staff use Supabase Dashboard for exports.",
      },
      {
        heading: "Children",
        body: "Dexora is not directed at children under 13. We do not knowingly collect personal information from children under 13.",
      },
      {
        heading: "Changes and contact",
        body: `We may update this policy as Dexora evolves; material changes appear on this page with an updated effective date. Questions or privacy requests: ${SUPPORT_EMAIL}.`,
      },
      {
        heading: "External links",
        body: "Links to app stores, support, or third-party sites have their own privacy policies.",
      },
    ],
  },
  terms: {
    title: "Terms and Conditions",
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
        body: `Joining the waitlist does not guarantee access or a specific launch date. You may unsubscribe from waitlist communications at any time by contacting ${SUPPORT_EMAIL}.`,
      },
      {
        heading: "Subscriptions",
        body: "Dexora Plus is an optional paid subscription for premium features such as unlimited Trainer Vision scans, advanced recommendations, collection analytics, and data export. Billing, renewal, and cancellation are handled through the Apple App Store or Google Play and their respective terms.",
      },
      {
        heading: "Live Scanner and fair play",
        body: "Live Scanner reads on-screen Pokémon GO information when you manually tap scan. Dexora does not automate gameplay, spoof location, bot, or interact with Pokémon GO on your behalf. Use of companion tools may be subject to Niantic's Terms of Service; you are responsible for how you use Dexora.",
      },
      {
        heading: "Android permissions",
        body: "By enabling Live Scanner you consent to granting the Android permissions described in our Privacy Policy. You are responsible for managing these permissions on your device and may disable Live Scanner at any time.",
      },
      {
        heading: "Community conduct",
        body: "Community chat, groups, and public trainer codes must be used respectfully. Spam, harassment, or abuse may result in content removal or account restrictions.",
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
        body: `Email us at ${SUPPORT_EMAIL} for help with the waitlist, app issues, or account questions.`,
      },
      {
        heading: "Response time",
        body: "We aim to reply within a few business days. Include your device type and app version when reporting bugs.",
      },
      {
        heading: "Support channels",
        body: `Reach us by email at ${SUPPORT_EMAIL} for waitlist, app, or account questions.`,
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
        body: `If something looks wrong, email ${SUPPORT_EMAIL} with steps to reproduce and screenshots when possible.`,
      },
      {
        heading: "Send feedback",
        body: `Email ${SUPPORT_EMAIL} with your ideas, bug reports, or screenshots. We read every message.`,
      },
    ],
  },
  "delete-account": {
    title: "Delete Account and Data",
    description: "Permanently remove your Dexora cloud account and associated data.",
    sections: [
      {
        heading: "Delete in the app (recommended)",
        body: "Open Dexora → Profile → Settings → Delete Account, then confirm twice. This permanently removes your cloud profile, collection sync, community messages, and subscription entitlement records stored by Dexora.",
      },
      {
        heading: "What gets deleted",
        body: "Trainer profile, synced Pokémon collection, favorites, community chat messages, groups you created, leaderboard points, blocked-user lists, reports you submitted, and Dexora Plus entitlement stored in Dexora cloud.",
      },
      {
        heading: "What is not deleted by Dexora",
        body: "Your Google Play or App Store subscription billing history (manage or cancel in the store). Pokémon GO screenshots and Live Scanner screen frames are processed on-device and are not uploaded to Dexora servers, so there is no image data for Dexora to delete.",
      },
      {
        heading: "Request deletion by email",
        body: `If you cannot access the app, email ${SUPPORT_EMAIL} from the address linked to your Google account (if used). Include your trainer name and trainer code when possible. We process requests within 30 days.`,
      },
    ],
  },
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
}

function renderPage(slug, doc) {
  const canonical = `${SITE_ORIGIN}/${slug}`
  const sectionsHtml = doc.sections
    .map(
      (section) => `
        <section class="section">
          <h2>${escapeHtml(section.heading)}</h2>
          <p>${escapeHtml(section.body)}</p>
        </section>`
    )
    .join("")

  const contactBlock =
    slug === "contact" || slug === "feedback"
      ? `<p class="actions"><a class="button" href="mailto:${SUPPORT_EMAIL}">Email ${SUPPORT_EMAIL}</a></p>`
      : slug === "delete-account"
        ? `<p class="actions"><a class="button" href="mailto:${SUPPORT_EMAIL}?subject=Dexora%20Account%20Deletion%20Request">Email deletion request</a> <a class="button secondary" href="/privacy">Privacy policy</a></p>`
        : ""

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
    <meta name="theme-color" content="#07091a" />
    <title>${escapeHtml(doc.title)} — Dexora</title>
    <meta name="description" content="${escapeHtml(doc.description)}" />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="${canonical}" />
    <link rel="icon" type="image/png" href="/favicon.png" />
    <style>
      :root { color-scheme: dark; }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        background: #07091a;
        color: #edf0ff;
        line-height: 1.6;
      }
      main {
        max-width: 42rem;
        margin: 0 auto;
        padding: 5rem 1.25rem 4rem;
      }
      .eyebrow {
        margin: 0 0 0.75rem;
        text-align: center;
        font-size: 0.75rem;
        font-weight: 600;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        color: #64d9ff;
      }
      h1 {
        margin: 0 0 0.5rem;
        text-align: center;
        font-size: clamp(1.75rem, 4vw, 2rem);
        letter-spacing: -0.02em;
      }
      .lead, .meta, nav, .footer-note {
        text-align: center;
      }
      .lead {
        margin: 0 auto 0.5rem;
        max-width: 34rem;
        color: #8892b0;
        font-size: 0.95rem;
      }
      .meta {
        margin: 0 0 2rem;
        color: #6b7494;
        font-size: 0.8rem;
      }
      nav {
        margin-bottom: 2rem;
        font-size: 0.8rem;
      }
      nav a {
        color: #6b7494;
        text-decoration: none;
      }
      nav a:hover { color: #64d9ff; }
      nav span { color: #3a415c; margin: 0 0.5rem; }
      .section {
        margin-bottom: 1rem;
        padding: 1rem 1.1rem;
        border: 1px solid rgba(255, 255, 255, 0.07);
        border-radius: 1rem;
        background: rgba(255, 255, 255, 0.03);
      }
      .section h2 {
        margin: 0 0 0.5rem;
        font-size: 0.95rem;
      }
      .section p {
        margin: 0;
        color: #8892b0;
        font-size: 0.92rem;
      }
      .actions { text-align: center; margin-top: 2rem; }
      .button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-height: 44px;
        padding: 0.75rem 1.5rem;
        border-radius: 999px;
        background: #64d9ff;
        color: #07091a;
        font-weight: 600;
        text-decoration: none;
        margin: 0 0.35rem 0.5rem;
      }
      .button.secondary {
        background: transparent;
        color: #edf0ff;
        border: 1px solid rgba(255, 255, 255, 0.12);
      }
      .footer-note {
        margin-top: 2.5rem;
        padding-top: 2rem;
        border-top: 1px solid rgba(255, 255, 255, 0.06);
        font-size: 0.85rem;
      }
      .footer-note a { color: #ffe500; }
    </style>
  </head>
  <body>
    <main>
      <nav aria-label="Breadcrumb">
        <a href="/">Home</a><span>·</span><span>${escapeHtml(doc.title)}</span>
      </nav>
      <p class="eyebrow">DEXORA</p>
      <h1>${escapeHtml(doc.title)}</h1>
      <p class="lead">${escapeHtml(doc.description)}</p>
      <p class="meta">Effective ${EFFECTIVE_DATE}</p>
      ${sectionsHtml}
      ${contactBlock}
      <p class="footer-note"><a href="/">← Back to Dexora home</a></p>
    </main>
  </body>
</html>
`
}

if (!fs.existsSync(distDir)) {
  console.error("dist/ not found — run vite build first")
  process.exit(1)
}

for (const [slug, doc] of Object.entries(LEGAL_PAGES)) {
  const pageDir = path.join(distDir, slug)
  fs.mkdirSync(pageDir, { recursive: true })
  fs.writeFileSync(path.join(pageDir, "index.html"), renderPage(slug, doc), "utf8")
  console.log(`Generated ${slug}/index.html`)
}
