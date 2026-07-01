import { getSilhouetteSrc } from "@/lib/pokemon-silhouettes"

export const SHOWCASE_POKEMON = [
  { dexId: 25, name: "Pikachu", glow: "#FFE500" },
  { dexId: 6, name: "Charizard", glow: "#FF6B35" },
  { dexId: 150, name: "Mewtwo", glow: "#7C4DFF" },
  { dexId: 151, name: "Mew", glow: "#FF2D95" },
  { dexId: 448, name: "Lucario", glow: "#00F0FF" },
  { dexId: 658, name: "Greninja", glow: "#3D8EFF" },
  { dexId: 94, name: "Gengar", glow: "#B24DFF" },
  { dexId: 384, name: "Rayquaza", glow: "#39FF14" },
  { dexId: 143, name: "Snorlax", glow: "#FFE500" },
  { dexId: 133, name: "Eevee", glow: "#FF8C42" },
  { dexId: 888, name: "Zacian", glow: "#00F0FF" },
  { dexId: 1, name: "Bulbasaur", glow: "#39FF14" },
] as const

export function getShowcaseSrc(dexId: number): string {
  return getSilhouetteSrc(dexId)
}

export function getArtworkSrc(dexId: number): string {
  return `/pokemon/artwork/${dexId}.png`
}
