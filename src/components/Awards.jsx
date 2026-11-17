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
      <SectionHead index="05" eyebrow={t.awards.eyebrow} title={t.awards.title} id="premios-title" size="sm" />
      <ul className="swipe mt-10 md:grid md:grid-cols-3 md:gap-6 lg:grid-cols-1 xl:grid-cols-3">
        {awards.map((award) => (
          <li key={award.title} data-group className="card-frame flex flex-col p-7">
            <span aria-hidden="true" data-reveal className="mb-5 block h-[3px] w-8 rounded-full bg-ochre" />
            <p data-split className="display display--wrap text-[clamp(1.8rem,2.3vw,2.5rem)] [overflow-wrap:anywhere] [hyphens:auto]">
              {pick(award.rank)}
            </p>
            <h3 data-reveal className="mt-5 text-lg font-medium leading-snug text-cream">
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
