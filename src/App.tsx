import { useCallback, useState } from "react"
import { AnimatedBackground } from "@/components/animated-background"
import { PokemonSilhouetteCanvas } from "@/components/pokemon-silhouette-canvas"
import { IntroLoader } from "@/components/intro-loader"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { useLenis } from "@/components/section-shell"
import { HeroSection } from "@/sections/hero-section"
import { AboutSection } from "@/sections/about-section"
import { FeaturesSection } from "@/sections/features-section"
import { ToolsSection } from "@/sections/tools-section"
import { StatsSection } from "@/sections/stats-section"
import { ComingSoonSection } from "@/sections/coming-soon-section"
import { WaitlistSection } from "@/sections/waitlist-section"

export function App() {
  const [loaderDone, setLoaderDone] = useState(false)
  const handleLoaderComplete = useCallback(() => setLoaderDone(true), [])

  useLenis({ enabled: loaderDone })

  return (
    <>
      {!loaderDone && <IntroLoader onComplete={handleLoaderComplete} />}
      <AnimatedBackground />
      <PokemonSilhouetteCanvas />
      <SiteHeader />
      <main className={`relative z-10 snap-container ${loaderDone ? "" : "invisible"}`}>
        <HeroSection />
        <AboutSection />
        <FeaturesSection />
        <ToolsSection />
        <StatsSection />
        <ComingSoonSection />
        <WaitlistSection />
      </main>
      <SiteFooter />
    </>
  )
}
