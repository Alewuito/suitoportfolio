import { useRef } from 'react'
import { about, focus } from '../data/portfolio'
import { MOTION_OK } from '../lib/gsap'
import { useLang } from '../lib/i18n'
import { revealOnScroll } from '../lib/reveal'
import { useMotion } from '../hooks/useMotion'
import SectionHead from './SectionHead'

export default function About() {
  const { t, pick } = useLang()
  const root = useRef(null)

  useMotion((mm) => mm.add(MOTION_OK, () => revealOnScroll(root.current)), root)

  return (
    <section ref={root} id="sobre-mi" aria-labelledby="sobre-mi-title" className="section">
      <SectionHead title={t.about.title} id="sobre-mi-title" />

      <div data-group className="card-frame mt-14 grid gap-8 p-7 sm:p-9 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-14">
        <div>
          {pick(about.paragraphs).map((text, i) => (
            <p
              key={i}
              data-reveal
              className={i === 0 ? 't-1 leading-snug text-cream' : 'mt-4 text-base leading-relaxed'}
            >
              {text}
            </p>
          ))}
        </div>
        <div className="lg:border-l lg:border-cream/12 lg:pl-10">
          <h3 data-reveal className="eyebrow">
            {t.about.interests}
          </h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {pick(about.interests).map((item) => (
              <li key={item} data-chip className="chip">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <h3 className="eyebrow mt-14">{t.about.focusTitle}</h3>
      <ul className="swipe mt-5 lg:grid lg:auto-rows-fr lg:grid-cols-3 lg:gap-6">
        {focus.map((area) => (
          <li key={area.id} data-group className="card-frame flex flex-col p-6 sm:p-7">
            <span aria-hidden="true" data-reveal className="block h-[3px] w-8 rounded-full bg-ochre" />
            <h4 data-split className="display display--wrap mt-3 t-3">
              {pick(area.label)}
            </h4>
            <p data-reveal className="mt-4 text-[15px] leading-relaxed">
              {pick(area.text)}
            </p>
            <ul className="mt-6 space-y-3 border-t border-cream/12 pt-5">
              {pick(area.evidence).map((item) => (
                <li key={item} data-reveal className="flex gap-3 text-[14px] leading-relaxed text-cream/80">
                  <span aria-hidden="true" className="mt-[0.45em] h-1.5 w-1.5 flex-none rounded-full bg-moss" />
                  {item}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  )
}
