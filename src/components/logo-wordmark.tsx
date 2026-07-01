interface LogoWordmarkProps {
  size?: "sm" | "lg"
}

export function LogoWordmark({ size = "lg" }: LogoWordmarkProps) {
  const textSize = size === "lg" ? "text-3xl md:text-4xl" : "text-xl"

  return (
    <span className={`font-extrabold tracking-tight ${textSize}`} style={{ letterSpacing: "-0.04em" }}>
      <span className="text-[#edf0ff]">Dex</span>
      <span className="text-[#ffe500]">ora</span>
    </span>
  )
}
