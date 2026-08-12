'use client'

import { useState } from 'react'

export default function Home() {
    const [query, setQuery] = useState('')
    const [response, setResponse] = useState('')
    const [loading, setLoading] = useState(false)

    const handleAsk = async () => {
        if (!query) return
        setLoading(true)
        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: [{ content: query }] }),
            })
            const data = await res.json()
            setResponse(data.response || data.error)
        } catch (error: any) {
            setResponse(`Error: ${error.message}`)
        }
        setLoading(false)
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-50">
            <div className="max-w-2xl w-full bg-white p-8 rounded-xl shadow-lg">
                <h1 className="text-3xl font-bold text-blue-700 mb-2">HEC ODL Orchestrator</h1>
                <p className="text-gray-600 mb-6">AI Assistant with automatic Grok → Gemini → Ollama failover.</p>

                <div className="flex gap-2">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Ask about ODL policy or application status..."
                        className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
                    />
                    <button
                        onClick={handleAsk}
                        disabled={loading}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition"
                    >
                        {loading ? 'Thinking...' : 'Ask'}
                    </button>
                </div>

                {response && (
                    <div className="mt-6 p-4 bg-gray-100 rounded-lg border border-gray-200">
                        <p className="whitespace-pre-wrap text-gray-800">{response}</p>
                    </div>
                )}
            </div>
        </main>
    )
}