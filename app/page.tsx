import Link from 'next/link'

const stages = ['Submit dossier', 'QAD scrutiny', 'Expert panel', 'Visit & report', 'Decision & NOC']

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* Navigation Header */}
      <header className="border-b border-slate-200/80 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="text-xl font-extrabold tracking-tight text-blue-900 flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-blue-800 font-bold text-white text-sm">ODL</span>
            HEC <span className="text-slate-700 font-semibold">Portal</span>
          </div>
          <div className="flex gap-3">
            <Link href="/login" className="btn-secondary px-5 py-2 text-sm font-semibold">Sign in</Link>
            <Link href="/signup" className="btn-primary px-5 py-2 text-sm font-semibold shadow-md shadow-blue-700/20">Create account</Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white via-slate-50 to-slate-100/60">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[1.15fr_.85fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-100/90 px-4 py-1.5 text-xs font-bold tracking-wider text-blue-900 ring-1 ring-inset ring-blue-700/20 shadow-sm uppercase">
              <span className="h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
              Quality Assurance Division · ODL Section
            </div>

            <h1 className="mt-6 max-w-3xl text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.12] tracking-tight text-slate-950">
              A complete workspace for <span className="bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 bg-clip-text text-transparent underline decoration-blue-400 decoration-2 underline-offset-8 whitespace-nowrap">ODL NOC Applications</span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg sm:text-xl leading-relaxed text-slate-600 font-normal">
              Submit the <strong className="font-semibold text-slate-900">Model Application Dossier</strong>, manage evidence, review cases, coordinate <strong className="font-semibold text-slate-900">Expert Panels</strong>, record visits, issue decisions, and track <strong className="font-semibold text-slate-900">3-year confirmation milestones</strong>.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/signup" className="btn-primary px-7 py-3 text-base font-semibold shadow-lg shadow-blue-800/25 hover:shadow-xl transition-all">
                Register your HEI
              </Link>
              <Link href="/llm" className="btn-secondary px-7 py-3 text-base font-semibold border-slate-300 hover:bg-slate-100 transition-all">
                Open policy assistant
              </Link>
            </div>
          </div>

          <div className="rounded-3xl bg-gradient-to-br from-blue-900 via-blue-950 to-slate-900 p-8 text-white shadow-2xl shadow-blue-950/30 border border-blue-800/50">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold uppercase tracking-widest text-blue-300">APPLICATION LIFECYCLE</p>
              <span className="rounded-full bg-blue-500/20 px-3 py-1 text-xs font-semibold text-blue-200">5 Stages</span>
            </div>
            <div className="mt-6 space-y-3.5">
              {stages.map((stage, i) => (
                <div key={stage} className="flex items-center gap-4 rounded-xl bg-white/10 p-4 border border-white/10 hover:bg-white/15 transition-all">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-blue-400 font-bold text-blue-950 text-sm shadow-md">
                    {i + 1}
                  </span>
                  <span className="font-semibold text-slate-100">{stage}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Middle Feature Section (Rich Silver Theme) */}
      <section className="border-y border-slate-300/90 bg-gradient-to-r from-slate-200 via-zinc-300 to-slate-200 text-slate-900 shadow-inner">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-16 md:grid-cols-3">
          <Feature
            icon="📋"
            title="Controlled dossier"
            text="Parameter-wise claims, evidence, remarks and versioned submissions."
          />
          <Feature
            icon="👥"
            title="Role-based review"
            text="Dedicated HEI, QAD, Expert Panel and decision-maker workspaces."
          />
          <Feature
            icon="🛡️"
            title="AI, with safeguards"
            text="RAG policy support with local Ollama-first failover; rules remain deterministic."
          />
        </div>
      </section>
    </main>
  )
}

function Feature({ icon, title, text }: { icon: string; title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-slate-300 bg-white p-7 shadow-lg hover:shadow-2xl hover:border-blue-500 hover:-translate-y-1 transition-all duration-300">
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50 text-xl shadow-inner border border-blue-100">{icon}</span>
        <h2 className="font-extrabold text-slate-950 text-xl">{title}</h2>
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-600 font-normal">{text}</p>
    </div>
  )
}
