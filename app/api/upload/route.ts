import { NextResponse } from 'next/server'
import { getRequestUser } from '@/lib/auth/supabase'

export async function POST(request: Request) {
    const user = await getRequestUser(request)
    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        const contentType = request.headers.get('content-type') || ''
        
        let fileName = 'Evidence Document'
        let fileType = 'application/pdf'
        let fileUrl = ''

        if (contentType.includes('application/json')) {
            const body = await request.json()
            fileName = body.fileName || fileName
            fileType = body.fileType || fileType
            fileUrl = body.fileData || body.fileUrl || `data:${fileType};base64,mockDataPlaceholder`
        } else if (contentType.includes('multipart/form-data')) {
            const formData = await request.formData()
            const file = formData.get('file') as File | null
            if (file) {
                fileName = file.name
                fileType = file.type || fileType
                const buffer = await file.arrayBuffer()
                const base64 = Buffer.from(buffer).toString('base64')
                fileUrl = `data:${fileType};base64,${base64}`
            }
        }

        const evidenceRecord = {
            id: `doc_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
            name: fileName,
            type: fileType,
            url: fileUrl || `https://storage.supabase.co/v0/object/public/evidence/${user.id}/${fileName}`,
            sizeBytes: fileUrl.length,
            uploadedAt: new Date().toISOString(),
            uploadedBy: user.id,
            storageProvider: 'Free Tier Inline Storage'
        }

        return NextResponse.json({ success: true, evidence: evidenceRecord }, { status: 201 })
    } catch (error: any) {
        return NextResponse.json({ error: error.message || 'File upload failed' }, { status: 500 })
    }
}
