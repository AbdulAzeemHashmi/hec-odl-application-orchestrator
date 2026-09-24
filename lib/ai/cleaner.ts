/**
 * Sanitizes chatbot-generated text:
 * - Removes all hyphens/minuses (-)
 * - Removes all asterisks (*)
 * - Removes all hashes (#)
 * - Removes en dashes (–) and em dashes (—)
 * - Removes all emojis and pictographs
 */
export function cleanChatbotResponse(text: string): string {
    if (!text) return ''

    let cleaned = text
        // Remove markdown hashes #
        .replace(/#/g, '')
        // Remove asterisks *
        .replace(/\*/g, '')
        // Remove hyphens -
        .replace(/-/g, '')
        // Remove en dash – (U+2013) and em dash — (U+2014)
        .replace(/[\u2013\u2014]/g, '')
        // Remove bullet characters
        .replace(/[\u2022\u25E6\u2023]/g, '')
        // Remove emojis and pictographs
        .replace(/\p{Extended_Pictographic}/gu, '')
        // Remove miscellaneous symbols, transport/map symbols, dingbats often used as emojis
        .replace(/[\u{1F000}-\u{1FFFF}\u{2600}-\u{27BF}\u{FE00}-\u{FE0F}]/gu, '')

    // Clean up multiple spaces on each line
    cleaned = cleaned
        .split('\n')
        .map((line) => line.replace(/[ \t]+/g, ' ').trim())
        .join('\n')

    // Collapse 3 or more consecutive newlines into 2
    cleaned = cleaned.replace(/\n{3,}/g, '\n\n').trim()

    return cleaned
}
