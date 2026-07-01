import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { SectionShell, StaggerItem } from "@/components/section-shell"
import { SectionEyebrow } from "@/components/section-eyebrow"

const TOOLS = [
  {
    id: "evolve",
    title: "Evolve Planner",
    tag: "Collection",
    description:
      "See which Pokémon to evolve first based on meta relevance, candy costs, and your collection gaps.",
    accent: "#ffe500",
  },
  {
    id: "counters",
    title: "Type Counters",
    tag: "Battle",
    description:
      "Instant type effectiveness charts and counter picks for raids, gyms, and Team GO Rocket battles.",
    accent: "#3d72ff",
  },
  {
    id: "reminders",
    title: "Daily Reminders",
    tag: "Habits",
    description:
      "Never miss a research breakthrough, event window, or community day prep again.",
    accent: "#22d87a",
  },
  {
    id: "community",
    title: "Trainer Community",
    tag: "Social",
    description:
      "Share friend codes, join raid groups, and connect with trainers worldwide.",
    accent: "#ff6ec7",
  },
  {
    id: "games",
    title: "Mini-Games",
    tag: "Fun",
    description:
      "Who's That Pokémon, Type Match Blitz, CP Clash, and more — train your knowledge while you wait.",
    accent: "#ff8c42",
  },
]

interface ToolsSectionProps {
  sectionIndex: number
}

export function ToolsSection({ sectionIndex }: ToolsSectionProps) {
  const [active, setActive] = useState(0)
  const tool = TOOLS[active]

  return (
    <SectionShell index={sectionIndex} id="tools">
      <div className="content-panel mx-auto w-full max-w-lg px-6 py-10 md:px-10">
        <SectionEyebrow accent="yellow">TOOLS SHOWCASE</SectionEyebrow>
        <h2 className="display-headline-sm mb-8 text-[#edf0ff]">
          Power tools inside every tab
        </h2>

        <div className="mx-auto flex w-full flex-col gap-2">
          {TOOLS.map((t, i) => (
            <StaggerItem key={t.id} sectionIndex={sectionIndex} index={i}>
              <button
                type="button"
                onClick={() => setActive(i)}
                className={`glass-card w-full rounded-xl px-5 py-3.5 text-center transition ${
                  active === i
                    ? "border-white/20 bg-white/[0.08] shadow-[0_0_24px_rgba(61,114,255,0.1)]"
                    : "hover:bg-white/[0.06]"
                }`}
                aria-pressed={active === i}
              >
                <span className="font-mono text-[10px] tracking-[0.2em]" style={{ color: t.accent }}>
                  {t.tag}
                </span>
                <p className="mt-0.5 text-sm font-semibold text-[#edf0ff]">{t.title}</p>
              </button>
            </StaggerItem>
          ))}
        </div>

        <div className="relative mx-auto mt-6 w-full overflow-hidden rounded-2xl border border-white/[0.06] bg-[#07091a]/60 p-6 backdrop-blur-md">
          <AnimatePresence mode="wait">
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center text-center"
            >
              <div
                className="mb-3 inline-flex rounded-full px-3 py-1 text-[10px] font-medium tracking-wide"
                style={{ background: `${tool.accent}22`, color: tool.accent }}
              >
                {tool.tag}
              </div>
              <h3 className="mb-2 text-xl font-bold text-[#edf0ff]">{tool.title}</h3>
              <p className="max-w-sm text-sm leading-relaxed text-[#8892b0]">{tool.description}</p>
            </motion.div>
          </AnimatePresence>

          <div className="mt-5 flex justify-center gap-2">
            {TOOLS.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActive(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === active ? "w-6 bg-[#ffe500]" : "w-1.5 bg-white/20"
                }`}
                aria-label={`Show tool ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  )
}
