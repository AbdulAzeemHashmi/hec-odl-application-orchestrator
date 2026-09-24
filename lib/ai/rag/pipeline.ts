import { Retriever } from './retriever'
import { EmbeddingGenerator } from './embeddings'
import { FailoverRouter } from '../router/failover'
import { GeminiClient } from '../clients/gemini'
import { GrokClient } from '../clients/grok'
import { OllamaClient } from '../clients/ollama'
import { DeterministicClient } from '../clients/deterministic'
import { prisma } from '@/lib/db/prisma'
import { aiConfig, hasGemini, hasGrok, hasOllama } from '../config'

function createRouter() {
    const clients = [
        ...(hasOllama() ? [new OllamaClient(aiConfig.ollamaUrl)] : []),
        ...(hasGemini() ? [new GeminiClient(aiConfig.geminiKey!)] : []),
        ...(hasGrok() ? [new GrokClient(aiConfig.grokKey!)] : []),
        new DeterministicClient(),
    ]
    return new FailoverRouter(clients)
}

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
        const cleanQ = (question || '').trim().toLowerCase()

        // Fast-path greetings
        if (
            cleanQ === 'hi' ||
            cleanQ === 'hello' ||
            cleanQ === 'hey' ||
            cleanQ === 'assalam o alaikum' ||
            cleanQ === 'aoa' ||
            cleanQ === 'salam'
        ) {
            return `Hello! Welcome to the HEC ODL Policy Desk.

I am your policy assistant for the Higher Education Commission (HEC) of Pakistan. I can assist you with:
• Approved ODL policy guidelines and institutional readiness criteria
• Faculty requirements and teacher-to-student ratios
• LMS technical and infrastructural standards
• Statutory approvals and Quality Assurance Division (QAD) scrutiny

How can I help you with your institution's ODL program today?`
        }

        // Step 1: Retrieve relevant documents (safe, never throws)
        let context = ''
        try {
            const docs = await this.retriever.retrieve(question, 5)
            if (Array.isArray(docs) && docs.length > 0) {
                context = docs
                    .map((d: any) => d.content)
                    .filter(Boolean)
                    .join('\n\n')
            }
        } catch (error) {
            console.warn('[RAGPipeline] Document retrieval error, falling back to base policy reasoning:', error)
        }

        // Step 2: Construct prompt
        const prompt = context.trim().length > 0
            ? `You are an expert AI assistant for the Higher Education Commission (HEC) of Pakistan's Open and Distance Learning (ODL) Application System.
Use the following context from approved HEC ODL policy documents, toolkit guidelines, and regulatory requirements to answer the user's question accurately, concisely, and professionally.

Context:
${context}

Question: ${question}

Provide a grounded, authoritative answer adhering to HEC ODL regulations.`
            : `You are an expert AI assistant for the Higher Education Commission (HEC) of Pakistan's Open and Distance Learning (ODL) Application System.
Answer the following question about HEC ODL policies, institutional readiness criteria, learning management systems (LMS), faculty requirements, statutory approvals, and quality assurance standards.

Question: ${question}

Provide an authoritative, clear, and professional response.`

        // Step 3: Generate response using the failover router
        try {
            return await createRouter().invoke(prompt)
        } catch (error: any) {
            console.error('[RAGPipeline] Router invocation failed:', error)
            return new DeterministicClient().invoke(question)
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
