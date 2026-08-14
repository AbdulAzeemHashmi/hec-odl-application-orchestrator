import { prisma } from '../lib/db/prisma'
import { RAGPipeline } from '../lib/ai/rag/pipeline'

const policyDocuments = [
    {
        content: `HEC ODL Policy 2024: Clause 2.2 - An HEI must have offered the proposed program in conventional mode for at least two batches before applying for ODL NOC.`,
        metadata: { source: 'ODL Policy 2024', section: '2.2' },
    },
    {
        content: `HEC ODL Policy 2024: Clause 3.1 - The initial scrutiny requires a completeness score of 75% or above to proceed to Expert Panel review.`,
        metadata: { source: 'ODL Policy 2024', section: '3.1' },
    },
    {
        content: `HEC ODL Policy 2024: Clause 4.5 - Expert Panel can recommend Approved, Approved with Conditions, or Not Approved.`,
        metadata: { source: 'ODL Policy 2024', section: '4.5' },
    },
    {
        content: `HEC ODL Policy 2024: Clause 6.2 - The Institutional NOC is valid for three years, after which the HEI must apply for confirmation.`,
        metadata: { source: 'ODL Policy 2024', section: '6.2' },
    },
    {
        content: `HEC ODL Policy 2024: Clause 8.1 - Learning Management System (LMS) is mandatory for ODL programs. It must support SCORM, gamification, and accessibility features.`,
        metadata: { source: 'ODL Policy 2024', section: '8.1' },
    },
]

async function main() {
    console.log('🔄 Starting policy document ingestion...')
    const rag = new RAGPipeline()
    const count = await rag.ingestDocuments(policyDocuments)
    console.log(`✅ Successfully ingested ${count} documents.`)
    process.exit(0)
}

main().catch((error) => {
    console.error('❌ Failed to seed policies:', error)
    process.exit(1)
})