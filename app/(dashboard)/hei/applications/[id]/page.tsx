'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import PortalShell from '@/components/shared/PortalShell'
import NocCertificate from '@/components/shared/NocCertificate'
import { useLocale } from '@/components/shared/LocaleProvider'

interface Application {
  id: string
  status: string
  scrutinyScore: number | null
  data: any
  createdAt: string
}

export default function ApplicationDetailPage() {
  const params = useParams()
  const id = params.id as string
  const [app, setApp] = useState<Application | null>(null)
  const [loading, setLoading] = useState(true)
  const { t } = useLocale()

  useEffect(() => {
    fetch(`/api/applications/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setApp(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [id])

  if (loading) {
    return (
      <PortalShell title="Application Details" subtitle="Review dossier parameters and status">
        <div className="card py-12 text-center text-slate-500">{t('Loading...')}</div>
      </PortalShell>
    )
  }

  if (!app) {
    return (
      <PortalShell title="Application Details" subtitle="Review dossier parameters and status">
        <div className="card py-12 text-center text-slate-500">Application not found</div>
      </PortalShell>
    )
  }

  const instName = app.data?.institutionName || app.data?.heiName || 'Registered Institution'

  return (
    <PortalShell
      title={`Application #${app.id.slice(0, 8)}`}
      subtitle={`${instName} · Status: ${app.status}`}
    >
      <div className="space-y-6">
        {/* Status Header Banner */}
        <div className="card flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="eyebrow">{t('HEC ODL APPLICATION SYSTEM')}</span>
            <h2 className="text-xl font-bold text-slate-900 mt-1">{instName}</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Submitted on {new Date(app.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-xs text-slate-400 block font-semibold uppercase">
                Scrutiny Score
              </span>
              <span className="text-lg font-bold text-slate-900">
                {app.scrutinyScore ? `${app.scrutinyScore}%` : 'Pending'}
              </span>
            </div>
            <span
              className={`status px-3 py-1 text-sm ${
                app.status === 'APPROVED'
                  ? 'bg-emerald-100 text-emerald-800'
                  : app.status === 'RETURNED'
                  ? 'bg-amber-100 text-amber-800'
                  : 'bg-blue-100 text-blue-800'
              }`}
            >
              {t(app.status) || app.status}
            </span>
          </div>
        </div>

        {/* Digital PDF NOC Certificate (When Approved) */}
        {app.status === 'APPROVED' && (
          <NocCertificate id={app.id} institution={instName} />
        )}

        {/* Dossier Data Card */}
        <div className="card">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
            <h3 className="font-bold text-slate-900 text-base">Model Application Dossier Data</h3>
            <span className="rounded bg-slate-100 px-2 py-0.5 text-xs font-mono text-slate-600">
              Immutable Snapshot
            </span>
          </div>
          <pre className="overflow-x-auto rounded-xl bg-slate-950 p-4 text-xs font-mono leading-relaxed text-emerald-400 max-h-96">
            {JSON.stringify(app.data, null, 2)}
          </pre>
        </div>
      </div>
    </PortalShell>
  )
}
