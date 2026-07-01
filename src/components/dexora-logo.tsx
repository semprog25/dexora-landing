interface DexoraLogoProps {
  height?: number
  className?: string
  alt?: string
  fluid?: boolean
}

const LOGO_ASPECT = 1536 / 1024

export function DexoraLogo({
  height = 48,
  className = "",
  alt = "Dexora",
  fluid = false,
}: DexoraLogoProps) {
  if (fluid) {
    return (
      <img
        src="/dexora-logo.png"
        alt={alt}
        className={`footer-logo-fluid block shrink-0 object-contain ${className}`}
        draggable={false}
      />
    )
  }

  const width = Math.round(height * LOGO_ASPECT)

  return (
    <img
      src="/dexora-logo.png"
      alt={alt}
      width={width}
      height={height}
      className={`block shrink-0 object-contain ${className}`}
      style={{ width, height, maxWidth: width, maxHeight: height }}
      draggable={false}
    />
  )
}
