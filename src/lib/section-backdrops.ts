import { SECTION } from "@/lib/sections"

export interface SectionBackdropConfig {
  wallpaper: string
  wallpaperVideo?: string
  wallpaperPosition?: string
  figure?: string
  figurePosition?: "center" | "bottom" | "right"
  smokeHue: string
}

export const SECTION_BACKDROPS: Record<number, SectionBackdropConfig> = {
  [SECTION.HOME]: {
    wallpaper: "/backgrounds/home-gengar.png",
    wallpaperVideo: "/backgrounds/home-glaceon.mp4",
    smokeHue: "#B24DFF",
  },
  [SECTION.SHOWCASE]: {
    wallpaper: "/backgrounds/explore-eternatus.png",
    wallpaperVideo: "/backgrounds/explore-mewtwo.mp4",
    smokeHue: "#3D72FF",
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
