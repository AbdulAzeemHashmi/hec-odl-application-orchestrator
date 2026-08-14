import { z } from 'zod'

export const ApplicationSchema = z.object({
    heiId: z.string().min(1, 'HEI ID is required'),
    data: z.object({
        partA: z.object({
            organizational: z.string().min(10, 'Please provide at least 10 characters'),
            hr: z.string().min(10, 'Please provide at least 10 characters'),
            technology: z.string().min(10, 'Please provide at least 10 characters'),
            assessment: z.string().min(10, 'Please provide at least 10 characters'),
        }),
        partB: z.object({
            approvals: z.string().min(10, 'Please provide at least 10 characters'),
            aims: z.string().min(10, 'Please provide at least 10 characters'),
            learners: z.string().min(10, 'Please provide at least 10 characters'),
            resources: z.string().min(10, 'Please provide at least 10 characters'),
        }),
    }),
    evidenceUrls: z.array(z.string().url()).optional(),
})

export const ScrutinyRequestSchema = z.object({
    applicationId: z.string().uuid(),
})

export const ChatRequestSchema = z.object({
    messages: z.array(
        z.object({
            role: z.enum(['user', 'assistant']),
            content: z.string().min(1),
        })
    ),
    applicationId: z.string().uuid().optional(),
})

export const RAGSearchSchema = z.object({
    query: z.string().min(3, 'Query must be at least 3 characters'),
    limit: z.number().min(1).max(20).optional(),
})