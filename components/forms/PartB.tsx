'use client'

import { useState } from 'react'
import { Button } from '../ui/Button'
import { useLocale } from '@/components/shared/LocaleProvider'

interface PartBData {
  approvals: string
  aims: string
  learners: string
  resources: string
}

interface PartBProps {
  onSubmit: (data: any) => void
  loading: boolean
  onBack: () => void
}

export default function PartBForm({ onSubmit, loading, onBack }: PartBProps) {
  const { t, isRtl } = useLocale()
  const [data, setData] = useState<PartBData>({
    approvals: '',
    aims: '',
    learners: '',
    resources: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(data)
  }

  // Urdu validation tooltip override
  const urduRequiredMsg = 'براہ کرم یہ خانہ پُر کریں'
  const handleInvalid = (e: React.InvalidEvent<HTMLTextAreaElement>) => {
    e.target.setCustomValidity(isRtl ? urduRequiredMsg : '')
  }
  const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    ;(e.target as HTMLTextAreaElement).setCustomValidity('')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="pb-2 border-b border-slate-200">
        <h2 className="text-xl font-bold text-slate-900">{t('Program Readiness')}</h2>
        <p className="mt-1 text-sm text-slate-500">
          {isRtl
            ? 'پروگرام کی تیاری کے تمام پہلو تفصیل سے بیان کریں'
            : 'Describe all aspects of program readiness in detail'}
        </p>
      </div>

      {/* Statutory Approvals */}
      <div className="space-y-1.5">
        <label className="block text-sm font-semibold text-slate-700">
          {t('Statutory Approvals')}
          <span className="text-red-500 ms-1">*</span>
        </label>
        <textarea
          required
          name="approvals"
          value={data.approvals}
          onChange={handleChange}
          onInvalid={handleInvalid}
          onInput={handleInput}
          placeholder={t('Provide details of Board of Studies, Academic Council, Syndicate approvals, and any other statutory or regulatory clearances obtained for the ODL program.')}
          className="w-full p-3 border border-slate-300 rounded-lg text-base sm:text-sm leading-relaxed text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-none resize-y transition"
          rows={4}
        />
      </div>

      {/* Aims & Goals */}
      <div className="space-y-1.5">
        <label className="block text-sm font-semibold text-slate-700">
          {t('Aims & Goals')}
          <span className="text-red-500 ms-1">*</span>
        </label>
        <textarea
          required
          name="aims"
          value={data.aims}
          onChange={handleChange}
          onInvalid={handleInvalid}
          onInput={handleInput}
          placeholder={t('State the program aims, learning outcomes, alignment with HEC ODL policy objectives, and national development priorities.')}
          className="w-full p-3 border border-slate-300 rounded-lg text-base sm:text-sm leading-relaxed text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-none resize-y transition"
          rows={4}
        />
      </div>

      {/* Learner Profiling */}
      <div className="space-y-1.5">
        <label className="block text-sm font-semibold text-slate-700">
          {t('Learner Profiling')}
          <span className="text-red-500 ms-1">*</span>
        </label>
        <textarea
          required
          name="learners"
          value={data.learners}
          onChange={handleChange}
          onInvalid={handleInvalid}
          onInput={handleInput}
          placeholder={t('Describe the target demographics, admission criteria, SWOT analysis of prospective learner cohorts, and diversity and inclusion provisions.')}
          className="w-full p-3 border border-slate-300 rounded-lg text-base sm:text-sm leading-relaxed text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-none resize-y transition"
          rows={4}
        />
      </div>

      {/* Learning Resources */}
      <div className="space-y-1.5">
        <label className="block text-sm font-semibold text-slate-700">
          {t('Learning Resources (OER, Library, Labs)')}
          <span className="text-red-500 ms-1">*</span>
        </label>
        <textarea
          required
          name="resources"
          value={data.resources}
          onChange={handleChange}
          onInvalid={handleInvalid}
          onInput={handleInput}
          placeholder={t('Detail the Open Educational Resources (OER) available, library access arrangements, laboratory facilities, digital content repositories, and virtual lab provisions.')}
          className="w-full p-3 border border-slate-300 rounded-lg text-base sm:text-sm leading-relaxed text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-none resize-y transition"
          rows={4}
        />
      </div>

      <div className={`flex flex-col-reverse sm:flex-row gap-3 sm:gap-4 ${isRtl ? 'sm:flex-row-reverse' : ''}`}>
        <Button type="button" variant="outline" onClick={onBack} className="w-full sm:w-auto font-semibold py-2.5">
          {isRtl ? '\u2192' : '\u2190'} {t('Back to Part A')}
        </Button>
        <Button
          type="submit"
          variant="default"
          disabled={loading}
          className="w-full sm:flex-1 font-semibold shadow-md py-2.5"
        >
          {loading ? t('Submitting...') : t('Submit Application')}
        </Button>
      </div>
    </form>
  )
}