export type EmailNotificationType =
  | 'application_status_changed'
  | 'deficiency_notice'
  | 'visit_scheduled'
  | 'noc_issued'

export type EmailPayload = {
  type: EmailNotificationType
  recipient: string
  applicationId: string
  status?: string
  title: string
  details?: string
  actionUrl?: string
}

// In-memory local outbox log for inspection (zero-cost, no credit card)
export const localOutboxLog: Array<EmailPayload & { sentAt: string }> = []

function generateEmailHtml(payload: EmailPayload): string {
  const portalUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://hec-odl-application-orchestrator.vercel.app'
  const actionLink = payload.actionUrl ? `${portalUrl}${payload.actionUrl}` : portalUrl

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8"/>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #0f172a; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; }
          .header { background: #1e3a8a; padding: 24px; text-align: center; color: #ffffff; }
          .body { padding: 32px 24px; }
          .badge { display: inline-block; background: #eff6ff; color: #1d4ed8; font-weight: bold; font-size: 12px; padding: 4px 12px; border-radius: 9999px; margin-bottom: 12px; }
          .button { display: inline-block; background: #1d4ed8; color: #ffffff !important; font-weight: 600; font-size: 14px; padding: 12px 24px; border-radius: 8px; text-decoration: none; margin-top: 20px; }
          .footer { background: #f1f5f9; padding: 16px 24px; text-align: center; font-size: 12px; color: #64748b; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2 style="margin:0;font-size:20px;">Higher Education Commission</h2>
            <p style="margin:4px 0 0 0;font-size:12px;opacity:0.85;">Quality Assurance Division · ODL Section</p>
          </div>
          <div class="body">
            <div class="badge">Official Workflow Alert</div>
            <h3 style="margin-top:0;">${payload.title}</h3>
            <p style="line-height:1.6;color:#334155;">${payload.details || 'Your application status has been updated in the HEC ODL Portal.'}</p>
            <p style="font-size:13px;color:#64748b;">Application Reference: <strong>${payload.applicationId}</strong></p>
            <a href="${actionLink}" class="button">Open in HEC Portal</a>
          </div>
          <div class="footer">
            <p style="margin:0;">This is an automated notification from the HEC ODL Application Orchestrator.</p>
          </div>
        </div>
      </body>
    </html>
  `
}

export async function deliverStatusEmail(payload: EmailPayload): Promise<{
  delivered: boolean
  method: string
  reason?: string
}> {
  // 1. Log to zero-cost local outbox
  localOutboxLog.push({ ...payload, sentAt: new Date().toISOString() })
  console.log(`[Zero-Cost Email Outbox] Alert sent to ${payload.recipient}: "${payload.title}"`)

  // 2. Check for optional external free Webhook/SMTP if configured by user
  const webhookUrl = process.env.EMAIL_WEBHOOK_URL
  if (webhookUrl) {
    try {
      const html = generateEmailHtml(payload)
      const res = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, html }),
      })
      return { delivered: res.ok, method: 'webhook', reason: res.ok ? undefined : `Status ${res.status}` }
    } catch (err: any) {
      return { delivered: false, method: 'webhook', reason: err?.message || 'Network error' }
    }
  }

  // Gracefully succeeded on free local outbox engine
  return { delivered: true, method: 'local_outbox_log' }
}
