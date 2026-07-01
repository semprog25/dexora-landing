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

Pushes to `main` build and publish to the `gh-pages` branch via [GitHub Actions](.github/workflows/deploy.yml).

**One-time setup:**

1. **Settings → Secrets and variables → Actions** — add:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
2. **Settings → Pages** — set **Source** to **Deploy from a branch**, branch **`gh-pages`**, folder **`/ (root)`**.
3. Under **Custom domain**, enter `www.dexora.app` and enable **Enforce HTTPS** once DNS verifies.
4. DNS for **www.dexora.app**:
   - `CNAME` record: `www` → `semprog25.github.io`
   - Apex `dexora.app` can redirect to `www` at your DNS provider.

## Environment

| Variable | Description |
|----------|-------------|
| `VITE_SUPABASE_URL` | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon/public key |
