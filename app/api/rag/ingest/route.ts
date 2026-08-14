import { NextResponse } from 'next/server'
import { RAGPipeline } from '@/lib/ai/rag/pipeline'

export async function POST(request: Request) {
    try {
        const { documents } = await request.json()

        if (!documents || !Array.isArray(documents)) {
            return NextResponse.json(
                { error: 'Please provide an array of { content, metadata }' },
                { status: 400 }
            )
        }

        const rag = new RAGPipeline()
        const count = await rag.ingestDocuments(documents)

        return NextResponse.json({
            success: true,
            ingested: count,
            message: `${count} documents ingested successfully.`,
        })
    } catch (error: any) {
        return NextResponse.json(
            { error: `Ingestion failed: ${error.message}` },
            { status: 500 }
        )
    }
}