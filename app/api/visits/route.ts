import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { getRequestUser } from '@/lib/auth/supabase'
import { isCaseManager } from '@/lib/auth/access'
import { createAndDeliverNotification } from '@/lib/notifications/service'

export async function GET(request: Request) {
  const user = await getRequestUser(request)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const visits = await prisma.visit.findMany({
    where: isCaseManager(user) ? {} : { application: { heiId: user.id } },
    include: { application: { select: { id: true, data: true, hei: { select: { email: true } } } } },
    orderBy: { scheduledFor: 'asc' },
  })
  return NextResponse.json(visits)
}

export async function POST(request: Request) {
  const user = await getRequestUser(request)
  if (!user || !isCaseManager(user))
    return NextResponse.json({ error: 'Only case managers can schedule visits' }, { status: 403 })

  const body = await request.json()
  if (!body.applicationId || !body.scheduledFor || !body.venue)
    return NextResponse.json({ error: 'Application, date and venue are required' }, { status: 400 })

  const application = await prisma.application.findUnique({
    where: { id: body.applicationId },
    include: { hei: { select: { id: true, email: true } } },
  })

  if (!application) return NextResponse.json({ error: 'Application not found' }, { status: 404 })

  const visit = await prisma.visit.create({
    data: {
      applicationId: body.applicationId,
      scheduledFor: new Date(body.scheduledFor),
      venue: body.venue,
      attendees: Array.isArray(body.attendees) ? body.attendees : [],
      notes: body.notes || null,
      createdById: user.id,
    },
  })

  // Notify HEI applicant
  await createAndDeliverNotification({
    userId: application.heiId,
    recipientEmail: application.hei?.email,
    title: 'Site visit scheduled',
    message: `An onsite inspection visit for application ${application.id.slice(0, 8)} is scheduled for ${new Date(
      body.scheduledFor
    ).toLocaleString()} at ${body.venue}.`,
    href: '/visits',
    applicationId: application.id,
    type: 'visit_scheduled',
  })

  return NextResponse.json(visit, { status: 201 })
}
