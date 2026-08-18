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
    })

    return NextResponse.json(applications)
}

export async function POST(request: Request) {
    const user = await getRequestUser(request)
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await request.json()
    const { data, evidenceUrls } = body
    const role = (user.user_metadata?.role as string) || 'hei'

    await prisma.user.upsert({
        where: { email: user.email || `${user.id}@supabase.local` },
        update: { name: user.user_metadata?.full_name || undefined, role },
        create: {
            id: user.id,
            email: user.email || `${user.id}@supabase.local`,
            name: user.user_metadata?.full_name,
            role,
        },
    })

    const application = await prisma.application.create({
        data: {
            heiId: user.id,
            data: data || {},
            evidenceUrls: evidenceUrls || [],
            status: 'SUBMITTED',
        },
    })

    return NextResponse.json(application, { status: 201 })
}
