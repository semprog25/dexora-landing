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
const EFFECTIVE_DATE = "July 9, 2026"
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
        body: "Dexora respects your privacy. This policy explains what we collect, why we collect it, and how you can contact us.",
      },
      {
        heading: "Waitlist sign-ups",
        body: "If you join the waitlist, we store your email address in our secure Supabase database so we can notify you about early access. We do not sell or rent waitlist emails to third parties.",
      },
      {
        heading: "App account data",
        body: "When you use the Dexora app, your trainer profile, collection progress, favorites, language preference, optional Google sign-in email, community messages, public trainer code, scan history metadata (species, CP, and similar stats — not screenshots), and Dexora Plus subscription status may be saved to your Dexora cloud account to sync across devices.",
      },
      {
        heading: "Trainer Vision and Live Scanner",
        body: "Pokémon GO screenshots you import manually, or screen frames captured when you tap scan in Live Scanner (Android), are processed on your device with OCR to identify Pokémon and stats. Raw images and screen recordings are not uploaded to Dexora servers.",
      },
      {
        heading: "Android permissions (Live Scanner)",
        body: "Live Scanner is optional and Android-only. If you enable it, Dexora may request: Notifications (scanner status alerts); Display over other apps (floating scan button while playing); Accessibility (detect when Pokémon GO is in the foreground — Dexora does not automate gameplay); and Screen capture / Media Projection (read the current game screen only when you tap scan). Dexora also uses a foreground service while the overlay is active. You can revoke any permission in Android Settings or in Dexora → Settings → App Permissions.",
      },
      {
        heading: "Community features",
        body: "If you use community chat, group messages, or public friend codes, that content is stored in our cloud database. Chat is moderated with automated filters; you can report messages and block users.",
      },
      {
        heading: "Analytics and advertising",
        body: "Dexora does not use third-party advertising trackers on this landing page. The app does not include third-party analytics SDKs in its core shell.",
      },
      {
        heading: "External links",
        body: "Some links (support and app stores) open external websites with their own privacy policies.",
      },
      {
        heading: "Your rights",
        body: `You can permanently delete your app account in Profile → Settings → Delete Account, or request deletion at ${SITE_ORIGIN}/delete-account. You may also email ${SUPPORT_EMAIL} to delete waitlist or account data.`,
      },
      {
        heading: "Updates",
        body: "We may update this policy as Dexora evolves. Material changes will be reflected on this page with an updated effective date.",
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
