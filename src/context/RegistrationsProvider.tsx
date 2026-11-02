import { useEffect, useState, type ReactNode } from 'react'
import {
  createRegistration,
  isDuplicateRegistration,
} from '../lib/registration'
import {
  readStoredRegistrations,
  writeStoredRegistrations,
} from '../lib/storage'
import type { Registration } from '../types'
import {
  RegistrationsContext,
  type RegisterResult,
} from './registrations-context'

export function RegistrationsProvider({
  children,
}: {
  children: ReactNode
}) {
  const [registrations, setRegistrations] = useState<Registration[]>(
    readStoredRegistrations,
  )

  useEffect(() => {
    writeStoredRegistrations(registrations)
  }, [registrations])

  const register = (input: {
    name: string
    email: string
    phone: string
    eventSlug: string
  }): RegisterResult => {
    if (
      isDuplicateRegistration(registrations, input.eventSlug, input.email)
    ) {
      return { ok: false, reason: 'duplicate' }
    }

    const registration = createRegistration(input)
    setRegistrations((current) => [registration, ...current])

    return { ok: true, registration }
  }

  const cancelRegistration = (id: string) => {
    setRegistrations((current) =>
      current.filter((registration) => registration.id !== id),
    )
  }

  return (
    <RegistrationsContext.Provider
      value={{ registrations, register, cancelRegistration }}
    >
      {children}
    </RegistrationsContext.Provider>
  )
}
