export interface AIClient {
    invoke(prompt: string): Promise<string>
    isHealthy(): Promise<boolean>
    getName(): string
}