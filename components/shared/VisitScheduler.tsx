'use client'

import { FormEvent, useEffect, useState } from 'react'
import { downloadIcsFile, getGoogleCalendarUrl } from '@/lib/utils/ics'
import { useLocale } from './LocaleProvider'

type Application = {
  id: string
  data: { institutionName?: string; heiName?: string }
}

type Visit = {
  id: string
  scheduledFor: string
  venue: string
  attendees: string[]
  status: string
  notes?: string
  application: Application
}

export default function VisitScheduler() {
  const [visits, setVisits] = useState<Visit[]>([])
  const [applications, setApplications] = useState<Application[]>([])
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)
  const { t, isRtl } = useLocale()

  async function load() {
    try {
      const [visitResponse, appResponse] = await Promise.all([
        fetch('/api/visits'),
        fetch('/api/applications'),
      ])
      if (visitResponse.ok) {
        const vData = await visitResponse.json()
        setVisits(Array.isArray(vData) ? vData : [])
      } else {
        setVisits([])
      }

      if (appResponse.ok) {
        const aData = await appResponse.json()
        setApplications(Array.isArray(aData) ? aData : [])
      }
    } catch {
      // Graceful fallback for demo or uninitialized DB
      setVisits([])
    }
  }

  useEffect(() => {
    load()
  }, [])

  async function schedule(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSaving(true)
    setError('')
    const data = new FormData(event.currentTarget)
    // Combine separate date + time fields into a single ISO datetime string
    const visitDate = String(data.get('visitDate') || '')
    const visitTime = String(data.get('visitTime') || '00:00')
    const scheduledFor = visitDate && visitTime ? `${visitDate}T${visitTime}` : ''
    try {
      const response = await fetch('/api/visits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          applicationId: data.get('applicationId'),
          scheduledFor,
          venue: data.get('venue'),
          attendees: String(data.get('attendees'))
            .split(',')
            .map((x) => x.trim())
            .filter(Boolean),
          notes: data.get('notes'),
        }),
      })
      setSaving(false)
      if (!response.ok) {
        const errJson = await response.json().catch(() => ({}))
        setError(errJson.error || 'Visit could not be scheduled. Case manager authorization required.')
        return
      }
      event.currentTarget.reset()
      await load()
    } catch (err: any) {
      setSaving(false)
      setError(err?.message || 'Network error scheduling visit.')
    }
  }

  async function cancel(id: string) {
    try {
      const response = await fetch(`/api/visits/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'CANCELLED' }),
      })
      if (response.ok) await load()
      else setError('Visit status could not be updated.')
    } catch {
      setError('Visit status could not be updated.')
    }
  }

  const label = (application: Application) =>
    application?.data?.institutionName ||
    application?.data?.heiName ||
    `Application ${application?.id?.slice(-8)}`

  return (
    <div className="grid gap-6 lg:grid-cols-2" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Schedule Form */}
      <form onSubmit={schedule} className="card space-y-4">
        <div>
          <h2 className="font-bold text-slate-900 text-lg">{t('Schedule a site inspection')}</h2>
          <p className="mt-1 text-sm text-slate-500 leading-relaxed">
            {t(
              'Visits are shared with authorized case users and retained in the case audit record.'
            )}
          </p>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">
            {t('Select application:')}
          </label>
          <select
            required
            name="applicationId"
            className="w-full rounded-lg border border-slate-300 p-2.5 text-sm bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
            defaultValue=""
          >
            <option value="" disabled>
              {t('Select application')}
            </option>
            {applications.map((application) => (
              <option key={application.id} value={application.id}>
                {label(application)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase text-slate-500 mb-2">
            {t('Inspection Visit Date & Time:')}
          </label>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-medium text-slate-400 mb-1">
                {isRtl ? 'تاریخ' : 'Date'}
              </label>
              <input
                required
                name="visitDate"
                type="date"
                className="w-full rounded-lg border border-slate-300 p-2.5 text-sm bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none text-slate-900"
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-slate-400 mb-1">
                {isRtl ? 'وقت' : 'Time'}
              </label>
              <input
                required
                name="visitTime"
                type="text"
                pattern="[0-2][0-9]:[0-5][0-9]:[0-5][0-9]"
                placeholder="--:--:--"
                maxLength={8}
                className="w-full rounded-lg border border-slate-300 p-2.5 text-sm bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none text-slate-900 font-mono tracking-wider"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">
            {t('Venue:')}
          </label>
          <input
            required
            name="venue"
            placeholder={t('Venue')}
            className="w-full rounded-lg border border-slate-300 p-2.5 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">
            {t('Panel members / attendees:')}
          </label>
          <input
            name="attendees"
            placeholder={t('Panel members / attendees (comma separated)')}
            className="w-full rounded-lg border border-slate-300 p-2.5 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">
            {t('Visit notes or agenda:')}
          </label>
          <textarea
            name="notes"
            placeholder={t('Visit notes or agenda')}
            className="min-h-20 w-full rounded-lg border border-slate-300 p-2.5 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
          />
        </div>

        <button
          className="btn-primary w-full py-2.5 font-semibold shadow-md"
          disabled={saving}
        >
          {saving ? t('Saving…') : t('Schedule inspection')}
        </button>

        {error && (
          <div className="rounded-lg bg-red-50 p-3 text-xs text-red-700 border border-red-200">
            {error}
          </div>
        )}
      </form>

      {/* Inspections List with Calendar Sync */}
      <div className="card flex flex-col">
        <h2 className="font-bold text-slate-900 text-lg mb-1">{t('Upcoming inspections')}</h2>
        <p className="text-xs text-slate-500 mb-4">
          {t('Visits are shared with authorized case users and retained in the case audit record.')}
        </p>

        {!visits.length ? (
          <div className="my-auto py-12 text-center text-slate-400">
            <span className="text-4xl block mb-2">📅</span>
            <p className="text-sm">{t('No authorized inspections are scheduled.')}</p>
          </div>
        ) : (
          <div className="space-y-4 overflow-y-auto max-h-[580px] pr-1">
            {visits.map((visit) => {
              const visitDate = new Date(visit.scheduledFor)
              const calEvent = {
                title: `HEC ODL Site Visit: ${label(visit.application)}`,
                description: `HEC Quality Assurance Division inspection for ${label(
                  visit.application
                )}.\\nVenue: ${visit.venue}\\nAttendees: ${visit.attendees.join(', ')}\\nNotes: ${
                  visit.notes || 'None'
                }`,
                location: visit.venue,
                startTime: visitDate,
              }

              return (
                <div
                  key={visit.id}
                  className="rounded-xl border border-slate-200 bg-slate-50/60 p-4 transition hover:bg-slate-50"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">
                        {label(visit.application)}
                      </h3>
                      <p className="mt-1 text-xs text-slate-600 font-medium">
                        📍 {visit.venue}
                      </p>
                      <p className="mt-0.5 text-xs text-blue-700 font-semibold">
                        🗓️ {visitDate.toLocaleString(undefined, {
                          weekday: 'short',
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                    <span
                      className={`status text-[11px] ${
                        visit.status === 'SCHEDULED'
                          ? 'bg-blue-100 text-blue-800'
                          : visit.status === 'COMPLETED'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {t(visit.status)}
                    </span>
                  </div>

                  {visit.attendees.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1">
                      {visit.attendees.map((attendee, idx) => (
                        <span
                          key={idx}
                          className="rounded-md bg-white border border-slate-200 px-2 py-0.5 text-[10px] text-slate-600"
                        >
                          👤 {attendee}
                        </span>
                      ))}
                    </div>
                  )}

                  {visit.notes && (
                    <p className="mt-2 text-xs text-slate-500 bg-white rounded-lg p-2 border border-slate-100">
                      {visit.notes}
                    </p>
                  )}

                  {/* Calendar Sync Buttons */}
                  <div className="mt-4 pt-3 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => downloadIcsFile(calEvent)}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-100 transition"
                      >
                        <span>📥</span> {t('Download .ICS Calendar')}
                      </button>
                      <a
                        href={getGoogleCalendarUrl(calEvent)}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-100 transition"
                      >
                        <span>📅</span> {t('Add to Google Calendar')}
                      </a>
                    </div>

                    {visit.status === 'SCHEDULED' && (
                      <button
                        type="button"
                        onClick={() => cancel(visit.id)}
                        className="text-xs font-semibold text-red-600 hover:text-red-800 transition"
                      >
                        {t('Cancel visit')}
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
