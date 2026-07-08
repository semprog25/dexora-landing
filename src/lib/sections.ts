export const SECTION = {
  HOME: 0,
  TOOLS: 1,
  DAILY: 2,
  COMMUNITY: 3,
  DOWNLOAD: 4,
  FOOTER: 5,
} as const

export const SECTION_COUNT = 6

/** @deprecated Use SECTION.HOME */
export const SECTION_WAITLIST = SECTION.HOME

/** @deprecated Use SECTION.TOOLS */
export const SECTION_SHOWCASE = SECTION.TOOLS

export const SECTION_LABEL_KEYS = [
  "nav.home",
  "nav.tools",
  "nav.daily",
  "nav.community",
  "nav.download",
  "nav.legal",
] as const
