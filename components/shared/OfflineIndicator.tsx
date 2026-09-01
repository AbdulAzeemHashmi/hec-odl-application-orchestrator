'use client'

import { useEffect, useState } from 'react'
import { useLocale } from './LocaleProvider'

export default function OfflineIndicator() {
  const [isOffline, setIsOffline] = useState(false)
  const { t } = useLocale()

  useEffect(() => {
    const handleOnline = () => setIsOffline(false)
    const handleOffline = () => setIsOffline(true)

    setIsOffline(!navigator.onLine)
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  if (!isOffline) return null

  return (
    <div className="bg-amber-500 text-slate-950 px-4 py-2 text-center text-xs sm:text-sm font-semibold shadow-md flex items-center justify-center gap-2 sticky top-0 z-50 animate-pulse">
      <span>⚠️</span>
      <span>{t('You are currently offline')} — {t('Some features may be limited until network connection is restored.')}</span>
    </div>
  )
}
