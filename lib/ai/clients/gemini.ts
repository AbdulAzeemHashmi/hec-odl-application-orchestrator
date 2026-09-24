import { GoogleGenerativeAI } from '@google/generative-ai'
import { AIClient } from './base'

export class GeminiClient implements AIClient {
    private apiKey: string

    constructor(apiKey: string) {
        this.apiKey = apiKey.trim()
    }

    getName(): string {
        return 'Gemini'
    }

    async invoke(prompt: string): Promise<string> {
        if (!this.apiKey) {
            throw new Error('Gemini API key is not configured.')
        }

        // Candidate generation models in priority order
        const candidateModels = [
            'gemini-3.6-flash',
            'gemini-3.5-flash',
            'gemini-flash-latest',
            'gemini-2.5-flash',
            'gemini-1.5-flash',
        ]

        let lastError = ''
        for (const model of candidateModels) {
            try {
                const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${this.apiKey}`
                const res = await fetch(url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{ parts: [{ text: prompt }] }],
                    }),
                })

                if (res.ok) {
                    const data = await res.json()
                    const text = data.candidates?.[0]?.content?.parts?.[0]?.text
                    if (typeof text === 'string' && text.trim().length > 0) {
                        return text
                    }
                } else {
                    const errData = await res.json().catch(() => ({}))
                    lastError = errData?.error?.message || `HTTP ${res.status}`
                }
            } catch (err: any) {
                lastError = err?.message || 'Network error'
            }
        }

        // Fallback to SDK attempt if direct REST calls did not succeed
        try {
            const genAI = new GoogleGenerativeAI(this.apiKey)
            const sdkModel = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
            const result = await sdkModel.generateContent(prompt)
            const response = await result.response
            const text = response.text()
            if (text) return text
        } catch {
            // SDK attempt failed as well
        }

        throw new Error(`Gemini generation failed: ${lastError || 'No available generation models succeeded.'}`)
    }

    async isHealthy(): Promise<boolean> {
        try {
            await this.invoke('ping')
            return true
        } catch {
            return false
        }
    }

    async embed(text: string): Promise<number[]> {
        if (!this.apiKey) {
            throw new Error('Gemini API key is not configured.')
        }

        // Candidate embedding models on v1beta
        const candidateModels = [
            'gemini-embedding-001',
            'gemini-embedding-2',
            'text-embedding-004',
            'embedding-001',
        ]

        let lastError = ''
        for (const model of candidateModels) {
            try {
                const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:embedContent?key=${this.apiKey}`
                const res = await fetch(url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        content: { parts: [{ text }] },
                        outputDimensionality: 768,
                    }),
                })

                if (res.ok) {
                    const data = await res.json()
                    const values = data.embedding?.values
                    if (Array.isArray(values) && values.length > 0) {
                        // Match Supabase vector(768)
                        if (values.length === 768) {
                            return values
                        } else if (values.length > 768) {
                            return values.slice(0, 768)
                        } else {
                            return [...values, ...new Array(768 - values.length).fill(0)]
                        }
                    }
                } else {
                    const errData = await res.json().catch(() => ({}))
                    lastError = errData?.error?.message || `HTTP ${res.status}`
                }
            } catch (err: any) {
                lastError = err?.message || 'Network error'
            }
        }

        throw new Error(`Gemini embedding failed: ${lastError || 'No candidate embedding models succeeded.'}`)
    }
}