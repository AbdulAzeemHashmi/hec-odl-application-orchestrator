import { FailoverRouter } from '../router/failover'
import { GeminiClient } from '../clients/gemini'
import { GrokClient } from '../clients/grok'
import { OllamaClient } from '../clients/ollama'

export class ChatChain {
    private router: FailoverRouter

    constructor() {
        const grok = new GrokClient(process.env.XAI_API_KEY!)
        const gemini = new GeminiClient(process.env.GEMINI_API_KEY!)
        const ollama = new OllamaClient(process.env.OLLAMA_BASE_URL)
        this.router = new FailoverRouter([grok, gemini, ollama])
    }

    async generateResponse(
        messages: { role: string; content: string }[],
        context: string
    ): Promise<string> {
        const lastMessage = messages[messages.length - 1]
        const prompt = `
      You are a helpful AI assistant for HEC ODL applications.
      Previous conversation: ${messages.map(m => `${m.role}: ${m.content}`).join('\n')}
      Context from policy: ${context}
      Respond to: ${lastMessage.content}
    `
        return await this.router.invoke(prompt)
    }
}