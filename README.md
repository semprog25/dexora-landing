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

Pushes to `main` build `dist/` and deploy via [GitHub Actions](.github/workflows/deploy.yml).

**Setup (done once):**

1. **Settings → Secrets and variables → Actions** — `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`
2. **Settings → Pages → Build and deployment → Source** — select **GitHub Actions** (not “Deploy from a branch”)
3. Custom domain **`www.dexora.app`**, then **Enforce HTTPS** after DNS verifies
4. DNS — `CNAME` for `www` → `semprog25.github.io`
5. Optional apex — `A` records for `@` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`

The build generates static legal pages (`/privacy`, `/delete-account`, etc.) so those URLs return **HTTP 200** for Google Play review.

```bash
curl -I https://www.dexora.app/privacy
curl -I https://www.dexora.app/delete-account
# Expect: HTTP/2 200
```

**If the site looks broken or legal pages 404:** Pages is probably serving the **`main`** source branch instead of the built site. Fix: **Settings → Pages → Source → GitHub Actions**. Do not use “Deploy from branch: main” — `main` contains Vite source, not the production build.

## Environment

| Variable | Description |
|----------|-------------|
| `VITE_SUPABASE_URL` | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon/public key |
