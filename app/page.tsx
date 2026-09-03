'use client'

import Link from 'next/link'
import { useLocale } from '@/components/shared/LocaleProvider'
import LanguageToggle from '@/components/shared/LanguageToggle'

const stageKeys = [
  'Submit dossier',
  'QAD scrutiny',
  'Expert panel',
  'Visit & report',
  'Decision & NOC',
]

export default function Home() {
  const { t, isRtl } = useLocale()

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Navigation Header */}
      <header className="border-b border-slate-200/80 bg-white/90 backdrop-blur-md sticky top-0 z-50">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-3 py-2.5 sm:px-6 sm:py-4">
          <div className="text-base sm:text-xl font-extrabold tracking-tight text-blue-900 flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            <span className="grid h-7 w-7 sm:h-8 sm:w-8 place-items-center rounded-lg bg-blue-800 font-bold text-white text-xs sm:text-sm">
              ODL
            </span>
            <span>HEC <span className="text-slate-700 font-semibold">Portal</span></span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <LanguageToggle />
            <Link
              href="/login"
              className="btn-secondary whitespace-nowrap px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm font-semibold"
            >
              {t('Sign in')}
            </Link>
            <Link
              href="/signup"
              className="btn-primary hidden md:inline-flex whitespace-nowrap px-3 py-2 text-xs sm:px-5 sm:text-sm font-semibold shadow-md shadow-blue-700/20"
            >
              {t('Create account')}
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white via-slate-50 to-slate-100/60">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 pt-8 pb-14 sm:pt-10 sm:pb-16 lg:grid-cols-[1.15fr_.85fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-100/90 px-3 py-1.5 text-xs sm:px-5 sm:py-2 sm:text-sm font-bold tracking-wide text-blue-900 ring-1 ring-inset ring-blue-700/20 shadow-sm uppercase max-w-full">
              <span className="h-2 w-2 flex-shrink-0 rounded-full bg-blue-600 animate-pulse" />
              <span className="truncate">{t('Quality Assurance Division · ODL Section')}</span>
            </div>

            <h1 className="mt-6 max-w-3xl text-2xl sm:text-3xl lg:text-4xl font-bold leading-snug tracking-tight text-slate-900">
              {t('A complete workspace for')}{' '}
              <span className="bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 bg-clip-text text-transparent">
                {t('ODL NOC Applications')}
              </span>
            </h1>

            <p className="mt-4 max-w-2xl text-sm sm:text-base leading-relaxed text-slate-600 font-normal">
              {t(
                'Submit the Model Application Dossier, manage evidence, review cases, coordinate Expert Panels, record visits, issue decisions, and track 3-year confirmation milestones.'
              )}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
              <Link
                href="/signup"
                className="btn-primary w-full justify-center py-3 text-sm font-semibold shadow-lg shadow-blue-800/25 hover:shadow-xl transition-all sm:w-auto sm:px-7 sm:text-base"
              >
                {t('Register your HEI')}
              </Link>
              <Link
                href="/llm"
                className="btn-secondary w-full justify-center py-3 text-sm font-semibold border-slate-300 hover:bg-slate-100 transition-all sm:w-auto sm:px-7 sm:text-base"
              >
                {t('Open policy assistant')}
              </Link>
            </div>
          </div>

          <div className="rounded-3xl bg-gradient-to-br from-blue-900 via-blue-950 to-slate-900 p-5 sm:p-8 text-white shadow-2xl shadow-blue-950/30 border border-blue-800/50">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold uppercase tracking-widest text-blue-300">
                {t('APPLICATION LIFECYCLE')}
              </p>
              <span className="rounded-full bg-blue-500/20 px-3 py-1 text-xs font-semibold text-blue-200">
                {t('5 Stages')}
              </span>
            </div>
            <div className="mt-6 space-y-3.5">
              {stageKeys.map((stage, i) => (
                <div
                  key={stage}
                  className="flex items-center gap-4 rounded-xl bg-white/10 p-4 border border-white/10 hover:bg-white/15 transition-all"
                >
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-blue-400 font-bold text-blue-950 text-sm shadow-md flex-shrink-0">
                    {i + 1}
                  </span>
                  <span className="font-semibold text-slate-100">{t(stage)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Middle Feature Section (Rich Silver Theme) */}
      <section className="border-y border-slate-300/90 bg-gradient-to-r from-slate-200 via-zinc-300 to-slate-200 text-slate-900 shadow-inner">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 py-10 sm:px-6 sm:py-14 md:gap-8 md:grid-cols-3">
          <Feature
            icon="📋"
            title={t('Controlled dossier')}
            text={t('Parameter-wise claims, evidence, remarks and versioned submissions.')}
          />
          <Feature
            icon="👥"
            title={t('Role-based review')}
            text={t('Dedicated HEI, QAD, Expert Panel and decision-maker workspaces.')}
          />
          <Feature
            icon="🛡️"
            title={t('AI, with safeguards')}
            text={t('RAG policy support with local Ollama-first failover; rules remain deterministic.')}
          />
        </div>
      </section>
    </main>
  )
}

function Feature({ icon, title, text }: { icon: string; title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-slate-300 bg-white p-5 sm:p-7 shadow-lg hover:shadow-2xl hover:border-blue-500 hover:-translate-y-1 transition-all duration-300">
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50 text-xl shadow-inner border border-blue-100">
          {icon}
        </span>
        <h2 className="font-extrabold text-slate-950 text-xl">{title}</h2>
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-600 font-normal">{text}</p>
    </div>
  )
}
