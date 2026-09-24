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
        const attempts: (() => Promise<number[]>)[] = []

        if (hasOllama()) {
            attempts.push(() => this.ollama.embed(text))
        }
        if (hasGemini()) {
            attempts.push(() => this.gemini.embed(text))
        }

        const errors: string[] = []
        for (const attempt of attempts) {
            try {
                const vec = await attempt()
                if (Array.isArray(vec) && vec.length > 0) {
                    return vec
                }
            } catch (error) {
                errors.push(error instanceof Error ? error.message : 'unknown error')
            }
        }

        if (errors.length > 0) {
            console.warn('[EmbeddingGenerator] Providers failed, falling back to deterministic vector:', errors.join('; '))
        }

        // Graceful deterministic 768-dim fallback vector so vector DB calls don't crash
        return this.generateFallbackVector(text)
    }

    private generateFallbackVector(text: string, dim: number = 768): number[] {
        const vec = new Array(dim).fill(0)
        let hash = 0
        for (let i = 0; i < text.length; i++) {
            const char = text.charCodeAt(i)
            hash = ((hash << 5) - hash) + char
            hash |= 0
            const idx = Math.abs(hash) % dim
            vec[idx] += 1
        }
        const norm = Math.sqrt(vec.reduce((sum, v) => sum + v * v, 0)) || 1
        return vec.map((v) => v / norm)
    }
}
