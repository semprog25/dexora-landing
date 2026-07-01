import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { SectionShell, StaggerItem } from "@/components/section-shell"

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
      <div className="mb-10">
        <p className="font-mono mb-3 text-xs tracking-[0.35em] text-[#ffe500]">TOOLS SHOWCASE</p>
        <h2 className="text-3xl font-extrabold text-[#edf0ff] md:text-4xl">
          Power tools inside every tab
        </h2>
      </div>

      <div className="mx-auto flex w-full max-w-md flex-col gap-3">
        {TOOLS.map((t, i) => (
          <StaggerItem key={t.id} sectionIndex={sectionIndex} index={i}>
            <button
              type="button"
              onClick={() => setActive(i)}
              className={`w-full rounded-xl border px-5 py-4 text-center transition ${
                active === i
                  ? "border-white/20 bg-[#111628]/80 shadow-[0_0_30px_rgba(61,114,255,0.12)]"
                  : "border-transparent bg-white/[0.04] hover:bg-white/[0.07]"
              }`}
              aria-pressed={active === i}
            >
              <span className="font-mono text-xs tracking-wider" style={{ color: t.accent }}>
                {t.tag}
              </span>
              <p className="mt-1 font-semibold text-[#edf0ff]">{t.title}</p>
            </button>
          </StaggerItem>
        ))}
      </div>

      <div className="relative mx-auto mt-8 w-full max-w-lg overflow-hidden rounded-2xl border border-white/[0.07] bg-[#111628]/85 p-6 backdrop-blur-md md:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={tool.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center text-center"
          >
            <div
              className="mb-4 inline-flex rounded-full px-4 py-1 text-xs font-medium"
              style={{ background: `${tool.accent}22`, color: tool.accent }}
            >
              {tool.tag}
            </div>
            <h3 className="mb-3 text-2xl font-bold text-[#edf0ff] md:text-3xl">{tool.title}</h3>
            <p className="max-w-md text-base leading-relaxed text-[#8892b0]">{tool.description}</p>
          </motion.div>
        </AnimatePresence>

        <div className="mt-6 flex justify-center gap-2">
          {TOOLS.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              className={`h-2 rounded-full transition-all ${
                i === active ? "w-8 bg-[#ffe500]" : "w-2 bg-white/20"
              }`}
              aria-label={`Show tool ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </SectionShell>
  )
}
