import { camps } from '../data/portfolio'
import RouteAscent from './RouteAscent'
import RouteTrail from './RouteTrail'

// The route. CSS picks the layout: the pinned ascent on wide screens with motion
// allowed, the stacked trail on mobile and under prefers-reduced-motion.
export default function Route() {
  return (
    <section id="ruta">
      <RouteAscent camps={camps} />
      <RouteTrail camps={camps} />
    </section>
  )
}
