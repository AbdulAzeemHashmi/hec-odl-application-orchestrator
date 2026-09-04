import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Role-based route access mapping
const ROLE_PERMISSIONS: Record<string, string[]> = {
  hei: ['/hei', '/visits', '/llm'],
  qad: ['/qad', '/hei/applications', '/visits', '/decisions', '/compliance', '/llm'],
  panel: ['/panel', '/visits', '/llm'],
  admin: ['/admin', '/hei', '/qad', '/panel', '/visits', '/decisions', '/compliance', '/llm'],
}

// Default workspace home page for each role
const ROLE_DEFAULT_HOME: Record<string, string> = {
  hei: '/hei',
  qad: '/qad',
  panel: '/panel',
  admin: '/admin',
}

// Protected dashboard routes that require authentication
const PROTECTED_PREFIXES = ['/hei', '/qad', '/panel', '/admin', '/compliance', '/decisions', '/visits', '/llm']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if path is a protected dashboard route
  const isProtected = PROTECTED_PREFIXES.some(prefix => pathname.startsWith(prefix))

  if (isProtected) {
    // Retrieve session token from HTTP cookies or authorization header
    const token = request.cookies.get('sb-access-token')?.value || 
                  request.cookies.get('hec-session-token')?.value ||
                  request.headers.get('authorization')

    const isBypass = process.env.NODE_ENV === 'development' && request.nextUrl.searchParams.get('auth') === 'guest'
    
    // If no active session token found and path is protected, redirect to login
    if (!token && !isBypass) {
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('redirectTo', pathname)
      return NextResponse.redirect(loginUrl)
    }

    // Role-Based Access Control (RBAC)
    const userRole = request.cookies.get('hec-session-role')?.value || 'hei'
    const allowedPrefixes = ROLE_PERMISSIONS[userRole] || ROLE_PERMISSIONS.hei

    // Check specific sub-route restrictions:
    // 1. /hei/applications/new is only for university applicants (hei) and system administrators (admin)
    if (pathname.startsWith('/hei/applications/new') && userRole !== 'hei' && userRole !== 'admin') {
      const fallbackUrl = new URL(ROLE_DEFAULT_HOME[userRole] || '/qad', request.url)
      return NextResponse.redirect(fallbackUrl)
    }

    // 2. /hei root overview is for university users (hei) and administrators (admin); QAD officers default to /qad
    if (pathname === '/hei' && userRole === 'qad') {
      return NextResponse.redirect(new URL('/qad', request.url))
    }

    // 3. General route whitelist check for the user's role
    const isAllowed = allowedPrefixes.some(prefix => pathname.startsWith(prefix))

    if (!isAllowed) {
      // Redirect unauthorized role to their designated workspace home
      const fallbackUrl = new URL(ROLE_DEFAULT_HOME[userRole] || '/hei', request.url)
      return NextResponse.redirect(fallbackUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/hei/:path*', '/qad/:path*', '/panel/:path*', '/admin/:path*', '/compliance/:path*', '/decisions/:path*', '/visits/:path*', '/llm/:path*'],
}
