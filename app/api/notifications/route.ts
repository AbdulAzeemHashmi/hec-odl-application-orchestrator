import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { getRequestUser } from '@/lib/auth/supabase'

export async function GET(request: Request) {
  const user = await getRequestUser(request)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const notifications = await prisma.notification.findMany({
    where: { userId: user.id }, orderBy: { createdAt: 'desc' }, take: 20,
  })
  return NextResponse.json(notifications)
}

export async function PATCH(request: Request) {
  const user = await getRequestUser(request)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id, all } = await request.json()
  await prisma.notification.updateMany({
    where: { userId: user.id, ...(all ? {} : { id }) }, data: { readAt: new Date() },
  })
  return NextResponse.json({ ok: true })
}
