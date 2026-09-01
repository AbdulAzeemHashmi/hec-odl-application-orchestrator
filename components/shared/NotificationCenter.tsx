'use client'

import Link from 'next/link'
import { useEffect, useState, useRef } from 'react'
import { useLocale } from './LocaleProvider'

type Notification = {
  id: string
  title: string
  message: string
  href?: string | null
  readAt?: string | null
  createdAt: string
}

export default function NotificationCenter() {
  const [items, setItems] = useState<Notification[]>([])
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { t, isRtl } = useLocale()

  const load = () => {
    fetch('/api/notifications')
      .then((r) => (r.ok ? r.json() : []))
      .then(setItems)
      .catch(() => {})
  }

  useEffect(() => {
    load()
    const timer = window.setInterval(load, 20000)
    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  const unread = items.filter((item) => !item.readAt).length

  async function markAllRead() {
    await fetch('/api/notifications', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ all: true }),
    })
    setItems((current) =>
      current.map((item) => ({ ...item, readAt: new Date().toISOString() }))
    )
  }

  async function markSingleRead(id: string) {
    await fetch('/api/notifications', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    setItems((current) =>
      current.map((item) =>
        item.id === id ? { ...item, readAt: new Date().toISOString() } : item
      )
    )
  }

  function getIcon(title: string) {
    if (title.toLowerCase().includes('visit')) return '📅'
    if (title.toLowerCase().includes('noc') || title.toLowerCase().includes('certificate')) return '🛡️'
    if (title.toLowerCase().includes('status')) return '📋'
    return '🔔'
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="relative grid h-10 w-10 place-items-center rounded-lg border border-slate-200 bg-white text-slate-600 shadow-sm hover:bg-slate-50 transition"
        aria-label={t('Notifications')}
      >
        <span aria-hidden="true" className="text-lg">🔔</span>
        {unread > 0 && (
          <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-red-600 px-1 text-[10px] font-bold text-white shadow-sm animate-pulse">
            {unread > 9 ? '9+' : unread}
          </span>
        )}
      </button>

      {open && (
        <div
          className={`absolute ${
            isRtl ? 'left-0' : 'right-0'
          } top-12 z-50 w-80 sm:w-96 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl animate-in fade-in zoom-in-95 duration-150`}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/80 px-4 py-3">
            <div className="flex items-center gap-2">
              <strong className="text-sm font-bold text-slate-900">{t('Notifications')}</strong>
              {unread > 0 && (
                <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[11px] font-semibold text-blue-800">
                  {unread} new
                </span>
              )}
            </div>
            {unread > 0 && (
              <button
                onClick={markAllRead}
                className="text-xs font-semibold text-blue-700 hover:text-blue-900 transition"
              >
                {t('Mark all read')}
              </button>
            )}
          </div>

          {/* List */}
          <div className="max-h-96 overflow-y-auto divide-y divide-slate-100">
            {!items.length ? (
              <div className="p-8 text-center text-slate-400">
                <span className="text-3xl block mb-2">📭</span>
                <p className="text-sm">{t('You’re all caught up.')}</p>
              </div>
            ) : (
              items.map((item) => (
                <Link
                  key={item.id}
                  href={item.href || '#'}
                  onClick={() => {
                    markSingleRead(item.id)
                    setOpen(false)
                  }}
                  className={`flex gap-3 p-4 transition hover:bg-slate-50 ${
                    !item.readAt ? 'bg-blue-50/40' : ''
                  }`}
                >
                  <span className="text-xl flex-shrink-0 mt-0.5">{getIcon(item.title)}</span>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-slate-900 leading-tight">
                      {t(item.title)}
                    </p>
                    <p className="mt-1 text-xs text-slate-600 leading-relaxed line-clamp-2">
                      {item.message}
                    </p>
                    <p className="mt-1.5 text-[10px] text-slate-400">
                      {new Date(item.createdAt).toLocaleDateString(undefined, {
                        hour: '2-digit',
                        minute: '2-digit',
                        day: 'numeric',
                        month: 'short',
                      })}
                    </p>
                  </div>
                  {!item.readAt && (
                    <span className="h-2 w-2 rounded-full bg-blue-600 flex-shrink-0 mt-1" />
                  )}
                </Link>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}
