import { useEffect, useLayoutEffect } from 'react'
import { gsap, ScrollTrigger, MOTION_OK } from './lib/gsap'
import { useLang } from './lib/i18n'
import { startLenis } from './lib/scroll'
import About from './components/About'
import Altimeter from './components/Altimeter'
import Awards from './components/Awards'
import Contact from './components/Contact'
import CV from './components/CV'
import Gear from './components/Gear'
import Hero from './components/Hero'
import Languages from './components/Languages'
import Nav from './components/Nav'
import Route from './components/Route'

export default function App() {
  const { lang, t } = useLang()

  // Smooth scrolling, only when motion is allowed.
  useLayoutEffect(() => {
    const mm = gsap.matchMedia()
    mm.add(MOTION_OK, () => startLenis())
    return () => mm.revert()
  }, [])

  // Text length changes with the language and once Archivo loads: re-measure.
  useEffect(() => {
    ScrollTrigger.refresh()
    document.fonts?.ready.then(() => ScrollTrigger.refresh())
  }, [lang])

  return (
    <>
      <a href="#ruta" className="skip-link">
        {t.skip}
      </a>
      <Nav />
      <Altimeter />
      <div className="viewport-frame" aria-hidden="true" />
      <div className="grain-fixed" aria-hidden="true">
        <div className="grain" />
      </div>

      {/* Remount on language change so every split and trigger is rebuilt on the new text. */}
      <main key={lang}>
        <Hero />
        <Route />
        <Gear />
        <About />
        <CV />
        <div className="section grid grid-cols-[minmax(0,1fr)] gap-14 !pt-0 xl:grid-cols-[minmax(0,8fr)_minmax(0,4fr)] xl:gap-10">
          <Awards />
          <Languages />
        </div>
        <Contact />
      </main>
    </>
  )
}
