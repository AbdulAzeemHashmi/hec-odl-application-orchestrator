import { Retriever } from './retriever'
import { EmbeddingGenerator } from './embeddings'
import { FailoverRouter } from '../router/failover'
import { GeminiClient } from '../clients/gemini'
import { GrokClient } from '../clients/grok'
import { OllamaClient } from '../clients/ollama'
import { prisma } from '@/lib/db/prisma'

const grok = new GrokClient(process.env.XAI_API_KEY!)
const gemini = new GeminiClient(process.env.GEMINI_API_KEY!)
const ollama = new OllamaClient(process.env.OLLAMA_BASE_URL)
const router = new FailoverRouter([grok, gemini, ollama])

export class RAGPipeline {
    private retriever: Retriever
    private embedder: EmbeddingGenerator

    constructor() {
        this.retriever = new Retriever()
        this.embedder = new EmbeddingGenerator()
    }

    // Search without generation
    async search(query: string, limit: number = 5) {
        return await this.retriever.retrieve(query, limit)
    }

    // Answer a question using RAG with failover
    async answerQuestion(question: string): Promise<string> {
        // Step 1: Retrieve relevant documents
        const docs = await this.retriever.retrieve(question, 5)
        const context = docs.map((d) => d.content).join('\n\n')

        // Step 2: Construct prompt
        const prompt = `
      You are an assistant for HEC's ODL Application system.
      Use the following context from policy documents to answer the question.
      If the answer is not in the context, say "I don't have that information in the policy documents."

      Context:
      ${context}

      Question: ${question}
    `

        // Step 3: Generate response using the failover router
        try {
            return await router.invoke(prompt)
        } catch (error: any) {
            return `Error: ${error.message}`
        }
    }

    // Ingest documents into the vector store
    async ingestDocuments(documents: { content: string; metadata: any }[]): Promise<number> {
        let count = 0
        for (const doc of documents) {
            const embedding = await this.embedder.embed(doc.content)
            const id = `doc_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
            const embeddingString = `[${embedding.join(',')}]`
            await prisma.$executeRaw`
                INSERT INTO "Document" ("id", "content", "metadata", "embedding", "createdAt")
                VALUES (${id}, ${doc.content}, ${JSON.stringify(doc.metadata)}::jsonb, ${embeddingString}::vector, NOW())
            `
            count++
        }
        return count
    }
}