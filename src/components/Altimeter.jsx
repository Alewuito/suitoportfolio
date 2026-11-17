import { useEffect, useRef } from 'react'
import { altitude, formatAlt, pad4 } from '../lib/altitude'
import { gsap, MOTION_OK } from '../lib/gsap'
import { useLang } from '../lib/i18n'
import { Peak } from './icons'

// Decorative readout: the real altitude of every camp is in its card, so this
// counter is hidden from screen readers instead of announcing every metre.
export default function Altimeter() {
  const { lang, t } = useLang()
  const box = useRef(null)
  const text = useRef(null)

  useEffect(() => {
    let wasSummit = altitude.get().summit
    const paint = ({ value, summit }) => {
      text.current.textContent = summit
        ? `${formatAlt(value, lang)} m — ${t.route.summitWord}`
        : `ALT ${pad4(value)} m`
      if (summit && !wasSummit && window.matchMedia(MOTION_OK).matches) {
        gsap.fromTo(
          box.current,
          { scale: 1.35 },
          { scale: 1, duration: 1.2, ease: 'elastic.out(1, 0.5)', overwrite: true },
        )
      }
      box.current.classList.toggle('text-ochre', summit)
      wasSummit = summit
    }
    paint(altitude.get())
    return altitude.subscribe(paint)
  }, [lang, t])

  return (
    <div
      ref={box}
      data-altimeter
      aria-hidden="true"
      className="altimeter fixed bottom-[18px] right-[18px] z-[55] flex origin-right items-center gap-2 rounded-full bg-[#0a0a0c]/85 px-3 py-2 md:bottom-auto md:right-[30px] md:top-[24px] md:origin-top-right md:bg-transparent md:p-0"
    >
      <Peak className="h-3 w-3 text-moss" />
      <span ref={text}>ALT 0000 m</span>
    </div>
  )
}
