'use client'

import Link from 'next/link'
import { useLocale } from '@/components/shared/LocaleProvider'

export default function OfflinePage() {
  const { t, isRtl } = useLocale()

  return (
    <main
      className="grid min-h-screen place-items-center bg-gradient-to-b from-slate-100 to-slate-200 p-6 text-center"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <section className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-xl">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-amber-100 text-3xl text-amber-600 mb-4">
          📡
        </div>
        <h1 className="text-2xl font-bold text-slate-900">{t('You are currently offline')}</h1>
        <p className="mt-3 text-xs leading-relaxed text-slate-600 sm:text-sm">
          {t(
            'Check your internet connection and try again.'
          )} {t('Some features may be limited until network connection is restored.')}
        </p>

        <div className="mt-6 flex flex-col gap-3">
          <button
            onClick={() => window.location.reload()}
            className="btn-primary w-full py-2.5 font-semibold shadow-md"
          >
            🔄 {t('Retry connection')}
          </button>
          <Link
            href="/"
            className="btn-secondary w-full py-2.5 font-semibold"
          >
            🏠 {t('Return to home')}
          </Link>
        </div>
      </section>
    </main>
  )
}
