export const aiConfig = {
  geminiKey: process.env.GEMINI_API_KEY,
  grokKey: process.env.XAI_API_KEY,
  ollamaUrl: process.env.OLLAMA_BASE_URL || 'http://127.0.0.1:11434',
}

export const hasGemini = () => Boolean(aiConfig.geminiKey)
export const hasGrok = () => Boolean(aiConfig.grokKey)
export const hasOllama = () => process.env.OLLAMA_ENABLED === 'true'
