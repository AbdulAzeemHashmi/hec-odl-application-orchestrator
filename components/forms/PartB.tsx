'use client'

import { useState } from 'react'
import { Button } from '../ui/Button'

interface PartBData {
    approvals: string
    aims: string
    learners: string
    resources: string
}

interface PartBProps {
    onSubmit: (data: any) => void
    loading: boolean
    onBack: () => void
}

export default function PartBForm({ onSubmit, loading, onBack }: PartBProps) {
    const [data, setData] = useState<PartBData>({
        approvals: '',
        aims: '',
        learners: '',
        resources: '',
    })

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit(data)
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-xl font-semibold">Program Readiness</h2>

            <div>
                <label className="block font-medium mb-1">Statutory Approvals</label>
                <textarea
                    name="approvals"
                    value={data.approvals}
                    onChange={handleChange}
                    placeholder="Board of Studies, Academic Council approvals, etc."
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    rows={3}
                />
            </div>

            <div>
                <label className="block font-medium mb-1">Aims & Goals</label>
                <textarea
                    name="aims"
                    value={data.aims}
                    onChange={handleChange}
                    placeholder="Program aims, alignment with HEC policy, etc."
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    rows={3}
                />
            </div>

            <div>
                <label className="block font-medium mb-1">Learner Profiling</label>
                <textarea
                    name="learners"
                    value={data.learners}
                    onChange={handleChange}
                    placeholder="Target demographics, SWOT analysis, etc."
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    rows={3}
                />
            </div>

            <div>
                <label className="block font-medium mb-1">Learning Resources (OER, Library, Labs)</label>
                <textarea
                    name="resources"
                    value={data.resources}
                    onChange={handleChange}
                    placeholder="Open Educational Resources, library access, lab facilities, etc."
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    rows={3}
                />
            </div>

            <div className="flex gap-4">
                <Button type="button" variant="outline" onClick={onBack}>
                    ← Back
                </Button>
                <Button type="submit" variant="default" disabled={loading} className="flex-1">
                    {loading ? 'Submitting...' : 'Submit Application'}
                </Button>
            </div>
        </form>
    )
}