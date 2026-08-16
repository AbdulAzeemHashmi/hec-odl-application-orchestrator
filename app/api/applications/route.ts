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

    // Keep the local user record in sync with Auth0 before creating the required relation.
    await prisma.user.upsert({
        where: { email: session.user.email || `${session.user.sub}@auth0.local` },
        update: { name: session.user.name || undefined },
        create: {
            id: session.user.sub,
            email: session.user.email || `${session.user.sub}@auth0.local`,
            name: session.user.name,
        },
    })

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
