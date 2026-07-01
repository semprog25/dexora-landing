interface DexoraDLogoProps {
  height?: number
  className?: string
  alt?: string
}

const D_LOGO_ASPECT = 880 / 622

export function DexoraDLogo({
  height = 40,
  className = "",
  alt = "Dexora",
}: DexoraDLogoProps) {
  const width = Math.round(height * D_LOGO_ASPECT)

  return (
    <img
      src="/dexora-d-logo.png"
      alt={alt}
      width={width}
      height={height}
      className={`block shrink-0 object-contain ${className}`}
      style={{ width, height, maxWidth: width, maxHeight: height }}
      draggable={false}
    />
  )
}
