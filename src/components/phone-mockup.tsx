import { motion, useReducedMotion } from "motion/react"

interface PhoneMockupProps {
  className?: string
  label?: string
}

const DASHBOARD_ROWS = [
  { label: "Today's hunt", value: "Garchomp", accent: "#FFE500" },
  { label: "Collection", value: "721 / 951", accent: "#3D8EFF" },
  { label: "Raid rating", value: "4.2 ★", accent: "#9575CD" },
  { label: "Priority", value: "Power up Metagross", accent: "#3DBD62" },
]

export function PhoneMockup({ className = "", label = "Dexora home dashboard preview" }: PhoneMockupProps) {
  const reduceMotion = useReducedMotion()

  return (
    <div className={`phone-mockup ${className}`.trim()} aria-label={label} role="img">
      <div className="phone-mockup-bezel">
        <div className="phone-mockup-notch" aria-hidden />
        <div className="phone-mockup-screen">
          <div className="phone-mockup-header">
            <span className="phone-mockup-logo">D</span>
            <span className="phone-mockup-greeting">Good morning, Trainer</span>
          </div>
          <motion.div
            className="phone-mockup-hero"
            animate={reduceMotion ? undefined : { boxShadow: ["0 0 0 rgba(255,229,0,0)", "0 0 24px rgba(255,229,0,0.18)", "0 0 0 rgba(255,229,0,0)"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <p className="phone-mockup-hero-label">Today&apos;s Recommendation</p>
            <p className="phone-mockup-hero-title">Start your hunt →</p>
          </motion.div>
          <div className="phone-mockup-rows">
            {DASHBOARD_ROWS.map(row => (
              <div key={row.label} className="phone-mockup-row">
                <span>{row.label}</span>
                <strong style={{ color: row.accent }}>{row.value}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
