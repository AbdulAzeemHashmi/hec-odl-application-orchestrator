import { AIClient } from '../clients/base'

export class FailoverRouter {
    private clients: AIClient[]

    constructor(clients: AIClient[]) {
        this.clients = clients
    }

    // Primary logic: Try first client, if fails, shift its task + any queued tasks to the next.
    async invoke(prompt: string): Promise<string> {
        const errors: string[] = []

        for (let i = 0; i < this.clients.length; i++) {
            const client = this.clients[i]
            try {
                const healthy = await client.isHealthy()
                if (!healthy) {
                    errors.push(`${client.getName()} is unhealthy`)
                    continue
                }
                console.log(`🤖 Using ${client.getName()} for prompt: ${prompt.substring(0, 50)}...`)
                const result = await client.invoke(prompt)
                return result
            } catch (error: any) {
                errors.push(`${client.getName()} failed: ${error.message}`)
                console.warn(`⚠️ ${client.getName()} failed. Shifting load to next client.`)
                // Continue to next client in the loop
            }
        }

        // If all clients fail, throw a comprehensive error
        throw new Error(`All AI clients failed. Errors: ${errors.join('; ')}`)
    }

    // Batch processing with load shifting
    async batchInvoke(prompts: string[]): Promise<string[]> {
        const results: string[] = []
        // Distribute tasks sequentially, but if a client fails mid-batch, subsequent tasks shift
        for (let i = 0; i < prompts.length; i++) {
            try {
                const answer = await this.invoke(prompts[i])
                results.push(answer)
            } catch (error: any) {
                results.push(`Error: ${error.message}`)
            }
        }
        return results
    }
}