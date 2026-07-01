import { SectionShell } from "@/components/section-shell"
import { StatsCounter } from "@/components/stats-counter"

interface StatsSectionProps {
  sectionIndex: number
}

export function StatsSection({ sectionIndex }: StatsSectionProps) {
  return (
    <SectionShell index={sectionIndex} id="stats">
      <div className="mb-14 text-center">
        <p className="font-mono mb-3 text-xs tracking-[0.35em] text-[#3d72ff]">OUR JOURNEY</p>
        <h2 className="text-3xl font-extrabold text-[#edf0ff] md:text-5xl">
          Built for the grind
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-[#8892b0]">
          Dexora packs serious data into a beautiful, offline-first experience.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
        <StatsCounter sectionIndex={sectionIndex} value={888} suffix="+" label="Pokémon in dex" />
        <StatsCounter sectionIndex={sectionIndex} value={100} suffix="%" label="Offline Pokédex" />
        <StatsCounter sectionIndex={sectionIndex} value={12} suffix="+" label="Languages supported" />
        <StatsCounter
          sectionIndex={sectionIndex}
          value={4.9}
          suffix=""
          label="Trainer satisfaction"
          decimals={1}
        />
      </div>
    </SectionShell>
  )
}
