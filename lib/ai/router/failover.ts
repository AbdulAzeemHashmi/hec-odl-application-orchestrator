import { AIClient } from '../clients/base'

/** Routes each request through the configured providers in priority order. */
export class FailoverRouter {
    constructor(private readonly clients: AIClient[]) {}

    async invoke(prompt: string): Promise<string> {
        const errors: string[] = []
        for (const client of this.clients) {
            try {
                // Do not send a separate health probe: it can consume a paid request.
                return await client.invoke(prompt)
            } catch (error) {
                const message = error instanceof Error ? error.message : 'Unknown error'
                errors.push(`${client.getName()} failed: ${message}`)
                console.warn(`${client.getName()} failed; shifting work to the next provider.`)
            }
        }
        throw new Error(`All AI clients failed. ${errors.join('; ')}`)
    }

    async batchInvoke(prompts: string[]): Promise<string[]> {
        return Promise.all(prompts.map(async (prompt) => {
            try { return await this.invoke(prompt) }
            catch (error) { return `Error: ${error instanceof Error ? error.message : 'Unknown error'}` }
        }))
    }
}
