import { GoogleGenerativeAI } from '@google/generative-ai'
import { AIClient } from './base'

export class GeminiClient implements AIClient {
    private model: any

    constructor(private apiKey: string) {
        const genAI = new GoogleGenerativeAI(apiKey)
        this.model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
    }

    getName(): string {
        return 'Gemini'
    }

    async invoke(prompt: string): Promise<string> {
        const result = await this.model.generateContent(prompt)
        const response = await result.response
        return response.text()
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
        const genAI = new GoogleGenerativeAI(this.apiKey)
        const embeddingModel = genAI.getGenerativeModel({ model: 'text-embedding-004' })
        const result = await embeddingModel.embedContent(text)
        return result.embedding.values
    }
}