import { SECTION_COUNT } from "@/lib/sections"

/** Curated dex IDs with silhouette artwork in /public/pokemon/silhouettes/ */
export const SILHOUETTE_DEX_IDS = [
  25, 6, 150, 151, 94, 143, 249, 384, 445, 658, 700, 778, 888, 133, 196, 282,
  493, 803, 884, 1, 130, 448, 7,
] as const

export interface SectionPokemonConfig {
  dexId: number
  /** Outline glow colors (outer halo only) */
  glow: [string, string, string]
  name: string
}

/** One hero Pokémon per zoom section */
export const SECTION_POKEMON: SectionPokemonConfig[] = [
  { dexId: 25, glow: ["#FFE500", "#FFA800", "#3D72FF"], name: "Pikachu" },
  { dexId: 150, glow: ["#7C4DFF", "#3D72FF", "#FF6EC7"], name: "Mewtwo" },
  { dexId: 6, glow: ["#FF6B35", "#FFE500", "#FF4757"], name: "Charizard" },
  { dexId: 448, glow: ["#3D72FF", "#64D9FF", "#7C4DFF"], name: "Lucario" },
  { dexId: 94, glow: ["#7C4DFF", "#9575CD", "#3D72FF"], name: "Gengar" },
  { dexId: 658, glow: ["#3D8EFF", "#3D72FF", "#FFE500"], name: "Greninja" },
]

export function getSilhouetteSrc(dexId: number): string {
  return `/pokemon/silhouettes/${dexId}.png`
}

export function getSectionPokemon(index: number): SectionPokemonConfig {
  const safe = Math.max(0, Math.min(index, SECTION_COUNT - 1))
  return SECTION_POKEMON[safe] ?? SECTION_POKEMON[0]
}

export interface HiddenPokemonPlacement {
  dexId: number
  /** Normalized x (can be <0 or >1 for off-screen crop) */
  nx: number
  ny: number
  /** Size as fraction of min(viewport width, height) */
  sizeFactor: number
  glow: [string, string, string]
}

/** Pokémon hidden around the viewport — revealed by cursor spotlight */
export const HIDDEN_POKEMON_PLACEMENTS: HiddenPokemonPlacement[] = [
  { dexId: 25, nx: 0.08, ny: 0.14, sizeFactor: 0.26, glow: ["#FFE500", "#FFA800", "#3D72FF"] },
  { dexId: 150, nx: 0.92, ny: 0.12, sizeFactor: 0.3, glow: ["#7C4DFF", "#3D72FF", "#FF6EC7"] },
  { dexId: 6, nx: -0.04, ny: 0.55, sizeFactor: 0.34, glow: ["#FF6B35", "#FFE500", "#FF4757"] },
  { dexId: 448, nx: 1.04, ny: 0.48, sizeFactor: 0.28, glow: ["#3D72FF", "#64D9FF", "#7C4DFF"] },
  { dexId: 94, nx: 0.18, ny: 0.88, sizeFactor: 0.24, glow: ["#7C4DFF", "#9575CD", "#3D72FF"] },
  { dexId: 658, nx: 0.82, ny: 0.85, sizeFactor: 0.27, glow: ["#3D8EFF", "#3D72FF", "#FFE500"] },
  { dexId: 151, nx: 0.5, ny: -0.06, sizeFactor: 0.22, glow: ["#FF6EC7", "#7C4DFF", "#3D72FF"] },
  { dexId: 143, nx: 0.35, ny: 0.38, sizeFactor: 0.2, glow: ["#FFE500", "#7C4DFF", "#3D72FF"] },
  { dexId: 384, nx: 0.68, ny: 0.35, sizeFactor: 0.24, glow: ["#3D72FF", "#22d87a", "#FFE500"] },
  { dexId: 133, nx: 0.12, ny: 0.42, sizeFactor: 0.18, glow: ["#FFE500", "#FF6EC7", "#3D72FF"] },
  { dexId: 130, nx: 0.9, ny: 0.68, sizeFactor: 0.32, glow: ["#3D72FF", "#64D9FF", "#7C4DFF"] },
  { dexId: 7, nx: 0.55, ny: 1.05, sizeFactor: 0.2, glow: ["#3D8EFF", "#3D72FF", "#22d87a"] },
]
