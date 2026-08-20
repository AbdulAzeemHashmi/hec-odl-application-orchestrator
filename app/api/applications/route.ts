import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { getRequestUser } from '@/lib/auth/supabase'
import { isCaseManager } from '@/lib/auth/access'

export async function GET(request: Request) {
    const user = await getRequestUser(request)
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const canViewAll = isCaseManager(user as any)
    const applications = await prisma.application.findMany({
        where: canViewAll ? {} : { heiId: user.id },
        orderBy: { createdAt: 'desc' },
        include: { versions: { orderBy: { version: 'desc' } } }
    })

    return NextResponse.json(applications)
}

export async function POST(request: Request) {
    const user = await getRequestUser(request)
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await request.json()
    const { data, evidenceUrls } = body
    const role = (user.user_metadata?.role as string) || 'hei'
    const userEmail = user.email || `${user.id}@supabase.local`

    // Execute atomic transaction for user upsert + application + initial version audit
    const result = await prisma.$transaction(async (tx) => {
        await tx.user.upsert({
            where: { email: userEmail },
            update: { name: user.user_metadata?.full_name || undefined, role },
            create: {
                id: user.id,
                email: userEmail,
                name: user.user_metadata?.full_name,
                role,
            },
        })

        const application = await tx.application.create({
            data: {
                heiId: user.id,
                data: data || {},
                evidenceUrls: evidenceUrls || [],
                status: 'SUBMITTED',
                versions: {
                    create: {
                        version: 1,
                        data: data || {},
                        evidenceUrls: evidenceUrls || [],
                        remarks: 'Initial application dossier submission',
                    }
                }
            },
            include: { versions: true }
        })

        return application
    })

    return NextResponse.json(result, { status: 201 })
}
