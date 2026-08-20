import Link from 'next/link'

const stages = ['Submit dossier', 'QAD scrutiny', 'Expert panel', 'Visit & report', 'Decision & NOC']

export default function Home() {
  return <main className="min-h-screen bg-slate-50 text-slate-900">
    <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5"><div className="text-xl font-bold tracking-tight text-blue-800">HEC <span className="text-slate-700">ODL Portal</span></div><div className="flex gap-3"><Link href="/login" className="btn-secondary">Sign in</Link><Link href="/signup" className="btn-primary">Create account</Link></div></header>
    <section className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[1.15fr_.85fr] lg:items-center"><div><p className="eyebrow">QUALITY ASSURANCE DIVISION · ODL SECTION</p><h1 className="mt-4 max-w-3xl text-5xl font-bold leading-tight tracking-tight text-slate-950">A complete workspace for ODL NOC applications.</h1><p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">Submit the Model Application Dossier, manage evidence, review cases, coordinate Expert Panels, record visits, issue decisions and track three-year confirmation milestones.</p><div className="mt-8 flex flex-wrap gap-3"><Link href="/signup" className="btn-primary">Register your HEI</Link><Link href="/llm" className="btn-secondary">Open policy assistant</Link></div></div><div className="rounded-3xl bg-blue-900 p-7 text-white shadow-2xl shadow-blue-900/20"><p className="text-sm font-semibold text-blue-200">APPLICATION LIFECYCLE</p><div className="mt-6 space-y-4">{stages.map((stage, i) => <div key={stage} className="flex items-center gap-4 rounded-xl bg-white/10 p-4"><span className="grid h-8 w-8 place-items-center rounded-full bg-blue-400 font-bold text-blue-950">{i + 1}</span><span className="font-medium">{stage}</span></div>)}</div></div></section>
    <section className="border-y border-slate-200 bg-slate-100/80"><div className="mx-auto grid max-w-7xl gap-6 px-6 py-12 md:grid-cols-3"><Feature title="Controlled dossier" text="Parameter-wise claims, evidence, remarks and versioned submissions." /><Feature title="Role-based review" text="Dedicated HEI, QAD, Expert Panel and decision-maker workspaces." /><Feature title="AI, with safeguards" text="RAG policy support with local Ollama-first failover; rules remain deterministic." /></div></section>
  </main>
}
function Feature({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-md hover:shadow-lg hover:border-blue-300 transition-all duration-200">
      <h2 className="font-bold text-slate-900 text-lg">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
    </div>
  )
}

