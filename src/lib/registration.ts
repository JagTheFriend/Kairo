import type { Registration } from '../types'

export function createRegistration(input: {
  name: string
  email: string
  phone: string
  eventSlug: string
}): Registration {
  const id = crypto.randomUUID()
  const reference = `KAI-${id.replace(/-/g, '').slice(0, 6).toUpperCase()}`

  return {
    id,
    reference,
    name: input.name.trim(),
    email: input.email.trim(),
    phone: input.phone.trim(),
    eventSlug: input.eventSlug,
    createdAt: new Date().toISOString(),
  }
}

export function isDuplicateRegistration(
  registrations: Registration[],
  eventSlug: string,
  email: string,
): boolean {
  const normalisedEmail = email.trim().toLowerCase()

  return registrations.some(
    (registration) =>
      registration.eventSlug === eventSlug &&
      registration.email.trim().toLowerCase() === normalisedEmail,
  )
}
