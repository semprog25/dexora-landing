import { SectionShell } from "@/components/section-shell"
import { SectionEyebrow } from "@/components/section-eyebrow"
import { FeatureHighlightCard } from "@/components/feature-highlight-card"
import { PokemonMarquee } from "@/components/pokemon-marquee"
import { GO_AVAILABLE_OR_PLANNED_SPECIES } from "@/lib/go-metadata"

const HIGHLIGHTS = [
  {
    title: "Offline Pokédex",
    text: "GO stats, shinies, evolutions — cached on device.",
    accent: "#3D72FF",
  },
  {
    title: "Collection sync",
    text: "Caught, shiny, shadow, and hundo progress.",
    accent: "#FFE500",
  },
  {
    title: "Battle tools",
    text: "Counters, PvP ranks, and AI recommendations.",
    accent: "#7C4DFF",
  },
  {
    title: "Games",
    text: "Who's That Pokémon and daily mini-games.",
    accent: "#FF6EC7",
  },
  {
    title: "Translate",
    text: "Pokémon names and UI in 12+ languages.",
    accent: "#00D4AA",
  },
  {
    title: "AI Trainer",
    text: "Daily grind tips and personalized recommendations.",
    accent: "#3DBD62",
  },
] as const

interface ShowcaseSectionProps {
  sectionIndex: number
}

export function ShowcaseSection({ sectionIndex }: ShowcaseSectionProps) {
  return (
    <SectionShell index={sectionIndex} id="explore">
      <div className="showcase-panel mx-auto w-full max-w-2xl px-2 text-center">
        <SectionEyebrow accent="blue">EXPLORE DEXORA</SectionEyebrow>
        <h2 className="showcase-headline mb-2">
          <span className="block text-[#edf0ff]">
            {GO_AVAILABLE_OR_PLANNED_SPECIES}{" "}
            <span className="text-section-blue">Pokémon.</span>
          </span>
          <span className="block text-[#edf0ff]">One companion.</span>
        </h2>
        <p className="mx-auto mb-4 max-w-md text-sm leading-relaxed text-[#8892b0]">
          Coverage aligned with{" "}
          <span className="text-section-blue">Pokémon GO</span> as of 2026 — stats, availability, and
          artwork without tab-hopping.
        </p>

        <PokemonMarquee />

        <div className="feature-blocks-grid mx-auto mt-5">
          {HIGHLIGHTS.map((item, i) => (
            <FeatureHighlightCard
              key={item.title}
              title={item.title}
              text={item.text}
              accent={item.accent}
              index={i}
              sectionIndex={sectionIndex}
            />
          ))}
        </div>
      </div>
    </SectionShell>
  )
}
