import { StaggerItem } from "@/components/section-shell"

interface FeatureCardProps {
  title: string
  description: string
  icon: string
  index: number
}

export function FeatureCard({ title, description, icon, index }: FeatureCardProps) {
  return (
    <StaggerItem index={index}>
      <article className="group relative h-full overflow-hidden rounded-2xl border border-white/[0.07] bg-[#111628]/80 p-8 backdrop-blur-sm transition hover:border-[#ffe500]/30 hover:shadow-[0_0_40px_rgba(61,114,255,0.15)]">
        <div
          className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl text-2xl transition group-hover:scale-110"
          style={{ background: "rgba(61,114,255,0.15)" }}
          aria-hidden="true"
        >
          {icon}
        </div>
        <h3 className="mb-3 text-xl font-bold text-[#edf0ff]">{title}</h3>
        <p className="text-[#8892b0] leading-relaxed">{description}</p>
        <div
          className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-0 blur-3xl transition group-hover:opacity-100"
          style={{ background: "rgba(255,229,0,0.12)" }}
        />
      </article>
    </StaggerItem>
  )
}
