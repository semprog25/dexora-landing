import { useCallback, useState } from "react"
import { AnimatedBackground } from "@/components/animated-background"
import { PokemonShadowField } from "@/components/pokemon-shadow-field"
import { LogoZoomIntro } from "@/components/logo-zoom-intro"
import { SiteFooter } from "@/components/site-footer"
import { useLenis } from "@/components/section-shell"
import { WaitlistHero } from "@/sections/waitlist-hero"
import { AboutSection } from "@/sections/about-section"
import { FeaturesSection } from "@/sections/features-section"
import { ToolsSection } from "@/sections/tools-section"
import { StatsSection } from "@/sections/stats-section"
import { ComingSoonSection } from "@/sections/coming-soon-section"

export function App() {
  const [introDone, setIntroDone] = useState(false)
  const handleIntroComplete = useCallback(() => setIntroDone(true), [])

  useLenis({ enabled: introDone })

  return (
    <>
      {!introDone && <LogoZoomIntro onComplete={handleIntroComplete} />}
      <AnimatedBackground />
      <PokemonShadowField />
      <main className={`relative z-10 snap-container ${introDone ? "" : "invisible"}`}>
        <WaitlistHero visible={introDone} />
        <div id="explore">
          <AboutSection />
          <FeaturesSection />
          <ToolsSection />
          <StatsSection />
          <ComingSoonSection />
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
