import { useEffect, useState } from 'react'
import { useLang } from '../lib/i18n'
import { scrollToTarget } from '../lib/scroll'

const LINKS = [
  { id: 'ruta', key: 'route' },
  { id: 'mochila', key: 'gear' },
  { id: 'sobre-mi', key: 'about' },
  { id: 'cv', key: 'cv' },
  { id: 'contacto', key: 'contact' },
]

// Floating quick-access nav. The link of the section in view is highlighted.
export default function Nav() {
  const { t, lang, setLang } = useLang()
  const [current, setCurrent] = useState(null)

  // Sections remount when the language changes, so observe them again.
  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(Boolean)
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setCurrent(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    sections.forEach((s) => io.observe(s))
    const atTop = () => window.scrollY < window.innerHeight * 0.5 && setCurrent(null)
    window.addEventListener('scroll', atTop, { passive: true })
    return () => {
      io.disconnect()
      window.removeEventListener('scroll', atTop)
    }
  }, [lang])

  const go = (id) => (e) => {
    e.preventDefault()
    scrollToTarget(`#${id}`)
  }

  return (
    <header className="pointer-events-none fixed inset-x-0 top-3 z-[60] flex justify-center px-3 sm:top-4">
      <nav
        data-nav
        aria-label={t.nav.label}
        className="nav-pill pointer-events-auto flex max-w-full items-center gap-0.5 whitespace-nowrap rounded-full p-1 text-[11.5px] font-medium sm:gap-1 sm:p-1.5 sm:text-[13px]"
      >
        {LINKS.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={go(item.id)}
            aria-current={current === item.id ? 'true' : undefined}
            className="nav-link px-[7px] py-1.5 min-[400px]:px-2.5 sm:px-3.5 sm:py-2"
          >
            {t.nav[item.key]}
          </a>
        ))}
        <span aria-hidden="true" className="mx-0.5 h-4 w-px bg-cream/15 sm:mx-1" />
        <button
          type="button"
          onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
          aria-label={t.nav.langSwitch}
          className="nav-link flex items-center gap-1 px-2 py-1.5 tracking-wide sm:px-3 sm:py-2"
        >
          {/* Narrow phones show only the language you switch to. */}
          <span aria-hidden="true" className="text-cream min-[400px]:hidden">
            {lang === 'es' ? 'EN' : 'ES'}
          </span>
          <span aria-hidden="true" className="hidden items-center gap-1 min-[400px]:flex">
            <span className={lang === 'es' ? 'text-cream' : 'text-cream/40'}>ES</span>
            <span className="text-cream/30">/</span>
            <span className={lang === 'en' ? 'text-cream' : 'text-cream/40'}>EN</span>
          </span>
        </button>
      </nav>
    </header>
  )
}
