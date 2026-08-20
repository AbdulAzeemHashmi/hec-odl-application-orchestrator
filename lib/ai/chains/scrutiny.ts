import { FailoverRouter } from '../router/failover'
import { GeminiClient } from '../clients/gemini'
import { GrokClient } from '../clients/grok'
import { OllamaClient } from '../clients/ollama'
import { DeterministicClient } from '../clients/deterministic'
import { AIClient } from '../clients/base'

export class ScrutinyChain {
    private router: FailoverRouter

    constructor() {
        const clients: AIClient[] = []

        if (process.env.GEMINI_API_KEY) {
            clients.push(new GeminiClient(process.env.GEMINI_API_KEY))
        }
        if (process.env.XAI_API_KEY) {
            clients.push(new GrokClient(process.env.XAI_API_KEY))
        }
        if (process.env.OLLAMA_BASE_URL) {
            clients.push(new OllamaClient(process.env.OLLAMA_BASE_URL))
        }

        // Always append zero-cost Deterministic Safeguard Engine
        clients.push(new DeterministicClient())

        this.router = new FailoverRouter(clients)
    }

    async analyzeParameter(parameter: string, claim: any): Promise<string> {
        const prompt = `
        Analyze the following parameter for completeness in an ODL application dossier:
        Parameter: ${parameter}
        HEI's Claim/Evidence: ${JSON.stringify(claim)}

        Requirements (from HEC ODL Policy):
        - Must provide clear evidence for each claim.
        - Technology must meet minimum specifications.
        - Statutory approvals must be attached.

        Give a score out of 100 and list any missing items.
        `
        return await this.router.invoke(prompt)
    }
}

export const scrutinyChain = new ScrutinyChain()
