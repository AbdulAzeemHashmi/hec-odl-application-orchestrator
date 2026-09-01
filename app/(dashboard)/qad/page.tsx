import PortalShell from '@/components/shared/PortalShell'
import { Metric, EmptyState } from '@/components/shared/DashboardBits'
import { prisma } from '@/lib/db/prisma'

export default async function QadDashboard() {
    let received = 0
    let dueSoon = 0
    let deficiencyReturns = 0
    let panelApproval = 0
    let approved = 0
    let total = 0
    const statusCounts: Record<string, number> = {}

    try {
        const [counts, activeCases] = await Promise.all([prisma.application.groupBy({
            by: ['status'],
            _count: { status: true }
        }), prisma.application.findMany({ where: { status: 'UNDER_SCRUTINY' }, select: { createdAt: true } })])

        counts.forEach(item => {
            const cnt = item._count.status
            total += cnt
            statusCounts[item.status] = cnt
            if (item.status === 'SUBMITTED') received += cnt
            else if (item.status === 'UNDER_SCRUTINY') panelApproval += 0
            else if (item.status === 'RETURNED') deficiencyReturns += cnt
            else if (item.status === 'PANEL_REVIEW') panelApproval += cnt
            else if (item.status === 'APPROVED') approved += cnt
        })
        const sevenDays = 7 * 24 * 60 * 60 * 1000
        dueSoon = activeCases.filter(item => { const remaining = new Date(item.createdAt).getTime() + 30 * 24 * 60 * 60 * 1000 - Date.now(); return remaining >= 0 && remaining <= sevenDays }).length
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
                {total === 0 ? <EmptyState title="QAD Scrutiny Workqueue" text="Submitted HEI dossiers will appear here. The system calculates completeness but an authorized QAD officer approves every routing decision." /> : <div className="grid gap-6 lg:grid-cols-5"><section className="card lg:col-span-3"><div className="flex items-baseline justify-between"><h2 className="font-semibold text-slate-900">Case pipeline</h2><span className="text-xs text-slate-500">{total} total cases</span></div><div className="mt-5 space-y-4">{Object.entries(statusCounts).map(([status, count]) => <div key={status}><div className="mb-1 flex justify-between text-xs font-medium text-slate-600"><span>{status.replaceAll('_', ' ')}</span><span>{count}</span></div><div className="h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-blue-600" style={{ width: `${Math.max((count / total) * 100, 3)}%` }} /></div></div>)}</div></section><section className="card lg:col-span-2"><h2 className="font-semibold text-slate-900">Decision health</h2><p className="mt-4 text-4xl font-bold text-emerald-600">{total ? Math.round((approved / total) * 100) : 0}%</p><p className="mt-1 text-sm text-slate-500">Approval rate across all registered cases</p><dl className="mt-5 space-y-2 text-sm"><div className="flex justify-between"><dt className="text-slate-500">In active review</dt><dd className="font-semibold">{dueSoon + panelApproval}</dd></div><div className="flex justify-between"><dt className="text-slate-500">HEI action required</dt><dd className="font-semibold">{deficiencyReturns}</dd></div></dl></section></div>}
            </div>
        </PortalShell>
    )
}
