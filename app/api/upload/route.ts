import { NextResponse } from 'next/server'
import { getRequestUser } from '@/lib/auth/supabase'

export async function POST(request: Request) {
    const user = await getRequestUser(request)
    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        const body = await request.json()
        const { fileName, fileType, fileUrl } = body

        if (!fileUrl && !fileName) {
            return NextResponse.json({ error: 'Missing required file information' }, { status: 400 })
        }

        // Return structured evidence payload ready for Supabase Storage or external link attachment
        const evidenceRecord = {
            id: `doc_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
            name: fileName || 'Document Evidence',
            type: fileType || 'application/pdf',
            url: fileUrl || `https://storage.supabase.co/v0/object/public/evidence/${user.id}/${fileName}`,
            uploadedAt: new Date().toISOString(),
            uploadedBy: user.id,
        }

        return NextResponse.json({ success: true, evidence: evidenceRecord }, { status: 201 })
    } catch (error: any) {
        return NextResponse.json({ error: error.message || 'File upload failed' }, { status: 500 })
    }
}
