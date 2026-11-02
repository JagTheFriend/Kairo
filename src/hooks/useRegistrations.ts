import { useContext } from 'react'
import { RegistrationsContext } from '../context/registrations-context'

export function useRegistrations() {
  const context = useContext(RegistrationsContext)

  if (!context) {
    throw new Error('useRegistrations must be used inside RegistrationsProvider')
  }

  return context
}
