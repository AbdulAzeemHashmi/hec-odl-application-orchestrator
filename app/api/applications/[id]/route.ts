import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { getRequestUser } from '@/lib/auth/supabase'
import { isCaseManager } from '@/lib/auth/access'
import { deliverStatusEmail } from '@/lib/notifications/email'

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    const user = await getRequestUser(request)
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const application = await prisma.application.findUnique({
        where: { id: params.id },
    })

    if (!application) {
        return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    // Security check: HEI can only view their own, QAD/Admin can view all
    if (application.heiId !== user.id && !isCaseManager(user)) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    return NextResponse.json(application)
}

export async function PATCH(
    request: Request,
    { params }: { params: { id: string } }
) {
    const user = await getRequestUser(request)
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const existing = await prisma.application.findUnique({ where: { id: params.id } })
    if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    if (existing.heiId !== user.id && !isCaseManager(user)) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }
    const body = await request.json()
    const manager = isCaseManager(user)
    // HEIs may edit their dossier, but never advance a workflow status themselves.
    const nextStatus = manager && typeof body.status === 'string' ? body.status : existing.status
    const application = await prisma.$transaction(async (tx) => {
        const updated = await tx.application.update({
            where: { id: params.id },
            data: {
                ...(body.data !== undefined ? { data: body.data } : {}),
                ...(body.evidenceUrls !== undefined ? { evidenceUrls: body.evidenceUrls } : {}),
                status: nextStatus,
            },
        })
        if (manager && nextStatus !== existing.status) {
            await tx.notification.create({
                data: {
                    userId: existing.heiId,
                    title: 'Application status updated',
                    message: `Your application ${existing.id.slice(0, 8)} is now ${nextStatus.replaceAll('_', ' ')}.`,
                    href: `/hei/applications/${existing.id}`,
                },
            })
            const applicant = await tx.user.findUnique({ where: { id: existing.heiId }, select: { email: true } })
            if (applicant?.email) await deliverStatusEmail({ recipient: applicant.email, applicationId: existing.id, status: nextStatus })
        }
        return updated
    })

    return NextResponse.json(application)
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    const user = await getRequestUser(request)
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const existing = await prisma.application.findUnique({ where: { id: params.id } })
    if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    if (existing.heiId !== user.id && !isCaseManager(user)) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }
    // SRS BR-16: preserve the history; a user may not permanently delete a case.
    const application = await prisma.application.update({ where: { id: params.id }, data: { status: 'REFUSED' } })
    return NextResponse.json({ success: true, application })
}
