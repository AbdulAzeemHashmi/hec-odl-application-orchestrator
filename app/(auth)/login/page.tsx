import { getSession } from '@auth0/nextjs-auth0'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { isAuth0Configured } from '@/lib/auth/config'

export default async function LoginPage({ searchParams }: { searchParams: { error?: string } }) {
    if (isAuth0Configured()) {
        const session = await getSession()
        if (session) redirect('/hei')
    }
    const unavailable = searchParams.error === 'auth_not_configured' || !isAuth0Configured()
    return <main className="grid min-h-screen place-items-center bg-slate-100 p-6"><section className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl shadow-slate-200"><p className="eyebrow">HEC ODL PORTAL</p><h1 className="mt-2 text-3xl font-bold text-slate-900">Welcome back</h1><p className="mt-3 text-sm leading-6 text-slate-500">Sign in to access your applications and role-based workspace.</p>{unavailable ? <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900"><strong>Login is not configured yet.</strong><br />Add real Auth0 credentials to <code>.env.local</code>, then restart the development server. Placeholder values cannot create a login session.</div> : <a href="/api/auth/login" className="btn-primary mt-7 w-full">Sign in securely</a>}<p className="mt-6 text-center text-sm text-slate-500">New to the portal? <Link href="/signup" className="font-semibold text-blue-700">Create an account</Link></p></section></main>
}
