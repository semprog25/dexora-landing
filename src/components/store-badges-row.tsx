import { StoreFlipButton } from "@/components/store-flip-button"

interface StoreBadgesRowProps {
  className?: string
}

export function StoreBadgesRow({ className = "" }: StoreBadgesRowProps) {
  return (
    <div
      className={`store-badges-row mx-auto flex w-full max-w-lg flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5 ${className}`}
      role="group"
      aria-label="Download Dexora"
    >
      <StoreFlipButton platform="google" />
      <StoreFlipButton platform="apple" />
    </div>
  )
}
