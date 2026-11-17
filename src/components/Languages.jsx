import { useRef } from 'react'
import { languages } from '../data/portfolio'
import { MOTION_OK } from '../lib/gsap'
import { useLang } from '../lib/i18n'
import { revealOnScroll } from '../lib/reveal'
import { useMotion } from '../hooks/useMotion'
import SectionHead from './SectionHead'

export default function Languages() {
  const { t, pick } = useLang()
  const root = useRef(null)

  useMotion((mm) => mm.add(MOTION_OK, () => revealOnScroll(root.current)), root)

  return (
    <section ref={root} id="idiomas" aria-labelledby="idiomas-title">
      <SectionHead index="06" eyebrow={t.languages.eyebrow} title={t.languages.title} id="idiomas-title" size="sm" />
      <dl data-group className="card-frame mt-10 px-7 py-2">
        {languages.map((lang) => (
          <div
            key={pick(lang.name)}
            data-reveal
            className="flex items-baseline justify-between gap-6 border-b border-cream/12 py-5 last:border-b-0"
          >
            <dt className="text-lg font-medium text-cream">{pick(lang.name)}</dt>
            <dd className="display display--wrap max-w-[65%] text-right text-[clamp(1.35rem,1.9vw,1.85rem)]">
              {pick(lang.level)}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
