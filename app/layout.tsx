import type { Metadata, Viewport } from 'next'
import './globals.css'
import { LocaleProvider } from '@/components/shared/LocaleProvider'

export const metadata: Metadata = {
  title: 'HEC ODL Application Orchestrator',
  description: 'AI-Powered Application Processing System for Open and Distance Learning',
  manifest: '/manifest.webmanifest',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body><LocaleProvider>{children}</LocaleProvider><script dangerouslySetInnerHTML={{ __html: "if ('serviceWorker' in navigator) window.addEventListener('load',()=>navigator.serviceWorker.register('/sw.js'))" }} /></body>
    </html>
  )
}
