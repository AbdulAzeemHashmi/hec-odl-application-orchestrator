export const formatDate = (date: string): string => {
    return new Date(date).toLocaleDateString('en-PK', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
}

export const formatDateTime = (date: string): string => {
    return new Date(date).toLocaleString('en-PK', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    })
}

export const truncateText = (text: string, length: number = 100): string => {
    if (text.length <= length) return text
    return text.slice(0, length) + '...'
}

export const extractScoreFromText = (text: string): number => {
    const match = text.match(/(\d+)/)
    return match ? Math.min(100, parseInt(match[0])) : 50
}

export const isTerminalStatus = (status: string): boolean => {
    return ['APPROVED', 'REFUSED'].includes(status)
}

export const getStatusColor = (status: string): string => {
    switch (status) {
        case 'DRAFT':
            return 'gray'
        case 'SUBMITTED':
            return 'blue'
        case 'UNDER_SCRUTINY':
            return 'yellow'
        case 'RETURNED':
            return 'orange'
        case 'PANEL_REVIEW':
            return 'purple'
        case 'ONSITE_VISIT':
            return 'indigo'
        case 'APPROVED':
            return 'green'
        case 'REFUSED':
            return 'red'
        default:
            return 'gray'
    }
}