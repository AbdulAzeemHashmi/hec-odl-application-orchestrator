import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { getSession } from '@auth0/nextjs-auth0'

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
    if (application.heiId !== session.user.sub) {
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

    const body = await request.json()
    const application = await prisma.application.update({
        where: { id: params.id },
        data: body,
    })

    return NextResponse.json(application)
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    const session = await getSession()
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    await prisma.application.delete({ where: { id: params.id } })
    return NextResponse.json({ success: true })
}