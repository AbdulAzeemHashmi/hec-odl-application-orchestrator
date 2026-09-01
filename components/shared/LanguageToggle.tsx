'use client'

import { useLocale } from './LocaleProvider'

export default function LanguageToggle() {
  const { language, setLanguage } = useLocale()
  return <button onClick={() => setLanguage(language === 'ur' ? 'en' : 'ur')} className="rounded-lg border border-slate-200 px-2.5 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50" aria-label="Switch language">{language === 'ur' ? 'English' : 'اردو'}</button>
}
