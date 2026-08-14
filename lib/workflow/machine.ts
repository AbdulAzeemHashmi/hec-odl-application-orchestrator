export type ApplicationStatus =
    | 'DRAFT'
    | 'SUBMITTED'
    | 'UNDER_SCRUTINY'
    | 'RETURNED'
    | 'PANEL_REVIEW'
    | 'ONSITE_VISIT'
    | 'APPROVED'
    | 'REFUSED'

export type Event =
    | { type: 'SUBMIT' }
    | { type: 'START_SCRUTINY' }
    | { type: 'COMPLETE_SCRUTINY'; score: number }
    | { type: 'RETURN'; reason: string }
    | { type: 'SEND_TO_PANEL' }
    | { type: 'SCHEDULE_VISIT' }
    | { type: 'APPROVE' }
    | { type: 'REFUSE'; reason: string }
    | { type: 'RESUBMIT' }

export class ApplicationMachine {
    private status: ApplicationStatus = 'DRAFT'
    private history: { from: ApplicationStatus; event: Event; timestamp: Date }[] = []

    constructor(initialStatus: ApplicationStatus = 'DRAFT') {
        this.status = initialStatus
    }

    getState(): ApplicationStatus {
        return this.status
    }

    transition(event: Event): ApplicationStatus {
        const from = this.status
        switch (this.status) {
            case 'DRAFT':
                if (event.type === 'SUBMIT') this.status = 'SUBMITTED'
                break
            case 'SUBMITTED':
                if (event.type === 'START_SCRUTINY') this.status = 'UNDER_SCRUTINY'
                break
            case 'UNDER_SCRUTINY':
                if (event.type === 'COMPLETE_SCRUTINY') {
                    this.status = event.score >= 75 ? 'PANEL_REVIEW' : 'RETURNED'
                }
                break
            case 'RETURNED':
                if (event.type === 'RESUBMIT') this.status = 'SUBMITTED'
                break
            case 'PANEL_REVIEW':
                if (event.type === 'SCHEDULE_VISIT') this.status = 'ONSITE_VISIT'
                if (event.type === 'APPROVE') this.status = 'APPROVED'
                if (event.type === 'REFUSE') this.status = 'REFUSED'
                break
            case 'ONSITE_VISIT':
                if (event.type === 'APPROVE') this.status = 'APPROVED'
                if (event.type === 'REFUSE') this.status = 'REFUSED'
                break
            default:
                // APPROVED and REFUSED are terminal states
                break
        }

        if (this.status !== from) {
            this.history.push({ from, event, timestamp: new Date() })
        }
        return this.status
    }

    getHistory(): { from: ApplicationStatus; event: Event; timestamp: Date }[] {
        return this.history
    }
}