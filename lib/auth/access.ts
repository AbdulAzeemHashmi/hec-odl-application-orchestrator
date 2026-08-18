type SessionUser = {
  sub?: string
  email?: string
  name?: string
  ['https://hec.gov.pk/roles']?: string[]
  app_metadata?: Record<string, unknown>
  user_metadata?: Record<string, unknown>
}

export function isCaseManager(user: SessionUser) {
  const metadataRoles = (metadata?: Record<string, unknown>) => Array.isArray(metadata?.roles) ? metadata.roles.filter((role): role is string => typeof role === 'string') : typeof metadata?.role === 'string' ? [metadata.role] : []
  const roles = user['https://hec.gov.pk/roles'] || [...metadataRoles(user.app_metadata), ...metadataRoles(user.user_metadata)]
  return roles.some((role) => ['qad', 'admin', 'approving_authority'].includes(role))
}
