import { useMemo, useRef } from 'react'
import { altitude, formatAlt } from '../lib/altitude'
import { gsap, ScrollTrigger, CINE } from '../lib/gsap'
import { useLang } from '../lib/i18n'
import { buildReveal } from '../lib/reveal'
import { scrollToTarget } from '../lib/scroll'
import { buildRoute, PEAK, ridgePath, starField, WORLD } from '../lib/trail'
import { useMotion } from '../hooks/useMotion'
import Camp from './Camp'
import MountainScene from './MountainScene'
import Summit from './Summit'

// Timeline units: one leg between camps is 1, the rest are pauses and the summit.
const LEG = 1
const HOLD_BASE = 0.45
const HOLD = 0.6
const ZOOM = 1.4
const OUTRO = 0.9
const VH_PER_UNIT = 0.42 // scroll distance per timeline unit, in viewport heights
const BREATH = 0.06 // the camera pushes in at each camp and eases out along the legs
const FOCUS = { x: 0.34, y: 0.6 } // where the climber sits in the frame
const CLOUD_DEPTH = 1.35 // clouds are closer to the camera than the trail
const LABEL_ROOM = 200 // world units kept left of the route for the camp labels

const RIDGES = [
  { id: 'far', d: ridgePath(3, { base: 400, amp: 150 }), fill: '#231f1b', y: 15, x: -1.5 },
  { id: 'mid', d: ridgePath(11, { base: 500, amp: 190 }), fill: '#1b1815', y: 27, x: -3 },
  { id: 'near', d: ridgePath(23, { base: 640, amp: 210 }), fill: '#141210', y: 46, x: -5 },
]
// One cloud bank: overlapping puffs as [left, top, width, height] in vw.
const PUFFS = [
  [-24, -6, 22, 10],
  [-10, -9, 21, 12],
  [3, -6, 23, 10],
  [-17, -1, 31, 8],
  [8, 0, 19, 7],
  [-31, 0, 17, 6],
]
const FORE = ridgePath(41, { base: 900, amp: 190, steps: 18 })
const STARS = [starField(5, 60), starField(17, 90), starField(29, 150)]

// Desktop route: a pinned scene scrubbed by scroll. The camera follows the climber
// up the trail, each camp reveals its card, and the summit zooms out on the route.
export default function RouteAscent({ camps }) {
  const { t, lang, pick } = useLang()
  const root = useRef(null)
  const goTo = useRef(() => {})
  const route = useMemo(() => buildRoute(camps), [camps])
  const n = camps.length
  const span = route.max - route.min

  useMotion(
    (mm) => {
      mm.add(CINE, () => {
        const q = gsap.utils.selector(root)
        const one = (s) => q(s)[0]
        const stage = one('[data-stage]')
        const world = one('[data-world]')
        const cloudLayer = one('[data-clouds]')
        const cloudEls = q('[data-cloud]')
        const climber = one('[data-climber]')
        const pointer = one('[data-pointer]')
        const legEls = q('[data-leg]')
        const flags = q('[data-flag]')
        const cards = q('[data-card]')
        const summitCard = cards[cards.length - 1]
        const marks = q('[data-mark]')
        const { points, legs, clouds } = route
        const clamp = gsap.utils.clamp
        const climbEase = gsap.parseEase('sine.inOut')

        // Arrival time of the climber at each camp.
        const arrive = [0]
        let cursor = HOLD_BASE
        for (let i = 1; i < n; i++) {
          arrive[i] = cursor + LEG
          cursor = arrive[i] + (i < n - 1 ? HOLD : 0)
        }
        const top = arrive[n - 1]
        const zoomAt = top + 0.1
        const total = zoomAt + ZOOM + OUTRO

        let vw = 0
        let vh = 0
        let unit = 1 // px per world unit when zoomed in
        let zoomOut = 1 // camera scale that fits the whole route
        let inView = false
        let ready = false
        let active = -1
        const planted = camps.map(() => false)
        const cam = { k: 0 }

        const cameraAt = (cx, cy, s) => [
          clamp(vw - WORLD.w * s, 0, FOCUS.x * vw - cx * s),
          clamp(vh - WORLD.h * s, 0, FOCUS.y * vh - cy * s),
        ]

        gsap.set(climber, { x: points[0].x, y: points[0].y })
        flags.forEach((flag, i) => gsap.set(flag, { svgOrigin: `${points[i].x} ${points[i].y}`, scale: 0 }))
        gsap.set(cards, { opacity: 0 })
        const reveals = cards.map((card) => buildReveal(card, { paused: true }))

        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          onUpdate: () => ready && render(),
          scrollTrigger: {
            trigger: stage.parentElement,
            pin: true,
            start: 'top top',
            end: () => `+=${Math.round(total * window.innerHeight * VH_PER_UNIT)}`,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        })
        const st = tl.scrollTrigger

        // Where each camp's card is fully on screen: scrolling settles on the nearest one.
        const rest = camps.map((_, i) => {
          if (i === 0) return HOLD_BASE * 0.5
          if (i === n - 1) return total - OUTRO * 0.5
          return arrive[i] + HOLD * 0.5
        })
        const timeToScroll = (time) => st.start + (time / total) * (st.end - st.start)
        function settle() {
          if (!st.isActive) return
          const time = st.progress * total
          const nearest = rest.reduce((a, b) => (Math.abs(b - time) < Math.abs(a - time) ? b : a))
          if (Math.abs(nearest - time) > 0.03) scrollToTarget(timeToScroll(nearest), { duration: 1.1 })
        }
        ScrollTrigger.addEventListener('scrollEnd', settle)

        // The climb: the climber follows each leg while DrawSVG draws it.
        for (let i = 1; i < n; i++) {
          const at = arrive[i] - LEG
          tl.to(climber, { motionPath: { path: legs[i - 1] }, duration: LEG, ease: 'sine.inOut' }, at)
          tl.fromTo(
            legEls[i - 1],
            { drawSVG: '0%' },
            { drawSVG: '100%', duration: LEG, ease: 'sine.inOut' },
            at,
          )
        }

        // The summit: the clouds part and the camera pulls back over the whole route.
        const partAt = Math.max(0, top - LEG * 0.45)
        const partFor = top - partAt + ZOOM * 0.7
        tl.to(one('[data-bank="left"]'), { x: -620, opacity: 0.1, duration: partFor, ease: 'power1.inOut' }, partAt)
        tl.to(one('[data-bank="right"]'), { x: 620, opacity: 0.1, duration: partFor, ease: 'power1.inOut' }, partAt)
        tl.to(cloudLayer, { opacity: 0, duration: ZOOM * 0.6 }, zoomAt)
        tl.to(cam, { k: 1, duration: ZOOM, ease: 'power2.inOut' }, zoomAt)
        tl.to(one('[data-glow]'), { opacity: 1, duration: total * 0.4 }, total * 0.6)

        // Parallax: distant ridges sink slower than near ones as we gain height.
        RIDGES.forEach((ridge) => {
          tl.to(one(`[data-ridge="${ridge.id}"]`), { yPercent: ridge.y, xPercent: ridge.x, duration: total }, 0)
        })
        tl.to(one('[data-ridge="fore"]'), { yPercent: 70, xPercent: -8, duration: LEG * 1.6 }, 0)
        // Stars: a sparse field at the base, denser as the air gets thinner.
        tl.to(one('[data-stars]'), { yPercent: 4, duration: total }, 0)
        tl.fromTo(one('[data-star-group="1"]'), { opacity: 0 }, { opacity: 1, duration: total * 0.45 }, total * 0.08)
        tl.fromTo(one('[data-star-group="2"]'), { opacity: 0 }, { opacity: 1, duration: total * 0.5 }, total * 0.4)
        tl.to(one('[data-hint]'), { opacity: 0, duration: 0.25 }, HOLD_BASE * 0.6)
        tl.set({}, {}, total)

        function altitudeAt(time) {
          if (time >= top) return camps[n - 1].altitude
          for (let i = 1; i < n; i++) {
            if (time < arrive[i]) {
              const p = clamp(0, 1, (time - (arrive[i] - LEG)) / LEG)
              return gsap.utils.interpolate(camps[i - 1].altitude, camps[i].altitude, climbEase(p))
            }
          }
          return camps[n - 1].altitude
        }

        // 1 + BREATH while resting at a camp, dipping below 1 halfway along each leg.
        function breathAt(time) {
          for (let i = 1; i < n; i++) {
            const from = arrive[i] - LEG
            if (time >= from && time < arrive[i]) return 1 + BREATH - BREATH * 2 * Math.sin(Math.PI * ((time - from) / LEG))
          }
          return 1 + BREATH
        }

        // A card shows from just before the climber arrives until partway up the next leg.
        function activeAt(time) {
          if (!inView) return -1
          if (time >= top + (n > 1 ? 0.1 + ZOOM * 0.4 : 0)) return n - 1
          for (let i = n - 2; i >= 0; i--) {
            const stay = (i === 0 ? HOLD_BASE : HOLD) + LEG * 0.42
            if (time >= arrive[i] - LEG * 0.1 && time < arrive[i] + stay) return i
          }
          return -1
        }

        function setActive(i) {
          if (i === active) return
          const prev = active
          active = i
          if (prev >= 0) {
            cards[prev].classList.remove('is-active')
            gsap.to(cards[prev], { opacity: 0, x: -36, duration: 0.4, ease: 'power2.in', overwrite: true })
          }
          if (i >= 0) {
            cards[i].classList.add('is-active')
            gsap.fromTo(cards[i], { opacity: 0, x: 56 }, { opacity: 1, x: 0, duration: 0.9, ease: 'expo.out', overwrite: true })
            reveals[i].restart()
          }
          marks.forEach((mark, m) => mark.setAttribute('aria-current', m === i ? 'true' : 'false'))
        }

        function setFlag(i, on) {
          if (planted[i] === on) return
          planted[i] = on
          const summit = i === n - 1
          gsap.to(flags[i], {
            scale: on ? 1 : 0,
            duration: on ? (summit ? 1.3 : 0.8) : 0.25,
            ease: on ? (summit ? 'back.out(3.2)' : 'back.out(2.2)') : 'power2.in',
            overwrite: true,
          })
        }

        function render() {
          const time = tl.time()

          // Camera: keep the climber at the focus point, then zoom out at the summit.
          const breath = gsap.utils.interpolate(breathAt(time), 1, cam.k)
          const zoom = (1 + (zoomOut - 1) * cam.k) * breath
          const s = unit * zoom
          let [tx, ty] = cameraAt(gsap.getProperty(climber, 'x'), gsap.getProperty(climber, 'y'), s)
          // Zoomed out, frame the whole route in the left half, clear of the summit card.
          tx += (vw * 0.085 - (route.left - LABEL_ROOM) * s - tx) * cam.k
          ty += (vh * 0.5 - route.middle * s - ty) * cam.k
          world.style.transform = `translate3d(${tx}px,${ty}px,0) scale(${zoom})`
          cloudLayer.style.transform = `translate3d(${tx * CLOUD_DEPTH}px,${ty * CLOUD_DEPTH}px,0) scale(${zoom})`

          const alt = altitudeAt(time)
          pointer.style.transform = `translateY(${-(span ? (alt - route.min) / span : 1) * 100}%)`
          if (st.isActive || time > 0.001) altitude.set(alt, time >= top - 0.001)

          for (let i = 0; i < n; i++) setFlag(i, inView && time >= arrive[i] - 0.03)
          setActive(activeAt(time))
        }

        function measure() {
          vw = stage.clientWidth
          vh = stage.clientHeight
          unit = Math.max(vw / 1250, vh / 860)
          // Fit the route (labels included) between the altitude scale and the summit card.
          const routeW = PEAK.x + 160 - (route.left - LABEL_ROOM)
          const routeH = route.bottom - PEAK.y + 260
          zoomOut = Math.min((vw * 0.45) / routeW, (vh * 0.82) / routeH) / unit
          // A tall summit card scrolls inside the frame; fade its edge so that reads.
          summitCard.classList.toggle('is-scrollable', summitCard.scrollHeight > summitCard.clientHeight + 2)
          world.style.width = `${WORLD.w * unit}px`
          world.style.height = `${WORLD.h * unit}px`
          // Place each cloud bank so it crosses the frame when the climber reaches its anchor.
          cloudEls.forEach((el, i) => {
            const a = clouds[i]
            const [tx, ty] = cameraAt(a.x, a.y, unit)
            el.style.left = `${a.x * unit + (1 - CLOUD_DEPTH) * tx}px`
            el.style.top = `${a.y * unit + (1 - CLOUD_DEPTH) * ty}px`
          })
          render()
        }

        ready = true
        measure()
        const resize = new ResizeObserver(measure)
        resize.observe(stage)

        // Cards and flags only react once the scene is actually in the frame.
        ScrollTrigger.create({
          trigger: root.current,
          start: 'top 62%',
          end: 'bottom 30%',
          onToggle: (self) => {
            inView = self.isActive
            render()
          },
        })

        goTo.current = (i) => {
          if (i === active) return
          const time = i === n - 1 ? total - OUTRO * 0.5 : arrive[i] + 0.12
          scrollToTarget(st.start + (time / total) * (st.end - st.start), { duration: 1.6 })
        }

        return () => {
          ScrollTrigger.removeEventListener('scrollEnd', settle)
          resize.disconnect()
          goTo.current = () => {}
        }
      })
    },
    root,
    [route],
  )

  return (
    <div ref={root} className="hidden cine:block">
      <div className="-mt-[7px] p-[7px]">
      <div data-stage className="relative h-[calc(100svh-14px)] overflow-hidden rounded-[20px] bg-[#0a0a0c]">
        {/* Scene */}
        <div aria-hidden="true" className="absolute inset-0">
          <div className="sky absolute inset-0" />
          <svg
            data-stars
            viewBox="0 0 1600 900"
            preserveAspectRatio="xMidYMid slice"
            className="absolute inset-x-0 -top-[4%] h-[104%] w-full"
          >
            {STARS.map((group, g) => (
              <g key={g} data-star-group={g} fill="#f0e8d6">
                {group.map((s, i) => (
                  <circle
                    key={i}
                    cx={s.x}
                    cy={s.y}
                    r={s.r}
                    fillOpacity={s.o}
                    className={i % 7 === 0 ? 'star-twinkle' : undefined}
                    style={i % 7 === 0 ? { animationDelay: `${(i % 5) * 0.7}s` } : undefined}
                  />
                ))}
              </g>
            ))}
          </svg>
          <div data-glow className="summit-glow absolute inset-0 opacity-0" />
          {RIDGES.map((ridge) => (
            <svg
              key={ridge.id}
              data-ridge={ridge.id}
              viewBox="0 0 1600 900"
              preserveAspectRatio="none"
              className="absolute left-0 top-0 h-full w-[112%]"
            >
              <path d={ridge.d} fill={ridge.fill} />
            </svg>
          ))}
          <div data-world className="absolute left-0 top-0 origin-top-left will-change-transform">
            <MountainScene route={route} camps={camps} />
          </div>
          <div data-clouds className="absolute left-0 top-0 origin-top-left will-change-transform">
            {route.clouds.map((_, i) => (
              <div key={i} data-cloud className="absolute">
                {PUFFS.map(([left, top, w, h], p) => (
                  <span
                    key={p}
                    className="cloud"
                    style={{
                      left: `${left}vw`,
                      top: `${top}vw`,
                      width: `${w}vw`,
                      height: `${h}vw`,
                      animationDelay: `${-p * 4}s`,
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
          <svg
            data-ridge="fore"
            viewBox="0 0 1600 900"
            preserveAspectRatio="none"
            className="absolute left-0 top-0 h-full w-[116%]"
          >
            <path d={FORE} fill="#060606" />
          </svg>
          <div className="grade" />
        </div>

        {/* Section title */}
        <div className="absolute left-8 top-7 max-w-[18rem]">
          <p className="eyebrow">01 — {t.route.eyebrow}</p>
          <h2 className="display mt-3 text-[clamp(2rem,3.2vw,3rem)]">{t.route.title}</h2>
          <p className="mt-4 text-[13px] leading-relaxed text-cream/70">{t.route.lead}</p>
        </div>

        {/* Altitude scale: every camp, click to jump */}
        <nav aria-label={t.route.scale} className="absolute bottom-[14%] left-8 top-[34%] w-px bg-cream/20">
          {camps.map((camp, i) => (
            <button
              key={camp.id}
              type="button"
              data-mark
              aria-current="false"
              aria-label={`${t.route.goTo} ${pick(camp.camp)}, ${formatAlt(camp.altitude, lang)} m`}
              onClick={() => goTo.current(i)}
              style={{ bottom: `${(span ? (camp.altitude - route.min) / span : 1) * 100}%` }}
              className="group absolute left-0 flex -translate-x-[4px] translate-y-1/2 items-center gap-3 py-1 pr-2"
            >
              <span className="block h-[9px] w-[9px] rounded-full border border-cream/60 bg-frame transition-colors duration-300 group-hover:bg-cream group-aria-[current=true]:border-ochre group-aria-[current=true]:bg-ochre" />
              <span className="text-[10px] font-medium tracking-[0.2em] tabular-nums text-cream/45 transition-colors duration-300 group-hover:text-cream group-aria-[current=true]:text-cream">
                {formatAlt(camp.altitude, lang)}
              </span>
            </button>
          ))}
          <span data-pointer aria-hidden="true" className="pointer-events-none absolute inset-y-0 -left-[18px] w-3">
            <span className="absolute bottom-0 left-0 h-px w-3 translate-y-1/2 bg-cream" />
          </span>
        </nav>

        <p data-hint className="eyebrow absolute bottom-7 left-1/2 -translate-x-1/2">
          {t.route.hint} ↓
        </p>

        {/* Camp cards: one at a time. Focusing a hidden card scrolls to its camp. */}
        <ol className="pointer-events-none absolute bottom-[4%] right-[4%] top-[9%] grid w-[min(29rem,37vw)] grid-cols-1 items-center">
          {camps.slice(0, -1).map((camp, i) => (
            <li key={camp.id} data-card onFocus={() => goTo.current(i)} className="ascent-card [grid-area:1/1]">
              <Camp camp={camp} idPrefix="ascent" />
            </li>
          ))}
          <li
            data-card
            onFocus={() => goTo.current(n - 1)}
            className="ascent-card max-h-full w-[min(40rem,44vw)] justify-self-end overflow-y-auto overscroll-contain rounded-[20px] [grid-area:1/1] [scrollbar-width:thin]"
            data-lenis-prevent
          >
            <Summit camp={camps[n - 1]} idPrefix="ascent" />
          </li>
        </ol>
      </div>
      </div>
    </div>
  )
}
