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
  { dexId: 151, glow: ["#FF6EC7", "#7C4DFF", "#3D72FF"], name: "Mew" },
]

export function getSilhouetteSrc(dexId: number): string {
  return `/pokemon/silhouettes/${dexId}.png`
}

export function getSectionPokemon(index: number): SectionPokemonConfig {
  const safe = Math.max(0, Math.min(index, SECTION_COUNT - 1))
  return SECTION_POKEMON[safe] ?? SECTION_POKEMON[0]
}
