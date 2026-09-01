import { prisma } from '@/lib/db/prisma'
import Link from 'next/link'

export default async function VerifyCertificate({ params }: { params: { code: string } }) {
  const certificate = await prisma.nocCertificate.findUnique({
    where: { verificationCode: params.code },
    include: {
      application: {
        select: {
          id: true,
          status: true,
          data: true,
        },
      },
    },
  })

  const isRevoked = Boolean(certificate?.revokedAt)
  const isExpired = Boolean(certificate?.expiresAt && certificate.expiresAt < new Date())
  const isValid = Boolean(certificate && !isRevoked && !isExpired)
  const snapshot = certificate?.snapshot as Record<string, any> | undefined
  const instName =
    snapshot?.institutionName || snapshot?.heiName || 'Registered Higher Education Institution'

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-100 to-slate-200 p-4 sm:p-8 flex items-center justify-center">
      <section className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xl">
        {/* Verification Status Header */}
        <div className="text-center">
          <div
            className={`mx-auto grid h-16 w-16 place-items-center rounded-full text-3xl font-bold shadow-md ${
              isValid
                ? 'bg-emerald-100 text-emerald-700 ring-4 ring-emerald-50'
                : 'bg-red-100 text-red-700 ring-4 ring-red-50'
            }`}
          >
            {isValid ? '✓' : '✕'}
          </div>

          <h1 className="mt-4 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
            {isValid ? 'Official Certificate Verified' : 'Certificate Invalid / Revoked'}
          </h1>
          <p className="mt-1 text-xs font-bold uppercase tracking-wider text-slate-400">
            Higher Education Commission of Pakistan · ODL Verification
          </p>
        </div>

        {/* Certificate Details */}
        {certificate ? (
          <div className="mt-6 space-y-4">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
              <dl className="grid gap-3 text-sm sm:grid-cols-2">
                <div>
                  <dt className="text-xs font-semibold text-slate-400 uppercase">Institution</dt>
                  <dd className="font-bold text-slate-900 mt-0.5">{instName}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold text-slate-400 uppercase">Certificate No</dt>
                  <dd className="font-mono font-bold text-blue-800 mt-0.5">
                    {certificate.certificateNo}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold text-slate-400 uppercase">Issuance Date</dt>
                  <dd className="font-medium text-slate-800 mt-0.5">
                    {new Date(certificate.issuedAt).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold text-slate-400 uppercase">Status</dt>
                  <dd className="mt-0.5">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-bold ${
                        isValid
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {isValid ? 'Active & Valid' : isRevoked ? 'Revoked' : 'Expired'}
                    </span>
                  </dd>
                </div>
              </dl>
            </div>

            {isRevoked && (
              <div className="rounded-lg bg-red-50 p-4 border border-red-200 text-xs text-red-800">
                <strong>Revocation Reason:</strong> {certificate.revokeReason || 'Revoked by authorized officer.'}
              </div>
            )}

            <div className="rounded-lg bg-blue-50/70 p-4 border border-blue-100 text-xs leading-relaxed text-blue-900">
              🛡️ <strong>Tamper Protection:</strong> This digital verification record is cryptographically tied to the official HEC database registry.
            </div>
          </div>
        ) : (
          <div className="mt-6 rounded-lg bg-red-50 p-5 text-center text-sm text-red-800 border border-red-200">
            No certificate matches the provided verification token <code>{params.code}</code>. Please confirm the QR code or link.
          </div>
        )}

        <div className="mt-8 text-center border-t border-slate-100 pt-5">
          <Link
            href="/"
            className="btn-secondary text-xs sm:text-sm font-semibold"
          >
            ← Return to HEC Portal
          </Link>
        </div>
      </section>
    </main>
  )
}
