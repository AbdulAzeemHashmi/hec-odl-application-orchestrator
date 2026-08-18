import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export function isSupabaseAuthConfigured() {
  return url.startsWith('https://') && anonKey.length > 20
}

export function createBrowserAuthClient() {
  if (!isSupabaseAuthConfigured()) throw new Error('Supabase Auth is not configured.')
  return createClient(url, anonKey)
}

export async function getRequestUser(request: Request) {
  const token = request.headers.get('authorization')?.replace(/^Bearer\s+/i, '')
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!token || !serviceRoleKey || !url.startsWith('https://')) return null
  const supabase = createClient(url, serviceRoleKey, { auth: { persistSession: false, autoRefreshToken: false } })
  const { data, error } = await supabase.auth.getUser(token)
  return error ? null : data.user
}
