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
    <div className="card p-3.5 sm:p-5 transition hover:shadow-md flex flex-col justify-between">
      <div>
        <p className="text-xs sm:text-sm font-medium text-slate-500 leading-snug">{t(label)}</p>
        <p className="mt-1 sm:mt-2 text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">{value}</p>
      </div>
      <p className="mt-2 sm:mt-3 text-[11px] sm:text-xs text-slate-400 leading-snug">{t(note)}</p>
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
    <div className="card py-8 sm:py-12 px-4 sm:px-6 text-center">
      <div className="mx-auto grid h-12 w-12 sm:h-14 sm:w-14 place-items-center rounded-2xl bg-blue-50 text-2xl text-blue-700 mb-3 shadow-inner border border-blue-100">
        📁
      </div>
      <h2 className="font-bold text-slate-900 text-base sm:text-lg">{t(title)}</h2>
      <p className="mx-auto mt-2 max-w-xl text-xs sm:text-sm leading-relaxed text-slate-500">
        {t(text)}
      </p>
    </div>
  )
}
