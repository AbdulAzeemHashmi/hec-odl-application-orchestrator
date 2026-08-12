import { NextResponse } from 'next/server'
import { RAGPipeline } from '@/lib/ai/rag/pipeline'

export async function POST(request: Request) {
    try {
        const { messages } = await request.json()
        const lastQuery = messages[messages.length - 1]?.content || 'Hello'

        const rag = new RAGPipeline()
        const response = await rag.answerQuestion(lastQuery)

        return NextResponse.json({ response })
    } catch (error: any) {
        return NextResponse.json(
            { error: `Failed to process request: ${error.message}` },
            { status: 500 }
        )
    }
}