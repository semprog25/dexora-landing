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
    wallpaper: "/backgrounds/home-gengar.png",
    wallpaperVideo: "/backgrounds/home-glaceon.mp4",
    smokeHue: "#B24DFF",
  },
  [SECTION.TOOLS]: {
    wallpaper: "/backgrounds/explore-eternatus.png",
    wallpaperVideo: "/backgrounds/explore-mewtwo.mp4",
    figure: "/pokemon/silhouettes/150.png",
    figurePosition: "center",
    smokeHue: "#FF6EC7",
    contentDense: true,
  },
  [SECTION.DAILY]: {
    wallpaper: "/backgrounds/home-gengar.png",
    wallpaperVideo: "/backgrounds/home-glaceon.mp4",
    figure: "/pokemon/silhouettes/25.png",
    figurePosition: "center",
    smokeHue: "#FFE500",
    contentDense: true,
  },
  [SECTION.COMMUNITY]: {
    wallpaper: "/backgrounds/explore-eternatus.png",
    wallpaperVideo: "/backgrounds/explore-mewtwo.mp4",
    figure: "/pokemon/silhouettes/448.png",
    figurePosition: "center",
    smokeHue: "#3D72FF",
    contentDense: true,
  },
  [SECTION.DOWNLOAD]: {
    wallpaper: "/backgrounds/coming-eevee.png",
    wallpaperVideo: "/backgrounds/coming-umbreon.mp4",
    smokeHue: "#7C4DFF",
  },
  [SECTION.FOOTER]: {
    wallpaper: "/backgrounds/footer-gengar.png",
    wallpaperVideo: "/backgrounds/footer-gengar.mp4",
    wallpaperPosition: "right center",
    smokeHue: "#64D9FF",
  },
}
