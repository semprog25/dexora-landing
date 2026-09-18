import { SECTION } from "@/lib/sections"

export interface SectionBackdropConfig {
  wallpaper: string
  wallpaperVideo?: string
  wallpaperPosition?: string
  figure?: string
  figurePosition?: "center" | "bottom" | "right"
  smokeHue: string
  /** Brighter wallpaper for content-heavy scroll sections */
  contentDense?: boolean
}

export const SECTION_BACKDROPS: Record<number, SectionBackdropConfig> = {
  [SECTION.HOME]: {
    wallpaper: "/backgrounds/dexora-hero-background.jpg",
    wallpaperVideo: "/backgrounds/dexora-hero-background.mp4",
    smokeHue: "#B24DFF",
  },
  [SECTION.TOOLS]: {
    wallpaper: "/backgrounds/dexora-power-tools-background.jpg",
    wallpaperVideo: "/backgrounds/dexora-power-tools-background.mp4",
    figure: "/pokemon/silhouettes/150.png",
    figurePosition: "center",
    smokeHue: "#FF6EC7",
    contentDense: true,
  },
  [SECTION.DAILY]: {
    wallpaper: "/backgrounds/dexora-home-screen-background.jpg",
    wallpaperVideo: "/backgrounds/dexora-home-screen-background.mp4",
    figure: "/pokemon/silhouettes/25.png",
    figurePosition: "center",
    smokeHue: "#FFE500",
    contentDense: true,
  },
  [SECTION.COMMUNITY]: {
    wallpaper: "/backgrounds/dexora-trainers-background.jpg",
    wallpaperVideo: "/backgrounds/dexora-trainers-background.mp4",
    figure: "/pokemon/silhouettes/448.png",
    figurePosition: "center",
    smokeHue: "#3D72FF",
    contentDense: true,
  },
  [SECTION.DOWNLOAD]: {
    wallpaper: "/backgrounds/dexora-explore-background.jpg",
    wallpaperVideo: "/backgrounds/dexora-explore-background.mp4",
    smokeHue: "#7C4DFF",
  },
  [SECTION.FOOTER]: {
    wallpaper: "/backgrounds/dexora-about-background.jpg",
    wallpaperVideo: "/backgrounds/dexora-about-background.mp4",
    wallpaperPosition: "right center",
    smokeHue: "#64D9FF",
  },
}
