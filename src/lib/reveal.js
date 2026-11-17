import { gsap, SplitText } from './gsap'

// Staggered reveal for a block: [data-split] titles rise word by word from behind
// a mask, [data-reveal] children fade up, [data-chip] items pop in.
export function buildReveal(el, vars = {}) {
  const tl = gsap.timeline(vars)
  el.querySelectorAll('[data-split]').forEach((title) => {
    const split = SplitText.create(title, { type: 'words', mask: 'words', wordsClass: 'sw' })
    tl.from(split.words, { yPercent: 118, duration: 1.1, stagger: 0.06 }, 0)
  })
  const items = el.querySelectorAll('[data-reveal]')
  if (items.length) tl.from(items, { y: 18, opacity: 0, duration: 1, stagger: 0.09 }, 0.16)
  const chips = el.querySelectorAll('[data-chip]')
  if (chips.length) tl.from(chips, { y: 10, opacity: 0, scale: 0.9, duration: 0.7, stagger: 0.03 }, 0.42)
  return tl
}

// Plays the reveal of every [data-group] inside `scope` the first time it scrolls in.
export function revealOnScroll(scope) {
  scope.querySelectorAll('[data-group]').forEach((group) => {
    buildReveal(group, { scrollTrigger: { trigger: group, start: 'top 82%', once: true } })
  })
}
