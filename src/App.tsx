import { useCallback, useState } from "react"
import { AnimatedBackground } from "@/components/animated-background"
import { DepthLayers } from "@/components/depth-layers"
import { PokemonShadowField } from "@/components/pokemon-shadow-field"
import { LogoZoomIntro } from "@/components/logo-zoom-intro"
import { ZoomSceneProvider } from "@/components/zoom-scene"
import { ZoomSection, ZoomProgress, ZoomHint } from "@/components/zoom-section"
import { WaitlistHero } from "@/sections/waitlist-hero"
import { AboutSection } from "@/sections/about-section"
import { FeaturesSection } from "@/sections/features-section"
import { ToolsSection } from "@/sections/tools-section"
import { StatsSection } from "@/sections/stats-section"
import { ComingSoonSection } from "@/sections/coming-soon-section"
import { FooterSection } from "@/sections/footer-section"
import { SECTION, SECTION_COUNT, SECTION_LABELS } from "@/lib/sections"

export function App() {
  const [introDone, setIntroDone] = useState(false)
  const handleIntroComplete = useCallback(() => setIntroDone(true), [])

  return (
    <>
      {!introDone && <LogoZoomIntro onComplete={handleIntroComplete} />}
      <ZoomSceneProvider sectionCount={SECTION_COUNT} enabled={introDone}>
        <AnimatedBackground />
        <PokemonShadowField />
        <DepthLayers />
        <main className={`zoom-viewport relative z-10 ${introDone ? "" : "invisible"}`}>
          <ZoomSection index={SECTION.WAITLIST} id="home">
            <WaitlistHero visible={introDone} />
          </ZoomSection>
          <ZoomSection index={SECTION.ABOUT} id="about">
            <AboutSection sectionIndex={SECTION.ABOUT} />
          </ZoomSection>
          <ZoomSection index={SECTION.FEATURES} id="features">
            <FeaturesSection sectionIndex={SECTION.FEATURES} />
          </ZoomSection>
          <ZoomSection index={SECTION.TOOLS} id="tools">
            <ToolsSection sectionIndex={SECTION.TOOLS} />
          </ZoomSection>
          <ZoomSection index={SECTION.STATS} id="stats">
            <StatsSection sectionIndex={SECTION.STATS} />
          </ZoomSection>
          <ZoomSection index={SECTION.COMING} id="coming-soon">
            <ComingSoonSection sectionIndex={SECTION.COMING} />
          </ZoomSection>
          <ZoomSection index={SECTION.FOOTER} id="footer">
            <FooterSection />
          </ZoomSection>
        </main>
        <ZoomProgress labels={SECTION_LABELS} />
        <ZoomHint />
        <div className="zoom-tunnel" aria-hidden="true" />
      </ZoomSceneProvider>
    </>
  )
}
