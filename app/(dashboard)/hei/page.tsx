import Link from 'next/link'
import PortalShell from '@/components/shared/PortalShell'
import { Metric, EmptyState } from '@/components/shared/DashboardBits'
import { prisma } from '@/lib/db/prisma'

export default async function HeiDashboard() {
  let drafts = 0
  let underReview = 0
  let actionRequired = 0
  let activeNocs = 0
  let totalCount = 0

  try {
    const counts = await prisma.application.groupBy({
      by: ['status'],
      _count: { status: true },
    })

    counts.forEach((item) => {
      const cnt = item._count.status
      totalCount += cnt
      if (item.status === 'DRAFT') drafts += cnt
      else if (['SUBMITTED', 'UNDER_SCRUTINY', 'PANEL_REVIEW'].includes(item.status)) underReview += cnt
      else if (item.status === 'RETURNED') actionRequired += cnt
      else if (item.status === 'APPROVED') activeNocs += cnt
    })
  } catch {
    // Fallback if database is empty or during build
  }

  return (
    <PortalShell
      title="HEI workspace"
      subtitle="Track every ODL NOC application and action due from your institution."
    >
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
          <Metric label="Drafts" value={drafts.toString()} note="Continue completing dossier" />
          <Metric label="Under review" value={underReview.toString()} note="QAD or panel assessment" />
          <Metric label="Action required" value={actionRequired.toString()} note="Deficiencies and responses" />
          <Metric label="Active NOCs" value={activeNocs.toString()} note="Confirmation tracking" />
        </div>

        <div>
          {totalCount === 0 ? (
            <EmptyState
              title="No applications yet"
              text="Start with your institutional profile and then complete the controlled Model Application Dossier. Evidence is required for every Yes claim."
            />
          ) : (
            <div className="rounded-xl border bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900">Application Portfolio</h2>
              <p className="mt-1 text-sm text-slate-500">
                Total active application dossiers registered in the system:{' '}
                <span className="font-semibold text-blue-700">{totalCount}</span>
              </p>
            </div>
          )}
          <div className="mt-6 text-center">
            <Link href="/hei/applications/new" className="btn-primary inline-flex items-center justify-center px-6 py-3 font-semibold shadow-md shadow-blue-700/20">
              Start an ODL NOC application
            </Link>
          </div>
        </div>
      </div>
    </PortalShell>
  )
}
