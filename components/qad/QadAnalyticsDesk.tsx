'use client'

import { useState } from 'react'
import { useLocale } from '@/components/shared/LocaleProvider'
import { Metric, EmptyState } from '@/components/shared/DashboardBits'

type ApplicationSummary = {
  id: string
  status: string
  createdAt: string
  heiName?: string
  scrutinyScore?: number | null
}

export default function QadAnalyticsDesk({
  applications,
  statusCounts,
  total,
  received,
  dueSoon,
  deficiencyReturns,
  panelApproval,
  approved,
}: {
  applications: ApplicationSummary[]
  statusCounts: Record<string, number>
  total: number
  received: number
  dueSoon: number
  deficiencyReturns: number
  panelApproval: number
  approved: number
}) {
  const { t, isRtl } = useLocale()
  const [filterStatus, setFilterStatus] = useState<string>('ALL')

  const filteredApps = applications.filter(
    (app) => filterStatus === 'ALL' || app.status === filterStatus
  )

  const approvalRate = total > 0 ? Math.round((approved / total) * 100) : 0
  const deficiencyRate = total > 0 ? Math.round((deficiencyReturns / total) * 100) : 0
  const slaCompliance = total > 0 ? Math.max(100 - dueSoon * 15, 75) : 100

  // 1-Click CSV Export (zero cost, browser native)
  function exportCsvReport() {
    const headers = ['Application ID', 'Status', 'Institution', 'Scrutiny Score', 'Submission Date']
    const rows = applications.map((app) => [
      app.id,
      app.status,
      `"${(app.heiName || 'Registered Institution').replace(/"/g, '""')}"`,
      app.scrutinyScore ?? 'Pending',
      new Date(app.createdAt).toISOString().split('T')[0],
    ])

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `hec-qad-analytics-${new Date().toISOString().split('T')[0]}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="space-y-6">
      {/* Top Metrics Cards */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <Metric label="Received" value={received.toString()} note="Awaiting initial scrutiny" />
        <Metric label="Due in 7 days" value={dueSoon.toString()} note="30-day scrutiny target" />
        <Metric
          label="Deficiency returns"
          value={`${deficiencyReturns} (${deficiencyRate}%)`}
          note="Awaiting HEI response"
        />
        <Metric
          label="Panel approval"
          value={panelApproval.toString()}
          note="Ready for constitution"
        />
      </div>

      {total === 0 ? (
        <EmptyState
          title="QAD Scrutiny Workqueue"
          text="Submitted HEI dossiers will appear here. The system calculates completeness but an authorized QAD officer approves every routing decision."
        />
      ) : (
        <>
          {/* Main Visual Dashboard */}
          <div className="grid gap-6 lg:grid-cols-5">
            {/* Case Pipeline Status Bar */}
            <section className="card lg:col-span-3">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <h2 className="font-bold text-slate-900 text-base">{t('Case pipeline')}</h2>
                  <p className="text-xs text-slate-500">
                    {total} {t('total cases')} registered in orchestrator
                  </p>
                </div>
                <button
                  onClick={exportCsvReport}
                  className="btn-secondary text-xs font-semibold flex items-center gap-1.5 shadow-sm"
                >
                  <span>📊</span>
                  <span>{t('Export CSV Report')}</span>
                </button>
              </div>

              <div className="mt-5 space-y-4">
                {Object.entries(statusCounts).map(([status, count]) => {
                  const percentage = Math.round((count / total) * 100)
                  return (
                    <div key={status}>
                      <div className="mb-1 flex justify-between text-xs font-medium text-slate-600">
                        <span className="font-semibold">{t(status) || status.replaceAll('_', ' ')}</span>
                        <span>
                          {count} ({percentage}%)
                        </span>
                      </div>
                      <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            status === 'APPROVED'
                              ? 'bg-emerald-500'
                              : status === 'RETURNED'
                              ? 'bg-amber-500'
                              : status === 'REFUSED'
                              ? 'bg-red-500'
                              : 'bg-blue-600'
                          }`}
                          style={{ width: `${Math.max(percentage, 4)}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </section>

            {/* Health & SLA Overview */}
            <section className="card lg:col-span-2 flex flex-col justify-between">
              <div>
                <h2 className="font-bold text-slate-900 text-base mb-1">{t('Decision health')}</h2>
                <p className="text-xs text-slate-500">
                  {t('Approval rate across all registered cases')}
                </p>

                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-4xl font-black text-emerald-600">{approvalRate}%</span>
                  <span className="text-xs text-slate-500 font-semibold">Institutional NOCs</span>
                </div>

                <div className="mt-6 space-y-3 divide-y divide-slate-100 text-sm">
                  <div className="pt-2 flex justify-between">
                    <span className="text-slate-500 text-xs">{t('In active review')}</span>
                    <span className="font-bold text-slate-900">{dueSoon + panelApproval}</span>
                  </div>
                  <div className="pt-2 flex justify-between">
                    <span className="text-slate-500 text-xs">{t('HEI action required')}</span>
                    <span className="font-bold text-slate-900">{deficiencyReturns}</span>
                  </div>
                  <div className="pt-2 flex justify-between">
                    <span className="text-slate-500 text-xs">{t('SLA Compliance')}</span>
                    <span className="font-bold text-emerald-600">{slaCompliance}%</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-xl bg-blue-50/60 p-3 text-xs text-blue-900 border border-blue-100">
                💡 <strong>Target SLA:</strong> Initial completeness determination within 30 calendar days.
              </div>
            </section>
          </div>

          {/* Detailed Applications Table */}
          <section className="card overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <h2 className="font-bold text-slate-900 text-base">Active Dossier Queue</h2>
              <div className="flex flex-wrap gap-2 text-xs">
                {['ALL', 'SUBMITTED', 'UNDER_SCRUTINY', 'RETURNED', 'PANEL_REVIEW', 'APPROVED'].map(
                  (st) => (
                    <button
                      key={st}
                      onClick={() => setFilterStatus(st)}
                      className={`rounded-lg px-2.5 py-1 font-semibold transition ${
                        filterStatus === st
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {st === 'ALL' ? 'All Cases' : t(st) || st}
                    </button>
                  )
                )}
              </div>
            </div>

            <div className="overflow-x-auto mt-4">
              <table className="w-full text-left text-xs text-slate-600" dir={isRtl ? 'rtl' : 'ltr'}>
                <thead className="border-b bg-slate-50 text-[11px] font-bold uppercase text-slate-500">
                  <tr>
                    <th className="py-2.5 px-3">Application ID</th>
                    <th className="py-2.5 px-3">Institution</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3">Scrutiny Score</th>
                    <th className="py-2.5 px-3">Submitted</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredApps.map((app) => (
                    <tr key={app.id} className="hover:bg-slate-50/70 transition">
                      <td className="py-3 px-3 font-mono font-bold text-blue-700">
                        {app.id.slice(0, 8)}
                      </td>
                      <td className="py-3 px-3 font-medium text-slate-900">
                        {app.heiName || 'Registered Institution'}
                      </td>
                      <td className="py-3 px-3">
                        <span
                          className={`status text-[10px] ${
                            app.status === 'APPROVED'
                              ? 'bg-emerald-100 text-emerald-800'
                              : app.status === 'RETURNED'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {t(app.status) || app.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 font-semibold text-slate-800">
                        {app.scrutinyScore ? `${app.scrutinyScore}%` : 'Pending'}
                      </td>
                      <td className="py-3 px-3 text-slate-500">
                        {new Date(app.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}
    </div>
  )
}
