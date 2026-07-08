import { useCallback, useState } from "react"
import { AnimatedBackground } from "@/components/animated-background"
import { LanguageSwitcher } from "@/components/language-switcher"
import { SectionPokemonBackdrop } from "@/components/section-pokemon-backdrop"
import { CursorPaintGlow } from "@/components/cursor-paint-glow"
import { DepthLayers } from "@/components/depth-layers"
import { LogoZoomIntro } from "@/components/logo-zoom-intro"
import { ZoomSceneProvider } from "@/components/zoom-scene"
import { ZoomSection, ZoomHint } from "@/components/zoom-section"
import { WaitlistHero } from "@/sections/waitlist-hero"
import { ShowcaseSection } from "@/sections/showcase-section"
import { ComingSoonSection } from "@/sections/coming-soon-section"
import { FooterSection } from "@/sections/footer-section"
import { SECTION, SECTION_COUNT } from "@/lib/sections"

export function App() {
  const [introFinished, setIntroFinished] = useState(false)
  const [siteVisible, setSiteVisible] = useState(false)

  const handleIntroReveal = useCallback(() => setSiteVisible(true), [])
  const handleIntroComplete = useCallback(() => setIntroFinished(true), [])

  return (
    <>
      {!introFinished && (
        <LogoZoomIntro onReveal={handleIntroReveal} onComplete={handleIntroComplete} />
      )}
      <ZoomSceneProvider sectionCount={SECTION_COUNT} enabled={siteVisible}>
        <LanguageSwitcher />
        <AnimatedBackground />
        <CursorPaintGlow />
        <SectionPokemonBackdrop />
        <DepthLayers />
        <main
          className={`zoom-viewport relative z-10 transition-opacity duration-[360ms] ease-out ${
            siteVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <ZoomSection index={SECTION.HOME} id="home" className="!px-4 sm:!px-6 home-section">
            <WaitlistHero visible={siteVisible} />
          </ZoomSection>
          <ZoomSection index={SECTION.SHOWCASE} id="explore" className="!py-6 md:!py-8" contentOverflow="visible">
            <ShowcaseSection sectionIndex={SECTION.SHOWCASE} />
          </ZoomSection>
          <ZoomSection index={SECTION.DOWNLOAD} id="download">
            <ComingSoonSection sectionIndex={SECTION.DOWNLOAD} />
          </ZoomSection>
          <ZoomSection index={SECTION.FOOTER} id="footer">
            <FooterSection />
          </ZoomSection>
        </main>
        <ZoomHint />
        <div className="zoom-tunnel" aria-hidden="true" />
      </ZoomSceneProvider>
    </>
  )
}
