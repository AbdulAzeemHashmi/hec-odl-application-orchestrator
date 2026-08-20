'use client'
import Link from 'next/link'
import { FormEvent, useState } from 'react'
import { createBrowserAuthClient, isSupabaseAuthConfigured } from '@/lib/auth/supabase'

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [isSuccess, setIsSuccess] = useState(false)
    const [loading, setLoading] = useState(false)
    const configured = isSupabaseAuthConfigured()

    async function handleReset(event: FormEvent) {
        event.preventDefault()
        setLoading(true)
        setMessage('')
        setIsSuccess(false)

        try {
            if (configured) {
                const redirectUrl = `${window.location.origin}/reset-password`
                const { error } = await createBrowserAuthClient().auth.resetPasswordForEmail(email, {
                    redirectTo: redirectUrl
                })
                if (error) throw error
            }

            setIsSuccess(true)
            setMessage(`Password reset instructions sent to ${email}. Please check your inbox and spam folder.`)
        } catch (error) {
            setMessage(error instanceof Error ? error.message : 'Unable to send reset instructions.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="grid min-h-screen place-items-center bg-slate-100 p-6">
            <form onSubmit={handleReset} className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl shadow-slate-200">
                <p className="eyebrow">HEC ODL PORTAL</p>
                <h1 className="mt-2 text-3xl font-bold text-slate-900">Forgot Password</h1>
                <p className="mt-3 text-sm leading-6 text-slate-500">
                    Enter your registered email address and we will send you instructions to reset your password.
                </p>

                <label className="mt-6 block text-sm font-medium text-slate-700">
                    Email address
                    <input
                        required
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="user@university.edu.pk"
                        className="mt-1 w-full rounded-lg border border-slate-300 p-3 text-slate-900 focus:border-blue-600 focus:outline-none"
                    />
                </label>

                {message && (
                    <div className={`mt-4 rounded-lg p-4 text-sm ${isSuccess ? 'bg-emerald-50 text-emerald-900 border border-emerald-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
                        {message}
                    </div>
                )}

                <button
                    disabled={loading}
                    type="submit"
                    className="btn-primary mt-6 w-full py-3 font-semibold"
                >
                    {loading ? 'Sending instructions…' : 'Send password reset email'}
                </button>

                <div className="mt-6 text-center text-sm text-slate-500">
                    Remember your password?{' '}
                    <Link href="/login" className="font-semibold text-blue-700 hover:underline">
                        Return to Sign In
                    </Link>
                </div>
            </form>
        </main>
    )
}
