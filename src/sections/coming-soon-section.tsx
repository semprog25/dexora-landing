import { SectionShell } from "@/components/section-shell"
import { StoreBadgesRow } from "@/components/store-badges-row"
import { StaggerItem } from "@/components/section-shell"

interface ComingSoonSectionProps {
  sectionIndex: number
}

export function ComingSoonSection({ sectionIndex }: ComingSoonSectionProps) {
  return (
    <SectionShell index={sectionIndex} id="coming-soon">
      <div className="download-section mx-auto w-full max-w-xl px-4 text-center">
        <h2 className="download-headline mb-5">
          <span className="text-[#edf0ff]">Download </span>
          <span className="text-section-purple">Now</span>
        </h2>

        <p className="download-copy mx-auto mb-8 max-w-md">
          Dexora is in final polish for{" "}
          <span className="text-section-purple">iOS</span> and{" "}
          <span className="text-[#edf0ff]">Android</span>. Tap a store to check availability.
        </p>

        <StaggerItem sectionIndex={sectionIndex} index={0}>
          <StoreBadgesRow />
        </StaggerItem>
      </div>
    </SectionShell>
  )
}
