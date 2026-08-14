import { GeminiClient } from '../clients/gemini'
import { OllamaClient } from '../clients/ollama'

export class EmbeddingGenerator {
    private gemini: GeminiClient
    private ollama: OllamaClient

    constructor() {
        this.gemini = new GeminiClient(process.env.GEMINI_API_KEY!)
        this.ollama = new OllamaClient(process.env.OLLAMA_BASE_URL)
    }

    async embed(text: string): Promise<number[]> {
        try {
            // Primary: Gemini
            return await this.gemini.embed(text)
        } catch (error) {
            console.warn('Gemini embedding failed, falling back to Ollama...')
            // Fallback: Ollama (requires a model like nomic-embed-text)
            return await this.ollama.embed(text)
        }
    }
}