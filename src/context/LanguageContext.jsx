import React, { createContext, useContext, useState, useCallback } from 'react'
import { translations } from '../data/translations.js'

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('ykk_lang') || 'en')

  const toggleLang = useCallback(() => {
    setLang(prev => {
      const next = prev === 'en' ? 'mr' : 'en'
      localStorage.setItem('ykk_lang', next)
      return next
    })
  }, [])

  const t = translations[lang]

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
