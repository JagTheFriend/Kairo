import type { Registration } from '../types'

export const THEME_STORAGE_KEY = 'kairo.theme'
export const REGISTRATION_STORAGE_KEY = 'kairo.registrations'

function isRegistration(value: unknown): value is Registration {
  if (!value || typeof value !== 'object') return false

  const item = value as Record<string, unknown>
  return (
    typeof item.id === 'string' &&
    typeof item.reference === 'string' &&
    typeof item.name === 'string' &&
    typeof item.email === 'string' &&
    typeof item.phone === 'string' &&
    typeof item.eventSlug === 'string' &&
    typeof item.createdAt === 'string'
  )
}

export function readStoredRegistrations(): Registration[] {
  try {
    const raw = window.localStorage.getItem(REGISTRATION_STORAGE_KEY)
    if (!raw) return []

    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []

    return parsed.filter(isRegistration)
  } catch {
    return []
  }
}

export function writeStoredRegistrations(registrations: Registration[]): void {
  try {
    window.localStorage.setItem(
      REGISTRATION_STORAGE_KEY,
      JSON.stringify(registrations),
    )
  } catch {
    // The app still works for this session if storage is unavailable.
  }
}
