import { useSpeciesCount } from "@/i18n/use-species-count"
import { useTranslation } from "react-i18next"

export interface ToolHighlight {
  id: string
  title: string
  text: string
  accent: string
}

export function useToolHighlights(): ToolHighlight[] {
  const { t } = useTranslation("landing")
  const speciesCount = useSpeciesCount()

  return [
    {
      id: "vision",
      title: t("showcase.highlightVisionTitle"),
      text: t("showcase.highlightVisionText"),
      accent: "#FF6EC7",
    },
    {
      id: "catch",
      title: t("showcase.highlightCatchTitle"),
      text: t("showcase.highlightCatchText"),
      accent: "#FF8C42",
    },
    {
      id: "pokedex",
      title: t("showcase.highlightPokedexTitle"),
      text: t("showcase.highlightPokedexText", { speciesCount }),
      accent: "#3DBD62",
    },
    {
      id: "events",
      title: t("showcase.highlightEventsTitle"),
      text: t("showcase.highlightEventsText"),
      accent: "#64D9FF",
    },
  ]
}
