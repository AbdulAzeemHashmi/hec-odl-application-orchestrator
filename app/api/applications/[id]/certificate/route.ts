import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { getRequestUser } from '@/lib/auth/supabase'
import { isCaseManager } from '@/lib/auth/access'
import type { Prisma } from '@prisma/client'

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const user = await getRequestUser(request)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const application = await prisma.application.findUnique({ where: { id: params.id }, select: { heiId: true } })
  if (!application || (application.heiId !== user.id && !isCaseManager(user))) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  const certificate = await prisma.nocCertificate.findFirst({ where: { applicationId: params.id, revokedAt: null }, orderBy: { issuedAt: 'desc' } })
  return NextResponse.json(certificate)
}

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const user = await getRequestUser(request)
  if (!user || !isCaseManager(user)) return NextResponse.json({ error: 'Only case managers can issue certificates' }, { status: 403 })
  const application = await prisma.application.findUnique({ where: { id: params.id } })
  if (!application || application.status !== 'APPROVED') return NextResponse.json({ error: 'An approved application is required' }, { status: 400 })
  const email = user.email || `${user.id}@supabase.local`
  const certificate = await prisma.$transaction(async tx => {
    await tx.user.upsert({ where: { email }, update: {}, create: { id: user.id, email, name: user.user_metadata?.full_name, role: (user.user_metadata?.role as string) || 'qad' } })
    const existing = await tx.nocCertificate.findFirst({ where: { applicationId: params.id, revokedAt: null }, orderBy: { issuedAt: 'desc' } })
    if (existing) return existing
    const code = crypto.randomUUID().replaceAll('-', '')
    return tx.nocCertificate.create({ data: { applicationId: params.id, certificateNo: `HEC-ODL-${new Date().getFullYear()}-${application.id.slice(-8).toUpperCase()}`, verificationCode: code, snapshot: application.data as Prisma.InputJsonValue, issuedById: user.id } })
  })
  return NextResponse.json(certificate, { status: 201 })
}
