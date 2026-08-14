export interface User {
    id: string
    email: string
    name?: string
    role: 'hei' | 'qad' | 'expert' | 'admin'
    applications?: Application[]
    createdAt: string
    updatedAt: string
}

export interface Application {
    id: string
    heiId: string
    hei: User
    status: 'DRAFT' | 'SUBMITTED' | 'UNDER_SCRUTINY' | 'RETURNED' | 'PANEL_REVIEW' | 'ONSITE_VISIT' | 'APPROVED' | 'REFUSED'
    data: DossierData
    evidenceUrls: string[]
    scrutinyScore?: number
    panelRemarks?: string
    createdAt: string
    updatedAt: string
}

export interface DossierData {
    partA: {
        organizational: string
        hr: string
        technology: string
        assessment: string
    }
    partB: {
        approvals: string
        aims: string
        learners: string
        resources: string
    }
}

export interface Document {
    id: string
    content: string
    metadata: Record<string, any>
    embedding: number[] | null
    createdAt: string
}

export interface ScrutinyResult {
    parameter: string
    score: number
    justification: string
    missingItems: string[]
}

export interface PanelMember {
    id: string
    name: string
    role: 'convener' | 'member'
    areas: string[]
    conflictDeclared: boolean
}

export interface VisitReport {
    id: string
    applicationId: string
    date: string
    attendees: string[]
    checklist: Record<string, boolean>
    observations: string
    evidenceUrls: string[]
    recommendation: 'APPROVE' | 'CONDITIONAL' | 'REFUSE'
}