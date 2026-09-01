'use client'

import { useState } from 'react'
import PortalShell from '@/components/shared/PortalShell'
import { useLocale } from '@/components/shared/LocaleProvider'

export default function LlmPage() {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [loading, setLoading] = useState(false)
  const { t } = useLocale()

  async function ask() {
    if (!question.trim()) return
    setLoading(true)
    setAnswer('')
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [{ role: 'user', content: question }] }),
      })
      const data = await response.json()
      setAnswer(data.response || data.error || 'No response received.')
    } catch {
      setAnswer(
        'The assistant could not be reached. Confirm that the AI provider and vector database are configured.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <PortalShell
      title="AI policy desk"
      subtitle="Ask grounded questions over the approved ODL policy and ingested reference documents."
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <section className="card">
          <label className="text-sm font-bold text-slate-900">
            {t('AI Policy Assistant')}
          </label>
          <p className="text-xs text-slate-500 mt-1">
            {t(
              'Query the approved HEC ODL Policy, Toolkit guidelines, and regulatory requirements.'
            )}
          </p>

          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder={t('Ask a question about ODL Policy...')}
            className="mt-4 min-h-32 w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-sm"
          />

          <button
            onClick={ask}
            disabled={loading}
            className="btn-primary mt-4 font-semibold shadow-md"
          >
            {loading ? t('Thinking...') : t('Send')}
          </button>

          {answer && (
            <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50/70 p-5 text-sm leading-7 text-slate-800 whitespace-pre-wrap">
              <span className="font-bold text-blue-900 block mb-2">💡 Policy Response:</span>
              {answer}
            </div>
          )}
        </section>

        <aside className="card">
          <h2 className="font-bold text-slate-900 text-sm">Grounded Safeguards</h2>
          <ul className="mt-3 space-y-3 text-xs leading-5 text-slate-500">
            <li>• Searches only ingested HEC policy references via local vector DB.</li>
            <li>• Zero paid API requirement: Ollama-first local AI execution.</li>
            <li>• Gemini and Grok are optional fallbacks.</li>
            <li>• AI cannot make an official scrutiny or decision outcome.</li>
          </ul>
        </aside>
      </div>
    </PortalShell>
  )
}
