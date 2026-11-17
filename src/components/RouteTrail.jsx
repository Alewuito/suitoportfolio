import { useEffect, useRef, useState } from 'react'
import { altitude, formatAlt } from '../lib/altitude'
import { gsap, ScrollTrigger, MOTION_OK } from '../lib/gsap'
import { useLang } from '../lib/i18n'
import { useMotion } from '../hooks/useMotion'
import Camp from './Camp'
import MiniRoute from './MiniRoute'
import Summit from './Summit'

const Arrow = ({ flip }) => (
  <svg viewBox="0 0 24 24" className={`h-4 w-4 ${flip ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

// Mobile and reduced-motion route: the camps as a swipeable row of cards under a
// map of the mountain, where the climber moves to the camp on screen.
export default function RouteTrail({ camps }) {
  const { t, lang, pick } = useLang()
  const root = useRef(null)
  const track = useRef(null)
  const inView = useRef(false)
  const currentRef = useRef(0)
  const [current, setCurrent] = useState(0)
  const n = camps.length
  const camp = camps[current]

  // The card that fills most of the row is the current camp.
  useEffect(() => {
    const stops = [...track.current.children]
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setCurrent(stops.indexOf(entry.target))
        })
      },
      { root: track.current, threshold: 0.6 },
    )
    stops.forEach((stop) => io.observe(stop))
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    currentRef.current = current
    if (inView.current) altitude.set(camps[current].altitude, current === n - 1)
  }, [current, camps, n])

  useMotion(
    (mm) => {
      mm.add('all', () => {
        ScrollTrigger.create({
          trigger: root.current,
          start: 'top 65%',
          end: 'bottom 35%',
          onToggle: (self) => {
            inView.current = self.isActive
            const i = currentRef.current
            if (self.isActive) altitude.set(camps[i].altitude, i === n - 1)
          },
          // Past the route the climb is done, as on desktop.
          onLeave: () => altitude.set(camps[n - 1].altitude, true),
        })
      })
      mm.add(MOTION_OK, () => {
        gsap.from(gsap.utils.toArray('[data-enter]', root.current), {
          y: 28,
          opacity: 0,
          duration: 1,
          stagger: 0.1,
          scrollTrigger: { trigger: root.current, start: 'top 75%', once: true },
        })
      })
    },
    root,
    [camps],
  )

  const goTo = (i) => {
    const target = track.current.children[Math.max(0, Math.min(n - 1, i))]
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    track.current.scrollTo({ left: target.offsetLeft - track.current.offsetLeft, behavior: reduce ? 'auto' : 'smooth' })
  }

  return (
    <div ref={root} className="mx-auto max-w-5xl px-5 pb-10 pt-20 sm:px-8 cine:hidden">
      <p className="eyebrow">01 — {t.route.eyebrow}</p>
      <h2 className="display mt-4 text-[clamp(3rem,13vw,6rem)]">{t.route.title}</h2>
      <p className="mt-5 max-w-md text-[15px] leading-relaxed">{t.route.lead}</p>

      <div data-enter className="card-frame mt-8 px-4 pb-4 pt-3">
        <MiniRoute current={current} label={t.gear.map} />
        <div className="mt-2 flex items-center justify-between gap-3">
          <p className="eyebrow truncate" aria-hidden="true">
            {pick(camp.camp)} · <span className="tabular-nums text-cream">{formatAlt(camp.altitude, lang)} m</span>
          </p>
          <p className="eyebrow tabular-nums" aria-hidden="true">
            {current + 1} / {n}
          </p>
        </div>
      </div>

      <ol
        ref={track}
        data-enter
        aria-label={t.route.title}
        className="no-scrollbar -mx-5 mt-4 flex snap-x snap-mandatory items-start gap-3 overflow-x-auto scroll-px-5 px-5 pb-2 sm:-mx-8 sm:scroll-px-8 sm:px-8"
      >
        {camps.map((c, i) => (
          <li
            key={c.id}
            data-current={i === current}
            className="w-[86%] max-w-[28rem] shrink-0 snap-start transition-opacity duration-500 data-[current=false]:opacity-60"
          >
            {i === n - 1 ? <Summit camp={c} idPrefix="trail" compact /> : <Camp camp={c} idPrefix="trail" compact />}
          </li>
        ))}
      </ol>

      <div className="mt-4 flex items-center justify-between gap-4">
        <div className="flex gap-1.5" aria-hidden="true">
          {camps.map((c, i) => (
            <span
              key={c.id}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === current ? 'w-6 bg-ochre' : i < current ? 'w-1.5 bg-moss' : 'w-1.5 bg-cream/25'
              }`}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => goTo(current - 1)}
            disabled={current === 0}
            aria-label={t.route.prev}
            className="grid h-10 w-10 place-items-center rounded-full border border-cream/25 text-cream transition-opacity disabled:opacity-30"
          >
            <Arrow flip />
          </button>
          <button
            type="button"
            onClick={() => goTo(current + 1)}
            disabled={current === n - 1}
            aria-label={t.route.next}
            className="grid h-10 w-10 place-items-center rounded-full bg-cream text-ink transition-opacity disabled:opacity-30"
          >
            <Arrow />
          </button>
        </div>
      </div>
    </div>
  )
}
