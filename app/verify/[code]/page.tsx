import { prisma } from '@/lib/db/prisma'

export default async function VerifyCertificate({ params }: { params: { code: string } }) {
  const certificate = await prisma.nocCertificate.findUnique({ where: { verificationCode: params.code } })
  const valid = Boolean(certificate && !certificate.revokedAt && (!certificate.expiresAt || certificate.expiresAt > new Date()))
  const snapshot = certificate?.snapshot as Record<string, unknown> | undefined
  return <main className="grid min-h-screen place-items-center bg-slate-100 p-6"><section className="w-full max-w-lg rounded-xl border border-slate-200 bg-white p-7 text-center shadow-sm"><p className="text-3xl">{valid ? '✓' : '!'}</p><h1 className="mt-3 text-2xl font-bold text-slate-900">{valid ? 'Certificate verified' : 'Certificate not valid'}</h1>{certificate && <><p className="mt-3 text-sm text-slate-600">Certificate number: <strong>{certificate.certificateNo}</strong></p><p className="mt-1 text-sm text-slate-600">Institution: <strong>{snapshot?.institutionName as string || snapshot?.heiName as string || 'Registered institution'}</strong></p><p className="mt-1 text-sm text-slate-500">Issued {certificate.issuedAt.toLocaleDateString()}</p></>}<p className="mt-5 text-xs leading-5 text-slate-500">This page confirms only the validity of an HEC ODL certificate and does not disclose the application dossier.</p></section></main>
}
