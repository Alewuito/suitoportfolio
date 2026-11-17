import { useLang } from '../lib/i18n'
import { scrollToTarget } from '../lib/scroll'

const LINKS = [
  { id: 'ruta', key: 'route', offset: 0 },
  { id: 'mochila', key: 'gear', offset: 0 },
  { id: 'sobre-mi', key: 'about', offset: 0 },
  { id: 'cv', key: 'cv', offset: 0 },
  { id: 'contacto', key: 'contact', offset: 0 },
]

const link = 'rounded-full px-[7px] py-1.5 text-cream/75 transition-colors duration-300 hover:text-cream min-[400px]:px-2 sm:px-3'

// Browser-tab nav hanging from the top of the frame.
export default function Nav() {
  const { t, lang, setLang } = useLang()

  const go = (item) => (e) => {
    e.preventDefault()
    scrollToTarget(`#${item.id}`, { offset: item.offset })
  }

  return (
    <header className="pointer-events-none fixed inset-x-0 top-[7px] z-[60] flex justify-center">
      <nav
        data-nav
        aria-label={t.nav.label}
        className="tab-notch pointer-events-auto relative flex items-center whitespace-nowrap rounded-b-[18px] bg-[#0a0a0c]/92 px-1.5 pb-1.5 pt-1 text-[11px] font-medium min-[400px]:text-[11.5px] sm:px-4 sm:text-[13px]"
      >
        {LINKS.map((item) => (
          <a key={item.id} href={`#${item.id}`} onClick={go(item)} className={link}>
            {t.nav[item.key]}
          </a>
        ))}
        <span aria-hidden="true" className="mx-0.5 h-3.5 w-px bg-cream/20 sm:mx-2" />
        <button
          type="button"
          onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
          aria-label={t.nav.langSwitch}
          className="flex items-center gap-1 rounded-full px-1.5 py-1.5 tracking-wider sm:px-2"
        >
          <span className={lang === 'es' ? 'text-cream' : 'text-cream/40'}>ES</span>
          <span className="text-cream/30">/</span>
          <span className={lang === 'en' ? 'text-cream' : 'text-cream/40'}>EN</span>
        </button>
      </nav>
    </header>
  )
}
