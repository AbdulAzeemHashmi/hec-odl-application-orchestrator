'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import SignOutButton from './SignOutButton'

const nav = [
  ['Overview', '/hei'],
  ['Applications', '/hei/applications'],
  ['QAD scrutiny', '/qad'],
  ['Expert panel', '/panel'],
  ['Visits', '/visits'],
  ['Decisions', '/decisions'],
  ['Compliance', '/compliance'],
  ['AI policy desk', '/llm'],
  ['Administration', '/admin'],
]

export default function PortalShell({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle: string
  children: React.ReactNode
}) {
  const path = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const navLinks = nav.map(([label, href]) => (
    <Link
      key={href}
      href={href}
      onClick={() => setSidebarOpen(false)}
      className={`block rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
        path === href || (href !== '/hei' && path?.startsWith(href))
          ? 'bg-blue-600 text-white shadow-sm'
          : 'text-slate-300 hover:bg-slate-800 hover:text-white'
      }`}
    >
      {label}
    </Link>
  ))

  return (
    <div className="min-h-screen bg-slate-100">

      {/* Mobile Backdrop Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Desktop Sidebar (always visible on lg+) */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col bg-slate-950 p-5 text-slate-300 lg:flex">
        <Link href="/" className="block px-3 py-3 text-lg font-bold text-white">
          HEC ODL <span className="text-blue-400">Portal</span>
        </Link>
        <p className="px-3 pb-6 text-xs uppercase tracking-widest text-slate-500">
          Case management
        </p>
        <nav className="flex-1 space-y-1 overflow-y-auto">{navLinks}</nav>
        <div className="mt-auto pt-6 px-1">
          <SignOutButton />
        </div>
      </aside>

      {/* Mobile Slide-in Drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col bg-slate-950 p-5 text-slate-300 shadow-2xl transition-transform duration-300 ease-in-out lg:hidden ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between mb-2">
          <Link
            href="/"
            onClick={() => setSidebarOpen(false)}
            className="block px-3 py-3 text-lg font-bold text-white"
          >
            HEC ODL <span className="text-blue-400">Portal</span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="grid h-9 w-9 place-items-center rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
            aria-label="Close sidebar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <p className="px-3 pb-4 text-xs uppercase tracking-widest text-slate-500">
          Case management
        </p>
        <nav className="flex-1 space-y-1 overflow-y-auto">{navLinks}</nav>
        <div className="mt-auto pt-6 px-1">
          <SignOutButton />
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="lg:pl-64">

        {/* Top Header */}
        <header className="sticky top-0 z-20 border-b border-slate-200 bg-white px-4 py-4 sm:px-6">
          <div className="mx-auto flex max-w-7xl items-center gap-4">

            {/* Hamburger button - mobile only */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-lg border border-slate-200 bg-white text-slate-600 shadow-sm hover:bg-slate-50 hover:text-slate-900 transition-all lg:hidden"
              aria-label="Open sidebar"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>

            {/* Title block */}
            <div className="min-w-0 flex-1">
              <p className="eyebrow truncate">HEC ODL APPLICATION SYSTEM</p>
              <h1 className="mt-0.5 truncate text-lg font-bold text-slate-900 sm:text-2xl">{title}</h1>
              {subtitle && (
                <p className="mt-0.5 hidden text-sm text-slate-500 sm:block">{subtitle}</p>
              )}
            </div>

            {/* New application button */}
            <Link
              href="/hei/applications/new"
              className="btn-primary flex-shrink-0 text-xs sm:text-sm"
            >
              <span className="hidden sm:inline">New application</span>
              <span className="sm:hidden">+ New</span>
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="mx-auto max-w-7xl p-4 sm:p-6">{children}</main>
      </div>
    </div>
  )
}
