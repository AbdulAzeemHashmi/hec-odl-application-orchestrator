'use client'

import { FormEvent, useEffect, useState } from 'react'
type Visit = { date: string; institution: string; venue: string; attendees: string }
const storageKey = 'hec-odl-visits'

export default function VisitScheduler() {
  const [visits, setVisits] = useState<Visit[]>([])
  useEffect(() => { try { setVisits(JSON.parse(localStorage.getItem(storageKey) || '[]')) } catch {} }, [])
  function schedule(event: FormEvent<HTMLFormElement>) { event.preventDefault(); const data = new FormData(event.currentTarget); const visit = Object.fromEntries(data) as Visit; const next = [...visits, visit].sort((a,b) => a.date.localeCompare(b.date)); setVisits(next); localStorage.setItem(storageKey, JSON.stringify(next)); event.currentTarget.reset() }
  return <div className="grid gap-6 lg:grid-cols-2"><form onSubmit={schedule} className="card space-y-4"><div><h2 className="font-semibold text-slate-900">Schedule a site inspection</h2><p className="mt-1 text-sm text-slate-500">Stored securely in this browser until shared scheduling is configured.</p></div><input required name="institution" placeholder="Institution / application" className="w-full rounded-lg border p-2.5 text-sm"/><input required name="date" type="datetime-local" className="w-full rounded-lg border p-2.5 text-sm"/><input required name="venue" placeholder="Venue" className="w-full rounded-lg border p-2.5 text-sm"/><input required name="attendees" placeholder="Panel members / attendees" className="w-full rounded-lg border p-2.5 text-sm"/><button className="btn-primary">Add inspection</button></form><div className="card"><h2 className="font-semibold text-slate-900">Upcoming inspections</h2>{!visits.length ? <p className="mt-3 text-sm text-slate-500">No inspections scheduled on this device.</p> : <div className="mt-3 space-y-3">{visits.map((visit, index) => <div className="rounded-lg border border-slate-200 p-3 text-sm" key={`${visit.date}-${index}`}><strong>{visit.institution}</strong><p className="mt-1 text-slate-600">{new Date(visit.date).toLocaleString()} · {visit.venue}</p><p className="mt-1 text-xs text-slate-500">{visit.attendees}</p></div>)}</div>}</div></div>
}
