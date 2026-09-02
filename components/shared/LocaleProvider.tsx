'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { translations } from '@/lib/i18n/translations'

type LocaleValue = {
  language: 'en' | 'ur'
  isRtl: boolean
  setLanguage: (language: 'en' | 'ur') => void
  t: (value: string) => string
}

const LocaleContext = createContext<LocaleValue | null>(null)

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<'en' | 'ur'>('en')

  useEffect(() => {
    try {
      // Clear any legacy localStorage value to prevent unexpected cross-session persistence
      localStorage.removeItem('hec-language')
    } catch {}

    try {
      // sessionStorage keeps the language across page navigation in the active tab/session,
      // but resets to English whenever the screen/tab is closed and reopened.
      const saved = sessionStorage.getItem('hec-language') === 'ur' ? 'ur' : 'en'
      setLanguageState(saved)
      document.documentElement.lang = saved
      document.documentElement.dir = saved === 'ur' ? 'rtl' : 'ltr'
      if (saved === 'ur') {
        document.documentElement.classList.add('font-urdu')
      } else {
        document.documentElement.classList.remove('font-urdu')
      }
    } catch {
      // Default to English if storage is inaccessible
      setLanguageState('en')
      document.documentElement.lang = 'en'
      document.documentElement.dir = 'ltr'
      document.documentElement.classList.remove('font-urdu')
    }
  }, [])

  function setLanguage(next: 'en' | 'ur') {
    try {
      sessionStorage.setItem('hec-language', next)
    } catch {}
    document.documentElement.lang = next
    document.documentElement.dir = next === 'ur' ? 'rtl' : 'ltr'
    if (next === 'ur') {
      document.documentElement.classList.add('font-urdu')
    } else {
      document.documentElement.classList.remove('font-urdu')
    }
    setLanguageState(next)
  }

  const value = useMemo(
    () => ({
      language,
      isRtl: language === 'ur',
      setLanguage,
      t: (val: string) => {
        if (!val) return ''
        if (language === 'ur') {
          return translations[val] || val
        }
        return val
      },
    }),
    [language]
  )

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

export function useLocale() {
  const value = useContext(LocaleContext)
  if (!value) throw new Error('LocaleProvider is required')
  return value
}
