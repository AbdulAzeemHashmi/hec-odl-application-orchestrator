import { FailoverRouter } from '../router/failover'
import { GeminiClient } from '../clients/gemini'
import { GrokClient } from '../clients/grok'
import { OllamaClient } from '../clients/ollama'

export class ScrutinyChain {
    private router: FailoverRouter

    constructor() {
        const grok = new GrokClient(process.env.XAI_API_KEY!)
        const gemini = new GeminiClient(process.env.GEMINI_API_KEY!)
        const ollama = new OllamaClient(process.env.OLLAMA_BASE_URL)
        this.router = new FailoverRouter([grok, gemini, ollama])
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
