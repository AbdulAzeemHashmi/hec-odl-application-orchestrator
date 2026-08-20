'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'
import { createBrowserAuthClient, isSupabaseAuthConfigured } from '@/lib/auth/supabase'

export default function ResetPasswordPage() {
    const router = useRouter()
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')
    const [isSuccess, setIsSuccess] = useState(false)
    const [loading, setLoading] = useState(false)
    const configured = isSupabaseAuthConfigured()

    async function handleUpdatePassword(event: FormEvent) {
        event.preventDefault()
        if (password !== confirmPassword) {
            setMessage('Passwords do not match.')
            return
        }

        setLoading(true)
        setMessage('')
        setIsSuccess(false)

        try {
            if (configured) {
                const { error } = await createBrowserAuthClient().auth.updateUser({ password })
                if (error) throw error
            }

            setIsSuccess(true)
            setMessage('Password updated successfully! You can now sign in with your new password.')
            setTimeout(() => {
                router.push('/login')
            }, 2500)
        } catch (error) {
            setMessage(error instanceof Error ? error.message : 'Failed to reset password.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="grid min-h-screen place-items-center bg-slate-100 p-4 sm:p-6">
            <form onSubmit={handleUpdatePassword} className="w-full max-w-md rounded-2xl bg-white p-5 sm:p-8 shadow-xl shadow-slate-200">
                <p className="eyebrow">HEC ODL PORTAL</p>
                <h1 className="mt-2 text-2xl sm:text-3xl font-bold text-slate-900">Set New Password</h1>
                <p className="mt-3 text-sm leading-6 text-slate-500">
                    Create a strong, secure password for your HEC ODL Portal account.
                </p>

                <label className="mt-6 block text-sm font-medium text-slate-700">
                    New Password
                    <input
                        required
                        minLength={6}
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="mt-1 w-full rounded-lg border border-slate-300 p-3 text-slate-900 focus:border-blue-600 focus:outline-none"
                    />
                </label>

                <label className="mt-4 block text-sm font-medium text-slate-700">
                    Confirm New Password
                    <input
                        required
                        minLength={6}
                        type="password"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
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
                    {loading ? 'Updating password…' : 'Update & Save Password'}
                </button>

                <div className="mt-6 text-center text-sm text-slate-500">
                    Back to{' '}
                    <Link href="/login" className="font-semibold text-blue-700 hover:underline">
                        Sign In Page
                    </Link>
                </div>
            </form>
        </main>
    )
}
