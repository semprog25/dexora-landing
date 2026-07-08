import { PokemonShowcaseCard } from "@/components/pokemon-showcase-card"
import { SHOWCASE_POKEMON } from "@/lib/showcase-pokemon"

interface PokemonMarqueeProps {
  className?: string
}

function MarqueeGroup({ groupId }: { groupId: string }) {
  return (
    <div className="pokemon-marquee-group" aria-hidden={groupId === "b" ? true : undefined}>
      {SHOWCASE_POKEMON.map(mon => (
        <PokemonShowcaseCard
          key={`${groupId}-${mon.dexId}`}
          dexId={mon.dexId}
          name={mon.name}
          glow={mon.glow}
        />
      ))}
    </div>
  )
}

export function PokemonMarquee({ className = "" }: PokemonMarqueeProps) {
  return (
    <div
      className={`pokemon-marquee-bleed pokemon-marquee-wrap--compact ${className}`.trim()}
      aria-label="Pokémon showcase"
    >
      <div className="pokemon-marquee-viewport">
        <div className="pokemon-marquee-track">
          <MarqueeGroup groupId="a" />
          <MarqueeGroup groupId="b" />
        </div>
      </div>
    </div>
  )
}
