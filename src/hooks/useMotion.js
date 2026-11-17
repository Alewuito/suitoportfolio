import { useLayoutEffect } from 'react'
import { gsap } from '../lib/gsap'

// Runs `setup(mm)` with a gsap.matchMedia() scoped to `scope`, and reverts every
// animation, ScrollTrigger and SplitText created inside it on unmount.
export function useMotion(setup, scope, deps = []) {
  useLayoutEffect(() => {
    const mm = gsap.matchMedia(scope?.current ?? undefined)
    setup(mm)
    return () => mm.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
