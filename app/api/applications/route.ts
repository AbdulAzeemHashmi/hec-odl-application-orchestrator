import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { getRequestUser } from '@/lib/auth/supabase'

export async function GET(request: Request) {
    const user = await getRequestUser(request)
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const applications = await prisma.application.findMany({
        where: { heiId: user.id },
        orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(applications)
}

export async function POST(request: Request) {
    const user = await getRequestUser(request)
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await request.json()
    const { data, evidenceUrls } = body

    // Keep the local user record in sync with Auth0 before creating the required relation.
    await prisma.user.upsert({
        where: { email: user.email || `${user.id}@supabase.local` },
        update: { name: user.user_metadata?.full_name || undefined },
        create: {
            id: user.id,
            email: user.email || `${user.id}@supabase.local`,
            name: user.user_metadata?.full_name,
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
