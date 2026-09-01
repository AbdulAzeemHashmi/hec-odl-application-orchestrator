import PortalShell from '@/components/shared/PortalShell'
import QadAnalyticsDesk from '@/components/qad/QadAnalyticsDesk'
import { prisma } from '@/lib/db/prisma'

export default async function QadDashboard() {
  let received = 0
  let dueSoon = 0
  let deficiencyReturns = 0
  let panelApproval = 0
  let approved = 0
  let total = 0
  const statusCounts: Record<string, number> = {}
  let applicationSummaries: any[] = []

  try {
    const [counts, activeCases, allApps] = await Promise.all([
      prisma.application.groupBy({
        by: ['status'],
        _count: { status: true },
      }),
      prisma.application.findMany({
        where: { status: 'UNDER_SCRUTINY' },
        select: { createdAt: true },
      }),
      prisma.application.findMany({
        take: 50,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          status: true,
          createdAt: true,
          scrutinyScore: true,
          data: true,
        },
      }),
    ])

    counts.forEach((item) => {
      const cnt = item._count.status
      total += cnt
      statusCounts[item.status] = cnt
      if (item.status === 'SUBMITTED') received += cnt
      else if (item.status === 'RETURNED') deficiencyReturns += cnt
      else if (item.status === 'PANEL_REVIEW') panelApproval += cnt
      else if (item.status === 'APPROVED') approved += cnt
    })

    const sevenDays = 7 * 24 * 60 * 60 * 1000
    dueSoon = activeCases.filter((item) => {
      const remaining =
        new Date(item.createdAt).getTime() + 30 * 24 * 60 * 60 * 1000 - Date.now()
      return remaining >= 0 && remaining <= sevenDays
    }).length

    applicationSummaries = allApps.map((app) => {
      const d = app.data as Record<string, any> | null
      return {
        id: app.id,
        status: app.status,
        createdAt: app.createdAt.toISOString(),
        scrutinyScore: app.scrutinyScore,
        heiName: d?.institutionName || d?.heiName || 'Higher Education Institution',
      }
    })
  } catch {
    // Fallback during initial setup/build
  }

  return (
    <PortalShell
      title="QAD scrutiny desk"
      subtitle="Manage incoming cases, completeness decisions, deficiency notices and panel formation."
    >
      <QadAnalyticsDesk
        applications={applicationSummaries}
        statusCounts={statusCounts}
        total={total}
        received={received}
        dueSoon={dueSoon}
        deficiencyReturns={deficiencyReturns}
        panelApproval={panelApproval}
        approved={approved}
      />
    </PortalShell>
  )
}
