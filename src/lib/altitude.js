// Tiny store for the altimeter, so scroll-driven updates never re-render React.
const listeners = new Set()
let state = { value: 0, summit: false }

export const altitude = {
  get: () => state,
  set(value, summit = false) {
    const next = Math.round(value)
    if (next === state.value && summit === state.summit) return
    state = { value: next, summit }
    listeners.forEach((fn) => fn(state))
  },
  subscribe(fn) {
    listeners.add(fn)
    return () => listeners.delete(fn)
  },
}

// 3479 → "3.479" (es) / "3,479" (en)
export const formatAlt = (n, lang) =>
  String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, lang === 'en' ? ',' : '.')

export const pad4 = (n) => String(Math.round(n)).padStart(4, '0')
