import { SectionShell, StaggerItem } from "@/components/section-shell"

interface AboutSectionProps {
  sectionIndex: number
}

export function AboutSection({ sectionIndex }: AboutSectionProps) {
  return (
    <SectionShell index={sectionIndex} id="about">
      <div className="mx-auto max-w-2xl">
        <p className="font-mono mb-3 text-xs tracking-[0.35em] text-[#ffe500]">ABOUT US</p>
        <h2 className="mb-6 text-3xl font-extrabold text-[#edf0ff] md:text-5xl">
          Built by trainers,
          <br />
          for trainers
        </h2>
        <p className="mb-10 text-lg leading-relaxed text-[#8892b0]">
          We&apos;re not just an app — we&apos;re a community of passionate Pokémon GO players who
          wanted smarter tools without waiting for signal at every PokéStop.
        </p>

        <div className="mx-auto max-w-xl space-y-4 text-left">
          <StaggerItem sectionIndex={sectionIndex} index={0}>
            <div className="rounded-2xl border border-white/[0.07] bg-[#111628]/70 p-6 backdrop-blur-sm">
              <p className="leading-relaxed text-[#edf0ff]">
                Browse stats, evolutions, counters, and more — no connection required. Dexora
                works offline-first so you can research anywhere.
              </p>
            </div>
          </StaggerItem>
          <StaggerItem sectionIndex={sectionIndex} index={1}>
            <div className="rounded-2xl border border-[#3d72ff]/20 bg-[#111628]/70 p-6 backdrop-blur-sm">
              <p className="leading-relaxed text-[#8892b0]">
                Help trainers make smarter decisions every day — from evolve recommendations to
                type counters and PvP league insights.
              </p>
            </div>
          </StaggerItem>
          <StaggerItem sectionIndex={sectionIndex} index={2}>
            <div className="rounded-2xl border border-[#ffe500]/20 bg-[#111628]/70 p-6 backdrop-blur-sm">
              <p className="font-mono text-center text-sm text-[#6b7494]">
                Fan-made · Non-commercial · Not affiliated with Niantic or TPC
              </p>
            </div>
          </StaggerItem>
        </div>
      </div>
    </SectionShell>
  )
}
