'use client'

import PortalShell from '@/components/shared/PortalShell'
import { useLocale } from '@/components/shared/LocaleProvider'

export default function AdminPage() {
  return (
    <PortalShell
      title="System administration"
      subtitle="Configure users, roles, parameter bank, templates, workflow rules and audit records."
    >
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        <AdminCard
          icon="👥"
          title="Users & roles"
          text="Activate accounts and assign HEI, QAD, panel, authority and administrator roles."
        />
        <AdminCard
          icon="📋"
          title="Parameter bank"
          text="Maintain configurable ODL Toolkit modules, questions, required remarks and evidence rules."
        />
        <AdminCard
          icon="📄"
          title="Templates"
          text="Manage controlled communication, report and NOC-letter templates."
        />
        <AdminCard
          icon="⚙️"
          title="Workflow settings"
          text="Set authorized deadlines, reminders and cooling-off rules under approved SOPs."
        />
        <AdminCard
          icon="🛡️"
          title="Audit trail"
          text="Review submissions, edits, decisions and communications. Records are preserved."
        />
        <AdminCard
          icon="🔌"
          title="Integrations"
          text="Configure approved email, HEC systems, storage and identity integrations."
        />
      </div>
    </PortalShell>
  )
}

function AdminCard({ icon, title, text }: { icon: string; title: string; text: string }) {
  const { t } = useLocale()
  return (
    <div className="card flex flex-col justify-between hover:shadow-md transition">
      <div>
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-blue-50 text-xl text-blue-700">
            {icon}
          </span>
          <h2 className="font-semibold text-slate-900">{t(title)}</h2>
        </div>
        <p className="mt-3 text-sm leading-6 text-slate-500">{t(text)}</p>
      </div>
      <button className="btn-secondary mt-6 w-full text-xs font-semibold text-slate-400 bg-slate-50 cursor-not-allowed" disabled>
        {t('Requires administrator access')}
      </button>
    </div>
  )
}
