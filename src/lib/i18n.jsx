import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { DEFAULT_LANG, ui } from '../data/portfolio'

const STORAGE_KEY = 'suito-lang'
const LangContext = createContext(null)

// A content field is either a plain value or { es, en }.
export const pick = (value, lang) =>
  value && typeof value === 'object' && !Array.isArray(value) && ('es' in value || 'en' in value)
    ? (value[lang] ?? value[DEFAULT_LANG])
    : value

function initialLang() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved && ui[saved]) return saved
  } catch {
    // storage unavailable: fall through to the default
  }
  return DEFAULT_LANG
}

export function LangProvider({ children }) {
  const [lang, setLang] = useState(initialLang)

  useEffect(() => {
    document.documentElement.lang = lang
    try {
      localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      // ignore
    }
  }, [lang])

  const value = useMemo(() => ({ lang, setLang, t: ui[lang], pick: (v) => pick(v, lang) }), [lang])
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

export const useLang = () => useContext(LangContext)
