import PortalShell from '@/components/shared/PortalShell'
import { EmptyState } from '@/components/shared/DashboardBits'
import VisitScheduler from '@/components/shared/VisitScheduler'
export default function VisitsPage() { return <PortalShell title="Onsite visits & revisits" subtitle="Schedule assessments, complete electronic checklists and upload authorized visit evidence."><VisitScheduler /><div className="card mt-6"><h2 className="font-semibold">Visit checklist</h2><p className="mt-2 text-sm leading-6 text-slate-500">Checklist items connect directly to dossier parameters so observations and evidence remain part of the case record.</p></div></PortalShell> }
