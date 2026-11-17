import { useState } from 'react'
import { useLang } from '../lib/i18n'
import { AreaTags, CampMeta, MoreToggle, ProjectLinks, StackChips } from './Camp'

// The summit card: the top project, larger than a camp, with its motto.
// `compact` (mobile row) clamps the text behind a "Leer más" toggle.
export default function Summit({ camp, idPrefix = 'camp', compact = false }) {
  const { t, pick } = useLang()
  const [open, setOpen] = useState(false)
  const titleId = `${idPrefix}-${camp.id}`
  const short = compact && !open
  return (
    <article aria-labelledby={titleId} className="card-frame w-full p-6 sm:p-8">
      <CampMeta camp={camp} />
      <h3 id={titleId} data-split className="display mt-5 t-6">
        {camp.project}
      </h3>
      {camp.motto && (
        <blockquote
          data-split
          className="mt-4 t-2 font-medium italic leading-snug tracking-[-0.01em] text-cream"
        >
          «{camp.motto}»
        </blockquote>
      )}
      <div data-reveal>
        <AreaTags ids={camp.areas} className="mt-5" />
      </div>
      <ProjectLinks camp={camp} />
      <p data-reveal className={`mt-6 text-[15px] leading-relaxed text-cream-dim ${short ? 'line-clamp-4' : ''}`}>
        {pick(camp.pitch)}
      </p>
      {compact && <MoreToggle open={open} onToggle={() => setOpen(!open)} controls={`${titleId}-more`} />}
      <div id={`${titleId}-more`} className={short ? 'hidden' : undefined}>
        {camp.detail && (
          <p data-reveal className="mt-3 text-[14px] leading-relaxed text-cream/75">
            <span className="eyebrow mr-2">{t.route.detail}</span>
            {pick(camp.detail)}
          </p>
        )}
        {camp.next && (
          <p data-reveal className="mt-3 text-[14px] leading-relaxed text-cream/75">
            <span className="eyebrow mr-2">{t.route.whatsNext}</span>
            {pick(camp.next)}
          </p>
        )}
        <p data-reveal className="mt-3 text-[13px] text-cream/70">
          <span className="eyebrow mr-2">{t.route.role}</span>
          {pick(camp.role)}
        </p>
      </div>
      <StackChips items={pick(camp.stack)} />
    </article>
  )
}
