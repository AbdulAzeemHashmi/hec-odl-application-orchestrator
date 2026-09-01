'use client'

import { useState } from 'react'
import { Button } from '../ui/Button'
import { useLocale } from '@/components/shared/LocaleProvider'

interface PartAData {
  organizational: string
  hr: string
  technology: string
  assessment: string
}

interface PartAProps {
  onSubmit: (data: any) => void
}

export default function PartAForm({ onSubmit }: PartAProps) {
  const { t, isRtl } = useLocale()
  const [data, setData] = useState<PartAData>({
    organizational: '',
    hr: '',
    technology: '',
    assessment: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(data)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="pb-2 border-b border-slate-200">
        <h2 className="text-xl font-bold text-slate-900">{t('Institutional Readiness')}</h2>
        <p className="mt-1 text-sm text-slate-500">
          {isRtl
            ? 'ادارہ جاتی تیاری کے تمام پہلو تفصیل سے بیان کریں'
            : 'Describe all aspects of institutional readiness in detail'}
        </p>
      </div>

      {/* Organizational Readiness */}
      <div className="space-y-1.5">
        <label className="block text-sm font-semibold text-slate-700">
          {t('Organizational Readiness')}
          <span className="text-red-500 ms-1">*</span>
        </label>
        <textarea
          required
          name="organizational"
          value={data.organizational}
          onChange={handleChange}
          placeholder={t('Describe organizational structure, ODL office, dedicated staff, and management hierarchy responsible for ODL program delivery.')}
          className="w-full p-3 border border-slate-300 rounded-lg text-sm leading-relaxed text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-none resize-y transition"
          rows={4}
        />
      </div>

      {/* HR Readiness */}
      <div className="space-y-1.5">
        <label className="block text-sm font-semibold text-slate-700">
          {t('HR Readiness')}
          <span className="text-red-500 ms-1">*</span>
        </label>
        <textarea
          required
          name="hr"
          value={data.hr}
          onChange={handleChange}
          placeholder={t('List qualified teaching staff, instructional designers, content developers, tutors, and student support personnel with their qualifications.')}
          className="w-full p-3 border border-slate-300 rounded-lg text-sm leading-relaxed text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-none resize-y transition"
          rows={4}
        />
      </div>

      {/* Technological Readiness */}
      <div className="space-y-1.5">
        <label className="block text-sm font-semibold text-slate-700">
          {t('Technological Readiness')}
          <span className="text-red-500 ms-1">*</span>
        </label>
        <textarea
          required
          name="technology"
          value={data.technology}
          onChange={handleChange}
          placeholder={t('Describe ICT infrastructure, Learning Management System (LMS), software, hardware, internet connectivity, and digital support systems in place.')}
          className="w-full p-3 border border-slate-300 rounded-lg text-sm leading-relaxed text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-none resize-y transition"
          rows={4}
        />
      </div>

      {/* Assessment & Evaluation */}
      <div className="space-y-1.5">
        <label className="block text-sm font-semibold text-slate-700">
          {t('Assessment & Evaluation')}
          <span className="text-red-500 ms-1">*</span>
        </label>
        <textarea
          required
          name="assessment"
          value={data.assessment}
          onChange={handleChange}
          placeholder={t('Describe examination systems, question bank management, online proctoring arrangements, result mechanisms, and academic integrity policies.')}
          className="w-full p-3 border border-slate-300 rounded-lg text-sm leading-relaxed text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-none resize-y transition"
          rows={4}
        />
      </div>

      <Button type="submit" variant="default" size="lg" className="w-full font-semibold shadow-md">
        {t('Continue to Part B')}
        {isRtl ? ' \u2190' : ' \u2192'}
      </Button>
    </form>
  )
}