'use client'

import { useEffect, useState } from 'react'
type Certificate = { certificateNo: string; verificationCode: string; issuedAt: string; expiresAt?: string | null }

export default function NocCertificate({ id, institution }: { id: string; institution?: string }) {
  const [certificate, setCertificate] = useState<Certificate | null | undefined>(undefined)
  useEffect(() => { fetch(`/api/applications/${id}/certificate`).then(response => response.ok ? response.json() : null).then(setCertificate).catch(() => setCertificate(null)) }, [id])
  if (certificate === undefined) return <section className="mt-6 card text-sm text-slate-500">Loading certificate…</section>
  if (!certificate) return <section className="mt-6 card"><h2 className="font-semibold text-slate-900">NOC certificate pending issuance</h2><p className="mt-2 text-sm text-slate-500">An authorized QAD or decision officer must issue the immutable certificate record before it can be printed or verified.</p></section>
  const verificationUrl = typeof window === 'undefined' ? `/verify/${certificate.verificationCode}` : `${window.location.origin}/verify/${certificate.verificationCode}`
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(verificationUrl)}`
  return <section className="mt-6 card print:border-2 print:border-slate-900" id="noc-certificate"><div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between"><div><p className="eyebrow">Digitally verifiable</p><h2 className="mt-1 text-xl font-bold text-slate-900">NOC certificate</h2><p className="mt-2 text-sm text-slate-600">Certificate No: <strong>{certificate.certificateNo}</strong></p><p className="mt-1 text-sm text-slate-600">Institution: <strong>{institution || 'Registered institution'}</strong></p><p className="mt-1 text-sm text-slate-600">Issued: {new Date(certificate.issuedAt).toLocaleDateString()}</p><p className="mt-3 max-w-lg text-xs leading-5 text-slate-500">Scan the QR code or open the verification link to confirm that this certificate is active. The QR contains only a random verification token.</p></div><img className="h-36 w-36 rounded border bg-white p-2" src={qrUrl} alt="QR code for NOC verification" /></div><div className="mt-5 flex flex-wrap gap-3 print:hidden"><button className="btn-primary" onClick={() => window.print()}>Save / print PDF</button><a className="btn-secondary" href={verificationUrl} target="_blank" rel="noreferrer">Verify certificate</a></div></section>
}
