#!/usr/bin/env node
/**
 * Sync Dexora brand assets from Dexora-main into this landing site.
 */
import { copyFile, mkdir } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const LANDING_ROOT = path.resolve(__dirname, "..")
const APP_ROOT = path.resolve(LANDING_ROOT, "..", "Dexora-main")

const ASSETS = [
  { from: "public/dexora-logo.png", to: "public/dexora-logo.png" },
  { from: "public/dexora-logo.png", to: "public/favicon.png" },
]

async function main() {
  await mkdir(path.join(LANDING_ROOT, "public"), { recursive: true })

  for (const asset of ASSETS) {
    const source = path.join(APP_ROOT, asset.from)
    const target = path.join(LANDING_ROOT, asset.to)
    await copyFile(source, target)
    console.log(`Synced ${asset.to}`)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
