import { SectionShell } from "@/components/section-shell"
import { StatsCounter } from "@/components/stats-counter"
import { SectionEyebrow } from "@/components/section-eyebrow"

interface StatsSectionProps {
  sectionIndex: number
}

export function StatsSection({ sectionIndex }: StatsSectionProps) {
  return (
    <SectionShell index={sectionIndex} id="stats">
      <div className="content-panel mx-auto w-full max-w-3xl px-6 py-10 md:px-10">
        <SectionEyebrow accent="blue">OUR JOURNEY</SectionEyebrow>
        <h2 className="display-headline-sm mb-4 text-[#edf0ff]">Built for the grind</h2>
        <p className="mx-auto mb-12 max-w-xl text-base leading-relaxed text-[#8892b0] md:text-lg">
          Dexora packs serious data into a beautiful, offline-first experience.
        </p>

        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-6">
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
      </div>
    </SectionShell>
  )
}
