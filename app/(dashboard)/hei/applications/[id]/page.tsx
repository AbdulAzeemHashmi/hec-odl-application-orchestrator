'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

interface Application {
    id: string
    status: string
    scrutinyScore: number | null
    data: any
    createdAt: string
}

export default function ApplicationDetailPage() {
    const params = useParams()
    const id = params.id as string
    const [app, setApp] = useState<Application | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(`/api/applications/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setApp(data)
                setLoading(false)
            })
            .catch(() => setLoading(false))
    }, [id])

    if (loading) return <div className="p-8">Loading...</div>
    if (!app) return <div className="p-8">Application not found</div>

    return (
        <main className="p-8 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold">Application #{app.id.slice(0, 8)}</h1>
            <p className="text-gray-600">Status: <strong>{app.status}</strong></p>
            <p className="text-gray-600">Score: <strong>{app.scrutinyScore ?? 'Pending'}</strong></p>
            <p className="text-gray-600">Created: {new Date(app.createdAt).toLocaleDateString()}</p>

            <div className="mt-6 p-4 bg-gray-100 rounded">
                <h2 className="font-semibold">Dossier Data</h2>
                <pre className="whitespace-pre-wrap text-sm">{JSON.stringify(app.data, null, 2)}</pre>
            </div>
        </main>
    )
}