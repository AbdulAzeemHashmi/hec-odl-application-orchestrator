export type CalendarEvent = {
  title: string
  description: string
  location: string
  startTime: Date
  endTime?: Date
}

function formatDateToIcs(date: Date): string {
  return date.toISOString().replace(/-|:|\.\d+/g, '')
}

export function generateIcsContent(event: CalendarEvent): string {
  const end = event.endTime || new Date(event.startTime.getTime() + 2 * 60 * 60 * 1000) // Default 2 hours
  const now = new Date()

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//HEC Pakistan//ODL Application Orchestrator//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:hec-visit-${event.startTime.getTime()}@hec.gov.pk`,
    `DTSTAMP:${formatDateToIcs(now)}`,
    `DTSTART:${formatDateToIcs(event.startTime)}`,
    `DTEND:${formatDateToIcs(end)}`,
    `SUMMARY:${event.title.replace(/\n/g, ' ')}`,
    `DESCRIPTION:${event.description.replace(/\n/g, '\\n')}`,
    `LOCATION:${event.location.replace(/\n/g, ' ')}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')
}

export function downloadIcsFile(event: CalendarEvent, filename = 'hec-inspection-visit.ics') {
  const content = generateIcsContent(event)
  const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' })
  const link = document.createElement('a')
  link.href = window.URL.createObjectURL(blob)
  link.setAttribute('download', filename)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export function getGoogleCalendarUrl(event: CalendarEvent): string {
  const end = event.endTime || new Date(event.startTime.getTime() + 2 * 60 * 60 * 1000)
  const startIso = formatDateToIcs(event.startTime)
  const endIso = formatDateToIcs(end)

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    dates: `${startIso}/${endIso}`,
    details: event.description,
    location: event.location,
  })

  return `https://calendar.google.com/calendar/render?${params.toString()}`
}
