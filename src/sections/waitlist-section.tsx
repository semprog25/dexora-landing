import { SectionShell } from "@/components/section-shell"
import { WaitlistForm } from "@/components/waitlist-form"

export function WaitlistSection() {
  return (
    <SectionShell id="waitlist">
      <div className="rounded-3xl border border-[#ffe500]/20 bg-gradient-to-br from-[#111628] to-[#1a1f35] p-10 text-center md:p-16">
        <p className="font-mono mb-3 text-xs tracking-[0.35em] text-[#ffe500]">JOIN THE HUNT</p>
        <h2 className="mb-4 text-3xl font-extrabold text-[#edf0ff] md:text-5xl">
          Be first on the waitlist
        </h2>
        <p className="mx-auto mb-10 max-w-lg text-[#8892b0]">
          Join trainers getting early access to Dexora. No spam — just one email when we launch.
        </p>
        <WaitlistForm variant="cta" />
      </div>
    </SectionShell>
  )
}
