'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import PartAForm from '@/components/forms/PartA'
import PartBForm from '@/components/forms/PartB'
import { Button } from '@/components/ui/Button'
import { createBrowserAuthClient } from '@/lib/auth/supabase'

export default function NewApplicationPage() {
    const router = useRouter()
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState({ partA: {}, partB: {} })
    const [loading, setLoading] = useState(false)

    const handlePartASubmit = (data: any) => {
        setFormData((prev) => ({ ...prev, partA: data }))
        setStep(2)
    }

    const handlePartBSubmit = async (data: any) => {
        setFormData((prev) => ({ ...prev, partB: data }))
        setLoading(true)

        try {
            const { data: { session } } = await createBrowserAuthClient().auth.getSession()
            const response = await fetch('/api/applications', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', ...(session?.access_token ? { Authorization: `Bearer ${session.access_token}` } : {}) },
                body: JSON.stringify({
                    data: { ...formData.partA, ...data },
                    evidenceUrls: [],
                }),
            })
            if (response.ok) {
                router.push('/hei/applications')
            } else {
                alert('Failed to create application')
            }
        } catch (error) {
            alert('An error occurred')
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="p-8 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">
                {step === 1 ? 'Part A: Institutional Readiness' : 'Part B: Program Readiness'}
            </h1>

            <div className="mb-4 flex gap-2">
                <span className={`px-4 py-2 rounded ${step === 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                    1. Institutional
                </span>
                <span className={`px-4 py-2 rounded ${step === 2 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                    2. Program
                </span>
            </div>

            {step === 1 && <PartAForm onSubmit={handlePartASubmit} />}
            {step === 2 && (
                <PartBForm
                    onSubmit={handlePartBSubmit}
                    loading={loading}
                    onBack={() => setStep(1)}
                />
            )}
        </main>
    )
}
