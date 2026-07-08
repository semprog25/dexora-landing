import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, "..")
const dist = path.join(root, "dist")

// Required for GitHub Pages to serve Vite routes and copied assets.
fs.writeFileSync(path.join(dist, ".nojekyll"), "")

function copyPath(from, to) {
  fs.cpSync(from, to, { recursive: true, force: true })
}

function removePath(target) {
  if (fs.existsSync(target)) fs.rmSync(target, { recursive: true, force: true })
}

const staticPaths = [
  "assets",
  "pokemon",
  "backgrounds",
  "privacy",
  "terms",
  "contact",
  "feedback",
  "delete-account",
]

for (const file of [
  "index.html",
  "404.html",
  "favicon.png",
  "apple-touch-icon.png",
  "dexora-logo.png",
  "dexora-d-logo.png",
  "icon-192.png",
  "icon-512.png",
  "robots.txt",
  "sitemap.xml",
  "CNAME",
  ".nojekyll",
  "_redirects",
]) {
  const from = path.join(dist, file)
  if (!fs.existsSync(from)) continue
  copyPath(from, path.join(root, file))
}

for (const dir of staticPaths) {
  const from = path.join(dist, dir)
  if (!fs.existsSync(from)) continue
  removePath(path.join(root, dir))
  copyPath(from, path.join(root, dir))
}

console.log("Synced production build from dist/ to repository root.")
