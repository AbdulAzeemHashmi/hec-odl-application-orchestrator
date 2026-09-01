'use client'

import { useEffect, useRef, useState } from 'react'

interface TimePickerProps {
  value: string        // "HH:MM" or ""
  onChange: (val: string) => void
  required?: boolean
  name?: string        // hidden input name for form submission
}

export default function TimePicker({ value, onChange, required, name }: TimePickerProps) {
  const [open, setOpen] = useState(false)
  const [hour, setHour] = useState<number | null>(null)
  const [minute, setMinute] = useState<number | null>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const btnRef = useRef<HTMLButtonElement>(null)
  const hourRefs = useRef<(HTMLButtonElement | null)[]>([])
  const minRefs = useRef<(HTMLButtonElement | null)[]>([])

  // Parse incoming value
  useEffect(() => {
    if (value && /^\d{1,2}:\d{2}$/.test(value)) {
      const [h, m] = value.split(':').map(Number)
      setHour(h)
      setMinute(m)
    } else {
      setHour(null)
      setMinute(null)
    }
  }, [value])

  // Close on outside click
  useEffect(() => {
    if (!open) return
    function onDown(e: MouseEvent) {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        btnRef.current &&
        !btnRef.current.contains(e.target as Node)
      ) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [open])

  // Scroll selected hour/minute into view when panel opens
  useEffect(() => {
    if (!open) return
    setTimeout(() => {
      if (hour !== null && hourRefs.current[hour]) {
        hourRefs.current[hour]!.scrollIntoView({ block: 'center', behavior: 'instant' })
      }
      if (minute !== null && minRefs.current[minute]) {
        minRefs.current[minute]!.scrollIntoView({ block: 'center', behavior: 'instant' })
      }
    }, 30)
  }, [open])

  function commit(h: number | null, m: number | null) {
    if (h !== null && m !== null) {
      onChange(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`)
    } else {
      onChange('')
    }
  }

  function selectHour(h: number) {
    setHour(h)
    commit(h, minute)
  }

  function selectMinute(m: number) {
    setMinute(m)
    commit(hour, m)
  }

  const displayHour = hour !== null ? String(hour).padStart(2, '0') : '--'
  const displayMin  = minute !== null ? String(minute).padStart(2, '0') : '--'
  const displayStr  = `${displayHour}:${displayMin}`

  const hours   = Array.from({ length: 24 }, (_, i) => i)
  const minutes = Array.from({ length: 60 }, (_, i) => i)

  return (
    <div className="relative">
      {/* Hidden native input so the parent form still sees the value */}
      {name && (
        <input
          type="hidden"
          name={name}
          value={value || ''}
          required={required}
        />
      )}

      {/* Trigger button */}
      <button
        ref={btnRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="dialog"
        aria-expanded={open}
        className={`w-full flex items-center gap-2 rounded-lg border p-2.5 text-sm bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none transition ${
          open ? 'border-blue-500 ring-2 ring-blue-200' : 'border-slate-300'
        } ${hour === null || minute === null ? 'text-slate-400' : 'text-slate-900 font-mono tracking-wider'}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 flex-shrink-0 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <circle cx="12" cy="12" r="10" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
        </svg>
        <span className={hour === null || minute === null ? 'text-slate-400 tracking-widest font-mono' : 'font-mono tracking-widest'}>
          {displayStr}
        </span>
      </button>

      {/* Popover panel */}
      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-label="Select time"
          className="absolute z-50 mt-1.5 left-0 w-64 rounded-2xl border border-slate-200 bg-white shadow-xl overflow-hidden"
          style={{ minWidth: '16rem' }}
        >
          {/* Header */}
          <div className="px-4 pt-3 pb-2 border-b border-slate-100 flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wide text-slate-500">Select Time</span>
            <span className="text-lg font-bold text-blue-700 font-mono tracking-widest">
              {displayStr}
            </span>
          </div>

          {/* Two-column scroll pickers */}
          <div className="flex">
            {/* Hours column */}
            <div className="flex-1 border-r border-slate-100">
              <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-400 text-center">
                Hour (0–23)
              </div>
              <div className="h-52 overflow-y-auto scroll-smooth overscroll-contain px-1 pb-1">
                {hours.map((h) => (
                  <button
                    key={h}
                    ref={(el) => { hourRefs.current[h] = el }}
                    type="button"
                    onClick={() => selectHour(h)}
                    className={`w-full rounded-lg py-1.5 text-sm font-mono font-semibold text-center transition-all my-0.5 ${
                      hour === h
                        ? 'bg-blue-700 text-white shadow-sm'
                        : 'text-slate-700 hover:bg-blue-50 hover:text-blue-700'
                    }`}
                  >
                    {String(h).padStart(2, '0')}
                  </button>
                ))}
              </div>
            </div>

            {/* Minutes column */}
            <div className="flex-1">
              <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-400 text-center">
                Minute (0–59)
              </div>
              <div className="h-52 overflow-y-auto scroll-smooth overscroll-contain px-1 pb-1">
                {minutes.map((m) => (
                  <button
                    key={m}
                    ref={(el) => { minRefs.current[m] = el }}
                    type="button"
                    onClick={() => selectMinute(m)}
                    className={`w-full rounded-lg py-1.5 text-sm font-mono font-semibold text-center transition-all my-0.5 ${
                      minute === m
                        ? 'bg-blue-700 text-white shadow-sm'
                        : 'text-slate-700 hover:bg-blue-50 hover:text-blue-700'
                    }`}
                  >
                    {String(m).padStart(2, '0')}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-4 py-2.5 border-t border-slate-100 flex justify-between items-center gap-2">
            <button
              type="button"
              onClick={() => { setHour(null); setMinute(null); onChange('') }}
              className="text-xs text-slate-400 hover:text-slate-600 font-medium transition"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              disabled={hour === null || minute === null}
              className="rounded-lg bg-blue-700 px-4 py-1.5 text-xs font-bold text-white hover:bg-blue-800 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
