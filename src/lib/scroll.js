import Lenis from 'lenis'
import { gsap, ScrollTrigger } from './gsap'

let lenis = null

export function startLenis() {
  lenis = new Lenis({ lerp: 0.085, smoothWheel: true })
  lenis.on('scroll', ScrollTrigger.update)
  const raf = (time) => lenis.raf(time * 1000)
  gsap.ticker.add(raf)
  gsap.ticker.lagSmoothing(0)
  return () => {
    gsap.ticker.remove(raf)
    lenis.destroy()
    lenis = null
  }
}

// target: a scroll position in px, a selector or an element.
export function scrollToTarget(target, { offset = 0, duration = 1.4 } = {}) {
  if (lenis) {
    lenis.scrollTo(target, { offset, duration, easing: (t) => 1 - Math.pow(2, -10 * t) })
    return
  }
  const el = typeof target === 'string' ? document.querySelector(target) : target
  const top = typeof target === 'number' ? target : el ? el.getBoundingClientRect().top + window.scrollY : 0
  window.scrollTo(0, top + offset)
}
