import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, DrawSVGPlugin, SplitText)
gsap.defaults({ ease: 'expo.out' })
ScrollTrigger.config({ ignoreMobileResize: true })

export const MOTION_OK = '(prefers-reduced-motion: no-preference)'
export const REDUCE = '(prefers-reduced-motion: reduce)'
export const SMALL = '(max-width: 767.98px)'
// The pinned, scrubbed ascent only runs on wide screens with motion allowed.
export const CINE = '(min-width: 768px) and (prefers-reduced-motion: no-preference)'

export { gsap, ScrollTrigger, SplitText }
