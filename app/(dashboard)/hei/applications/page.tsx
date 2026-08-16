import Link from 'next/link'
import PortalShell from '@/components/shared/PortalShell'
import { EmptyState } from '@/components/shared/DashboardBits'
export default function ApplicationsPage() { return <PortalShell title="My applications" subtitle="Drafts, submitted dossiers, deficiency returns and decisions."><div className="card overflow-hidden"><div className="flex items-center justify-between border-b pb-4"><h2 className="font-semibold">Application register</h2><Link href="/hei/applications/new" className="btn-primary">New application</Link></div><EmptyState title="Your application register is empty" text="Once you submit a dossier it will appear here with its case number, stage, due date and all communications." /></div></PortalShell> }
