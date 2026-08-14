'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
    const pathname = usePathname()

    return (
        <nav className="bg-white shadow border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/" className="text-xl font-bold text-blue-700">
                            HEC ODL Orchestrator
                        </Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Link
                            href="/hei/applications"
                            className={`px-3 py-2 rounded-md text-sm font-medium ${pathname?.startsWith('/hei')
                                ? 'bg-gray-100 text-gray-900'
                                : 'text-gray-600 hover:bg-gray-50'
                                }`}
                        >
                            My Applications
                        </Link>
                        <a
                            href="/api/auth/logout"
                            className="px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-50"
                        >
                            Logout
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    )
}