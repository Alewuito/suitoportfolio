import { useMemo, useRef, useState } from 'react'
import { camps, gear } from '../data/portfolio'
import { gsap, MOTION_OK } from '../lib/gsap'
import { useLang } from '../lib/i18n'
import { revealOnScroll } from '../lib/reveal'
import { useMotion } from '../hooks/useMotion'
import MiniRoute from './MiniRoute'
import SectionHead from './SectionHead'

// Which camps used each technology, derived from every project's stack.
function campsByTech() {
  const map = new Map()
  camps.forEach((camp, i) => {
    const stack = Array.isArray(camp.stack) ? camp.stack : Object.values(camp.stack).flat()
    new Set(stack.map((tech) => tech.toLowerCase())).forEach((tech) => map.set(tech, [...(map.get(tech) ?? []), i]))
  })
  return map
}

export default function Gear() {
  const { t, pick } = useLang()
  const root = useRef(null)
  const [tech, setTech] = useState(null)
  const usedAt = useMemo(campsByTech, [])
  const active = tech ? (usedAt.get(tech.toLowerCase()) ?? []) : []

  useMotion(
    (mm) => {
      mm.add(MOTION_OK, () => {
        revealOnScroll(root.current)
        // Each group is packed in turn: its items fly in with a short stagger.
        gsap.utils.toArray('[data-pack]', root.current).forEach((pack) => {
          gsap
            .timeline({ scrollTrigger: { trigger: pack, start: 'top 85%', once: true } })
            .from(pack, { y: 40, opacity: 0, duration: 1 })
            .from(
              pack.querySelectorAll('[data-item]'),
              {
                x: () => gsap.utils.random(-70, 70),
                y: () => gsap.utils.random(40, 110),
                rotation: () => gsap.utils.random(-18, 18),
                opacity: 0,
                duration: 0.9,
                stagger: 0.045,
              },
              0.15,
            )
        })
      })
    },
    root,
  )

  const hover = (item) => ({
    onPointerEnter: (e) => e.pointerType === 'mouse' && setTech(item),
    onPointerLeave: (e) => e.pointerType === 'mouse' && setTech(null),
    onFocus: () => setTech(item),
    onBlur: () => setTech(null),
    onClick: () => setTech(item),
  })

  return (
    <section ref={root} id="mochila" aria-labelledby="mochila-title" className="section">
      <SectionHead index="02" eyebrow={t.gear.eyebrow} title={t.gear.title} lead={t.gear.lead} id="mochila-title" />

      <div className="mt-14 grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <div data-pack className="card-frame self-start p-6 lg:sticky lg:top-20">
          <MiniRoute active={active} label={t.gear.map} />
          <p aria-live="polite" className="mt-5 min-h-[3.25rem] text-[13px] leading-relaxed text-cream/70">
            {!tech && t.gear.hint}
            {tech && active.length === 0 && (
              <>
                <strong className="font-medium text-cream">{tech}</strong> {t.gear.unused}
              </>
            )}
            {tech && active.length > 0 && (
              <>
                <strong className="font-medium text-cream">{tech}</strong>
                {' → '}
                {active.map((i) => `${pick(camps[i].camp)} · ${camps[i].project}`).join(' / ')}
              </>
            )}
          </p>
        </div>

        <div className="swipe md:grid md:grid-cols-2 md:gap-6">
          {gear.map((group, g) => (
            <div key={group.id} data-pack className="card-frame p-6">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-lg font-medium text-cream">{pick(group.title)}</h3>
                <span className="eyebrow tabular-nums">{String(g + 1).padStart(2, '0')}</span>
              </div>
              <ul className="mt-6 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li key={item} data-item>
                    <button type="button" className="chip chip--btn" aria-pressed={tech === item} {...hover(item)}>
                      {item}
                      {usedAt.has(item.toLowerCase()) && (
                        <>
                          <span className="chip-dot" aria-hidden="true" />
                          <span className="sr-only">({t.gear.onRoute})</span>
                        </>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
