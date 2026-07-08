export const SECTION = {
  HOME: 0,
  SHOWCASE: 1,
  DOWNLOAD: 2,
  FOOTER: 3,
} as const

export const SECTION_COUNT = 4

/** @deprecated Use SECTION.HOME */
export const SECTION_WAITLIST = SECTION.HOME

export const SECTION_LABEL_KEYS = [
  "nav.home",
  "nav.explore",
  "nav.download",
  "nav.legal",
] as const
