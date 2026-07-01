import type { CSSProperties } from "react"
import { StaggerItem } from "@/components/section-shell"

interface FeatureHighlightCardProps {
  title: string
  text: string
  accent: string
  index: number
  sectionIndex: number
}

export function FeatureHighlightCard({
  title,
  text,
  accent,
  index,
  sectionIndex,
}: FeatureHighlightCardProps) {
  return (
    <StaggerItem sectionIndex={sectionIndex} index={index}>
      <div
        className="feature-block feature-block--neon group"
        style={{ "--feature-accent": accent } as CSSProperties}
      >
        <h3 className="feature-block-title">{title}</h3>
        <p className="feature-block-text">{text}</p>
      </div>
    </StaggerItem>
  )
}
