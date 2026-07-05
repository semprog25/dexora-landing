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

Pushes to `main` build the site and publish the `dist/` folder to the **`gh-pages`** branch via [GitHub Actions](.github/workflows/deploy.yml).

**Setup (done once):**

1. **Settings → Secrets and variables → Actions** — `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`
2. **Settings → Pages** — **Source: Deploy from a branch**, branch **`gh-pages`**, folder **`/ (root)`**
3. Custom domain **`www.dexora.app`**, then **Enforce HTTPS** after DNS verifies
4. DNS — `CNAME` for `www` → `semprog25.github.io`

The build also generates static legal pages (`/privacy`, `/terms`, etc.) so those URLs return **HTTP 200** for Google Play and App Store review. Verify:

```bash
curl -I https://www.dexora.app/privacy
curl -I https://www.dexora.app/delete-account
# Expect: HTTP/2 200
```

## Environment

| Variable | Description |
|----------|-------------|
| `VITE_SUPABASE_URL` | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon/public key |
