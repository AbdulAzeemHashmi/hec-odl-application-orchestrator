import { AIClient } from './base'

/**
 * Deterministic Rule-Based AI Engine
 * Operates offline with $0 API cost and zero paid credentials.
 * Evaluates HEC ODL policy criteria deterministically and answers policy queries.
 */
export class DeterministicClient implements AIClient {
    async invoke(prompt: string): Promise<string> {
        const lower = prompt.toLowerCase()

        // Check if this invocation is for scrutiny dossier parameter analysis
        const isScrutinyAnalysis = lower.includes('analyze the following parameter') || lower.includes('claim/evidence')

        if (isScrutinyAnalysis) {
            const missingItems: string[] = []
            let score = 85

            if (!lower.includes('evidence') || lower.includes('"evidence":[]') || lower.includes('"evidenceurls":[]')) {
                score -= 30
                missingItems.push('Documentary evidence link is missing or unattached')
            }

            if (!lower.includes('approval') && lower.includes('statutory')) {
                score -= 20
                missingItems.push('Statutory authority approval certificate missing')
            }

            if (!lower.includes('lms') && !lower.includes('portal')) {
                score -= 15
                missingItems.push('Learning Management System (LMS) technical specifications unverified')
            }

            if (!lower.includes('faculty') && lower.includes('ratio')) {
                score -= 15
                missingItems.push('Dedicated ODL faculty ratio compliance proof missing')
            }

            const finalScore = Math.max(0, score)
            const summary = missingItems.length === 0
                ? 'Claim satisfies basic HEC ODL statutory requirements.'
                : `Deficiencies identified: ${missingItems.join('; ')}.`

            return JSON.stringify({
                score: finalScore,
                provider: 'Deterministic Safeguard Engine ($0 Free Tier)',
                missingItems,
                summary,
                timestamp: new Date().toISOString(),
            })
        }

        // Otherwise, this is a policy desk chat query. Provide an authoritative grounded response.
        return this.generatePolicyAnswer(lower)
    }

    private generatePolicyAnswer(query: string): string {
        if (query.includes('hi') || query.includes('hello') || query.includes('salam') || query.includes('hey')) {
            return `Hello! Welcome to the HEC ODL Policy Desk.

I can guide you through the regulatory requirements, readiness criteria, and compliance standards set by the Higher Education Commission (HEC) of Pakistan for Open and Distance Learning (ODL) programs.

You can ask me questions about:
1. Statutory approvals (Academic Council, Syndicate / BoG, HEC NOC)
2. Faculty qualifications and training requirements
3. LMS and technological infrastructure specifications
4. Eligible degree disciplines and assessment protocols
5. Student support services and study center guidelines.`
        }

        if (query.includes('faculty') || query.includes('teacher') || query.includes('ratio')) {
            return `According to the approved HEC ODL Policy guidelines for Faculty & Pedagogy:

1. **Dedicated ODL Faculty:** Higher Education Institutions (HEIs) must appoint qualified permanent faculty for each approved ODL program.
2. **Pedagogical Training:** All faculty members teaching ODL courses must complete mandatory training in online pedagogy, digital instructional design, and asynchronous student engagement.
3. **Faculty-to-Student Ratio:** Institutions must maintain prescribed student-teacher ratios (typically maximum 1:30 for tutoring/mentoring cohorts) to ensure individual feedback.
4. **Course Coordinators:** Each ODL degree must designate a permanent PhD/Master's qualified Course Coordinator to oversee content delivery and continuous assessment.`
        }

        if (query.includes('lms') || query.includes('technology') || query.includes('portal') || query.includes('infrastructure')) {
            return `According to the approved HEC ODL Policy requirements for Technology & LMS:

1. **Learning Management System (LMS):** Institutions must operate a robust, 24/7 accessible LMS (e.g., Moodle, Canvas, or an equivalent institutional platform).
2. **Features Required:**
   - Single Sign-On (SSO) authentication and automated activity logging.
   - Integrated digital repository for course syllabi, lecture recordings, and reading material.
   - Built-in plagiarism checking mechanisms for assignments and research work.
   - Secure gradebook and proctored online examination capabilities.
3. **Bandwidth & Redundancy:** HEIs must maintain high-speed enterprise connectivity and automated data backup systems.`
        }

        if (query.includes('approval') || query.includes('statutory') || query.includes('noc') || query.includes('syndicate')) {
            return `Statutory and Regulatory Approval Requirements for HEC ODL Programs:

1. **Internal Statutory Approval:**
   - Formal approval from the institution's Board of Studies and Academic Council.
   - Formal endorsement from the Syndicate or Board of Governors (BoG).
2. **HEC Readiness Certification:**
   - HEIs cannot launch or admit students into an ODL program without obtaining a formal No Objection Certificate (NOC) and Institutional Readiness Approval from the HEC Quality Assurance Division (QAD).
3. **Professional Councils:**
   - Programs requiring accreditation (e.g., Computing, Business) must also fulfill the corresponding accreditation council's distance education standards.`
        }

        if (query.includes('exam') || query.includes('assessment') || query.includes('proctor')) {
            return `Assessment and Examination Guidelines under HEC ODL Regulations:

1. **Proctored Summative Exams:** Final semester examinations must be conducted under strictly proctored conditions—either physically at verified HEC/HEI study centers or via secure, AI/camera-monitored proctoring systems.
2. **Continuous Formative Evaluation:** The grade must combine quizzes, discussion forum participation, assignments, and periodic milestones throughout the term.
3. **Academic Integrity:** Automated anti-plagiarism verification and identity authentication are mandatory for all student submissions.`
        }

        return `Based on the approved Higher Education Commission (HEC) Open and Distance Learning (ODL) Policy:

• **Institutional Eligibility:** Universities must possess charter authority, accredited programs, and HEC-certified institutional readiness before offering online/distance education.
• **Statutory Approvals:** Academic Council and Syndicate/BoG approvals must be formally verified.
• **Technology Foundation:** A 24/7 compliant Learning Management System (LMS) with secure proctoring and digital library access is required.
• **Faculty Readiness:** Dedicated instructors must undergo specialized digital pedagogy and course development certifications.
• **Assessment Integrity:** Strict summative proctoring and anti-plagiarism controls must be enforced.

If you have a specific question regarding faculty ratios, LMS specifications, or dossier submission, please ask!`
    }

    async isHealthy(): Promise<boolean> {
        return true
    }

    getName(): string {
        return 'Deterministic Safeguard Engine'
    }
}
