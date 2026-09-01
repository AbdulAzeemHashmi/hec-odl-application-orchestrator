'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import PartAForm from '@/components/forms/PartA'
import PartBForm from '@/components/forms/PartB'
import { createBrowserAuthClient } from '@/lib/auth/supabase'
import { useLocale } from '@/components/shared/LocaleProvider'

export default function NewApplicationPage() {
  const router = useRouter()
  const { t, isRtl } = useLocale()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({ partA: {}, partB: {} })
  const [loading, setLoading] = useState(false)

  const handlePartASubmit = (data: any) => {
    setFormData((prev) => ({ ...prev, partA: data }))
    setStep(2)
  }

  const handlePartBSubmit = async (data: any) => {
    setFormData((prev) => ({ ...prev, partB: data }))
    setLoading(true)

    try {
      const { data: { session } } = await createBrowserAuthClient().auth.getSession()
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(session?.access_token ? { Authorization: `Bearer ${session.access_token}` } : {}),
        },
        body: JSON.stringify({
          data: { ...formData.partA, ...data },
          evidenceUrls: [],
        }),
      })
      if (response.ok) {
        router.push('/hei/applications')
      } else {
        alert(t('Failed to create application'))
      }
    } catch {
      alert(t('An error occurred'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-slate-50" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="max-w-3xl mx-auto px-4 py-8 sm:px-6 sm:py-10">

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            {t('New ODL NOC Application')}
          </h1>
          <p className="mt-2 text-sm text-slate-500 leading-relaxed">
            {t('Complete both parts of the Model Application Dossier. All fields are required.')}
          </p>
        </div>

        {/* Step Indicator */}
        <div className="mb-8">
          <div className={`flex items-center gap-0 ${isRtl ? 'flex-row-reverse' : ''}`}>
            {/* Step 1 */}
            <div className="flex items-center gap-2 flex-1">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm flex-shrink-0 transition-all ${
                  step >= 1 ? 'bg-blue-700 text-white shadow-md shadow-blue-200' : 'bg-slate-200 text-slate-500'
                }`}
              >
                {isRtl ? '۱' : '1'}
              </div>
              <div>
                <p
                  className={`text-xs font-bold uppercase tracking-wide ${
                    step >= 1 ? 'text-blue-700' : 'text-slate-400'
                  }`}
                >
                  {isRtl ? 'حصہ الف' : 'Part A'}
                </p>
                <p className={`text-[11px] ${step >= 1 ? 'text-slate-700' : 'text-slate-400'}`}>
                  {isRtl ? 'ادارہ جاتی' : 'Institutional'}
                </p>
              </div>
            </div>

            {/* Connector */}
            <div className={`h-0.5 w-16 flex-shrink-0 mx-2 rounded transition-all ${step === 2 ? 'bg-blue-600' : 'bg-slate-200'}`} />

            {/* Step 2 */}
            <div className="flex items-center gap-2 flex-1">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm flex-shrink-0 transition-all ${
                  step === 2 ? 'bg-blue-700 text-white shadow-md shadow-blue-200' : 'bg-slate-200 text-slate-500'
                }`}
              >
                {isRtl ? '۲' : '2'}
              </div>
              <div>
                <p
                  className={`text-xs font-bold uppercase tracking-wide ${
                    step === 2 ? 'text-blue-700' : 'text-slate-400'
                  }`}
                >
                  {isRtl ? 'حصہ ب' : 'Part B'}
                </p>
                <p className={`text-[11px] ${step === 2 ? 'text-slate-700' : 'text-slate-400'}`}>
                  {isRtl ? 'پروگرام' : 'Program'}
                </p>
              </div>
            </div>
          </div>

          {/* Active part label */}
          <div className="mt-5 rounded-xl bg-blue-50 border border-blue-200 px-4 py-3">
            <p className="text-sm font-semibold text-blue-800">
              {step === 1 ? t('Part A: Institutional Readiness') : t('Part B: Program Readiness')}
            </p>
          </div>
        </div>

        {/* Form Card */}
        <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-6 sm:p-8">
          {step === 1 && <PartAForm onSubmit={handlePartASubmit} />}
          {step === 2 && (
            <PartBForm
              onSubmit={handlePartBSubmit}
              loading={loading}
              onBack={() => setStep(1)}
            />
          )}
        </div>
      </div>
    </main>
  )
}
