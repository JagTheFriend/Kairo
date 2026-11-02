export type RegistrationField = 'name' | 'email' | 'phone' | 'eventSlug'

export type RegistrationErrors = Partial<Record<RegistrationField, string>>

const NAME_PATTERN = /^[\p{L}][\p{L}\p{M}\s'.-]*$/u
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const PHONE_PATTERN = /^\+?[\d\s().-]+$/

export function validateName(value: string): string | undefined {
  const name = value.trim()

  if (!name) return 'Please enter your full name.'
  if (name.length < 2) return 'Your name needs at least 2 characters.'
  if (name.length > 80) return 'Please keep your name under 80 characters.'
  if (!NAME_PATTERN.test(name)) return 'Use letters, spaces, apostrophes, or hyphens only.'

  return undefined
}

export function validateEmail(value: string): string | undefined {
  const email = value.trim()

  if (!email) return 'Please enter your email address.'
  if (email.length > 254) return 'That email address is too long.'
  if (!EMAIL_PATTERN.test(email)) return 'Enter a valid email address, like you@example.com.'

  return undefined
}

export function validatePhone(value: string): string | undefined {
  const phone = value.trim()

  if (!phone) return 'Please enter your phone number.'
  if (!PHONE_PATTERN.test(phone)) return 'Use digits, spaces, brackets, or a leading + only.'

  const digits = phone.replace(/\D/g, '')
  if (digits.length < 7 || digits.length > 15) {
    return 'Enter a phone number with 7 to 15 digits.'
  }

  return undefined
}

export function validateEventSlug(
  value: string,
  availableSlugs: readonly string[],
): string | undefined {
  if (!value) return 'Choose an event.'
  if (!availableSlugs.includes(value)) return 'That event is no longer available.'

  return undefined
}

export function validateRegistration(
  values: {
    name: string
    email: string
    phone: string
    eventSlug: string
  },
  availableSlugs: readonly string[],
): RegistrationErrors {
  const errors: RegistrationErrors = {}

  const name = validateName(values.name)
  const email = validateEmail(values.email)
  const phone = validatePhone(values.phone)
  const eventSlug = validateEventSlug(values.eventSlug, availableSlugs)

  if (name) errors.name = name
  if (email) errors.email = email
  if (phone) errors.phone = phone
  if (eventSlug) errors.eventSlug = eventSlug

  return errors
}
