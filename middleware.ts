import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Protected dashboard routes that require authentication
const PROTECTED_PREFIXES = ['/hei', '/qad', '/panel', '/admin', '/compliance', '/decisions', '/visits']

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    // Check if path is a protected dashboard route
    const isProtected = PROTECTED_PREFIXES.some(prefix => pathname.startsWith(prefix))

    if (isProtected) {
        // Retrieve session token from HTTP cookies or authorization header
        const token = request.cookies.get('sb-access-token')?.value || 
                      request.cookies.get('hec-session-token')?.value ||
                      request.headers.get('authorization')

        // If no active session token found and path is protected, redirect to login
        const isBypass = process.env.NODE_ENV === 'development' && request.nextUrl.searchParams.get('auth') === 'guest'
        
        if (!token && !isBypass) {
            const loginUrl = new URL('/login', request.url)
            loginUrl.searchParams.set('redirectTo', pathname)
            return NextResponse.redirect(loginUrl)
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/hei/:path*', '/qad/:path*', '/panel/:path*', '/admin/:path*', '/compliance/:path*', '/decisions/:path*', '/visits/:path*'],
}
