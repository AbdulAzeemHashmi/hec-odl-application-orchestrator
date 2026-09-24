/**
 * Sanitizes chatbot-generated text by removing:
 * - All hyphens/minuses (-)
 * - All asterisks (*)
 * - All hashes (#)
 * - En dashes (U+2013) and em dashes (U+2014)
 * - Common emoji and pictograph ranges
 * - Bullet characters
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
        // Remove en dash (U+2013) and em dash (U+2014)
        .replace(/\u2013/g, '')
        .replace(/\u2014/g, '')
        // Remove bullet characters (U+2022, U+25E6, U+2023)
        .replace(/\u2022/g, '')
        .replace(/\u25E6/g, '')
        .replace(/\u2023/g, '')
        // Remove common emoji ranges (emoticons, misc symbols, transport)
        // Covers: Emoticons U+1F600-U+1F64F, Misc symbols U+1F300-U+1F5FF,
        // Transport U+1F680-U+1F6FF, Extra U+1F700-U+1F77F, Dingbats U+2702-U+27B0
        .replace(/[\uD83C-\uDBFF][\uDC00-\uDFFF]/g, '') // surrogate pairs (emoji)
        .replace(/[\u2702-\u27B0]/g, '')
        .replace(/[\u24C2\u2600-\u26FF]/g, '')

    // Clean up multiple spaces on each line
    cleaned = cleaned
        .split('\n')
        .map(function(line) { return line.replace(/[ \t]+/g, ' ').trim() })
        .join('\n')

    // Collapse 3 or more consecutive newlines into 2
    cleaned = cleaned.replace(/\n{3,}/g, '\n\n').trim()

    return cleaned
}
