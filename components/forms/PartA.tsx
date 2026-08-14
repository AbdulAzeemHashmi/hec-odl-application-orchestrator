'use client'

import { useState } from 'react'
import { Button } from '../ui/Button'

interface PartAData {
    organizational: string
    hr: string
    technology: string
    assessment: string
}

interface PartAProps {
    onSubmit: (data: any) => void
}

export default function PartAForm({ onSubmit }: PartAProps) {
    const [data, setData] = useState<PartAData>({
        organizational: '',
        hr: '',
        technology: '',
        assessment: '',
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
            <h2 className="text-xl font-semibold">Institutional Readiness</h2>

            <div>
                <label className="block font-medium mb-1">Organizational Readiness</label>
                <textarea
                    name="organizational"
                    value={data.organizational}
                    onChange={handleChange}
                    placeholder="Describe organizational structure, ODL office, etc."
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    rows={3}
                />
            </div>

            <div>
                <label className="block font-medium mb-1">HR Readiness</label>
                <textarea
                    name="hr"
                    value={data.hr}
                    onChange={handleChange}
                    placeholder="List qualified staff, instructional designers, etc."
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    rows={3}
                />
            </div>

            <div>
                <label className="block font-medium mb-1">Technological Readiness</label>
                <textarea
                    name="technology"
                    value={data.technology}
                    onChange={handleChange}
                    placeholder="Describe ICT, LMS, software, infrastructure, etc."
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    rows={3}
                />
            </div>

            <div>
                <label className="block font-medium mb-1">Assessment & Evaluation</label>
                <textarea
                    name="assessment"
                    value={data.assessment}
                    onChange={handleChange}
                    placeholder="Describe exam systems, question banks, result mechanisms, etc."
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    rows={3}
                />
            </div>

            <Button type="submit" variant="default" size="lg" className="w-full">
                Continue to Part B →
            </Button>
        </form>
    )
}