import PortalShell from '@/components/shared/PortalShell'
import { Metric, EmptyState } from '@/components/shared/DashboardBits'
import { prisma } from '@/lib/db/prisma'

export default async function QadDashboard() {
    let received = 0
    let dueSoon = 0
    let deficiencyReturns = 0
    let panelApproval = 0

    try {
        const counts = await prisma.application.groupBy({
            by: ['status'],
            _count: { status: true }
        })

        counts.forEach(item => {
            const cnt = item._count.status
            if (item.status === 'SUBMITTED') received += cnt
            else if (item.status === 'UNDER_SCRUTINY') dueSoon += cnt
            else if (item.status === 'RETURNED') deficiencyReturns += cnt
            else if (item.status === 'PANEL_REVIEW') panelApproval += cnt
        })
    } catch {
        // Fallback for build
    }

    return (
        <PortalShell title="QAD scrutiny desk" subtitle="Manage incoming cases, completeness decisions, deficiency notices and panel formation.">
            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
                <Metric label="Received" value={received.toString()} note="Awaiting initial scrutiny" />
                <Metric label="Due in 7 days" value={dueSoon.toString()} note="30-day scrutiny target" />
                <Metric label="Deficiency returns" value={deficiencyReturns.toString()} note="Awaiting HEI response" />
                <Metric label="Panel approval" value={panelApproval.toString()} note="Ready for constitution" />
            </div>
            <div className="mt-6">
                <EmptyState title="QAD Scrutiny Workqueue" text="Submitted HEI dossiers will appear here. The system calculates completeness but an authorized QAD officer approves every routing decision." />
            </div>
        </PortalShell>
    )
}
