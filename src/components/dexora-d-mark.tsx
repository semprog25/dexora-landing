import { useId } from "react"

interface DexoraDMarkProps {
  size?: number
  className?: string
  animate?: boolean
}

/** Vector Dexora mark — italic D, fin, and orbital ring (matches brand logo). */
export function DexoraDMark({ size = 120, className = "", animate = true }: DexoraDMarkProps) {
  const uid = useId().replace(/:/g, "")
  const dGrad = `dGrad-${uid}`
  const ringGrad = `ringGrad-${uid}`
  const glow = `glow-${uid}`

  const dBody =
    "M 32 22 L 32 78 L 50 78 C 74 78 74 22 50 22 Z"
  const dFin = "M 32 22 L 14 12 L 22 30 Z"
  const dashMain = 320
  const dashRing = 240

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={dGrad} x1="20%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%" stopColor="#FFE500" />
          <stop offset="45%" stopColor="#FFC800" />
          <stop offset="100%" stopColor="#FF8C1A" />
        </linearGradient>
        <linearGradient id={ringGrad} x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#00E5FF" />
          <stop offset="45%" stopColor="#3D72FF" />
          <stop offset="100%" stopColor="#D946EF" />
        </linearGradient>
        <filter id={glow} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="2.5" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g transform="skewX(-8)" filter={`url(#${glow})`}>
        <path
          d={dFin}
          fill={`url(#${dGrad})`}
          className={animate ? "dexora-d-fin" : ""}
          style={animate ? { opacity: 0 } : undefined}
        />
        <path
          d={dBody}
          fill={`url(#${dGrad})`}
          className={animate ? "dexora-d-fill" : ""}
          style={animate ? { opacity: 0 } : undefined}
        />
        <path
          d={dBody}
          stroke={`url(#${dGrad})`}
          strokeWidth="2.5"
          strokeLinejoin="round"
          fill="none"
          className={animate ? "dexora-d-draw-path" : ""}
          style={
            animate
              ? { strokeDasharray: dashMain, strokeDashoffset: dashMain }
              : undefined
          }
        />
      </g>

      <ellipse
        cx="50"
        cy="50"
        rx="38"
        ry="13.5"
        transform="rotate(-26 50 50)"
        stroke={`url(#${ringGrad})`}
        strokeWidth="2.2"
        fill="none"
        strokeLinecap="round"
        className={animate ? "dexora-ring-draw" : ""}
        style={
          animate
            ? { strokeDasharray: dashRing, strokeDashoffset: dashRing, opacity: 0.95 }
            : undefined
        }
      />
    </svg>
  )
}
