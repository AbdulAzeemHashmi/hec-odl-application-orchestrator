import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { getSession } from '@auth0/nextjs-auth0'

export async function GET() {
    const session = await getSession()
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const applications = await prisma.application.findMany({
        where: { heiId: session.user.sub },
        orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(applications)
}

export async function POST(request: Request) {
    const session = await getSession()
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await request.json()
    const { data, evidenceUrls } = body

    const application = await prisma.application.create({
        data: {
            heiId: session.user.sub,
            data: data || {},
            evidenceUrls: evidenceUrls || [],
            status: 'SUBMITTED',
        },
    })

    return NextResponse.json(application, { status: 201 })
}
