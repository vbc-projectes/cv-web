import { useEffect, useState } from 'react'
import { LangContext } from './LangContext'
import { t } from './ui'
import profile from '../data/profile.json'

export default function LangProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('cv-lang') === 'en' ? 'en' : 'es')

  useEffect(() => {
    localStorage.setItem('cv-lang', lang)
    document.documentElement.lang = lang
    document.title = `${profile.name} · ${t(profile.title, lang)}`
  }, [lang])

  const toggleLang = () => setLang(l => (l === 'es' ? 'en' : 'es'))

  return (
    <LangContext.Provider value={{ lang, toggleLang }}>
      {children}
    </LangContext.Provider>
  )
}
