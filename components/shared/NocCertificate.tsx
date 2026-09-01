'use client'

export default function NocCertificate({ id, institution }: { id: string; institution?: string }) {
  const verificationUrl = typeof window === 'undefined' ? `/api/noc/verify/${id}` : `${window.location.origin}/api/noc/verify/${id}`
  const certificateNumber = `HEC-ODL-${id.slice(-8).toUpperCase()}`
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(verificationUrl)}`
  return <section className="mt-6 card print:border-2 print:border-slate-900" id="noc-certificate">
    <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between"><div><p className="eyebrow">Digitally verifiable</p><h2 className="mt-1 text-xl font-bold text-slate-900">NOC certificate</h2><p className="mt-2 text-sm text-slate-600">Certificate No: <strong>{certificateNumber}</strong></p><p className="mt-1 text-sm text-slate-600">Institution: <strong>{institution || 'Registered institution'}</strong></p><p className="mt-3 max-w-lg text-xs leading-5 text-slate-500">Scan the QR code or open the verification link to confirm this approved NOC directly with the portal. The QR service is free and receives only this public verification URL.</p></div><img className="h-36 w-36 rounded border bg-white p-2" src={qrUrl} alt="QR code for NOC verification" /></div>
    <div className="mt-5 flex flex-wrap gap-3 print:hidden"><button className="btn-primary" onClick={() => window.print()}>Save / print PDF</button><a className="btn-secondary" href={verificationUrl} target="_blank" rel="noreferrer">Verify certificate</a></div>
  </section>
}
