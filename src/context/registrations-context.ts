import { createContext } from 'react'
import type { Registration } from '../types'

export type RegisterResult =
  | { ok: true; registration: Registration }
  | { ok: false; reason: 'duplicate' }

export interface RegistrationsContextValue {
  registrations: Registration[]
  register: (input: {
    name: string
    email: string
    phone: string
    eventSlug: string
  }) => RegisterResult
  cancelRegistration: (id: string) => void
}

export const RegistrationsContext =
  createContext<RegistrationsContextValue | null>(null)
