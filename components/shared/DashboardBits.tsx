'use client'

import { useLocale } from './LocaleProvider'

export function Metric({
  label,
  value,
  note,
}: {
  label: string
  value: string
  note: string
}) {
  const { t } = useLocale()
  return (
    <div className="card p-4 sm:p-5 transition hover:shadow-md">
      <p className="text-xs sm:text-sm font-medium text-slate-500">{t(label)}</p>
      <p className="mt-1 sm:mt-2 text-2xl sm:text-3xl font-bold text-slate-900">{value}</p>
      <p className="mt-1 sm:mt-2 text-xs text-slate-500 leading-tight">{t(note)}</p>
    </div>
  )
}

export function EmptyState({
  title,
  text,
}: {
  title: string
  text: string
}) {
  const { t } = useLocale()
  return (
    <div className="card py-8 sm:py-10 px-4 text-center">
      <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-slate-100 text-xl text-slate-600 mb-3">
        📁
      </div>
      <h2 className="font-semibold text-slate-900 text-base sm:text-lg">{t(title)}</h2>
      <p className="mx-auto mt-2 max-w-xl text-xs sm:text-sm leading-relaxed text-slate-500">
        {t(text)}
      </p>
    </div>
  )
}
