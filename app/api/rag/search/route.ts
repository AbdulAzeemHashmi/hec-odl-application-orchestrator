import { NextResponse } from 'next/server'
import { RAGPipeline } from '@/lib/ai/rag/pipeline'

export async function POST(request: Request) {
    const { query, limit = 5 } = await request.json()

    if (!query) {
        return NextResponse.json({ error: 'Query is required' }, { status: 400 })
    }

    try {
        const rag = new RAGPipeline()
        const results = await rag.search(query, limit)

        return NextResponse.json({
            results: results.map(doc => ({
                content: doc.pageContent,
                metadata: doc.metadata,
            })),
        })
    } catch (error: any) {
        return NextResponse.json(
            { error: `Search failed: ${error.message}` },
            { status: 500 }
        )
    }
}