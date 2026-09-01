import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { getRequestUser } from '@/lib/auth/supabase'
import { isCaseManager } from '@/lib/auth/access'

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const user = await getRequestUser(request)
  if (!user || !isCaseManager(user)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  const body = await request.json()
  const visit = await prisma.visit.update({ where: { id: params.id }, data: { ...(body.scheduledFor ? { scheduledFor: new Date(body.scheduledFor) } : {}), ...(body.venue ? { venue: body.venue } : {}), ...(Array.isArray(body.attendees) ? { attendees: body.attendees } : {}), ...(body.notes !== undefined ? { notes: body.notes } : {}), ...(body.status ? { status: body.status } : {}) } })
  return NextResponse.json(visit)
}
