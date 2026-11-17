import { useRef, useState } from 'react'
import { cv } from '../data/portfolio'
import { gsap, MOTION_OK } from '../lib/gsap'
import { useLang } from '../lib/i18n'
import { revealOnScroll } from '../lib/reveal'
import { useMotion } from '../hooks/useMotion'
import { AreaTags } from './Camp'
import { ArrowUpRight } from './icons'
import SectionHead from './SectionHead'

// One waypoint of the CV trail. On mobile its bullet points fold behind a toggle.
function Entry({ entry, index }) {
  const { t, pick } = useLang()
  const [open, setOpen] = useState(false)
  const bulletsId = `cv-entry-${index}`
  const bullets = entry.bullets ? pick(entry.bullets) : []
  return (
    <li data-group className="relative">
      <div data-reveal className="flex items-center gap-3">
        <span
          aria-hidden="true"
          data-waypoint
          className="block h-[13px] w-[13px] flex-none rounded-full border-2 border-moss bg-frame"
        />
        <span className="eyebrow tabular-nums text-cream">{pick(entry.when)}</span>
        <span aria-hidden="true" className="h-px flex-1 border-t border-dashed border-cream/20" />
      </div>
      <div className="pl-[25px]">
        <div data-reveal className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="eyebrow">{t.cv.types[entry.type]}</span>
          <AreaTags ids={entry.areas} />
        </div>
        <h4 data-reveal className="mt-2 t-2 font-bold leading-tight tracking-[-0.015em] text-cream">
          {pick(entry.title)}
        </h4>
        <p data-reveal className="mt-1 text-[15px] text-cream/80">
          {pick(entry.subtitle)}
          {entry.tools && <span className="text-cream/55"> · {pick(entry.tools)}</span>}
        </p>
        {entry.repo && (
          <a
            data-reveal
            href={entry.repo}
            target="_blank"
            rel="noreferrer noopener"
            className="mt-2 inline-flex items-center gap-1.5 text-[13px] font-medium text-moss underline-offset-4 hover:underline"
          >
            {t.route.repo}
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        )}
        {bullets.length > 0 && (
          <>
            <ul id={bulletsId} className={`mt-3 space-y-2 ${open ? '' : 'max-md:hidden'}`}>
              {bullets.map((line) => (
                <li key={line} data-reveal className="flex gap-3 text-[14.5px] leading-relaxed">
                  <span aria-hidden="true" className="mt-[0.7em] h-px w-3 flex-none bg-cream/40" />
                  {line}
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-controls={bulletsId}
              className="mt-2 block text-[13px] font-medium text-moss underline-offset-4 hover:underline md:hidden"
            >
              {open ? t.cv.hide : t.cv.show}
            </button>
          </>
        )}
      </div>
    </li>
  )
}

// The CV in the site's own style: education and skills side by side, then every
// project, competition and course as waypoints on a trail, newest first.
export default function CV() {
  const { t, pick } = useLang()
  const root = useRef(null)
  const { education, entries, skills } = cv

  useMotion(
    (mm) => {
      mm.add(MOTION_OK, () => {
        revealOnScroll(root.current)
        gsap.utils.toArray('[data-waypoint]', root.current).forEach((dot) => {
          gsap.from(dot, {
            scale: 0,
            duration: 0.7,
            ease: 'back.out(3)',
            scrollTrigger: { trigger: dot, start: 'top 85%', once: true },
          })
        })
      })
    },
    root,
  )

  return (
    <section ref={root} id="cv" aria-labelledby="cv-title" className="section">
      <SectionHead eyebrow={t.cv.eyebrow} title={t.cv.title} lead={t.cv.lead} id="cv-title" />

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <article data-group className="card-frame p-6 sm:p-7">
          <h3 data-reveal className="eyebrow">
            {t.cv.education}
          </h3>
          <p data-reveal className="mt-4 t-2 font-medium leading-tight text-cream">
            {pick(education.title)}
          </p>
          <p data-reveal className="mt-2 text-sm text-cream/70">
            {pick(education.place)}
          </p>
          <p data-reveal className="eyebrow mt-3 tabular-nums">
            {pick(education.when)}
          </p>
          <h4 data-reveal className="eyebrow mt-6">
            {t.cv.concentration}
          </h4>
          <ul className="mt-3 flex flex-wrap gap-2">
            {pick(education.concentration).map((item) => (
              <li key={item} data-chip className="chip">
                {item}
              </li>
            ))}
          </ul>
        </article>

        <article data-group className="card-frame flex flex-col p-6 sm:p-7">
          <h3 data-reveal className="eyebrow">
            {t.cv.skills}
          </h3>
          {skills.map((group) => (
            <div key={pick(group.label)} className="mt-5">
              <h4 data-reveal className="text-sm font-medium text-cream">
                {pick(group.label)}
              </h4>
              <ul className="mt-3 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li key={item} data-chip className="chip">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div data-reveal className="mt-auto border-t border-cream/12 pt-5">
            <h4 className="eyebrow flex items-center gap-2">
              <span aria-hidden="true" className="relative flex h-2 w-2">
                <span className="absolute inset-0 animate-ping rounded-full bg-moss opacity-60 motion-reduce:animate-none" />
                <span className="relative h-2 w-2 rounded-full bg-moss" />
              </span>
              {t.cv.availability}
            </h4>
            <p className="mt-3 text-[15px] leading-relaxed">{pick(education.availability)}</p>
          </div>
        </article>
      </div>

      <h3 className="eyebrow mt-14">{t.cv.timeline}</h3>
      <ol className="mt-7 grid gap-x-14 gap-y-9 lg:grid-cols-2">
        {entries.map((entry, i) => (
          <Entry key={i} entry={entry} index={i} />
        ))}
      </ol>
    </section>
  )
}
