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

  // Browser native "Please fill out this field" tooltip — override with Urdu when in RTL mode.
  // onInvalid: ALWAYS call setCustomValidity:
  //   - Urdu text when RTL so the browser shows the Urdu tooltip.
  //   - Empty string ('') when LTR so the browser reverts to its own default English message.
  //   This ensures switching language after a failed submit always shows the correct tooltip.
  // onInput: always reset so the field re-validates cleanly after the user starts typing.
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
          onInvalid={handleInvalid}
          onInput={handleInput}
          placeholder={t('Describe organizational structure, ODL office, dedicated staff, and management hierarchy responsible for ODL program delivery.')}
          className="w-full p-3 border border-slate-300 rounded-lg text-base sm:text-sm leading-relaxed text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-none resize-y transition"
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
          onInvalid={handleInvalid}
          onInput={handleInput}
          placeholder={t('List qualified teaching staff, instructional designers, content developers, tutors, and student support personnel with their qualifications.')}
          className="w-full p-3 border border-slate-300 rounded-lg text-base sm:text-sm leading-relaxed text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-none resize-y transition"
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
          onInvalid={handleInvalid}
          onInput={handleInput}
          placeholder={t('Describe ICT infrastructure, Learning Management System (LMS), software, hardware, internet connectivity, and digital support systems in place.')}
          className="w-full p-3 border border-slate-300 rounded-lg text-base sm:text-sm leading-relaxed text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-none resize-y transition"
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
          onInvalid={handleInvalid}
          onInput={handleInput}
          placeholder={t('Describe examination systems, question bank management, online proctoring arrangements, result mechanisms, and academic integrity policies.')}
          className="w-full p-3 border border-slate-300 rounded-lg text-base sm:text-sm leading-relaxed text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-none resize-y transition"
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