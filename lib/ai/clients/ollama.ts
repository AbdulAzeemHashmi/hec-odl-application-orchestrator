import { ChatOllama } from '@langchain/ollama'
import { AIClient } from './base'

export class OllamaClient implements AIClient {
    private model: ChatOllama
    private baseUrl: string

    constructor(baseUrl: string = 'http://localhost:11434') {
        this.baseUrl = baseUrl
        this.model = new ChatOllama({
            model: 'llama3',
            temperature: 0,
            baseUrl: baseUrl,
        })
    }

    getName(): string {
        return 'Ollama'
    }

    async invoke(prompt: string): Promise<string> {
        const response = await this.model.invoke(prompt)
        return response.content as string
    }

    async isHealthy(): Promise<boolean> {
        try {
            await this.model.invoke('ping')
            return true
        } catch {
            return false
        }
    }

    async embed(text: string): Promise<number[]> {
        const response = await fetch(`${this.baseUrl}/api/embeddings`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ model: 'nomic-embed-text', prompt: text }),
        })
        const data = await response.json()
        return data.embedding || []
    }
}