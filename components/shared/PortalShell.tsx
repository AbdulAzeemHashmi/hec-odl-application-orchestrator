'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import SignOutButton from './SignOutButton'
import NotificationCenter from './NotificationCenter'
import LanguageToggle from './LanguageToggle'
import OfflineIndicator from './OfflineIndicator'
import { useLocale } from './LocaleProvider'

const ROLE_NAV: Record<string, string[][]> = {
  hei: [
    ['Overview', '/hei'],
    ['Applications', '/hei/applications'],
    ['Visits', '/visits'],
    ['AI policy desk', '/llm'],
  ],
  qad: [
    ['QAD scrutiny', '/qad'],
    ['Applications', '/hei/applications'],
    ['Visits', '/visits'],
    ['Decisions', '/decisions'],
    ['Compliance', '/compliance'],
    ['AI policy desk', '/llm'],
  ],
  panel: [
    ['Expert panel', '/panel'],
    ['Visits', '/visits'],
    ['AI policy desk', '/llm'],
  ],
  admin: [
    ['Overview', '/hei'],
    ['Applications', '/hei/applications'],
    ['QAD scrutiny', '/qad'],
    ['Expert panel', '/panel'],
    ['Visits', '/visits'],
    ['Decisions', '/decisions'],
    ['Compliance', '/compliance'],
    ['AI policy desk', '/llm'],
    ['Administration', '/admin'],
  ],
}

const ROLE_LABELS: Record<string, { label: string; icon: string }> = {
  hei: { label: 'HEI Institutional User', icon: '🏛️' },
  qad: { label: 'QAD Scrutiny Officer', icon: '📋' },
  panel: { label: 'Expert Panel Reviewer', icon: '👥' },
  admin: { label: 'System Administrator', icon: '🛡️' },
}

export default function PortalShell({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle?: string
  children: React.ReactNode
}) {
  const path = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentRole, setCurrentRole] = useState<'hei' | 'qad' | 'panel' | 'admin'>('hei')
  const { isRtl, t } = useLocale()

  useEffect(() => {
    const match = typeof document !== 'undefined' ? document.cookie.match(/(?:^|;\s*)hec-session-role=([^;]+)/) : null
    if (match && ['hei', 'qad', 'panel', 'admin'].includes(match[1])) {
      setCurrentRole(match[1] as any)
    }
  }, [])

  const activeNav = ROLE_NAV[currentRole] || ROLE_NAV.hei

  const navLinks = activeNav.map(([label, href]) => (
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
      {t(label)}
    </Link>
  ))

  const roleBadgeWidget = (
    <div className="mx-1 mb-4 rounded-xl bg-slate-900/90 border border-slate-800 p-3 shadow-inner">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400">
          {t('Active Role')}
        </span>
        <span className="text-xs">
          {ROLE_LABELS[currentRole]?.icon}
        </span>
      </div>
      <p className="text-xs font-bold text-white mt-1 truncate">
        {t(ROLE_LABELS[currentRole]?.label || 'User')}
      </p>
    </div>
  )

  return (
    <div className="min-h-screen bg-slate-100" dir={isRtl ? 'rtl' : 'ltr'}>
      <OfflineIndicator />

      {/* Mobile Backdrop Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Desktop Sidebar (fixed left for LTR, fixed right for RTL) */}
      <aside
        className={`fixed inset-y-0 z-40 hidden w-64 flex-col bg-slate-950 p-5 text-slate-300 lg:flex ${
          isRtl ? 'right-0 border-l border-slate-800' : 'left-0 border-r border-slate-800'
        }`}
      >
        <Link href="/" className="block px-3 py-3 text-lg font-bold text-white">
          HEC ODL <span className="text-blue-400">Portal</span>
        </Link>
        <p className="px-3 pb-4 text-xs uppercase tracking-widest text-slate-500">
          {t('Case management')}
        </p>

        {roleBadgeWidget}

        <nav className="flex-1 space-y-1 overflow-y-auto">{navLinks}</nav>
        <div className="mt-auto pt-6 px-1">
          <SignOutButton />
        </div>
      </aside>

      {/* Mobile Slide-in Drawer */}
      <aside
        className={`fixed inset-y-0 z-40 flex w-72 flex-col bg-slate-950 p-5 text-slate-300 shadow-2xl transition-transform duration-300 ease-in-out lg:hidden ${
          isRtl ? 'right-0' : 'left-0'
        } ${
          sidebarOpen
            ? 'translate-x-0'
            : isRtl
            ? 'translate-x-full'
            : '-translate-x-full'
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <p className="px-3 pb-3 text-xs uppercase tracking-widest text-slate-500">
          {t('Case management')}
        </p>

        {roleBadgeWidget}

        <nav className="flex-1 space-y-1 overflow-y-auto">{navLinks}</nav>
        <div className="mt-auto pt-6 px-1">
          <SignOutButton />
        </div>
      </aside>

      {/* Main Content Area */}
      <div className={isRtl ? 'lg:pr-64 lg:pl-0' : 'lg:pl-64 lg:pr-0'}>
        {/* Top Header */}
        <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur-sm px-3 py-2.5 sm:px-6 sm:py-4 shadow-sm">
          <div className="mx-auto max-w-7xl">
            {/* Mobile / Smartphone Layout (< md): 2 Coordinated Slim Rows */}
            <div className="md:hidden space-y-2">
              {/* Row 1: System Bar [Hamburger] + [HEC ODL APPLICATION SYSTEM] + [Notification Bell] */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5 min-w-0 flex-1">
                  <button
                    onClick={() => setSidebarOpen(true)}
                    className="grid h-9 w-9 min-w-[36px] min-h-[36px] flex-shrink-0 place-items-center rounded-lg border border-slate-200 bg-white text-slate-600 shadow-sm hover:bg-slate-50 hover:text-slate-900 transition-all active:scale-95"
                    aria-label="Open sidebar"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="h-5 w-5"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                  </button>
                  <span className="font-extrabold text-slate-900 text-xs sm:text-sm tracking-tight truncate">
                    {t('HEC ODL APPLICATION SYSTEM')}
                  </span>
                </div>
                <div className="flex-shrink-0">
                  <NotificationCenter />
                </div>
              </div>

              {/* Row 2: Page Context Sub-Bar [Page Title with Accent] + [EN | اردو Language Toggle] */}
              <div className="flex items-center justify-between gap-2 pt-1.5 border-t border-slate-100">
                <div className="flex items-center gap-1.5 min-w-0 flex-1">
                  <span className="h-2 w-2 flex-shrink-0 rounded-full bg-blue-600" />
                  <span className="font-bold text-slate-800 text-xs truncate">
                    {t(title)}
                  </span>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <LanguageToggle />
                </div>
              </div>
            </div>

            {/* Desktop & Tablet Layout (>= md): Single Row */}
            <div className="hidden md:flex items-center gap-4">
              {/* Hamburger button (lg:hidden) */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="grid h-10 w-10 min-w-[40px] min-h-[40px] flex-shrink-0 place-items-center rounded-lg border border-slate-200 bg-white text-slate-600 shadow-sm hover:bg-slate-50 hover:text-slate-900 transition-all lg:hidden active:scale-95"
                aria-label="Open sidebar"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              </button>

              {/* Title block */}
              <div className="min-w-0 flex-1">
                <p className="eyebrow truncate text-xs">{t('HEC ODL APPLICATION SYSTEM')}</p>
                <h1 className="mt-0.5 truncate text-xl lg:text-2xl font-bold text-slate-900">
                  {t(title)}
                </h1>
                {subtitle && (
                  <p className="mt-0.5 text-xs text-slate-500 lg:text-sm truncate">{t(subtitle)}</p>
                )}
              </div>

              {/* Action buttons with responsive spacing */}
              <div className="flex items-center gap-3 flex-shrink-0">
                <Link
                  href="/hei/applications/new"
                  className="btn-primary flex-shrink-0 whitespace-nowrap px-4 py-2.5 text-sm font-semibold shadow-sm"
                >
                  {t('New application')}
                </Link>
                <LanguageToggle />
                <NotificationCenter />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="mx-auto max-w-7xl p-3 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  )
}
