'use client'

import { useEffect, useState } from 'react'
import { generateQrDataUrl } from '@/lib/utils/qrcode'
import { useLocale } from './LocaleProvider'

type Certificate = {
  id: string
  certificateNo: string
  verificationCode: string
  issuedAt: string
  expiresAt?: string | null
  revokedAt?: string | null
  snapshot?: any
}

export default function NocCertificate({
  id,
  institution,
}: {
  id: string
  institution?: string
}) {
  const [certificate, setCertificate] = useState<Certificate | null | undefined>(undefined)
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('')
  const { t, isRtl } = useLocale()

  useEffect(() => {
    fetch(`/api/applications/${id}/certificate`)
      .then((res) => (res.ok ? res.json() : null))
      .then(async (data) => {
        setCertificate(data)
        if (data?.verificationCode) {
          const origin = typeof window !== 'undefined' ? window.location.origin : ''
          const url = `${origin}/verify/${data.verificationCode}`
          const qr = await generateQrDataUrl(url)
          setQrCodeUrl(qr)
        }
      })
      .catch(() => setCertificate(null))
  }, [id])

  if (certificate === undefined) {
    return (
      <section className="mt-6 card text-sm text-slate-500">
        {t('Loading certificate…')}
      </section>
    )
  }

  if (!certificate) {
    return (
      <section className="mt-6 card border-dashed border-slate-300 bg-slate-50/50">
        <h2 className="font-semibold text-slate-900">{t('NOC certificate pending issuance')}</h2>
        <p className="mt-2 text-sm text-slate-500">
          {t('An authorized QAD or decision officer must issue the immutable certificate record before it can be printed or verified.')}
        </p>
      </section>
    )
  }

  const verificationUrl =
    typeof window === 'undefined'
      ? `/verify/${certificate.verificationCode}`
      : `${window.location.origin}/verify/${certificate.verificationCode}`

  const instName =
    institution ||
    certificate.snapshot?.institutionName ||
    certificate.snapshot?.heiName ||
    'Registered Higher Education Institution'

  return (
    <div className="mt-6">
      {/* Action Bar (hidden in print) */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 print:hidden">
        <div>
          <span className="eyebrow">{t('Digitally verifiable')}</span>
          <h3 className="text-lg font-bold text-slate-900">{t('NOC certificate')}</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => window.print()}
            className="btn-primary flex items-center gap-2 shadow-md"
          >
            <span>🖨️</span>
            <span>{t('Save / print PDF')}</span>
          </button>
          <a
            href={verificationUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-secondary flex items-center gap-2"
          >
            <span>🛡️</span>
            <span>{t('Verify certificate')}</span>
          </a>
        </div>
      </div>

      {/* Official Certificate Layout */}
      <section
        id="noc-certificate"
        className="relative overflow-hidden rounded-2xl border-4 border-double border-slate-800 bg-white p-8 shadow-xl print:m-0 print:border-4 print:border-slate-900 print:p-8"
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        {/* Certificate Watermark */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.03]">
          <span className="text-9xl font-black tracking-widest text-slate-950">HEC ODL</span>
        </div>

        {/* Certificate Header */}
        <div className="border-b-2 border-slate-200 pb-6 text-center">
          <div className="mx-auto mb-3 grid h-16 w-16 place-items-center rounded-full bg-blue-900 text-2xl font-bold text-white shadow-md">
            HEC
          </div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-900">
            {t('Higher Education Commission of Pakistan')}
          </p>
          <h1 className="mt-1 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
            {t('Official HEC Institutional NOC')}
          </h1>
          <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-500">
            {t('Quality Assurance Division - ODL Section')}
          </p>
        </div>

        {/* Certificate Body */}
        <div className="my-8 space-y-6">
          <p className="text-center text-sm leading-relaxed text-slate-700 sm:text-base">
            {t(
              'This certificate confirms that the institution has fulfilled all regulatory requirements for Open & Distance Learning programs.'
            )}
          </p>

          <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs font-semibold uppercase text-slate-400">{t('Institution:')}</p>
                <p className="mt-0.5 text-base font-bold text-slate-900">{instName}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase text-slate-400">{t('Certificate No:')}</p>
                <p className="mt-0.5 text-base font-mono font-bold text-blue-800">
                  {certificate.certificateNo}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase text-slate-400">{t('Issued:')}</p>
                <p className="mt-0.5 text-sm font-semibold text-slate-800">
                  {new Date(certificate.issuedAt).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase text-slate-400">{t('Confirmation due')}:</p>
                <p className="mt-0.5 text-sm font-semibold text-slate-800">
                  {new Date(
                    new Date(certificate.issuedAt).setFullYear(
                      new Date(certificate.issuedAt).getFullYear() + 3
                    )
                  ).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })} (3-Year Milestone)
                </p>
              </div>
            </div>
          </div>

          {/* Verification & Local QR Section */}
          <div className="flex flex-col items-center justify-between gap-6 rounded-xl border border-blue-100 bg-blue-50/40 p-5 sm:flex-row">
            <div className="flex-1 text-center sm:text-start">
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800">
                <span>✓</span> {t('Digitally verifiable')}
              </span>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                {t(
                  'Scan the QR code or open the verification link to confirm that this certificate is active. The QR contains only a random verification token.'
                )}
              </p>
              <p className="mt-2 font-mono text-[11px] text-slate-500 truncate max-w-sm">
                Token: {certificate.verificationCode}
              </p>
            </div>
            {qrCodeUrl ? (
              <div className="flex-shrink-0 text-center">
                <img
                  src={qrCodeUrl}
                  alt="NOC Verification QR Code"
                  className="h-32 w-32 rounded-lg border-2 border-slate-300 bg-white p-1.5 shadow-sm"
                />
                <span className="mt-1 block text-[10px] font-semibold text-slate-500">
                  Scan to verify
                </span>
              </div>
            ) : (
              <div className="grid h-32 w-32 place-items-center rounded-lg border border-slate-200 bg-white text-xs text-slate-400">
                Generating QR...
              </div>
            )}
          </div>
        </div>

        {/* Certificate Signatures / Seal */}
        <div className="mt-10 flex flex-col justify-between border-t border-slate-200 pt-6 sm:flex-row sm:items-end gap-6 text-center sm:text-start">
          <div>
            <div className="inline-block border-b-2 border-slate-800 pb-1 font-serif text-sm font-bold text-slate-900">
              Quality Assurance Division
            </div>
            <p className="mt-1 text-xs text-slate-500">Higher Education Commission, Islamabad</p>
          </div>
          <div className="text-center sm:text-end">
            <div className="inline-block border-b-2 border-slate-800 pb-1 font-serif text-sm font-bold text-slate-900">
              Authorized Authority Signatory
            </div>
            <p className="mt-1 text-xs text-slate-500">Competent Approval Authority</p>
          </div>
        </div>
      </section>
    </div>
  )
}
