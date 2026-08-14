import { getSession } from '@auth0/nextjs-auth0'
import { redirect } from 'next/navigation'

export default async function LoginPage() {
    const session = await getSession()
    if (session) {
        redirect('/')
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-gray-50">
            <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
                <h1 className="text-2xl font-bold text-blue-700">HEC ODL Orchestrator</h1>
                <p className="text-gray-600 mt-2">Sign in to access your applications.</p>
                <a
                    href="/api/auth/login"
                    className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                    Log In with Auth0
                </a>
            </div>
        </main>
    )
}