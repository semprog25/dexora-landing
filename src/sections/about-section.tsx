import { DexoraLogo } from "@/components/dexora-logo"
import { SectionShell, StaggerItem } from "@/components/section-shell"
import { SectionEyebrow } from "@/components/section-eyebrow"

interface AboutSectionProps {
  sectionIndex: number
}

export function AboutSection({ sectionIndex }: AboutSectionProps) {
  return (
    <SectionShell index={sectionIndex} id="about">
      <div className="content-panel mx-auto w-full max-w-2xl px-6 py-10 md:px-10">
        <SectionEyebrow accent="yellow">ABOUT US</SectionEyebrow>
        <div className="mb-8 flex justify-center">
          <DexoraLogo height={72} className="footer-logo-glow" alt="Dexora" />
        </div>
        <h2 className="display-headline-sm mb-6 text-[#edf0ff]">
          Built by trainers,
          <span className="block">for trainers</span>
        </h2>
        <p className="mb-10 text-base leading-relaxed text-[#8892b0] md:text-lg">
          We&apos;re not just an app — we&apos;re a community of passionate Pokémon GO players who
          wanted smarter tools without waiting for signal at every PokéStop.
        </p>

        <div className="mx-auto max-w-lg space-y-4">
          <StaggerItem sectionIndex={sectionIndex} index={0}>
            <div className="glass-card rounded-2xl p-6 text-center">
              <p className="leading-relaxed text-[#edf0ff]">
                Browse stats, evolutions, counters, and more — no connection required. Dexora
                works offline-first so you can research anywhere.
              </p>
            </div>
          </StaggerItem>
          <StaggerItem sectionIndex={sectionIndex} index={1}>
            <div className="glass-card rounded-2xl border-[#3d72ff]/15 p-6 text-center">
              <p className="leading-relaxed text-[#8892b0]">
                Help trainers make smarter decisions every day — from evolve recommendations to
                type counters and PvP league insights.
              </p>
            </div>
          </StaggerItem>
          <StaggerItem sectionIndex={sectionIndex} index={2}>
            <div className="glass-card rounded-2xl border-[#ffe500]/15 p-5">
              <p className="font-mono text-center text-xs tracking-[0.2em] text-[#6b7494]">
                FAN-MADE · NON-COMMERCIAL · NOT AFFILIATED WITH NIANTIC OR TPC
              </p>
            </div>
          </StaggerItem>
        </div>
      </div>
    </SectionShell>
  )
}
