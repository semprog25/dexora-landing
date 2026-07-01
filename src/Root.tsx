import { useEffect, useState } from "react"
import { App } from "@/App"
import { LegalPage } from "@/pages/legal-page"
import { getLegalSlug } from "@/lib/legal-content"

function readPathname(): string {
  return window.location.pathname
}

export function Root() {
  const [pathname, setPathname] = useState(readPathname)
  const legalSlug = getLegalSlug(pathname)

  useEffect(() => {
    function handlePopState() {
      setPathname(readPathname())
    }

    window.addEventListener("popstate", handlePopState)
    return () => window.removeEventListener("popstate", handlePopState)
  }, [])

  if (legalSlug) {
    return <LegalPage slug={legalSlug} />
  }

  return <App />
}
