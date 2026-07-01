import type { CSSProperties } from "react"
import { getArtworkSrc, getShowcaseSrc } from "@/lib/showcase-pokemon"

interface PokemonShowcaseCardProps {
  dexId: number
  name: string
  glow: string
}

export function PokemonShowcaseCard({ dexId, name, glow }: PokemonShowcaseCardProps) {
  return (
    <figure
      className="pokemon-showcase-card group shrink-0"
      style={{ "--poke-glow": glow } as CSSProperties}
      aria-label={name}
    >
      <img
        src={getShowcaseSrc(dexId)}
        alt=""
        className="pokemon-showcase-img pokemon-showcase-silhouette"
        loading="lazy"
        decoding="async"
        draggable={false}
      />
      <img
        src={getArtworkSrc(dexId)}
        alt=""
        className="pokemon-showcase-img pokemon-showcase-artwork"
        loading="lazy"
        decoding="async"
        draggable={false}
      />
    </figure>
  )
}
