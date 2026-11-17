import { useRef } from 'react'
import { awards } from '../data/portfolio'
import { MOTION_OK } from '../lib/gsap'
import { useLang } from '../lib/i18n'
import { revealOnScroll } from '../lib/reveal'
import { useMotion } from '../hooks/useMotion'
import SectionHead from './SectionHead'

export default function Awards() {
  const { t, pick } = useLang()
  const root = useRef(null)

  useMotion((mm) => mm.add(MOTION_OK, () => revealOnScroll(root.current)), root)

  return (
    <section ref={root} id="premios" aria-labelledby="premios-title">
      <SectionHead title={t.awards.title} id="premios-title" size="sm" />
      <ul className="swipe mt-8 lg:grid lg:auto-rows-fr lg:grid-cols-3 lg:gap-6">
        {awards.map((award) => (
          <li key={award.title} data-group className="card-frame flex flex-col p-6">
            <span aria-hidden="true" data-reveal className="mb-5 block h-[3px] w-8 rounded-full bg-ochre" />
            <p data-split className="display display--wrap t-3">
              {pick(award.rank)}
            </p>
            <h3 data-reveal className="mt-4 text-base font-medium leading-snug text-cream">
              {award.title}
            </h3>
            <p data-reveal className="mt-1 text-sm text-cream/70">
              {pick(award.detail)}
            </p>
            <p data-reveal className="eyebrow mt-auto pt-6 tabular-nums">
              {pick(award.when)}
            </p>
          </li>
        ))}
      </ul>
    </section>
  )
}
