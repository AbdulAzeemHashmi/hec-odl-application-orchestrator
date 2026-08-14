'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/Button'
import ChatWidget from '@/components/chat/ChatWidget'

export default function ScrutinyPage() {
    const params = useParams()
    const id = params.id as string
    const [app, setApp] = useState<any>(null)
    const [loading, setLoading] = useState(false)

    const fetchApp = async () => {
        const res = await fetch(`/api/applications/${id}`)
        const data = await res.json()
        setApp(data)
    }

    useEffect(() => {
        fetchApp()
    }, [id])

    const handleRunScrutiny = async () => {
        setLoading(true)
        try {
            const res = await fetch(`/api/applications/${id}/scrutinize`, {
                method: 'POST',
            })
            const data = await res.json()
            if (data.success) {
                await fetchApp()
                alert(`Scrutiny complete! Score: ${data.score}%`)
            } else {
                alert('Scrutiny failed: ' + data.error)
            }
        } catch (error: any) {
            alert('Error: ' + error.message)
        } finally {
            setLoading(false)
        }
    }

    if (!app) return <div className="p-8">Loading application...</div>

    return (
        <main className="p-8 max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold">Scrutiny Dashboard</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                <div className="lg:col-span-2 space-y-4">
                    <div className="bg-white p-6 rounded shadow border">
                        <h2 className="font-semibold text-lg">Application #{app.id.slice(0, 8)}</h2>
                        <p>Status: <strong>{app.status}</strong></p>
                        <p>Score: <strong>{app.scrutinyScore ?? 'Not yet scored'}</strong></p>
                        <Button
                            onClick={handleRunScrutiny}
                            disabled={loading}
                            className="mt-4"
                        >
                            {loading ? 'Analyzing with AI...' : 'Run AI Scrutiny'}
                        </Button>
                    </div>

                    <div className="bg-white p-6 rounded shadow border">
                        <h3 className="font-semibold">Dossier Parameters</h3>
                        <pre className="text-xs bg-gray-100 p-4 rounded mt-2 overflow-auto max-h-96">
                            {JSON.stringify(app.data, null, 2)}
                        </pre>
                    </div>
                </div>

                <div className="lg:col-span-1">
                    <div className="bg-white p-4 rounded shadow border h-[500px] flex flex-col">
                        <h3 className="font-semibold mb-2">AI Assistant</h3>
                        <p className="text-sm text-gray-500 mb-4">
                            Ask questions about this application or policy.
                        </p>
                        <div className="flex-1">
                            <ChatWidget applicationId={id} />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}