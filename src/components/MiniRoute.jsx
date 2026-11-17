import { useMemo } from 'react'
import { camps } from '../data/portfolio'
import { formatAlt } from '../lib/altitude'
import { useLang } from '../lib/i18n'
import { buildRoute, MOUNTAIN, PEAK } from '../lib/trail'

const CREAM = '#f0e8d6'

// Small map of the route. `active` holds the indexes of the camps to highlight;
// `current` (optional) places the climber on a camp and marks the ones behind it.
export default function MiniRoute({ active = [], current, label }) {
  const { lang } = useLang()
  const route = useMemo(() => buildRoute(camps), [])
  const { points, trail } = route
  const x0 = Math.min(...points.map((p) => p.x)) - 400
  const y0 = PEAK.y - 130
  const w = PEAK.x + 430 - x0
  const h = Math.max(...points.map((p) => p.y)) + 120 - y0

  return (
    <svg
      viewBox={`${x0} ${y0} ${w} ${h}`}
      role="img"
      aria-label={label}
      data-filter={active.length > 0}
      className="mini-route block h-auto w-full"
    >
      <path d={MOUNTAIN} fill={CREAM} fillOpacity="0.035" stroke={CREAM} strokeOpacity="0.22" strokeWidth="3" />
      <path d={trail} fill="none" stroke={CREAM} strokeOpacity="0.55" strokeWidth="5" strokeDasharray="4 18" strokeLinecap="round" />
      {points.map((p, i) => (
        <g
          key={camps[i].id}
          className="mini-camp"
          data-on={active.includes(i)}
          data-state={current == null ? undefined : i < current ? 'done' : i === current ? 'here' : 'next'}
        >
          <circle className="mini-ring" cx={p.x} cy={p.y} r="16" fill={CREAM} fillOpacity="0" />
          <circle className="mini-dot" cx={p.x} cy={p.y} r="16" fill={CREAM} />
          <text className="mini-label" x={p.x - 46} y={p.y + 20} textAnchor="end">
            {formatAlt(camps[i].altitude, lang)}
          </text>
        </g>
      ))}
      {current != null && (
        <g
          aria-hidden="true"
          className="mini-climber"
          style={{ transform: `translate(${points[current].x}px, ${points[current].y - 58}px)` }}
        >
          <path d="M0 0V34" stroke={CREAM} strokeWidth="5" strokeLinecap="round" />
          <path d="M0 0L30 10L0 20Z" fill="var(--ochre)" />
        </g>
      )}
    </svg>
  )
}
