import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { getSession } from '@auth0/nextjs-auth0'
import { calculateScrutiny, DossierParameter } from '@/lib/workflow/scrutiny'
import { isCaseManager } from '@/lib/auth/access'

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
    if (!isCaseManager(session.user)) {
        return NextResponse.json({ error: 'Only QAD case managers may run scrutiny.' }, { status: 403 })
    }

    try {
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

        const evidenceUrls = Array.isArray(application.evidenceUrls)
            ? application.evidenceUrls.filter((url): url is string => typeof url === 'string')
            : []
        const values = { ...(data.partA || {}), ...(data.partB || {}), ...data }
        const fieldByParameter = ['organizational', 'hr', 'technology', 'assessment', 'aims', 'resources', 'qualityAssurance']
        const dossier = parameters.map((label, index): DossierParameter => ({
            id: `core-${index + 1}`,
            label,
            claim: values[fieldByParameter[index]] ? 'YES' : 'NO',
            evidenceUrls,
        }))
        const result = calculateScrutiny(dossier)

        await prisma.application.update({
            where: { id: params.id },
            data: { scrutinyScore: result.score, status: result.route === 'PANEL_REVIEW' ? 'PANEL_REVIEW' : 'RETURNED' },
        })

        return NextResponse.json({
            success: true,
            score: result.score,
            route: result.route,
            details: result.items,
        })
    } catch (error: any) {
        return NextResponse.json(
            { error: `Scrutiny failed: ${error.message}` },
            { status: 500 }
        )
    }
}
