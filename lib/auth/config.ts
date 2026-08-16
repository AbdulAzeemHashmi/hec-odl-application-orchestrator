/** Safe validation only; it never exposes credential values. */
export function isAuth0Configured() {
  const secret = process.env.AUTH0_SECRET || ''
  const issuer = process.env.AUTH0_ISSUER_BASE_URL || ''
  const clientId = process.env.AUTH0_CLIENT_ID || ''
  const clientSecret = process.env.AUTH0_CLIENT_SECRET || ''
  try {
    const host = new URL(issuer).hostname
    return secret.length >= 32 && clientId.length >= 16 && clientSecret.length >= 16
      && host.endsWith('.auth0.com') && !host.includes('your-tenant')
  } catch {
    return false
  }
}
