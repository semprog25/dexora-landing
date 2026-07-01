export interface GlowBurst {
  x?: number
  y?: number
  color: string
  size?: number
}

type GlowListener = (burst: GlowBurst) => void

const listeners = new Set<GlowListener>()

export const KEYSTROKE_NEON_COLORS = [
  "#FFE500",
  "#3D72FF",
  "#7C4DFF",
  "#FF6EC7",
  "#00D4AA",
  "#3DBD62",
  "#FF6B35",
  "#00F0FF",
] as const

export function emitGlowBurst(burst: GlowBurst) {
  for (const listener of listeners) listener(burst)
}

export function subscribeGlowBursts(listener: GlowListener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}
