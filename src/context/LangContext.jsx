import { createContext, useContext, useState, useEffect } from 'react'

const LangContext = createContext({ lang: 'es', setLang: () => {} })

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('cv-lang') || 'es')

  useEffect(() => {
    localStorage.setItem('cv-lang', lang)
  }, [lang])

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  )
}

export const useLang = () => useContext(LangContext)

/**
 * Resolves a bilingual value { es, en } or returns a plain string/array as-is.
 */
export function t(val, lang = 'es') {
  if (val === null || val === undefined) return ''
  if (typeof val === 'object' && !Array.isArray(val) && ('es' in val || 'en' in val)) {
    return val[lang] ?? val.es ?? ''
  }
  return val
}
