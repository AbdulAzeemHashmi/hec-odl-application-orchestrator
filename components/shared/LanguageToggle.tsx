'use client'

import { useLocale } from './LocaleProvider'

export default function LanguageToggle() {
  const { language, setLanguage } = useLocale()

  return (
    <div
      role="group"
      aria-label="Select language"
      className="inline-flex items-center rounded-lg border border-slate-200 bg-slate-50 p-0.5 shadow-sm"
    >
      <button
        onClick={() => setLanguage('en')}
        aria-pressed={language === 'en'}
        className={`rounded-md px-3 py-1.5 text-xs font-bold transition-all ${
          language === 'en'
            ? 'bg-white text-blue-700 shadow-sm'
            : 'text-slate-500 hover:text-slate-700'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage('ur')}
        aria-pressed={language === 'ur'}
        className={`rounded-md px-3 py-1.5 text-xs font-bold transition-all ${
          language === 'ur'
            ? 'bg-white text-blue-700 shadow-sm'
            : 'text-slate-500 hover:text-slate-700'
        }`}
        style={{ fontFamily: "'Noto Sans Arabic', 'Noto Nastaliq Urdu', sans-serif" }}
      >
        اردو
      </button>
    </div>
  )
}
