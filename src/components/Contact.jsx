import { useEffect, useRef, useState } from 'react'
import { fullName, person } from '../data/portfolio'
import { MOTION_OK } from '../lib/gsap'
import { useLang } from '../lib/i18n'
import { revealOnScroll } from '../lib/reveal'
import { scrollToTarget } from '../lib/scroll'
import { ridgePath } from '../lib/trail'
import { useMotion } from '../hooks/useMotion'
import { ArrowUp, Check, Copy, GitHub, LinkedIn } from './icons'
import Pill from './Pill'

const RIDGE_BACK = ridgePath(57, { base: 700, amp: 260 })
const RIDGE_FRONT = ridgePath(71, { base: 860, amp: 220 })

// Contact, and the way down: "Volver al campo base" scrolls to the top, which
// rewinds the route so the climber slides back down the trail.
export default function Contact() {
  const { t } = useLang()
  const root = useRef(null)
  const [copied, setCopied] = useState(false)

  useMotion((mm) => mm.add(MOTION_OK, () => revealOnScroll(root.current)), root)

  useEffect(() => {
    if (!copied) return
    const timer = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(timer)
  }, [copied])

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(person.email)
      setCopied(true)
    } catch {
      window.location.href = `mailto:${person.email}`
    }
  }

  return (
    <section
      ref={root}
      id="contacto"
      aria-labelledby="contacto-title"
      className="relative mx-[7px] mb-[7px] overflow-hidden rounded-[20px] bg-[#0d0c0b]"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 1600 900"
        preserveAspectRatio="none"
        className="absolute inset-x-0 bottom-0 h-[70%] w-full"
      >
        <path d={RIDGE_BACK} fill="#141210" />
        <path d={RIDGE_FRONT} fill="#0a0a0b" />
      </svg>
      <div className="grade" />

      <div className="section relative !pb-20 md:!pb-10">
        <div data-group>
          <p data-reveal className="eyebrow">
            07 — {t.contact.eyebrow}
          </p>
          <h2 id="contacto-title" data-split className="display display--wrap mt-6 text-[clamp(3.2rem,9.6vw,11rem)]">
            {t.contact.title}
          </h2>
          <p data-reveal className="mt-8 max-w-xl text-base leading-relaxed sm:text-lg">
            {t.contact.lead}
          </p>

          <div data-reveal className="mt-10 flex flex-wrap items-center gap-3">
            <Pill
              as="button"
              type="button"
              onClick={copyEmail}
              icon={copied ? <Check /> : <Copy />}
              aria-label={`${t.contact.copy}: ${person.email}`}
            >
              {person.email}
            </Pill>
            <span aria-live="polite" className="eyebrow min-w-[5rem]">
              {copied ? <span className="text-moss">{t.contact.copied}</span> : ''}
            </span>
          </div>

          <div data-reveal className="mt-4 flex flex-wrap gap-3">
            <Pill href={person.github} external ghost icon={<GitHub />}>
              GitHub
            </Pill>
            <Pill href={person.linkedin} external ghost icon={<LinkedIn />}>
              LinkedIn
            </Pill>
          </div>
        </div>

        <footer className="mt-20 flex flex-wrap items-center justify-between gap-6 border-t border-cream/12 pt-8">
          <p className="text-[13px] text-cream/70">
            © {new Date().getFullYear()} {fullName} · {person.alias} · {t.footer}
          </p>
          <Pill
            as="button"
            type="button"
            ghost
            small
            icon={<ArrowUp />}
            onClick={() => scrollToTarget(0, { duration: 3.4 })}
          >
            {t.contact.back}
          </Pill>
        </footer>
      </div>
    </section>
  )
}
