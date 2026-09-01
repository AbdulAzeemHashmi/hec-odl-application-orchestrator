import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'

// Deliberately public: QR codes contain only this case identifier, and the
// response reveals verification status rather than the private dossier.
export async function GET(_request: Request, { params }: { params: { id: string } }) {
  const application = await prisma.application.findUnique({ where: { id: params.id }, select: { id: true, status: true, updatedAt: true, data: true } })
  if (!application || application.status !== 'APPROVED') return NextResponse.json({ verified: false }, { status: 404 })
  const data = application.data as Record<string, unknown>
  return NextResponse.json({ verified: true, certificateNumber: `HEC-ODL-${application.id.slice(-8).toUpperCase()}`, issuedAt: application.updatedAt, institution: data?.institutionName || data?.heiName || 'Registered institution' })
}
