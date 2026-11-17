import { ridgePath, starField } from '../lib/trail'

// Vector hero illustration (viewBox 1600×900): a lone peak with its summit lit,
// layered ridges, a dashed trail to the top, stars and drifting clouds.
// Every layer shares the viewBox so they line up while moving at different depths.

const CREAM = '#f0e8d6'
const MOSS = '#a3bb8c'
const OCHRE = '#dcc078'
const SUMMIT = { x: 800, y: 210 }
const VIEW = { viewBox: '0 0 1600 900', preserveAspectRatio: 'xMidYMid slice' }

const LEFT_RIDGE = [
  [772, 248], [748, 262], [716, 318], [690, 330], [650, 392], [610, 410], [560, 470], [520, 486],
  [470, 540], [410, 566], [350, 610], [280, 628], [200, 662], [120, 676], [0, 700],
]
const RIGHT_RIDGE = [
  [826, 236], [850, 300], [880, 318], [912, 372], [950, 386], [1000, 452], [1060, 474], [1120, 530],
  [1190, 556], [1260, 600], [1340, 622], [1420, 660], [1500, 676], [1600, 690],
]
const SPINE = [[790, 320], [812, 430], [790, 560], [822, 700], [800, 900]]

const poly = (pts) => 'M' + pts.map(([x, y]) => `${x} ${y}`).join('L') + 'Z'

const PEAK = poly([[SUMMIT.x, SUMMIT.y], ...RIGHT_RIDGE, [1600, 900], [0, 900], ...[...LEFT_RIDGE].reverse()])
const LIT_FACE = poly([[SUMMIT.x, SUMMIT.y], ...LEFT_RIDGE, [0, 900], ...[...SPINE].reverse()])
const SNOW = poly([
  [SUMMIT.x, SUMMIT.y], [826, 236], [850, 300], [834, 292], [818, 316], [804, 296], [790, 318],
  [772, 296], [748, 306], [730, 300], [748, 262], [772, 248],
])
const RIDGE_LINE = 'M' + [...[...LEFT_RIDGE].reverse(), [SUMMIT.x, SUMMIT.y], ...RIGHT_RIDGE].map(([x, y]) => `${x} ${y}`).join('L')

// Catmull-Rom through the switchbacks, as cubic Béziers.
function smooth(pts) {
  let d = `M${pts[0][0]} ${pts[0][1]}`
  for (let i = 0; i < pts.length - 1; i++) {
    const [p0, p1, p2, p3] = [pts[i - 1] ?? pts[i], pts[i], pts[i + 1], pts[i + 2] ?? pts[i + 1]]
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6]
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6]
    d += `C${c1.map(Math.round).join(' ')} ${c2.map(Math.round).join(' ')} ${p2[0]} ${p2[1]}`
  }
  return d
}
const TRAIL_PTS = [
  [640, 900], [760, 822], [604, 744], [744, 662], [652, 584], [762, 502], [702, 432], [790, 362],
  [764, 300], [SUMMIT.x, SUMMIT.y + 4],
]
const TRAIL = smooth(TRAIL_PTS)
const WAYPOINTS = [TRAIL_PTS[2], TRAIL_PTS[4], TRAIL_PTS[6], TRAIL_PTS[8]]

const STRATA = [
  'M260 700L420 650L520 660L640 600',
  'M380 610L470 590L560 540L650 520',
  'M520 520L600 480L680 470',
  'M940 470L1010 500L1100 560L1190 600',
  'M900 400L960 430L1030 500',
  'M1080 640L1200 680L1330 700',
]

const BACK = ridgePath(13, { base: 640, amp: 260, steps: 22 })
const MID = ridgePath(31, { base: 760, amp: 170, steps: 26 })
const FORE = ridgePath(47, { base: 900, amp: 130, steps: 16 })
const STARS = starField(9, 170).filter((s) => s.y < 560)

export default function HeroScene() {
  return (
    <div aria-hidden="true" className="absolute inset-0">
      <svg {...VIEW} data-depth="0.04" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="hero-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#060608" />
            <stop offset="0.55" stopColor="#13110f" />
            <stop offset="1" stopColor="#2a241e" />
          </linearGradient>
          <radialGradient id="hero-halo" cx={SUMMIT.x} cy={SUMMIT.y + 30} r="520" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor={OCHRE} stopOpacity="0.2" />
            <stop offset="0.35" stopColor={CREAM} stopOpacity="0.08" />
            <stop offset="1" stopColor={CREAM} stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="1600" height="900" fill="url(#hero-sky)" />
        <rect width="1600" height="900" fill="url(#hero-halo)" />
        <g fill={CREAM}>
          {STARS.map((s, i) => (
            <circle
              key={i}
              cx={s.x}
              cy={s.y}
              r={s.r}
              fillOpacity={s.o * 0.85}
              className={i % 6 === 0 ? 'star-twinkle' : undefined}
              style={i % 6 === 0 ? { animationDelay: `${(i % 7) * 0.5}s` } : undefined}
            />
          ))}
        </g>
      </svg>

      <svg {...VIEW} data-depth="0.08" className="absolute inset-0 h-full w-full">
        <path d={BACK} fill="#1f1b17" />
      </svg>
      <svg {...VIEW} data-depth="0.12" className="absolute inset-0 h-full w-full">
        <path d={MID} fill="#16130f" />
      </svg>

      <svg {...VIEW} data-depth="0.16" data-peak className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="hero-peak" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0.2" stopColor="#24201b" />
            <stop offset="0.75" stopColor="#100e0c" />
          </linearGradient>
          <linearGradient id="hero-lit" x1="0.75" y1="0" x2="0.15" y2="0.8">
            <stop offset="0" stopColor={CREAM} stopOpacity="0.13" />
            <stop offset="1" stopColor={CREAM} stopOpacity="0" />
          </linearGradient>
          <linearGradient id="hero-snow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={CREAM} stopOpacity="0.85" />
            <stop offset="1" stopColor={CREAM} stopOpacity="0.25" />
          </linearGradient>
        </defs>
        <path d={PEAK} fill="url(#hero-peak)" />
        <path d={LIT_FACE} fill="url(#hero-lit)" />
        {STRATA.map((d, i) => (
          <path key={i} d={d} fill="none" stroke={CREAM} strokeOpacity="0.07" strokeWidth="1.5" strokeLinejoin="round" />
        ))}
        <path d={RIDGE_LINE} fill="none" stroke={CREAM} strokeOpacity="0.32" strokeWidth="1.5" strokeLinejoin="round" />
        <path d={SNOW} fill="url(#hero-snow)" />

        <path d={TRAIL} className="trail trail--ghost" style={{ strokeWidth: 2.5 }} />
        <path data-hero-trail d={TRAIL} fill="none" stroke={CREAM} strokeOpacity="0.85" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="2 10" />
        {WAYPOINTS.map(([x, y], i) => (
          <circle key={i} data-hero-camp cx={x} cy={y} r="4" fill="#0c0b0a" stroke={MOSS} strokeOpacity="0.9" strokeWidth="1.5" />
        ))}

        {/* The summit, highlighted: a beacon, a ring and the flag. */}
        <circle cx={SUMMIT.x} cy={SUMMIT.y} r="64" fill="none" stroke={OCHRE} strokeOpacity="0.3" strokeDasharray="3 7" />
        <g data-hero-flag>
          <path d={`M${SUMMIT.x} ${SUMMIT.y}V${SUMMIT.y - 46}`} stroke={CREAM} strokeWidth="2.5" strokeLinecap="round" />
          <path d={`M${SUMMIT.x} ${SUMMIT.y - 46}L${SUMMIT.x + 26} ${SUMMIT.y - 37}L${SUMMIT.x} ${SUMMIT.y - 28}Z`} fill={OCHRE} />
        </g>
        <circle cx={SUMMIT.x} cy={SUMMIT.y} r="5" className="climber-pulse" style={{ fill: OCHRE }} />
        <circle cx={SUMMIT.x} cy={SUMMIT.y} r="5" fill={CREAM} />
      </svg>

      <div data-depth="0.22" className="absolute inset-0 overflow-hidden">
        <span className="cloud left-[-12%] top-[48%] h-[18%] w-[62%]" />
        <span className="cloud left-[46%] top-[56%] h-[16%] w-[58%]" style={{ animationDelay: '-11s' }} />
      </div>

      <svg {...VIEW} data-depth="0.3" className="absolute inset-0 h-full w-full">
        <path d={FORE} fill="#09090a" />
      </svg>
    </div>
  )
}
