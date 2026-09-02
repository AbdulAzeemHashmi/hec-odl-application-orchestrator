'use client'
import { useRouter } from 'next/navigation'
import { createBrowserAuthClient, isSupabaseAuthConfigured, clearAuthCookies } from '@/lib/auth/supabase'
import { useLocale } from './LocaleProvider'

export default function SignOutButton() {
  const router = useRouter()
  const { t } = useLocale()

  async function signOut() {
    try {
      if (isSupabaseAuthConfigured()) {
        await createBrowserAuthClient().auth.signOut()
      }
    } catch {
      // Ignore Supabase network errors on sign out
    } finally {
      clearAuthCookies()
      router.push('/login')
      router.refresh()
    }
  }

  return (
    <button
      onClick={signOut}
      className="w-full text-start rounded-lg bg-slate-800 px-3 py-2 text-xs font-semibold text-slate-300 hover:bg-red-900/40 hover:text-red-200 transition-colors"
    >
      {t('Sign out securely')}
    </button>
  )
}
