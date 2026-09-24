import { NextResponse } from 'next/server'
import { RAGPipeline } from '@/lib/ai/rag/pipeline'
import { cleanChatbotResponse } from '@/lib/ai/cleaner'

export async function POST(request: Request) {
    try {
        const { messages } = await request.json()
        const lastQuery = messages[messages.length - 1]?.content || 'Hello'

        const rag = new RAGPipeline()
        const rawResponse = await rag.answerQuestion(lastQuery)
        const response = cleanChatbotResponse(rawResponse)

        return NextResponse.json({ response })
    } catch (error: any) {
        return NextResponse.json(
            { error: cleanChatbotResponse(`Failed to process request: ${error.message}`) },
            { status: 500 }
        )
    }
}