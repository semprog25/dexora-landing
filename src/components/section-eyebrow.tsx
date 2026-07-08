interface SectionEyebrowProps {
  children: string
  accent?: "yellow" | "blue" | "green" | "pink" | "muted"
}

export function SectionEyebrow({ children, accent = "muted" }: SectionEyebrowProps) {
  const color =
    accent === "yellow"
      ? "text-[#ffe500]"
      : accent === "blue"
        ? "text-[#3d72ff]"
        : accent === "green"
          ? "text-[#3dbd62]"
          : accent === "pink"
            ? "text-[#ff6ec7]"
            : "text-[#6b7494]"

  return (
    <p className={`section-eyebrow font-mono mb-4 ${color}`}>
      {children}
    </p>
  )
}
