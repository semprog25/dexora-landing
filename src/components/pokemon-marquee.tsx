import { PokemonShowcaseCard } from "@/components/pokemon-showcase-card"
import { SHOWCASE_POKEMON } from "@/lib/showcase-pokemon"

const LOOP_ITEMS = [...SHOWCASE_POKEMON, ...SHOWCASE_POKEMON]

export function PokemonMarquee() {
  return (
    <div className="pokemon-marquee-bleed pokemon-marquee-wrap--compact" aria-label="Pokémon showcase">
      <div className="pokemon-marquee-fade pokemon-marquee-fade-left" aria-hidden="true" />
      <div className="pokemon-marquee-fade pokemon-marquee-fade-right" aria-hidden="true" />
      <div className="pokemon-marquee-viewport">
        <div className="pokemon-marquee-track" aria-hidden="true">
          {LOOP_ITEMS.map((mon, i) => (
            <PokemonShowcaseCard
              key={`${mon.dexId}-${i}`}
              dexId={mon.dexId}
              name={mon.name}
              glow={mon.glow}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
