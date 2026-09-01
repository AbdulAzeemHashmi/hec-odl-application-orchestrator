'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

type Notification = { id: string; title: string; message: string; href?: string; readAt?: string | null; createdAt: string }

export default function NotificationCenter() {
  const [items, setItems] = useState<Notification[]>([])
  const [open, setOpen] = useState(false)

  useEffect(() => { const load = () => fetch('/api/notifications').then(r => r.ok ? r.json() : []).then(setItems).catch(() => {}); load(); const timer = window.setInterval(load, 30000); return () => window.clearInterval(timer) }, [])
  const unread = items.filter(item => !item.readAt).length
  async function markAllRead() {
    await fetch('/api/notifications', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ all: true }) })
    setItems(current => current.map(item => ({ ...item, readAt: new Date().toISOString() })))
  }

  return <div className="relative">
    <button onClick={() => setOpen(!open)} className="relative grid h-10 w-10 place-items-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50" aria-label="Notifications">
      <span aria-hidden="true">🔔</span>{unread > 0 && <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-red-600 px-1 text-[10px] font-bold text-white">{unread}</span>}
    </button>
    {open && <div className="absolute right-0 top-12 z-50 w-80 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
      <div className="flex items-center justify-between border-b px-4 py-3"><strong className="text-sm">Notifications</strong><button onClick={markAllRead} className="text-xs font-semibold text-blue-700">Mark all read</button></div>
      <div className="max-h-96 overflow-y-auto">
        {!items.length && <p className="p-5 text-sm text-slate-500">You’re all caught up.</p>}
        {items.map(item => <Link key={item.id} href={item.href || '#'} onClick={() => setOpen(false)} className={`block border-b p-4 hover:bg-slate-50 ${!item.readAt ? 'bg-blue-50/50' : ''}`}><p className="text-sm font-semibold text-slate-800">{item.title}</p><p className="mt-1 text-xs leading-5 text-slate-500">{item.message}</p><p className="mt-1 text-[11px] text-slate-400">{new Date(item.createdAt).toLocaleString()}</p></Link>)}
      </div>
    </div>}
  </div>
}
