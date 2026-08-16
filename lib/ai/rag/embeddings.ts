import { GeminiClient } from '../clients/gemini'
import { OllamaClient } from '../clients/ollama'
import { aiConfig, hasGemini, hasOllama } from '../config'

export class EmbeddingGenerator {
    private gemini: GeminiClient
    private ollama: OllamaClient

    constructor() {
        this.gemini = new GeminiClient(aiConfig.geminiKey || '')
        this.ollama = new OllamaClient(aiConfig.ollamaUrl)
    }

    async embed(text: string): Promise<number[]> {
        const attempts = hasOllama()
            ? [() => this.ollama.embed(text), ...(hasGemini() ? [() => this.gemini.embed(text)] : [])]
            : hasGemini() ? [() => this.gemini.embed(text)] : []
        const errors: string[] = []
        for (const attempt of attempts) {
            try { return await attempt() } catch (error) { errors.push(error instanceof Error ? error.message : 'unknown error') }
        }
        throw new Error(`No embedding provider is available. Start Ollama with nomic-embed-text or configure Gemini. ${errors.join('; ')}`)
    }
}
