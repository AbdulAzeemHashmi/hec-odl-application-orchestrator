import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'

// Deliberately public: QR codes contain only this case identifier, and the
// response reveals verification status rather than the private dossier.
export async function GET(_request: Request, { params }: { params: { id: string } }) {
  const certificate = await prisma.nocCertificate.findUnique({ where: { verificationCode: params.id } })
  const valid = Boolean(certificate && !certificate.revokedAt && (!certificate.expiresAt || certificate.expiresAt > new Date()))
  if (!certificate) return NextResponse.json({ verified: false }, { status: 404 })
  const snapshot = certificate.snapshot as Record<string, unknown>
  return NextResponse.json({ verified: valid, certificateNumber: certificate.certificateNo, issuedAt: certificate.issuedAt, expiresAt: certificate.expiresAt, institution: snapshot?.institutionName || snapshot?.heiName || 'Registered institution' })
}
