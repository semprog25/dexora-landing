import { SectionShell } from "@/components/section-shell"
import { StaggerItem } from "@/components/section-shell"

function StoreBadge({
  platform,
  subtitle,
  disabled,
}: {
  platform: "apple" | "google"
  subtitle: string
  disabled?: boolean
}) {
  return (
    <div
      className={`flex items-center gap-3 rounded-xl border px-5 py-3 ${
        disabled
          ? "cursor-not-allowed border-white/10 bg-white/[0.03] opacity-50"
          : "border-white/15 bg-white/[0.06]"
      }`}
      aria-disabled={disabled}
    >
      {platform === "apple" ? (
        <svg className="h-8 w-8 text-[#edf0ff]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.74 1.18 0 2.21-.93 3.12-.93 2.52.16 3.34 1.73 3.34 1.73-2.6 1.23-2.22 4.63.41 5.7-.47 2.04-1.58 3.5-2.38 4.66-1.02 1.58-1.02 1.58-1.95 2.93.03 0 .03 0 .03 0zM13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.87 1.5-2.95 1.5-.11-1.24.42-2.36 1.05-3.19z" />
        </svg>
      ) : (
        <svg className="h-8 w-8 text-[#edf0ff]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M3,20.5V3.5C3,2.91,3.34,2.39,3.84,2.14L13.65,12L3.84,21.86C3.34,21.61,3,21.09,3,20.5z M16.95,15.31L15.41,13.77 L5.48,23.7L16.95,15.31z M5.48,0.3L15.41,10.23L16.95,8.69L5.48,0.3z M18.65,10.4L22.09,12.22c0.78,0.41,0.78,1.15,0,1.57l-3.44,1.82 L16.9,12L18.65,10.4z" />
        </svg>
      )}
      <div>
        <p className="text-[10px] uppercase tracking-wide text-[#6b7494]">{subtitle}</p>
        <p className="font-semibold text-[#edf0ff]">
          {platform === "apple" ? "App Store" : "Google Play"}
        </p>
      </div>
      {disabled && (
        <span className="ml-auto rounded-full bg-[#ffe500]/20 px-3 py-1 text-xs font-medium text-[#ffe500]">
          Soon
        </span>
      )}
    </div>
  )
}

export function ComingSoonSection() {
  return (
    <SectionShell id="coming-soon">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <p className="font-mono mb-3 text-xs tracking-[0.35em] text-[#ffe500]">COMING SOON</p>
          <h2 className="mb-6 text-3xl font-extrabold text-[#edf0ff] md:text-5xl">
            Launching on iOS &amp; Android
          </h2>
          <p className="text-lg text-[#8892b0]">
            Dexora is in final polish. Join the waitlist to get notified the moment we hit the
            stores — early trainers get first access.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <StaggerItem index={0}>
            <StoreBadge platform="apple" subtitle="Download on the" disabled />
          </StaggerItem>
          <StaggerItem index={1}>
            <StoreBadge platform="google" subtitle="Get it on" disabled />
          </StaggerItem>
        </div>
      </div>
    </SectionShell>
  )
}
