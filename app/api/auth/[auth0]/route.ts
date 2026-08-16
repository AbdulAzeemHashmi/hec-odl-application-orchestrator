import { handleAuth } from '@auth0/nextjs-auth0'
import { NextResponse } from 'next/server'
import { isAuth0Configured } from '@/lib/auth/config'

const authHandler = handleAuth()

function unavailable(request: Request) {
  return NextResponse.redirect(new URL('/login?error=auth_not_configured', request.url))
}

export async function GET(request: Request, context: { params: { auth0: string } }) {
  if (!isAuth0Configured()) return unavailable(request)
  return authHandler(request, context)
}

export async function POST(request: Request, context: { params: { auth0: string } }) {
  if (!isAuth0Configured()) return unavailable(request)
  return authHandler(request, context)
}
