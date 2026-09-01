'use client'

import PortalShell from '@/components/shared/PortalShell'
import VisitScheduler from '@/components/shared/VisitScheduler'
import { useLocale } from '@/components/shared/LocaleProvider'

export default function VisitsPage() {
  const { t } = useLocale()
  return (
    <PortalShell
      title="Onsite visits & revisits"
      subtitle="Schedule assessments, complete electronic checklists and upload authorized visit evidence."
    >
      <VisitScheduler />

      <div className="card mt-6">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50 text-xl text-blue-700">
            📋
          </span>
          <div>
            <h2 className="font-bold text-slate-900 text-base">{t('Visit checklist')}</h2>
            <p className="mt-0.5 text-xs text-slate-500">
              {t(
                'Checklist items connect directly to dossier parameters so observations and evidence remain part of the case record.'
              )}
            </p>
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 text-xs">
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
            <span className="font-bold text-slate-800 block mb-1">1. LMS & Infrastructure</span>
            <p className="text-slate-500">Verify 24/7 server uptime, disaster recovery, and student bandwidth access.</p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
            <span className="font-bold text-slate-800 block mb-1">2. Faculty & Student Ratio</span>
            <p className="text-slate-500">Inspect full-time dedicated ODL course coordinators and tutoring records.</p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
            <span className="font-bold text-slate-800 block mb-1">3. Examination Security</span>
            <p className="text-slate-500">Review biometric student verification and proctored examination center logs.</p>
          </div>
        </div>
      </div>
    </PortalShell>
  )
}
