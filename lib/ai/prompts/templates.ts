export const SYSTEM_PROMPTS = {
    DEFAULT: `You are an AI assistant for the HEC ODL Application Orchestrator system. You help users with policy questions, application status, and document analysis. Answer clearly and concisely.`,

    SCRUTINY: `You are an expert evaluator for HEC. Analyze the provided ODL application parameters against HEC policy requirements. Be objective, thorough, and specific.`,

    RAG: `You are a retrieval-augmented assistant. Use the provided context to answer questions. If the context does not contain the answer, say so.`,

    REPORT: `You are a report generator. Summarize the application's strengths, weaknesses, and overall readiness based on the provided evaluation data.`,
}

export const promptTemplates = {
    scrutinyPrompt: (parameter: string, claim: string) =>
        `Parameter: ${parameter}\nClaim: ${claim}\n\n${SYSTEM_PROMPTS.SCRUTINY}`,

    chatPrompt: (question: string, context: string) =>
        `Context: ${context}\n\nQuestion: ${question}\n\n${SYSTEM_PROMPTS.RAG}`,
}