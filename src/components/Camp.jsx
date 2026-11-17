import { useState } from 'react'
import { focus } from '../data/portfolio'
import { formatAlt } from '../lib/altitude'
import { useLang } from '../lib/i18n'
import { GitHub, Lock } from './icons'
import Pill from './Pill'

// "Ver código" / "Demo" pills. A link set to null hides its button. Private
// repositories get a badge so visitors know why the link may not open yet.
export function ProjectLinks({ camp }) {
  const { t } = useLang()
  const { links } = camp
  const items = [
    links?.code && { href: links.code, label: t.route.code },
    links?.demo && { href: links.demo, label: t.route.demo, ghost: true },
  ].filter(Boolean)
  if (!items.length) return null
  return (
    <div data-reveal className="mt-6 flex flex-wrap items-center gap-3">
      {items.map((item) => (
        <Pill key={item.label} href={item.href} external small ghost={item.ghost}>
          {item.label}
        </Pill>
      ))}
      {camp.private && (
        <span className="private-badge" title={t.route.privateHint}>
          <Lock className="h-3 w-3" />
          {t.route.private}
          {camp.soon && <span className="soon">· {t.route.soon}</span>}
          <span className="sr-only">. {t.route.privateHint}</span>
        </span>
      )}
      {camp.team && (
        <span className="repo-badge">
          <GitHub className="h-3 w-3" />
          {t.route.team}
        </span>
      )}
    </div>
  )
}

export function StackChips({ items }) {
  return (
    <ul className="mt-5 flex flex-wrap gap-2">
      {items.map((item) => (
        <li key={item} data-chip className="chip">
          {item}
        </li>
      ))}
    </ul>
  )
}

// Focus areas (IA, Blockchain, Ciberseguridad) as small tags.
export function AreaTags({ ids, className = '' }) {
  const { pick } = useLang()
  if (!ids?.length) return null
  return (
    <ul className={`flex flex-wrap gap-1.5 ${className}`}>
      {ids.map((id) => {
        const area = focus.find((f) => f.id === id)
        return area ? (
          <li key={id} className="area-tag">
            {pick(area.short)}
          </li>
        ) : null
      })}
    </ul>
  )
}

// Camp name, altitude and alpine grade: the real altitude text for assistive tech.
export function CampMeta({ camp }) {
  const { t, lang, pick } = useLang()
  const grade = t.grades[camp.grade.replace(/[+-]$/, '')]
  return (
    <div data-reveal className="eyebrow flex items-center gap-3">
      <span>{pick(camp.camp)}</span>
      <span aria-hidden="true" className="h-px w-5 bg-cream/30" />
      <span className="tabular-nums">{formatAlt(camp.altitude, lang)} m</span>
      <span className={`grade-badge ml-auto ${camp.grade === 'ED' ? '!border-ochre !text-ochre' : ''}`} title={grade}>
        <span className="sr-only">
          {t.route.grade}: {grade ? `${grade} ` : ''}
        </span>
        {camp.grade}
      </span>
    </div>
  )
}

// "Leer más" for compact cards: the full text stays in the DOM for screen readers.
export function MoreToggle({ open, onToggle, controls }) {
  const { t } = useLang()
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={open}
      aria-controls={controls}
      className="mt-2 text-[13px] font-medium text-moss underline-offset-4 hover:underline"
    >
      {open ? t.route.less : t.route.more}
    </button>
  )
}

export default function Camp({ camp, idPrefix = 'camp', compact = false }) {
  const { t, pick } = useLang()
  const [open, setOpen] = useState(false)
  const titleId = `${idPrefix}-${camp.id}`
  const clamp = compact && !open
  return (
    <article aria-labelledby={titleId} className="card-frame p-6 sm:p-7">
      <CampMeta camp={camp} />
      <h3 id={titleId} data-split className="display display--wrap mt-5 text-[clamp(1.9rem,min(3.3vw,5.6vh),3rem)]">
        {camp.project}
      </h3>
      <div data-reveal>
        <AreaTags ids={camp.areas} className="mt-4" />
      </div>
      <p id={`${titleId}-text`} data-reveal className={`mt-4 text-[15px] leading-relaxed text-cream-dim ${clamp ? 'line-clamp-4' : ''}`}>
        {pick(camp.pitch)}
      </p>
      {camp.detail && (
        <p data-reveal className={`mt-3 text-[14px] leading-relaxed text-cream/75 ${clamp ? 'hidden' : ''}`}>
          <span className="eyebrow mr-2">{t.route.detail}</span>
          {pick(camp.detail)}
        </p>
      )}
      {compact && <MoreToggle open={open} onToggle={() => setOpen(!open)} controls={`${titleId}-text`} />}
      <p data-reveal className="mt-4 text-[13px] text-cream/70">
        <span className="eyebrow mr-2">{t.route.role}</span>
        {pick(camp.role)}
      </p>
      <StackChips items={pick(camp.stack)} />
      <ProjectLinks camp={camp} />
    </article>
  )
}
