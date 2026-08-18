'use client'
import { useRouter } from 'next/navigation'
import { createBrowserAuthClient } from '@/lib/auth/supabase'
export default function SignOutButton() { const router = useRouter(); async function signOut() { try { await createBrowserAuthClient().auth.signOut() } finally { router.push('/login'); router.refresh() } } return <button onClick={signOut} className="text-sm text-slate-400 hover:text-white">Sign out</button> }
