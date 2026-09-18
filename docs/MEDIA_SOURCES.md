# Media sources — Dexora website backgrounds

Provenance audit trail for decorative background videos used on https://www.dexora.app.

Downloading a video from Pinterest does **not** itself establish usage rights or licensing.
This file records source URLs and what could be verified from public pin metadata only.
Do not infer permission from CDN availability.

Date format: ISO dates. Added: **2026-09-18**.

---

## Hero / Header (`SECTION.HOME`)

| Field | Value |
| --- | --- |
| Website section | Hero / Header |
| Local asset | `public/backgrounds/dexora-hero-background.mp4` |
| Poster / reduced-motion fallback | `public/backgrounds/dexora-hero-background.jpg` |
| Original Pinterest URL | https://in.pinterest.com/pin/126100858316178460/ |
| Pinterest-listed creator | ionic crystal◇ (`hetamalvi0283`) — from pin JSON-LD `creator` |
| Original creator / source URL | Not reliably established beyond the Pinterest listing |
| Creator attribution | Creator attribution requires confirmation |
| Rights note | Permission confirmation pending |
| CDN retrieval URL | `https://v1.pinimg.com/videos/iht/expMp4/bb/e9/22/bbe922e52473e25975c9d38d9ab0ef09_720w.mp4` |
| Date added | 2026-09-18 |
| Replaced | `home-gengar.mp4` / `home-gengar.png` |

---

## Power Tools (`SECTION.TOOLS`)

| Field | Value |
| --- | --- |
| Website section | Power Tools |
| Local asset | `public/backgrounds/dexora-power-tools-background.mp4` |
| Poster / reduced-motion fallback | `public/backgrounds/dexora-power-tools-background.jpg` |
| Original Pinterest URL | https://in.pinterest.com/pin/10485011673645084/ |
| Pinterest-listed creator | dazindu Lk (`dazindulk`) — from pin JSON-LD `creator` |
| Original creator / source URL | Not reliably established beyond the Pinterest listing |
| Creator attribution | Creator attribution requires confirmation |
| Rights note | Permission confirmation pending |
| CDN retrieval URL | `https://v1.pinimg.com/videos/iht/expMp4/e3/1d/29/e31d293a07f06445d75180be042f49d4_720w.mp4` |
| Date added | 2026-09-18 |
| Replaced | `explore-mewtwo.mp4` (Tools section reference) / `explore-eternatus.png` poster |

---

## Your Home Screen (`SECTION.DAILY`)

| Field | Value |
| --- | --- |
| Website section | Your Home Screen |
| Local asset | `public/backgrounds/dexora-home-screen-background.mp4` |
| Poster / reduced-motion fallback | `public/backgrounds/dexora-home-screen-background.jpg` |
| Original Pinterest URL | https://in.pinterest.com/pin/2322237303327176/ |
| Pinterest-listed creator | Mercurio Fractal (`mercuriofractal`) — from pin JSON-LD `creator` |
| Original creator / source URL | https://www.instagram.com/mercuriofractal (pin `link` field) |
| Creator attribution | Creator attribution requires confirmation (Pinterest listing matches Instagram profile link; original artist identity still not independently verified beyond that) |
| Rights note | Permission confirmation pending |
| CDN retrieval URL | `https://v1.pinimg.com/videos/iht/expMp4/76/55/a4/7655a426efe58b46bd9fb2153b3a1670_720w.mp4` |
| Date added | 2026-09-18 |
| Replaced | `daily-scene.mp4` / `daily-scene.jpg` |

---

## Trainers Worldwide (`SECTION.COMMUNITY`)

| Field | Value |
| --- | --- |
| Website section | Trainers Worldwide |
| Local asset | `public/backgrounds/dexora-trainers-background.mp4` |
| Poster / reduced-motion fallback | `public/backgrounds/dexora-trainers-background.jpg` |
| Original Pinterest URL | https://in.pinterest.com/pin/1039416789000448712/ |
| Pinterest-listed creator | reachtheunseen — from pin JSON-LD `creator` |
| Original creator / source URL | https://www.instagram.com/reel/DH6VtgIsFIW/ (pin `link` field) |
| Creator attribution | Creator attribution requires confirmation |
| Rights note | Permission confirmation pending |
| CDN retrieval URL | `https://v1.pinimg.com/videos/iht/expMp4/6a/a6/81/6aa68119e49786cc0acfdb7ca2aa59b8_720w.mp4` |
| Date added | 2026-09-18 |
| Replaced | `explore-mewtwo.mp4` (Community section reference) / `explore-eternatus.png` poster |

---

## Explore (`SECTION.DOWNLOAD`)

| Field | Value |
| --- | --- |
| Website section | Explore (download / store CTA section labeled EXPLORE) |
| Local asset | `public/backgrounds/dexora-explore-background.mp4` |
| Poster / reduced-motion fallback | `public/backgrounds/dexora-explore-background.jpg` |
| Original Pinterest URL | https://in.pinterest.com/pin/795377984215520276/ |
| Pinterest-listed creator | Boyan Minchev (`realboyan`) — from pin JSON-LD `creator` |
| Original creator / source URL | Pin `link` points to an unrelated travel blog article; not treated as reliable artist source |
| Creator attribution | Creator attribution requires confirmation |
| Rights note | Permission confirmation pending |
| CDN retrieval URL | `https://v1.pinimg.com/videos/mc/720p/08/5d/0d/085d0d20f576e28a4bcd8362d5865f3b.mp4` |
| Date added | 2026-09-18 |
| Replaced | `download-legendary-birds.mp4` / `download-legendary-birds.jpg` |

---

## Final / About (`SECTION.FOOTER`)

| Field | Value |
| --- | --- |
| Website section | Final / footer (legal + about site chrome near bottom; `AboutSection` is not mounted in current `App.tsx`) |
| Local asset | `public/backgrounds/dexora-about-background.mp4` |
| Poster / reduced-motion fallback | `public/backgrounds/dexora-about-background.jpg` |
| Original Pinterest URL | https://in.pinterest.com/pin/795377984216022497/ |
| Pinterest-listed creator | Boyan Minchev (`realboyan`) — from pin JSON-LD `creator` |
| Original creator / source URL | https://direct.me/celestialvibes (pin `link` field; identity of original artist not independently verified) |
| Creator attribution | Creator attribution requires confirmation |
| Rights note | Permission confirmation pending |
| CDN retrieval URL | `https://v1.pinimg.com/videos/iht/720p/38/46/e0/3846e005edc5c1f778ba89746800384d.mp4` |
| Date added | 2026-09-18 |
| Replaced | `footer-gengar.mp4` / `footer-gengar.png` |

---

## Encode policy

Website copies are H.264 (`yuv420p`), muted (audio stream removed with ffmpeg `-an`), `+faststart`, max width 720px, decorative loop backgrounds only.
