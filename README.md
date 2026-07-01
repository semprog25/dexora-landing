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

Pushes to `main` deploy automatically via [GitHub Actions](.github/workflows/deploy.yml).

1. In the repo **Settings → Secrets and variables → Actions**, add:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
2. In **Settings → Pages**, set **Source** to **GitHub Actions**.
3. Point DNS for **www.dexora.app** to GitHub Pages:
   - `CNAME` record: `www` → `semprog25.github.io` (or your Pages hostname shown in Settings)
   - Apex `dexora.app` can redirect to `www` via your DNS provider, or use A records for GitHub Pages.

The `public/CNAME` file pins the custom domain to **www.dexora.app**.

## Environment

| Variable | Description |
|----------|-------------|
| `VITE_SUPABASE_URL` | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon/public key |
