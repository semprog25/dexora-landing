import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { Root } from "./Root"
import { I18nProvider } from "./i18n/provider"
import "./styles/index.css"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <I18nProvider>
      <Root />
    </I18nProvider>
  </StrictMode>
)
