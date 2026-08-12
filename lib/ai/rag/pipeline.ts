import { prisma } from '../../db/prisma'
import { FailoverRouter } from '../router/failover'
import { GeminiClient } from '../clients/gemini'
import { GrokClient } from '../clients/grok'
import { OllamaClient } from '../clients/ollama'

// Initialize clients (Order defines failover priority: Grok -> Gemini -> Ollama)
const grok = new GrokClient(process.env.XAI_API_KEY!)
const gemini = new GeminiClient(process.env.GEMINI_API_KEY!)
const ollama = new OllamaClient(process.env.OLLAMA_BASE_URL)

const router = new FailoverRouter([grok, gemini, ollama])

export class RAGPipeline {
    async answerQuestion(question: string): Promise<string> {
        // 1. Simulate retrieving relevant documents from Supabase pgvector
        // (For the demo, we'll just use a placeholder context)
        const context = "HEC ODL Policy 2024 states that universities must have 75% completeness to proceed to expert panel review."

        const prompt = `
      You are an ODL Application Assistant for HEC.
      Use the following context to answer the user's question.
      If the answer is not in the context, say "I don't have that information in the policy documents."

      Context:
      ${context}

      Question: ${question}
    `

        try {
            // Router handles failover automatically
            const response = await router.invoke(prompt)
            return response
        } catch (error: any) {
            return `System Error: ${error.message}`
        }
    }
}