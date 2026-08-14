import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { getSession } from '@auth0/nextjs-auth0'
import { RAGPipeline } from '@/lib/ai/rag/pipeline'
import { scrutinyChain } from '@/lib/ai/chains/scrutiny'

export async function POST(
    request: Request,
    { params }: { params: { id: string } }
) {
    const session = await getSession()
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const application = await prisma.application.findUnique({
        where: { id: params.id },
    })

    if (!application) {
        return NextResponse.json({ error: 'Application not found' }, { status: 404 })
    }

    try {
        const rag = new RAGPipeline()
        const data = application.data as any

        // Extract parameters from Part A and Part B of the dossier
        const parameters = [
            'Organizational Readiness',
            'HR Readiness',
            'Technological Readiness',
            'Assessment & Evaluation',
            'Program Aims & Goals',
            'Learning Resources',
            'Quality Assurance',
        ]

        const scrutinyResults: any[] = []

        for (const param of parameters) {
            const claim = data[param] || 'Not provided'
            const prompt = `
        Analyze the following parameter for completeness in an ODL application dossier:
        Parameter: ${param}
        HEI's Claim/Evidence: ${JSON.stringify(claim)}

        Requirements (from HEC ODL Policy):
        - Must provide clear evidence for each claim.
        - Technology must meet minimum specifications.
        - Statutory approvals must be attached.

        Give a score out of 100 and list any missing items.
      `

            // Use the failover router via RAG pipeline's answer method
            const analysis = await rag.answerQuestion(prompt)
            scrutinyResults.push({ parameter: param, analysis })
        }

        // Update the application with scrutiny score
        const avgScore = scrutinyResults.reduce((acc, curr) => {
            // Extract number from analysis (simple heuristic)
            const scoreMatch = curr.analysis.match(/(\d+)/)
            return acc + (scoreMatch ? parseInt(scoreMatch[0]) : 50)
        }, 0) / scrutinyResults.length

        await prisma.application.update({
            where: { id: params.id },
            data: { scrutinyScore: avgScore, status: 'UNDER_SCRUTINY' },
        })

        return NextResponse.json({
            success: true,
            score: avgScore,
            details: scrutinyResults,
        })
    } catch (error: any) {
        return NextResponse.json(
            { error: `Scrutiny failed: ${error.message}` },
            { status: 500 }
        )
    }
}