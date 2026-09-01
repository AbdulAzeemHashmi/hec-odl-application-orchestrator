'use client'

import { FormEvent, useEffect, useState } from 'react'
type Application = { id: string; data: { institutionName?: string; heiName?: string } }
type Visit = { id: string; scheduledFor: string; venue: string; attendees: string[]; status: string; notes?: string; application: Application }

export default function VisitScheduler() {
  const [visits, setVisits] = useState<Visit[]>([])
  const [applications, setApplications] = useState<Application[]>([])
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)
  async function load() {
    const [visitResponse, appResponse] = await Promise.all([fetch('/api/visits'), fetch('/api/applications')])
    if (visitResponse.ok) setVisits(await visitResponse.json()); else setError('Visits could not be loaded.')
    if (appResponse.ok) setApplications(await appResponse.json())
  }
  useEffect(() => { load().catch(() => setError('Visits could not be loaded.')) }, [])
  async function schedule(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setSaving(true); setError('')
    const data = new FormData(event.currentTarget)
    const response = await fetch('/api/visits', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ applicationId: data.get('applicationId'), scheduledFor: data.get('scheduledFor'), venue: data.get('venue'), attendees: String(data.get('attendees')).split(',').map(x => x.trim()).filter(Boolean), notes: data.get('notes') }) })
    setSaving(false)
    if (!response.ok) { setError((await response.json()).error || 'Visit could not be scheduled.'); return }
    event.currentTarget.reset(); await load()
  }
  async function cancel(id: string) { const response = await fetch(`/api/visits/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status: 'CANCELLED' }) }); if (response.ok) await load(); else setError('Visit could not be cancelled.') }
  const label = (application: Application) => application.data?.institutionName || application.data?.heiName || `Application ${application.id.slice(-8)}`
  return <div className="grid gap-6 lg:grid-cols-2"><form onSubmit={schedule} className="card space-y-4"><div><h2 className="font-semibold text-slate-900">Schedule a site inspection</h2><p className="mt-1 text-sm text-slate-500">Visits are shared with authorized case users and retained in the case audit record.</p></div><select required name="applicationId" className="w-full rounded-lg border p-2.5 text-sm" defaultValue=""><option value="" disabled>Select application</option>{applications.map(application => <option key={application.id} value={application.id}>{label(application)}</option>)}</select><input required name="scheduledFor" type="datetime-local" className="w-full rounded-lg border p-2.5 text-sm"/><input required name="venue" placeholder="Venue" className="w-full rounded-lg border p-2.5 text-sm"/><input name="attendees" placeholder="Panel members / attendees (comma separated)" className="w-full rounded-lg border p-2.5 text-sm"/><textarea name="notes" placeholder="Visit notes or agenda" className="min-h-20 w-full rounded-lg border p-2.5 text-sm"/><button className="btn-primary" disabled={saving}>{saving ? 'Saving…' : 'Schedule inspection'}</button>{error && <p className="text-sm text-red-700">{error}</p>}</form><div className="card"><h2 className="font-semibold text-slate-900">Upcoming inspections</h2>{!visits.length ? <p className="mt-3 text-sm text-slate-500">No authorized inspections are scheduled.</p> : <div className="mt-3 space-y-3">{visits.map(visit => <div className="rounded-lg border border-slate-200 p-3 text-sm" key={visit.id}><div className="flex items-start justify-between gap-3"><strong>{label(visit.application)}</strong><span className="status bg-slate-100 text-slate-700">{visit.status}</span></div><p className="mt-1 text-slate-600">{new Date(visit.scheduledFor).toLocaleString()} · {visit.venue}</p>{visit.attendees.length > 0 && <p className="mt-1 text-xs text-slate-500">{visit.attendees.join(', ')}</p>}{visit.notes && <p className="mt-2 text-xs text-slate-500">{visit.notes}</p>}{visit.status === 'SCHEDULED' && <button type="button" onClick={() => cancel(visit.id)} className="mt-3 text-xs font-semibold text-red-700">Cancel visit</button>}</div>)}</div>}</div></div>
}
