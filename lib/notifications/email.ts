type StatusEmail = { recipient: string; applicationId: string; status: string }

// Optional adapter: a free sender/webhook can be connected by setting EMAIL_WEBHOOK_URL.
// Without it, all workflow notifications remain in-app and no email is attempted.
export async function deliverStatusEmail(payload: StatusEmail) {
  const endpoint = process.env.EMAIL_WEBHOOK_URL
  if (!endpoint) return { delivered: false, reason: 'Email delivery is not configured' }
  try {
    const response = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ type: 'application_status_changed', ...payload }) })
    return { delivered: response.ok, reason: response.ok ? undefined : `Sender returned ${response.status}` }
  } catch { return { delivered: false, reason: 'Sender could not be reached' } }
}
