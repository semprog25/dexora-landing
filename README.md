# Dexora Landing Page

Marketing site for [dexora.app](https://dexora.app) — cinematic landing page with waitlist signup.

## Stack

- Vite + React + TypeScript
- Tailwind CSS v4
- Motion (animations)
- Lenis (smooth scroll)
- Supabase (waitlist)

## Setup

```bash
npm install
cp .env.example .env.local
# Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY from your Dexora Supabase project
npm run dev
```

Apply the waitlist migration in the Dexora-main repo:

```bash
cd ../Dexora-main
supabase db push
```

## Build

```bash
npm run build
npm run preview
```

### GitHub Pages (production)

Pushes to `main` deploy via [GitHub Actions](.github/workflows/deploy.yml).

**Setup (done once):**

1. **Settings → Secrets and variables → Actions** — `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`
2. **Settings → Pages** — **Source: GitHub Actions**, custom domain `www.dexora.app`, **Enforce HTTPS** after DNS verifies
3. DNS — `CNAME` for `www` → `semprog25.github.io`

## Environment

| Variable | Description |
|----------|-------------|
| `VITE_SUPABASE_URL` | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon/public key |
