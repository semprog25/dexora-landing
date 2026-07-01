/** Curated dex IDs with silhouette artwork in /public/pokemon/silhouettes/ */
export const SILHOUETTE_DEX_IDS = [
  25, 6, 150, 151, 94, 143, 249, 384, 445, 658, 700, 778, 888, 133, 196, 282,
  493, 803, 884, 1, 130, 448, 7,
] as const

export function getSilhouetteSrc(dexId: number): string {
  return `/pokemon/silhouettes/${dexId}.png`
}
