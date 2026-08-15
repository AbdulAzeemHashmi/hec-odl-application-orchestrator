import { createClient } from '@supabase/supabase-js'
import { GeminiClient } from '../clients/gemini'

function getSupabaseClient() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL.startsWith('http')
        ? process.env.NEXT_PUBLIC_SUPABASE_URL
        : 'https://placeholder.supabase.co'
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder'
    return createClient(url, key)
}

export class Retriever {
    private gemini: GeminiClient

    constructor() {
        this.gemini = new GeminiClient(process.env.GEMINI_API_KEY || 'placeholder')
    }

    async retrieve(query: string, limit: number = 5): Promise<any[]> {
        const supabase = getSupabaseClient()
        // Generate embedding for the query using Gemini
        const embedding = await this.gemini.embed(query)

        // Perform vector similarity search in Supabase
        const { data, error } = await supabase.rpc('match_documents', {
            query_embedding: embedding,
            match_count: limit,
        })

        if (error) throw new Error(`Retrieval failed: ${error.message}`)
        return data || []
    }
}