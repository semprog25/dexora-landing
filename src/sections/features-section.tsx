import { SectionShell } from "@/components/section-shell"
import { FeatureCard } from "@/components/feature-card"

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
      <div className="mb-14 text-center">
        <p className="font-mono mb-3 text-xs tracking-[0.35em] text-[#3d72ff]">CORE FEATURES</p>
        <h2 className="text-3xl font-extrabold text-[#edf0ff] md:text-5xl">
          Everything a serious trainer needs
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-[#8892b0]">
          Casual or hardcore — Dexora gives you the data edge without the grind of tab-hopping.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3 md:text-left">
        {FEATURES.map((f, i) => (
          <FeatureCard key={f.title} {...f} index={i} sectionIndex={sectionIndex} />
        ))}
      </div>
    </SectionShell>
  )
}
