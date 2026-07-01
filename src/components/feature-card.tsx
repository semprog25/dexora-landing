import { StaggerItem } from "@/components/section-shell"

interface FeatureCardProps {
  title: string
  description: string
  icon: string
  index: number
  sectionIndex: number
}

export function FeatureCard({
  title,
  description,
  icon,
  index,
  sectionIndex,
}: FeatureCardProps) {
  return (
    <StaggerItem sectionIndex={sectionIndex} index={index}>
      <article className="glass-card group relative flex h-full flex-col items-center rounded-2xl p-6 transition hover:border-white/15 md:p-7">
        <div
          className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl text-2xl transition group-hover:scale-105"
          style={{ background: "rgba(61,114,255,0.12)" }}
          aria-hidden="true"
        >
          {icon}
        </div>
        <h3 className="mb-2 text-lg font-bold text-[#edf0ff]">{title}</h3>
        <p className="text-sm leading-relaxed text-[#8892b0]">{description}</p>
      </article>
    </StaggerItem>
  )
}
