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

export function ToolsSection() {
  const [active, setActive] = useState(0)
  const tool = TOOLS[active]

  return (
    <SectionShell id="tools">
      <div className="mb-12 text-center">
        <p className="font-mono mb-3 text-xs tracking-[0.35em] text-[#ffe500]">TOOLS SHOWCASE</p>
        <h2 className="text-3xl font-extrabold text-[#edf0ff] md:text-5xl">
          Power tools inside every tab
        </h2>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
        <div className="flex flex-col gap-3">
          {TOOLS.map((t, i) => (
            <StaggerItem key={t.id} index={i}>
              <button
                type="button"
                onClick={() => setActive(i)}
                className={`w-full rounded-xl border px-5 py-4 text-left transition ${
                  active === i
                    ? "border-white/20 bg-[#111628] shadow-[0_0_30px_rgba(61,114,255,0.12)]"
                    : "border-transparent bg-white/[0.03] hover:bg-white/[0.06]"
                }`}
                aria-pressed={active === i}
              >
                <span
                  className="font-mono text-xs tracking-wider"
                  style={{ color: t.accent }}
                >
                  {t.tag}
                </span>
                <p className="mt-1 font-semibold text-[#edf0ff]">{t.title}</p>
              </button>
            </StaggerItem>
          ))}
        </div>

        <div className="relative min-h-[320px] overflow-hidden rounded-2xl border border-white/[0.07] bg-[#111628]/80 p-8 backdrop-blur-sm md:min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex h-full flex-col justify-center"
            >
              <div
                className="mb-6 inline-flex w-fit rounded-full px-4 py-1 text-xs font-medium"
                style={{
                  background: `${tool.accent}22`,
                  color: tool.accent,
                }}
              >
                {tool.tag}
              </div>
              <h3 className="mb-4 text-3xl font-bold text-[#edf0ff] md:text-4xl">{tool.title}</h3>
              <p className="max-w-lg text-lg leading-relaxed text-[#8892b0]">{tool.description}</p>
              <div
                className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full blur-3xl"
                style={{ background: `${tool.accent}18` }}
              />
            </motion.div>
          </AnimatePresence>

          <div className="absolute bottom-6 right-6 flex gap-2">
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
      </div>
    </SectionShell>
  )
}
