import { SectionShell } from "@/components/section-shell"
import { FeatureCard } from "@/components/feature-card"
import { SectionEyebrow } from "@/components/section-eyebrow"

const FEATURES = [
  {
    icon: "📖",
    title: "Offline Pokédex",
    description:
      "888+ Pokémon with accurate GO stats, evolution costs, shiny availability, and high-res artwork — all cached on your device.",
  },
  {
    icon: "☁️",
    title: "Collection & Cloud Sync",
    description:
      "Track caught, shiny, shadow, lucky, and hundo Pokémon. Your collection syncs securely to the cloud across devices.",
  },
  {
    icon: "⚔️",
    title: "Battle Intelligence",
    description:
      "Type counters, move sets, PvP league rankings, and AI-powered recommendations to win more raids and GBL matches.",
  },
]

interface FeaturesSectionProps {
  sectionIndex: number
}

export function FeaturesSection({ sectionIndex }: FeaturesSectionProps) {
  return (
    <SectionShell index={sectionIndex} id="features">
      <div className="content-panel mx-auto w-full max-w-4xl px-6 py-10 md:px-10">
        <SectionEyebrow accent="blue">CORE FEATURES</SectionEyebrow>
        <h2 className="display-headline-sm mb-4 text-[#edf0ff]">
          Everything a serious trainer needs
        </h2>
        <p className="mx-auto mb-12 max-w-2xl text-base leading-relaxed text-[#8892b0] md:text-lg">
          Casual or hardcore — Dexora gives you the data edge without the grind of tab-hopping.
        </p>

        <div className="grid gap-5 text-center md:grid-cols-3">
          {FEATURES.map((f, i) => (
            <FeatureCard key={f.title} {...f} index={i} sectionIndex={sectionIndex} />
          ))}
        </div>
      </div>
    </SectionShell>
  )
}
