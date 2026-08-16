import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { getSession } from '@auth0/nextjs-auth0'
import { isCaseManager } from '@/lib/auth/access'

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    const session = await getSession()
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const application = await prisma.application.findUnique({
        where: { id: params.id },
    })

    if (!application) {
        return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    // Security check: HEI can only view their own, QAD/Admin can view all
    if (application.heiId !== session.user.sub && !isCaseManager(session.user)) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    return NextResponse.json(application)
}

export async function PATCH(
    request: Request,
    { params }: { params: { id: string } }
) {
    const session = await getSession()
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const existing = await prisma.application.findUnique({ where: { id: params.id } })
    if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    if (existing.heiId !== session.user.sub && !isCaseManager(session.user)) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }
    const body = await request.json()
    const application = await prisma.application.update({
        where: { id: params.id },
        // Do not allow clients to reassign ownership or overwrite immutable identifiers.
        data: { data: body.data, evidenceUrls: body.evidenceUrls, status: body.status },
    })

    return NextResponse.json(application)
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    const session = await getSession()
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const existing = await prisma.application.findUnique({ where: { id: params.id } })
    if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    if (existing.heiId !== session.user.sub && !isCaseManager(session.user)) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }
    // SRS BR-16: preserve the history; a user may not permanently delete a case.
    const application = await prisma.application.update({ where: { id: params.id }, data: { status: 'REFUSED' } })
    return NextResponse.json({ success: true, application })
}
