import { AIClient } from './base'

/**
 * Deterministic Rule-Based AI Engine
 * Operates offline with $0 API cost and zero paid credentials.
 * Evaluates HEC ODL policy criteria deterministically.
 */
export class DeterministicClient implements AIClient {
    async invoke(prompt: string): Promise<string> {
        const lower = prompt.toLowerCase()
        const missingItems: string[] = []
        let score = 85

        if (!lower.includes('evidence') || lower.includes('"evidence":[]') || lower.includes('"evidenceurls":[]')) {
            score -= 30
            missingItems.push('Documentary evidence link is missing or unattached')
        }

        if (!lower.includes('approval') && lower.includes('statutory')) {
            score -= 20
            missingItems.push('Statutory authority approval certificate missing')
        }

        if (!lower.includes('lms') && !lower.includes('portal')) {
            score -= 15
            missingItems.push('Learning Management System (LMS) technical specifications unverified')
        }

        if (!lower.includes('faculty') && lower.includes('ratio')) {
            score -= 15
            missingItems.push('Dedicated ODL faculty ratio compliance proof missing')
        }

        const finalScore = Math.max(0, score)
        const summary = missingItems.length === 0 
            ? 'Claim satisfies basic HEC ODL statutory requirements.' 
            : `Deficiencies identified: ${missingItems.join('; ')}.`

        return JSON.stringify({
            score: finalScore,
            provider: 'Deterministic Safeguard Engine ($0 Free Tier)',
            missingItems,
            summary,
            timestamp: new Date().toISOString()
        })
    }

    async isHealthy(): Promise<boolean> {
        return true
    }

    getName(): string {
        return 'Deterministic Safeguard Engine'
    }
}
