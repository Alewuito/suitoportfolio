import { formatAlt } from '../lib/altitude'
import { useLang } from '../lib/i18n'
import { BACK_PEAKS, COULOIRS, LIGHT_FACE, MOUNTAIN, PEAK, RIM_LIGHT, STRATA, WORLD } from '../lib/trail'

const CREAM = '#f0e8d6'
const MOSS = '#a3bb8c'
const OCHRE = '#dcc078'

// The camera plane: main mountain, dashed trail, camp waypoints, flags and climber.
export default function MountainScene({ route, camps }) {
  const { lang, pick } = useLang()
  const { points, legs, trail } = route
  const last = points.length - 1

  return (
    <svg
      viewBox={`0 0 ${WORLD.w} ${WORLD.h}`}
      className="block h-full w-full overflow-visible"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="mountain-fill" gradientUnits="userSpaceOnUse" {...RIM_LIGHT}>
          <stop offset="0" stopColor="#3a342d" />
          <stop offset="0.1" stopColor="#27231f" />
          <stop offset="0.42" stopColor="#171513" />
          <stop offset="1" stopColor="#0c0b0a" />
        </linearGradient>
        <radialGradient id="bank-fill">
          <stop offset="0" stopColor={CREAM} stopOpacity="0.4" />
          <stop offset="0.55" stopColor={CREAM} stopOpacity="0.16" />
          <stop offset="1" stopColor={CREAM} stopOpacity="0" />
        </radialGradient>
        {/* DrawSVG reveals the dashed trail through this mask, leg by leg. */}
        <mask id="trail-mask" maskUnits="userSpaceOnUse" x="0" y="0" width={WORLD.w} height={WORLD.h}>
          {legs.map((d, i) => (
            <path key={i} data-leg d={d} fill="none" stroke="#fff" strokeWidth="18" strokeLinecap="round" />
          ))}
        </mask>
      </defs>

      {BACK_PEAKS.map((d, i) => (
        <path key={i} d={d} fill="#1b1815" />
      ))}
      <path d={MOUNTAIN} fill="url(#mountain-fill)" stroke={CREAM} strokeOpacity="0.3" strokeWidth="1.5" />
      <path d={LIGHT_FACE} fill={CREAM} fillOpacity="0.03" />
      {STRATA.map((d, i) => (
        <path
          key={i}
          d={d}
          fill="none"
          stroke={CREAM}
          strokeOpacity={0.085 - i * 0.015}
          strokeWidth="2"
          strokeDasharray="150 46 34 80 220 60"
          strokeLinejoin="round"
        />
      ))}
      {COULOIRS.map((d, i) => (
        <path key={i} d={d} fill="none" stroke={CREAM} strokeOpacity="0.07" strokeWidth="2" strokeLinejoin="round" />
      ))}

      <path d={trail} className="trail trail--ghost" />
      <g mask="url(#trail-mask)">
        <path d={trail} className="trail" />
      </g>

      {points.map((p, i) => {
        const pole = i === last ? 78 : 50
        const fly = i === last ? 40 : 26
        return (
          <g key={camps[i].id}>
            <circle cx={p.x} cy={p.y} r="7" fill="#08080a" stroke={MOSS} strokeOpacity="0.85" strokeWidth="2" />
            <text x={p.x - 22} y={p.y + 5} textAnchor="end" className="camp-label">
              {pick(camps[i].camp)} · {formatAlt(camps[i].altitude, lang)} m
            </text>
            <g data-flag>
              <path d={`M${p.x} ${p.y}V${p.y - pole}`} stroke={CREAM} strokeWidth="3" strokeLinecap="round" />
              <path
                d={`M${p.x} ${p.y - pole}L${p.x + fly} ${p.y - pole + fly * 0.34}L${p.x} ${p.y - pole + fly * 0.68}Z`}
                fill={i === last ? OCHRE : CREAM}
              />
            </g>
          </g>
        )
      })}

      {/* Cloud bank that hides the summit until the climber gets there. */}
      <g data-bank="left">
        <ellipse cx={PEAK.x - 330} cy={PEAK.y + 70} rx="330" ry="120" fill="url(#bank-fill)" />
        <ellipse cx={PEAK.x - 150} cy={PEAK.y + 10} rx="240" ry="120" fill="url(#bank-fill)" />
        <ellipse cx={PEAK.x - 60} cy={PEAK.y - 70} rx="190" ry="100" fill="url(#bank-fill)" />
      </g>
      <g data-bank="right">
        <ellipse cx={PEAK.x + 330} cy={PEAK.y + 60} rx="340" ry="120" fill="url(#bank-fill)" />
        <ellipse cx={PEAK.x + 150} cy={PEAK.y} rx="240" ry="120" fill="url(#bank-fill)" />
        <ellipse cx={PEAK.x + 50} cy={PEAK.y - 80} rx="180" ry="96" fill="url(#bank-fill)" />
      </g>

      <g data-climber>
        <circle r="8" className="climber-pulse" />
        <circle r="8" fill={CREAM} />
      </g>
    </svg>
  )
}
