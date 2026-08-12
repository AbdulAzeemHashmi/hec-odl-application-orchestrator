import { ChatOllama } from '@langchain/ollama'
import { AIClient } from './base'

export class OllamaClient implements AIClient {
    private model: ChatOllama

    constructor(baseUrl: string = 'http://localhost:11434') {
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
}