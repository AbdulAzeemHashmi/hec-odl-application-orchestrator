import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
    title: 'HEC ODL Application Orchestrator',
    description: 'AI-Powered Application Processing System for Open and Distance Learning',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    )
}
