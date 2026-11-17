// Geometry of the mountain and the trail, in "world" units. Everything is derived
// from the camps' altitudes, so the route works for any number of camps.

const lerp = (a, b, t) => a + (b - a) * t
const r = (n) => Math.round(n * 10) / 10

// Wider than the route needs, so the summit zoom-out can frame the route on the left.
export const WORLD = { w: 3000, h: 1500 }
export const PEAK = { x: 1500, y: 330 }
const FOOT = { x: -80, y: 1520 }
const Y_BASE = 1230

// Small seeded PRNG so every render draws the same mountain.
function rng(seed) {
  let s = seed >>> 0
  return () => {
    s = (s + 0x6d2b79f5) | 0
    let t = Math.imul(s ^ (s >>> 15), 1 | s)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// x of the left ridge at a given height: the trail climbs just inside it.
const flankX = (y) => lerp(PEAK.x, FOOT.x, (y - PEAK.y) / (FOOT.y - PEAK.y))

const toPath = (pts) => 'M' + pts.map((p) => `${r(p[0])} ${r(p[1])}`).join('L') + 'Z'

const RIGHT_FLANK = [
  [1578, 425],
  [1632, 452],
  [1735, 596],
  [1806, 612],
  [1910, 766],
  [2012, 792],
  [2144, 936],
  [2292, 1012],
  [2500, 1160],
  [2720, 1230],
  [2900, 1350],
  [3100, 1420],
]

function mountainPath() {
  const rand = rng(7)
  const steps = 24
  const left = []
  for (let i = 0; i <= steps; i++) {
    const y = lerp(FOOT.y, PEAK.y, i / steps)
    const jag = i === steps ? 0 : (rand() - 0.5) * 30
    left.push([flankX(y) - 8 + jag * 0.5, y + jag])
  }
  return toPath([...left, ...RIGHT_FLANK, [3100, 2600], [-1200, 2600], [-1200, FOOT.y + 60]])
}

export const MOUNTAIN = mountainPath()

// Rim light: a gradient that runs from the left ridge into the mountain.
const RIDGE_LEN = Math.hypot(PEAK.x - FOOT.x, PEAK.y - FOOT.y)
const INWARD = { x: (FOOT.y - PEAK.y) / RIDGE_LEN, y: (PEAK.x - FOOT.x) / RIDGE_LEN }
const MID = { x: flankX(925), y: 925 }
export const RIM_LIGHT = {
  x1: r(MID.x),
  y1: r(MID.y),
  x2: r(MID.x + INWARD.x * 640),
  y2: r(MID.y + INWARD.y * 640),
}

// Rock strata running parallel to the ridge, for texture on the face.
export const STRATA = [70, 190, 330, 500].map((inset, k) => {
  const rand = rng(90 + k)
  const pts = []
  for (let i = 0; i <= 26; i++) {
    const y = lerp(FOOT.y - 40, PEAK.y + 90 + inset * 0.5, i / 26)
    const wobble = (rand() - 0.5) * 26
    pts.push(`${r(flankX(y) + INWARD.x * inset + wobble)} ${r(y + INWARD.y * inset + wobble)}`)
  }
  return 'M' + pts.join('L')
})

// Lower peaks standing behind the main one, in the same camera plane.
export const BACK_PEAKS = [
  toPath([
    [-200, 2600], [-200, 1130], [-40, 1010], [70, 1085], [215, 900], [300, 960], [395, 850],
    [520, 1010], [640, 955], [860, 1240], [1100, 1580],
  ]),
  toPath([
    [1620, 2600], [1760, 880], [1850, 760], [1930, 820], [2060, 640], [2150, 560], [2235, 670],
    [2330, 630], [2420, 720], [2540, 820], [2650, 700], [2740, 760], [2860, 610], [2950, 700],
    [3100, 640], [3100, 2600],
  ]),
]

// The lit face under the summit and a few couloirs for texture.
export const LIGHT_FACE = toPath([
  [PEAK.x, PEAK.y], ...RIGHT_FLANK.slice(0, 5), [1700, 900], [1560, 640],
])

export const COULOIRS = [
  'M1500 330L1528 470L1506 610L1548 770L1520 960',
  'M1462 372L1418 520L1440 660L1392 840',
  'M1318 468L1300 610L1332 760L1296 930L1322 1080',
  'M1090 640L1104 790L1066 930L1092 1100',
  'M830 838L850 980L818 1120L840 1260',
  'M1700 560L1668 720L1700 880L1672 1040',
]

export function buildRoute(camps) {
  const n = camps.length
  const alts = camps.map((c) => c.altitude)
  const min = Math.min(...alts)
  const max = Math.max(...alts)

  const points = camps.map((camp, i) => {
    const t = n === 1 ? 1 : max === min ? i / (n - 1) : (camp.altitude - min) / (max - min)
    const last = i === n - 1
    const y = last ? PEAK.y : lerp(Y_BASE, PEAK.y + 60, t)
    // Alternate the distance to the ridge so the trail zigzags like switchbacks.
    const inset = last ? 0 : lerp(150, 70, t) + (i % 2 ? 120 * (1 - t * 0.5) : 0)
    return { x: Math.round(flankX(y) + inset), y: Math.round(y), t }
  })

  // One smooth S-curve per leg between two consecutive camps.
  const legs = []
  for (let i = 1; i < n; i++) {
    const a = points[i - 1]
    const b = points[i]
    const rise = a.y - b.y
    const swing = (i % 2 ? 150 : 90) * Math.min(1, Math.abs(rise) / 120 + 0.35) * lerp(1, 0.3, b.t)
    const mx = Math.max(a.x, b.x) + swing * 0.55
    const my = lerp(a.y, b.y, 0.5)
    legs.push(
      `M${a.x} ${a.y}C${r(a.x + swing)} ${r(a.y - rise * 0.06)} ${r(mx + swing * 0.35)} ${r(my + rise * 0.2)} ${r(mx)} ${r(my)}` +
        `S${r(b.x + swing * 0.5)} ${r(b.y + rise * 0.12)} ${b.x} ${b.y}`,
    )
  }

  // Cloud banks the climber walks through, anchored halfway up every other leg.
  const clouds = []
  for (let i = 1; i < n - 1; i += 2) {
    clouds.push({ x: lerp(points[i].x, points[i + 1].x, 0.5), y: lerp(points[i].y, points[i + 1].y, 0.5) })
  }

  const bottom = Math.max(...points.map((p) => p.y))
  return {
    points,
    legs,
    trail: legs.join(''),
    clouds,
    min,
    max,
    left: Math.min(...points.map((p) => p.x)),
    bottom,
    middle: (PEAK.y + bottom) / 2,
  }
}

// Jagged ridge silhouette for the parallax layers (viewBox 1600×900).
export function ridgePath(seed, { base, amp, steps = 30, w = 1600, h = 900 }) {
  const rand = rng(seed)
  const pts = []
  for (let i = 0; i <= steps; i++) {
    const wave = Math.abs(Math.sin(i * 0.83 + seed)) * 0.55 + Math.abs(Math.sin(i * 0.31 + seed * 2)) * 0.25
    pts.push([(i / steps) * w, base - (wave + rand() * 0.2) * amp])
  }
  return toPath([[0, h], ...pts, [w, h]])
}

// Dot stars, denser towards the top of the frame (viewBox 1600×900).
export function starField(seed, count) {
  const rand = rng(seed)
  return Array.from({ length: count }, () => ({
    x: r(rand() * 1600),
    y: r(Math.pow(rand(), 1.6) * 760),
    r: r(0.6 + rand() * 1.1),
    o: r(0.3 + rand() * 0.6),
  }))
}
