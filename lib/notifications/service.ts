import { prisma } from '@/lib/db/prisma'
import { deliverStatusEmail, EmailNotificationType } from './email'

export async function createAndDeliverNotification({
  userId,
  recipientEmail,
  title,
  message,
  href,
  applicationId,
  type = 'application_status_changed',
}: {
  userId: string
  recipientEmail?: string | null
  title: string
  message: string
  href?: string
  applicationId?: string
  type?: EmailNotificationType
}) {
  try {
    // 1. Create In-App Notification in DB
    const notification = await prisma.notification.create({
      data: {
        userId,
        title,
        message,
        href,
      },
    })

    // 2. Dispatch Zero-Cost Email Alert
    if (recipientEmail) {
      await deliverStatusEmail({
        type,
        recipient: recipientEmail,
        applicationId: applicationId || 'HEC-ODL-APP',
        title,
        details: message,
        actionUrl: href,
      })
    }

    return notification
  } catch (error) {
    console.error('Failed to create notification:', error)
    return null
  }
}
