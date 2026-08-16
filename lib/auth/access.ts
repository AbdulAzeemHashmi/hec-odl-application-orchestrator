type SessionUser = {
  sub?: string
  email?: string
  name?: string
  ['https://hec.gov.pk/roles']?: string[]
}

export function isCaseManager(user: SessionUser) {
  const roles = user['https://hec.gov.pk/roles'] || []
  return roles.some((role) => ['qad', 'admin', 'approving_authority'].includes(role))
}
