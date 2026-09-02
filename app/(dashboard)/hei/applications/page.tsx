'use client'

import Link from 'next/link'
import PortalShell from '@/components/shared/PortalShell'
import { EmptyState } from '@/components/shared/DashboardBits'
import { useLocale } from '@/components/shared/LocaleProvider'

export default function ApplicationsPage() {
  const { t } = useLocale()
  return (
    <PortalShell
      title="My applications"
      subtitle="Drafts, submitted dossiers, deficiency returns and decisions."
    >
      <div className="card overflow-hidden">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b pb-4">
          <h2 className="font-semibold text-slate-900">{t('Application register')}</h2>
          <Link href="/hei/applications/new" className="btn-primary self-start sm:self-auto whitespace-nowrap">
            {t('New application')}
          </Link>
        </div>
        <EmptyState
          title="Your application register is empty"
          text="Once you submit a dossier it will appear here with its case number, stage, due date and all communications."
        />
      </div>
    </PortalShell>
  )
}
