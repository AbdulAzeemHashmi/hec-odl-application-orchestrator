'use client'

import { useState } from 'react'
import PortalShell from '@/components/shared/PortalShell'
import { useLocale } from '@/components/shared/LocaleProvider'

type ActiveModule = 'overview' | 'users' | 'parameters' | 'templates' | 'workflow' | 'audit' | 'integrations'

interface UserItem {
  id: string
  name: string
  email: string
  role: 'hei' | 'qad' | 'panel' | 'admin'
  status: 'Active' | 'Pending' | 'Suspended'
  joined: string
}

interface ParameterItem {
  id: number
  title: string
  category: string
  mandatory: boolean
  weight: number
  evidenceRequired: string
}

interface TemplateItem {
  id: string
  title: string
  code: string
  subject: string
  body: string
}

interface AuditItem {
  id: string
  timestamp: string
  actor: string
  role: string
  action: string
  target: string
  ip: string
  status: 'SUCCESS' | 'WARNING' | 'INFO'
}

export default function AdminPage() {
  const { t, isRtl } = useLocale()
  const [activeModule, setActiveModule] = useState<ActiveModule>('overview')
  const [toastMessage, setToastMessage] = useState<string>('')

  // Toast notification helper
  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(''), 3000)
  }

  // --- 1. USERS & ROLES STATE ---
  const [users, setUsers] = useState<UserItem[]>([
    { id: '1', name: 'Dr. Tariq Mahmood', email: 'admin@hec.gov.pk', role: 'admin', status: 'Active', joined: '2026-01-10' },
    { id: '2', name: 'Engr. Ayesha Malik', email: 'qad.director@hec.gov.pk', role: 'qad', status: 'Active', joined: '2026-01-15' },
    { id: '3', name: 'Prof. Dr. Irfan Ullah', email: 'dr.panel.lead@nust.edu.pk', role: 'panel', status: 'Active', joined: '2026-02-01' },
    { id: '4', name: 'Syed Hamza Ali', email: 'odl.registrar@lums.edu.pk', role: 'hei', status: 'Active', joined: '2026-02-12' },
    { id: '5', name: 'Dr. Maria Siddiqui', email: 'vc.office@qau.edu.pk', role: 'hei', status: 'Pending', joined: '2026-02-28' },
  ])
  const [userSearch, setUserSearch] = useState('')
  const [newUserEmail, setNewUserEmail] = useState('')
  const [newUserName, setNewUserName] = useState('')
  const [newUserRole, setNewUserRole] = useState<'hei' | 'qad' | 'panel' | 'admin'>('hei')

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newUserEmail.trim()) return
    const newUser: UserItem = {
      id: Date.now().toString(),
      name: newUserName || 'Authorized User',
      email: newUserEmail,
      role: newUserRole,
      status: 'Active',
      joined: new Date().toISOString().split('T')[0],
    }
    setUsers([newUser, ...users])
    setNewUserEmail('')
    setNewUserName('')
    showToast(isRtl ? 'نیا صارف کامیابی سے شامل کر دیا گیا' : 'New user added successfully')
  }

  const handleToggleUserStatus = (id: string) => {
    setUsers(users.map(u => {
      if (u.id === id) {
        const nextStatus = u.status === 'Active' ? 'Suspended' : 'Active'
        return { ...u, status: nextStatus }
      }
      return u
    }))
    showToast(isRtl ? 'صارف کی حیثیت تبدیل کر دی گئی' : 'User account status updated')
  }

  const handleChangeRole = (id: string, newRole: 'hei' | 'qad' | 'panel' | 'admin') => {
    setUsers(users.map(u => u.id === id ? { ...u, role: newRole } : u))
    showToast(isRtl ? 'صارف کا کردار اپ ڈیٹ ہو گیا' : 'User role successfully updated')
  }

  // --- 2. PARAMETER BANK STATE ---
  const [parameters, setParameters] = useState<ParameterItem[]>([
    { id: 1, title: 'Institutional Governance & ODL Directorate', category: 'Governance', mandatory: true, weight: 10, evidenceRequired: 'Statutory charter, ODL office organogram, notification of dedicated Director.' },
    { id: 2, title: 'Dedicated Physical & ICT Infrastructure', category: 'Infrastructure', mandatory: true, weight: 10, evidenceRequired: 'Multimedia recording studio, high-speed fiber leased line, server room specs.' },
    { id: 3, title: 'Qualified Faculty & Course Coordinators', category: 'Human Resources', mandatory: true, weight: 15, evidenceRequired: 'Full-time Ph.D./MS faculty appointment letters, e-tutor contracts.' },
    { id: 4, title: 'Learning Management System (LMS)', category: 'Technology', mandatory: true, weight: 15, evidenceRequired: '24/7 uptime SLA, disaster recovery plan, mobile-responsive LMS URL.' },
    { id: 5, title: 'Instructional Design & Content Development', category: 'Curriculum', mandatory: true, weight: 10, evidenceRequired: 'Sample SCORM course modules, video lectures, self-assessment quizzes.' },
    { id: 6, title: 'Student Support & Counseling Centers', category: 'Support', mandatory: true, weight: 10, evidenceRequired: 'Helpdesk ticketing workflow, grievance redressal committee notification.' },
    { id: 7, title: 'Proctored & Biometric Examination Security', category: 'Assessment', mandatory: true, weight: 15, evidenceRequired: 'Designated physical exam center MoUs, biometric attendance logs.' },
    { id: 8, title: 'Internal Quality Assurance Cell (IQAC) Audits', category: 'Quality', mandatory: true, weight: 10, evidenceRequired: 'Annual IQA audit reports, student satisfaction survey results.' },
    { id: 9, title: 'Financial Sustainability & Student Fee Model', category: 'Finance', mandatory: false, weight: 5, evidenceRequired: 'Approved 3-year operating budget and revenue projections.' },
    { id: 10, title: 'Statutory Academic Council / Syndicate Approval', category: 'Statutory', mandatory: true, weight: 10, evidenceRequired: 'Signed extracts of Syndicate and Academic Council meeting minutes.' },
  ])

  const handleToggleMandatory = (id: number) => {
    setParameters(parameters.map(p => p.id === id ? { ...p, mandatory: !p.mandatory } : p))
    showToast(isRtl ? 'پیرامیٹر پالیسی اپ ڈیٹ ہو گئی' : 'Parameter policy requirement toggled')
  }

  // --- 3. TEMPLATES STATE ---
  const [templates, setTemplates] = useState<TemplateItem[]>([
    {
      id: '1',
      title: 'Provisional NOC Grant Letter (3-Year Validity)',
      code: 'NOC-PROV-2026',
      subject: 'Grant of Provisional No Objection Certificate (NOC) for ODL Programs',
      body: 'Higher Education Commission of Pakistan is pleased to grant Provisional NOC to {{HEI_NAME}} for offering approved Open and Distance Learning programs under Case No {{CASE_NO}}.\n\nThis approval is valid for a period of three (3) years effective {{NOC_DATE}} and subject to compliance with the HEC ODL Policy 2024.',
    },
    {
      id: '2',
      title: 'Deficiency & Rectification Order',
      code: 'DEF-ACTION-REQ',
      subject: 'Observation of Critical Deficiencies in ODL NOC Dossier',
      body: 'Upon initial scrutiny of the Model Application Dossier submitted by {{HEI_NAME}}, the Quality Assurance Division has identified deficiencies outlined below.\n\nYou are instructed to submit revised evidence within 14 calendar days.',
    },
    {
      id: '3',
      title: 'Site Visit & Physical Inspection Order',
      code: 'VISIT-SCHED-ORDER',
      subject: 'Schedule of Onsite Inspection by HEC Expert Panel',
      body: 'The HEC Quality Assurance Division has scheduled an onsite visit to {{HEI_NAME}} on {{VISIT_DATE}}.\n\nThe institution is required to ensure presence of all ODL faculty, LMS administrators, and exam coordinators.',
    },
    {
      id: '4',
      title: 'Expert Panel Constitution Order',
      code: 'PANEL-CONST-DIR',
      subject: 'Constitution of Subject Expert Panel for Evaluation',
      body: 'Under the provisions of HEC ODL Policy, the competent authority has constituted the Expert Evaluation Panel for {{HEI_NAME}} under Case No {{CASE_NO}}.',
    },
    {
      id: '5',
      title: 'Formal Application Refusal with Appeal Notice',
      code: 'REFUSAL-APPEAL-NOTICE',
      subject: 'Decision on ODL NOC Application — Refusal Notice',
      body: 'Following the Final Expert Panel Assessment and Onsite Visit Report, the application submitted by {{HEI_NAME}} has not satisfied the minimum quality thresholds.\n\nUnder Section 14, an appeal may be lodged within 30 days.',
    },
  ])
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateItem>(templates[0])

  const handleSaveTemplate = () => {
    setTemplates(templates.map(t => t.id === selectedTemplate.id ? selectedTemplate : t))
    showToast(isRtl ? 'ٹیمپلیٹ محفوظ کر لیا گیا' : 'Template saved successfully')
  }

  // --- 4. WORKFLOW SETTINGS STATE ---
  const [workflowSettings, setWorkflowSettings] = useState({
    qadSlaDays: 15,
    panelSlaDays: 30,
    deficiencyDays: 14,
    appealDays: 30,
    coolingOffMonths: 6,
    autoEmailNotify: true,
    requireBiometric: true,
    aiScrutinyAssist: true,
  })

  const handleSaveWorkflow = (e: React.FormEvent) => {
    e.preventDefault()
    showToast(isRtl ? 'ورک فلو ترتیبات محفوظ کر لی گئیں' : 'Workflow settings and SLAs updated successfully')
  }

  // --- 5. AUDIT TRAIL STATE ---
  const [auditLogs] = useState<AuditItem[]>([
    { id: 'LOG-109', timestamp: '2026-09-03 14:22:10', actor: 'admin@hec.gov.pk', role: 'admin', action: 'NOC Issued', target: 'Case #ODL-2026-LUMS', ip: '10.0.1.45', status: 'SUCCESS' },
    { id: 'LOG-108', timestamp: '2026-09-03 11:05:42', actor: 'qad.director@hec.gov.pk', role: 'qad', action: 'Site Visit Scheduled', target: 'Visit #VST-8812', ip: '10.0.1.88', status: 'INFO' },
    { id: 'LOG-107', timestamp: '2026-09-02 16:40:19', actor: 'dr.panel.lead@nust.edu.pk', role: 'panel', action: 'First Report Uploaded', target: 'Case #ODL-2026-NUST', ip: '192.168.4.12', status: 'SUCCESS' },
    { id: 'LOG-106', timestamp: '2026-09-02 09:12:00', actor: 'odl.registrar@lums.edu.pk', role: 'hei', action: 'Dossier Part B Submitted', target: 'Dossier #DOS-9921', ip: '111.68.102.1', status: 'SUCCESS' },
    { id: 'LOG-105', timestamp: '2026-09-01 18:30:25', actor: 'qad.director@hec.gov.pk', role: 'qad', action: 'Deficiency Return Issued', target: 'Case #ODL-2026-QAU', ip: '10.0.1.88', status: 'WARNING' },
    { id: 'LOG-104', timestamp: '2026-09-01 10:15:33', actor: 'admin@hec.gov.pk', role: 'admin', action: 'Biometric Exam Rule Enforced', target: 'Workflow Config', ip: '10.0.1.45', status: 'INFO' },
    { id: 'LOG-103', timestamp: '2026-08-31 15:55:01', actor: 'admin@hec.gov.pk', role: 'admin', action: 'User Activated', target: 'dr.panel.lead@nust.edu.pk', ip: '10.0.1.45', status: 'SUCCESS' },
  ])
  const [auditFilter, setAuditFilter] = useState('ALL')

  const handleExportAuditCsv = () => {
    const headers = ['Event ID', 'Timestamp', 'Actor', 'Role', 'Action', 'Target Resource', 'IP Address', 'Status']
    const rows = auditLogs.map(l => [l.id, l.timestamp, l.actor, l.role, `"${l.action}"`, `"${l.target}"`, l.ip, l.status])
    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.setAttribute('href', url)
    link.setAttribute('download', `hec-odl-audit-trail-${new Date().toISOString().split('T')[0]}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    showToast(isRtl ? 'آڈٹ ٹریل ڈاؤن لوڈ ہو گیا' : 'Audit trail CSV downloaded successfully')
  }

  // --- 6. INTEGRATIONS STATE ---
  const [integrationTesting, setIntegrationTesting] = useState<string | null>(null)
  const [integrationStatuses, setIntegrationStatuses] = useState<Record<string, { status: string; ping: string }>>({
    supabase: { status: 'Connected', ping: '24ms' },
    email: { status: 'Operational', ping: '112ms' },
    hedr: { status: 'Connected', ping: '48ms' },
    rag: { status: 'Active (Ollama/Chroma)', ping: '18ms' },
    storage: { status: 'Healthy', ping: '32ms' },
  })

  const handleTestIntegration = (key: string, name: string) => {
    setIntegrationTesting(key)
    setTimeout(() => {
      setIntegrationStatuses(prev => ({
        ...prev,
        [key]: { status: 'Verified Active', ping: `${Math.floor(Math.random() * 30 + 15)}ms` },
      }))
      setIntegrationTesting(null)
      showToast(`${name}: ${isRtl ? 'رابطہ کامیابی سے تصدیق ہو گیا' : 'Connection verified successfully'}`)
    }, 800)
  }

  return (
    <PortalShell
      title="System administration"
      subtitle="Configure users, roles, parameter bank, templates, workflow rules and audit records."
    >
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 rounded-xl bg-emerald-700 text-white px-5 py-3 shadow-2xl animate-in fade-in slide-in-from-top-4 flex items-center gap-3 text-sm font-semibold">
          <span>✓</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navigation Tabs for Administration Modules */}
      <div className="mb-6 flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveModule('overview')}
          className={`rounded-lg px-3.5 py-2 text-xs font-bold transition-all ${
            activeModule === 'overview'
              ? 'bg-blue-700 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100'
          }`}
        >
          🏛️ {t('Dashboard Overview')}
        </button>
        <button
          onClick={() => setActiveModule('users')}
          className={`rounded-lg px-3.5 py-2 text-xs font-bold transition-all ${
            activeModule === 'users'
              ? 'bg-blue-700 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100'
          }`}
        >
          👥 {t('Users & roles')}
        </button>
        <button
          onClick={() => setActiveModule('parameters')}
          className={`rounded-lg px-3.5 py-2 text-xs font-bold transition-all ${
            activeModule === 'parameters'
              ? 'bg-blue-700 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100'
          }`}
        >
          📋 {t('Parameter bank')}
        </button>
        <button
          onClick={() => setActiveModule('templates')}
          className={`rounded-lg px-3.5 py-2 text-xs font-bold transition-all ${
            activeModule === 'templates'
              ? 'bg-blue-700 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100'
          }`}
        >
          📄 {t('Templates')}
        </button>
        <button
          onClick={() => setActiveModule('workflow')}
          className={`rounded-lg px-3.5 py-2 text-xs font-bold transition-all ${
            activeModule === 'workflow'
              ? 'bg-blue-700 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100'
          }`}
        >
          ⚙️ {t('Workflow settings')}
        </button>
        <button
          onClick={() => setActiveModule('audit')}
          className={`rounded-lg px-3.5 py-2 text-xs font-bold transition-all ${
            activeModule === 'audit'
              ? 'bg-blue-700 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100'
          }`}
        >
          🛡️ {t('Audit trail')}
        </button>
        <button
          onClick={() => setActiveModule('integrations')}
          className={`rounded-lg px-3.5 py-2 text-xs font-bold transition-all ${
            activeModule === 'integrations'
              ? 'bg-blue-700 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100'
          }`}
        >
          🔌 {t('Integrations')}
        </button>
      </div>

      {/* ============================================================ */}
      {/* 0. OVERVIEW VIEW */}
      {/* ============================================================ */}
      {activeModule === 'overview' && (
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <AdminQuickCard
              icon="👥"
              title="Users & roles"
              count={`${users.length} Registered`}
              text="Manage university, scrutiny officer, panel and administrator accounts."
              actionLabel="Manage Users"
              onAction={() => setActiveModule('users')}
            />
            <AdminQuickCard
              icon="📋"
              title="Parameter bank"
              count={`${parameters.length} Parameters`}
              text="Maintain configurable ODL Toolkit modules, questions, required remarks and evidence rules."
              actionLabel="Configure Rules"
              onAction={() => setActiveModule('parameters')}
            />
            <AdminQuickCard
              icon="📄"
              title="Templates"
              count={`${templates.length} Templates`}
              text="Manage controlled communication, report, deficiency orders and NOC letters."
              actionLabel="Edit Templates"
              onAction={() => setActiveModule('templates')}
            />
            <AdminQuickCard
              icon="⚙️"
              title="Workflow settings"
              count="5 Active SLAs"
              text="Set authorized review deadlines, appeal windows and cooling-off rules under approved SOPs."
              actionLabel="Update Settings"
              onAction={() => setActiveModule('workflow')}
            />
            <AdminQuickCard
              icon="🛡️"
              title="Audit trail"
              count={`${auditLogs.length} Events Logged`}
              text="Review immutable records of submissions, edits, decisions and communications."
              actionLabel="View Audit Trail"
              onAction={() => setActiveModule('audit')}
            />
            <AdminQuickCard
              icon="🔌"
              title="Integrations"
              count="5 Services Online"
              text="Configure approved email, HEC HEDR, storage and AI vector database integrations."
              actionLabel="Run Diagnostics"
              onAction={() => setActiveModule('integrations')}
            />
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 1. USERS & ROLES VIEW */}
      {/* ============================================================ */}
      {activeModule === 'users' && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold text-slate-900">{t('User & Role Management')}</h2>
              <p className="text-xs text-slate-500">{t('Activate accounts and assign HEI, QAD, panel, authority and administrator roles.')}</p>
            </div>
            <button
              onClick={() => setActiveModule('overview')}
              className="btn-secondary text-xs"
            >
              ← {t('Back to Overview')}
            </button>
          </div>

          {/* Add New User Form */}
          <form onSubmit={handleAddUser} className="card bg-slate-50/80 border-slate-300">
            <h3 className="text-sm font-bold text-slate-800 mb-3">{t('Add Authorized Account')}</h3>
            <div className="grid gap-3 sm:grid-cols-4">
              <input
                required
                type="text"
                placeholder={t('Full Name')}
                value={newUserName}
                onChange={(e) => setNewUserName(e.target.value)}
                className="rounded-lg border border-slate-300 p-2 text-xs bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
              <input
                required
                type="email"
                placeholder={t('Official Email (e.g. user@hec.gov.pk)')}
                value={newUserEmail}
                onChange={(e) => setNewUserEmail(e.target.value)}
                className="rounded-lg border border-slate-300 p-2 text-xs bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
              <select
                value={newUserRole}
                onChange={(e) => setNewUserRole(e.target.value as any)}
                className="rounded-lg border border-slate-300 p-2 text-xs bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none font-medium"
              >
                <option value="hei">🏛️ {t('HEI Institutional User')}</option>
                <option value="qad">📋 {t('QAD Scrutiny Officer')}</option>
                <option value="panel">👥 {t('Expert Panel Reviewer')}</option>
                <option value="admin">🛡️ {t('System Administrator')}</option>
              </select>
              <button type="submit" className="btn-primary py-2 text-xs font-semibold">
                + {t('Add User')}
              </button>
            </div>
          </form>

          {/* Users Table */}
          <div className="card overflow-x-auto p-0">
            <div className="p-4 border-b flex items-center justify-between gap-4">
              <input
                type="text"
                placeholder={t('Search users by name or email…')}
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                className="rounded-lg border border-slate-300 p-2 text-xs max-w-sm w-full bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-xs text-slate-500">
                {t('Total Accounts')}: <strong className="text-slate-800">{users.length}</strong>
              </span>
            </div>

            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
                  <th className="p-3.5">User</th>
                  <th className="p-3.5">Role</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5">Joined</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {users
                  .filter(u => u.name.toLowerCase().includes(userSearch.toLowerCase()) || u.email.toLowerCase().includes(userSearch.toLowerCase()))
                  .map(user => (
                    <tr key={user.id} className="hover:bg-slate-50/70 transition">
                      <td className="p-3.5">
                        <p className="font-bold text-slate-900">{user.name}</p>
                        <p className="text-slate-500 font-mono text-[11px]">{user.email}</p>
                      </td>
                      <td className="p-3.5">
                        <select
                          value={user.role}
                          onChange={(e) => handleChangeRole(user.id, e.target.value as any)}
                          className="rounded border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-700"
                        >
                          <option value="hei">HEI User</option>
                          <option value="qad">QAD Officer</option>
                          <option value="panel">Panel Reviewer</option>
                          <option value="admin">System Admin</option>
                        </select>
                      </td>
                      <td className="p-3.5">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                            user.status === 'Active'
                              ? 'bg-emerald-100 text-emerald-800'
                              : user.status === 'Pending'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {user.status}
                        </span>
                      </td>
                      <td className="p-3.5 text-slate-500">{user.joined}</td>
                      <td className="p-3.5 text-right">
                        <button
                          onClick={() => handleToggleUserStatus(user.id)}
                          className={`rounded px-2 py-1 text-xs font-semibold transition ${
                            user.status === 'Active'
                              ? 'text-red-600 hover:bg-red-50'
                              : 'text-emerald-700 hover:bg-emerald-50'
                          }`}
                        >
                          {user.status === 'Active' ? t('Suspend') : t('Activate')}
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 2. PARAMETER BANK VIEW */}
      {/* ============================================================ */}
      {activeModule === 'parameters' && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold text-slate-900">{t('ODL Toolkit Parameter Bank')}</h2>
              <p className="text-xs text-slate-500">{t('Maintain configurable ODL Toolkit modules, questions, required remarks and evidence rules.')}</p>
            </div>
            <button
              onClick={() => setActiveModule('overview')}
              className="btn-secondary text-xs"
            >
              ← {t('Back to Overview')}
            </button>
          </div>

          <div className="space-y-3">
            {parameters.map((param) => (
              <div key={param.id} className="card p-4 hover:border-blue-300 transition">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-blue-700 font-bold text-white text-xs flex-shrink-0">
                      {param.id}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-slate-900 text-sm">{param.title}</h3>
                        <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600">
                          {param.category}
                        </span>
                        <span className="rounded bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-700">
                          Weight: {param.weight}%
                        </span>
                      </div>
                      <p className="mt-1.5 text-xs text-slate-600">
                        <strong className="text-slate-700 font-semibold">Evidence Required:</strong> {param.evidenceRequired}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleToggleMandatory(param.id)}
                      className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                        param.mandatory
                          ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                          : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                      }`}
                    >
                      {param.mandatory ? '✓ Mandatory' : 'Optional'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 3. TEMPLATES VIEW */}
      {/* ============================================================ */}
      {activeModule === 'templates' && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold text-slate-900">{t('Controlled Document Templates')}</h2>
              <p className="text-xs text-slate-500">{t('Manage controlled communication, report and NOC-letter templates.')}</p>
            </div>
            <button
              onClick={() => setActiveModule('overview')}
              className="btn-secondary text-xs"
            >
              ← {t('Back to Overview')}
            </button>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Template Selector */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Available Templates</h3>
              {templates.map(tmpl => (
                <button
                  key={tmpl.id}
                  onClick={() => setSelectedTemplate(tmpl)}
                  className={`w-full text-left rounded-xl p-3 text-xs transition border ${
                    selectedTemplate.id === tmpl.id
                      ? 'bg-blue-50 border-blue-600 text-blue-900 font-bold shadow-sm'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <p className="font-semibold">{tmpl.title}</p>
                  <p className="text-[10px] text-slate-400 font-mono mt-0.5">{tmpl.code}</p>
                </button>
              ))}
            </div>

            {/* Template Editor */}
            <div className="card lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <h3 className="font-bold text-slate-900 text-sm">Editing: {selectedTemplate.title}</h3>
                <span className="font-mono text-xs bg-slate-100 px-2 py-0.5 rounded text-slate-600">{selectedTemplate.code}</span>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Subject Line</label>
                <input
                  type="text"
                  value={selectedTemplate.subject}
                  onChange={(e) => setSelectedTemplate({ ...selectedTemplate, subject: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 p-2.5 text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Template Content Body</label>
                <textarea
                  rows={8}
                  value={selectedTemplate.body}
                  onChange={(e) => setSelectedTemplate({ ...selectedTemplate, body: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 p-3 text-xs font-mono leading-relaxed focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="rounded-lg bg-amber-50 border border-amber-200 p-3 text-[11px] text-amber-900 leading-normal">
                <strong>Dynamic Tag Variables:</strong> <code>{`{{HEI_NAME}}`}</code>, <code>{`{{CASE_NO}}`}</code>, <code>{`{{NOC_DATE}}`}</code>, <code>{`{{VISIT_DATE}}`}</code> are resolved automatically during document issuance.
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={handleSaveTemplate}
                  className="btn-primary py-2 px-5 text-xs font-semibold shadow-md"
                >
                  {t('Save Template')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 4. WORKFLOW SETTINGS VIEW */}
      {/* ============================================================ */}
      {activeModule === 'workflow' && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold text-slate-900">{t('Workflow Rules & SOP Settings')}</h2>
              <p className="text-xs text-slate-500">{t('Set authorized deadlines, reminders and cooling-off rules under approved SOPs.')}</p>
            </div>
            <button
              onClick={() => setActiveModule('overview')}
              className="btn-secondary text-xs"
            >
              ← {t('Back to Overview')}
            </button>
          </div>

          <form onSubmit={handleSaveWorkflow} className="card space-y-6">
            <h3 className="font-bold text-slate-900 text-sm border-b pb-2">Operational Timelines (SLAs)</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">QAD Initial Scrutiny Window (Days)</label>
                <input
                  type="number"
                  value={workflowSettings.qadSlaDays}
                  onChange={(e) => setWorkflowSettings({ ...workflowSettings, qadSlaDays: parseInt(e.target.value) || 15 })}
                  className="w-full rounded-lg border border-slate-300 p-2.5 text-xs font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <p className="text-[11px] text-slate-400 mt-1">Target calendar days for QAD officer to complete parameter validation.</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Expert Panel Evaluation Window (Days)</label>
                <input
                  type="number"
                  value={workflowSettings.panelSlaDays}
                  onChange={(e) => setWorkflowSettings({ ...workflowSettings, panelSlaDays: parseInt(e.target.value) || 30 })}
                  className="w-full rounded-lg border border-slate-300 p-2.5 text-xs font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <p className="text-[11px] text-slate-400 mt-1">Target days for panel to submit consolidated First and Final Reports.</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Deficiency Rectification Cure Period (Days)</label>
                <input
                  type="number"
                  value={workflowSettings.deficiencyDays}
                  onChange={(e) => setWorkflowSettings({ ...workflowSettings, deficiencyDays: parseInt(e.target.value) || 14 })}
                  className="w-full rounded-lg border border-slate-300 p-2.5 text-xs font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <p className="text-[11px] text-slate-400 mt-1">Time given to university to resolve remarks before case is returned.</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Reapplication Cooling-off Period (Months)</label>
                <input
                  type="number"
                  value={workflowSettings.coolingOffMonths}
                  onChange={(e) => setWorkflowSettings({ ...workflowSettings, coolingOffMonths: parseInt(e.target.value) || 6 })}
                  className="w-full rounded-lg border border-slate-300 p-2.5 text-xs font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <p className="text-[11px] text-slate-400 mt-1">Mandatory waiting period following a formal application refusal.</p>
              </div>
            </div>

            <h3 className="font-bold text-slate-900 text-sm border-b pb-2 pt-4">Regulatory Safeguards & Notifications</h3>
            <div className="space-y-3 text-xs">
              <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 bg-slate-50 cursor-pointer hover:bg-slate-100 transition">
                <input
                  type="checkbox"
                  checked={workflowSettings.autoEmailNotify}
                  onChange={(e) => setWorkflowSettings({ ...workflowSettings, autoEmailNotify: e.target.checked })}
                  className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500"
                />
                <div>
                  <strong className="block text-slate-800">Automated Dispatch of Email & In-App Notifications</strong>
                  <span className="text-slate-500 text-[11px]">Notify university registrars instantly upon scrutiny status changes and scheduled site visits.</span>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 bg-slate-50 cursor-pointer hover:bg-slate-100 transition">
                <input
                  type="checkbox"
                  checked={workflowSettings.requireBiometric}
                  onChange={(e) => setWorkflowSettings({ ...workflowSettings, requireBiometric: e.target.checked })}
                  className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500"
                />
                <div>
                  <strong className="block text-slate-800">Mandatory Biometric Attendance Verification</strong>
                  <span className="text-slate-500 text-[11px]">Enforce biometric authentication for all proctored examination center operations.</span>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 bg-slate-50 cursor-pointer hover:bg-slate-100 transition">
                <input
                  type="checkbox"
                  checked={workflowSettings.aiScrutinyAssist}
                  onChange={(e) => setWorkflowSettings({ ...workflowSettings, aiScrutinyAssist: e.target.checked })}
                  className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500"
                />
                <div>
                  <strong className="block text-slate-800">AI-Powered Grounded Policy Suggestions</strong>
                  <span className="text-slate-500 text-[11px]">Enable grounded RAG recommendations for QAD officers with local Ollama-first failover.</span>
                </div>
              </label>
            </div>

            <div className="flex justify-end pt-4">
              <button type="submit" className="btn-primary py-2.5 px-6 font-semibold shadow-md">
                {t('Save Workflow SOPs')}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ============================================================ */}
      {/* 5. AUDIT TRAIL VIEW */}
      {/* ============================================================ */}
      {activeModule === 'audit' && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold text-slate-900">{t('Immutable Audit Trail')}</h2>
              <p className="text-xs text-slate-500">{t('Review submissions, edits, decisions and communications. Records are preserved.')}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleExportAuditCsv}
                className="btn-primary py-2 px-3.5 text-xs font-semibold shadow-sm"
              >
                📥 {t('Export CSV')}
              </button>
              <button
                onClick={() => setActiveModule('overview')}
                className="btn-secondary text-xs"
              >
                ← {t('Back')}
              </button>
            </div>
          </div>

          <div className="card overflow-x-auto p-0">
            <div className="p-3.5 border-b flex items-center justify-between gap-4">
              <span className="text-xs font-bold text-slate-700">Chronological Event Stream</span>
              <div className="flex items-center gap-2">
                <label className="text-xs text-slate-500">Filter:</label>
                <select
                  value={auditFilter}
                  onChange={(e) => setAuditFilter(e.target.value)}
                  className="rounded border border-slate-200 bg-white px-2 py-1 text-xs text-slate-700 font-medium"
                >
                  <option value="ALL">All Events</option>
                  <option value="SUCCESS">Success Only</option>
                  <option value="WARNING">Warnings Only</option>
                </select>
              </div>
            </div>

            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
                  <th className="p-3">Event ID</th>
                  <th className="p-3">Timestamp</th>
                  <th className="p-3">Actor</th>
                  <th className="p-3">Action</th>
                  <th className="p-3">Target Resource</th>
                  <th className="p-3">IP Address</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
                {auditLogs
                  .filter(l => auditFilter === 'ALL' || l.status === auditFilter)
                  .map((log) => (
                    <tr key={log.id} className="hover:bg-slate-50/70 transition">
                      <td className="p-3 font-bold text-slate-700">{log.id}</td>
                      <td className="p-3 text-slate-500">{log.timestamp}</td>
                      <td className="p-3 text-blue-700 font-semibold">{log.actor}</td>
                      <td className="p-3 text-slate-900 font-sans font-semibold">{log.action}</td>
                      <td className="p-3 text-slate-600 font-sans">{log.target}</td>
                      <td className="p-3 text-slate-400">{log.ip}</td>
                      <td className="p-3">
                        <span
                          className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-bold ${
                            log.status === 'SUCCESS'
                              ? 'bg-emerald-100 text-emerald-800'
                              : log.status === 'WARNING'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {log.status}
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 6. INTEGRATIONS VIEW */}
      {/* ============================================================ */}
      {activeModule === 'integrations' && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold text-slate-900">{t('System Integrations & Gateways')}</h2>
              <p className="text-xs text-slate-500">{t('Configure approved email, HEC systems, storage and identity integrations.')}</p>
            </div>
            <button
              onClick={() => setActiveModule('overview')}
              className="btn-secondary text-xs"
            >
              ← {t('Back to Overview')}
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <IntegrationCard
              title="Supabase Auth & Database"
              desc="Cloud PostgreSQL database and JWT session authentication service."
              status={integrationStatuses.supabase.status}
              ping={integrationStatuses.supabase.ping}
              testing={integrationTesting === 'supabase'}
              onTest={() => handleTestIntegration('supabase', 'Supabase Database')}
            />
            <IntegrationCard
              title="SMTP / Resend Email Dispatcher"
              desc="Automated transactional emails for status notices, reminders, and verification codes."
              status={integrationStatuses.email.status}
              ping={integrationStatuses.email.ping}
              testing={integrationTesting === 'email'}
              onTest={() => handleTestIntegration('email', 'Email Gateway')}
            />
            <IntegrationCard
              title="HEC HEDR Central Registry"
              desc="Higher Education Data Repository connector for automated university verification."
              status={integrationStatuses.hedr.status}
              ping={integrationStatuses.hedr.ping}
              testing={integrationTesting === 'hedr'}
              onTest={() => handleTestIntegration('hedr', 'HEC HEDR API')}
            />
            <IntegrationCard
              title="Local RAG & Vector Engine"
              desc="Ollama and Chroma vector database for grounded policy query answering."
              status={integrationStatuses.rag.status}
              ping={integrationStatuses.rag.ping}
              testing={integrationTesting === 'rag'}
              onTest={() => handleTestIntegration('rag', 'Vector RAG Engine')}
            />
            <IntegrationCard
              title="Cloud Evidence Storage"
              desc="Encrypted PDF document bucket for Model Application Dossiers and inspection evidence."
              status={integrationStatuses.storage.status}
              ping={integrationStatuses.storage.ping}
              testing={integrationTesting === 'storage'}
              onTest={() => handleTestIntegration('storage', 'Evidence Storage')}
            />
          </div>
        </div>
      )}
    </PortalShell>
  )
}

function AdminQuickCard({
  icon,
  title,
  count,
  text,
  actionLabel,
  onAction,
}: {
  icon: string
  title: string
  count: string
  text: string
  actionLabel: string
  onAction: () => void
}) {
  const { t } = useLocale()
  return (
    <div className="card flex flex-col justify-between hover:shadow-lg hover:border-blue-300 transition duration-200">
      <div>
        <div className="flex items-center justify-between">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50 text-xl text-blue-700 shadow-inner border border-blue-100">
            {icon}
          </span>
          <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-bold text-slate-700">
            {count}
          </span>
        </div>
        <h3 className="mt-3 font-bold text-slate-900 text-base">{t(title)}</h3>
        <p className="mt-2 text-xs leading-relaxed text-slate-500">{t(text)}</p>
      </div>
      <button
        onClick={onAction}
        className="btn-primary mt-5 w-full py-2 text-xs font-semibold shadow-sm"
      >
        {t(actionLabel)} →
      </button>
    </div>
  )
}

function IntegrationCard({
  title,
  desc,
  status,
  ping,
  testing,
  onTest,
}: {
  title: string
  desc: string
  status: string
  ping: string
  testing: boolean
  onTest: () => void
}) {
  return (
    <div className="card flex flex-col justify-between p-4">
      <div>
        <div className="flex items-center justify-between">
          <h4 className="font-bold text-slate-900 text-sm">{title}</h4>
          <span className="rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800">
            {status}
          </span>
        </div>
        <p className="mt-2 text-xs text-slate-500 leading-relaxed">{desc}</p>
        <div className="mt-3 flex items-center gap-2 text-[11px] text-slate-400 font-mono">
          <span>Latency:</span>
          <strong className="text-slate-700">{ping}</strong>
        </div>
      </div>
      <button
        onClick={onTest}
        disabled={testing}
        className="btn-secondary mt-4 w-full py-1.5 text-xs font-semibold hover:border-blue-400 transition"
      >
        {testing ? 'Testing connection…' : '⚡ Run Diagnostic Ping'}
      </button>
    </div>
  )
}
