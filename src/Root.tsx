import { useEffect, useState } from "react"
import { App } from "@/App"
import { LegalPage } from "@/pages/legal-page"
import { WaitlistAdminPage } from "@/pages/waitlist-admin-page"
import { getLegalSlug } from "@/lib/legal-content"
import { isWaitlistAdminPath } from "@/lib/waitlist-admin"

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

  if (isWaitlistAdminPath(pathname)) {
    return <WaitlistAdminPage />
  }

  return <App />
}
