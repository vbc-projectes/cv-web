import { createContext, useContext } from 'react'

export const LangContext = createContext({ lang: 'es', toggleLang: () => {} })

export const useLang = () => useContext(LangContext)
