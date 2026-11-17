import { useRef } from 'react'
import { camps, focus, fullName, person } from '../data/portfolio'
import { altitude } from '../lib/altitude'
import { gsap, ScrollTrigger, MOTION_OK } from '../lib/gsap'
import { useLang } from '../lib/i18n'
import { scrollToTarget } from '../lib/scroll'
import { useMotion } from '../hooks/useMotion'
import HeroScene from './HeroScene'
import Pill from './Pill'

// The entrance plays once per page load, not again when the language changes.
let introPlayed = false

export default function Hero() {
  const { t, pick } = useLang()
  const root = useRef(null)

  useMotion(
    (mm) => {
      // The altimeter climbs from 0 to base camp while the hero scrolls away.
      mm.add('all', () => {
        // Ends where the route takes over (its trigger starts at "top 65%").
        ScrollTrigger.create({
          trigger: root.current,
          start: 'top top',
          end: 'bottom 65%',
          onUpdate: (self) => {
            if (self.isActive || self.progress === 0) altitude.set(self.progress * camps[0].altitude)
          },
        })
      })

      mm.add(MOTION_OK, () => {
        const q = gsap.utils.selector(root)

        // Ous entrance: nav → wordmark → copy, while the trail draws itself to the summit.
        if (!introPlayed) {
          gsap
            .timeline({ defaults: { ease: 'expo.out' }, onComplete: () => (introPlayed = true) })
            .from(document.querySelector('[data-nav]'), { y: -22, opacity: 0, duration: 0.9 }, 0)
            .from(q('[data-wordmark]'), { yPercent: 14, opacity: 0, duration: 1.4 }, 0.1)
            .from(
              [...q('[data-copy] > *'), document.querySelector('[data-altimeter]')],
              { y: 18, opacity: 0, duration: 1, stagger: 0.12 },
              0.5,
            )
            .from(q('[data-peak]'), { yPercent: 4, opacity: 0, duration: 1.8 }, 0)
            .from(q('[data-hero-trail]'), { drawSVG: 0, duration: 2.6, ease: 'power2.inOut' }, 0.4)
            .from(q('[data-hero-camp]'), { scale: 0, transformOrigin: '50% 50%', duration: 0.6, stagger: 0.5 }, 0.9)
            .from(q('[data-hero-flag]'), { scale: 0, transformOrigin: '0% 100%', duration: 1.1, ease: 'back.out(3)' }, 2.6)
        }

        // Depth: far layers drift less than near ones as the frame scrolls away.
        q('[data-depth]').forEach((layer) => {
          gsap.to(layer, {
            yPercent: parseFloat(layer.dataset.depth) * 60,
            ease: 'none',
            scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
          })
        })
      })
    },
    root,
  )

  return (
    <section
      ref={root}
      id="inicio"
      className="relative m-[7px] h-[calc(100svh-14px)] min-h-[36rem] overflow-hidden rounded-[20px] bg-[#0b0a0c]"
    >
      <HeroScene />
      <div className="grade" />

      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-7 px-[4vw] pb-16 md:pb-[max(3vw,1.5rem)] 2xl:flex-row-reverse 2xl:items-end 2xl:justify-between 2xl:gap-10">
        <div data-copy className="hero-copy z-10 ml-auto max-w-[22rem] 2xl:ml-0 2xl:pb-[2.2vw]">
          <p className="eyebrow">
            {fullName} · {pick(person.location)}
          </p>
          <p className="mt-4 text-[15px] leading-relaxed text-cream-dim sm:text-base">{pick(person.tagline)}</p>
          <ul aria-label={t.hero.focusLabel} className="mt-5 flex flex-wrap gap-2">
            {focus.map((area) => (
              <li key={area.id} className="area-tag">
                {pick(area.short)}
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <Pill
              href="#ruta"
              onClick={(e) => {
                e.preventDefault()
                scrollToTarget('#ruta', { duration: 1.8 })
              }}
            >
              {t.hero.cta}
            </Pill>
          </div>
        </div>

        <h1 data-wordmark className="wordmark shrink-0" aria-label={`${person.alias}, ${fullName}`}>
          <span aria-hidden="true">{person.alias}</span>
        </h1>
      </div>
    </section>
  )
}
