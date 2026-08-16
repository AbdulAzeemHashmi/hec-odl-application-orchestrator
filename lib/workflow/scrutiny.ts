export type Claim = 'YES' | 'NO' | 'NA'
export type Completeness = 'COMPLETE' | 'INCOMPLETE' | 'NOT_APPLICABLE'

export interface DossierParameter {
  id: string
  label: string
  claim: Claim
  evidenceUrls?: string[]
  remarks?: string
}

export interface ScrutinyResult {
  score: number
  complete: number
  incomplete: number
  notApplicable: number
  route: 'PANEL_REVIEW' | 'RETURN_FOR_IMPROVEMENT' | 'RETURN_FOR_RECTIFICATION'
  items: Array<DossierParameter & { outcome: Completeness }>
}

/** Implements SRS BR-04 through BR-07. AI can advise reviewers, but never decides this result. */
export function calculateScrutiny(parameters: DossierParameter[]): ScrutinyResult {
  const items = parameters.map((parameter) => {
    const hasEvidence = (parameter.evidenceUrls ?? []).some(Boolean)
    const outcome: Completeness = parameter.claim === 'NA'
      ? 'NOT_APPLICABLE'
      : parameter.claim === 'YES' && hasEvidence ? 'COMPLETE' : 'INCOMPLETE'
    return { ...parameter, outcome }
  })
  const complete = items.filter((item) => item.outcome === 'COMPLETE').length
  const incomplete = items.filter((item) => item.outcome === 'INCOMPLETE').length
  const notApplicable = items.length - complete - incomplete
  const score = complete + incomplete === 0 ? 0 : Math.round((complete / (complete + incomplete)) * 100)
  const route = score >= 75 ? 'PANEL_REVIEW' : score >= 50 ? 'RETURN_FOR_IMPROVEMENT' : 'RETURN_FOR_RECTIFICATION'
  return { score, complete, incomplete, notApplicable, route, items }
}
