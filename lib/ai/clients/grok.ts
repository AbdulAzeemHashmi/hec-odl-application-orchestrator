import { ChatXAI } from '@langchain/xai'
import { AIClient } from './base'

export class GrokClient implements AIClient {
    private model: ChatXAI

    constructor(apiKey: string) {
        this.model = new ChatXAI({
            model: 'grok-3-fast',
            apiKey: apiKey,
            temperature: 0,
        })
    }

    getName(): string {
        return 'Grok'
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