import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Breadcrumbs } from '../components/Breadcrumbs'
import { PageHeader } from '../components/PageHeader'
import { RegistrationForm } from '../components/RegistrationForm'
import { RegistrationSuccess } from '../components/RegistrationSuccess'
import { RegistrationSummary } from '../components/RegistrationSummary'
import { getEventBySlug, upcomingEvents } from '../data/events'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { useRegistrations } from '../hooks/useRegistrations'
import type { EventItem, Registration } from '../types'
import { NotFoundPage } from './NotFoundPage'

export function RegisterPage() {
  const { slug } = useParams()
  const initialEvent = getEventBySlug(slug)
  const { registrations } = useRegistrations()
  const [selectedSlug, setSelectedSlug] = useState(initialEvent?.slug ?? '')
  const [confirmed, setConfirmed] = useState<{
    registration: Registration
    event: EventItem
  } | null>(null)

  useDocumentTitle(
    confirmed
      ? 'Registration confirmed'
      : initialEvent
        ? `Register — ${initialEvent.title}`
        : 'Register',
  )

  if (!initialEvent) return <NotFoundPage />

  const selectedEvent = getEventBySlug(selectedSlug) ?? initialEvent
  const registeredCount = registrations.filter(
    (registration) => registration.eventSlug === selectedEvent.slug,
  ).length

  if (confirmed) {
    return (
      <RegistrationSuccess
        registration={confirmed.registration}
        event={confirmed.event}
      />
    )
  }

  return (
    <>
      <PageHeader
        eyebrow="Registration"
        title="Save your spot."
        description="Choose an event, add a few details, and you are set. It takes about two minutes."
      />

      <div className="shell py-10 sm:py-14">
        <Breadcrumbs
          items={[
            { label: 'Home', to: '/' },
            { label: 'Events', to: '/events' },
            {
              label: selectedEvent.title,
              to: `/events/${selectedEvent.slug}`,
            },
            { label: 'Register' },
          ]}
        />

        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_350px] lg:items-start lg:gap-14">
          <RegistrationForm
            events={upcomingEvents}
            selectedEventSlug={selectedSlug}
            onEventChange={setSelectedSlug}
            onSuccess={(registration, event) =>
              setConfirmed({ registration, event })
            }
          />
          <div className="order-first lg:order-none">
            <RegistrationSummary
              event={selectedEvent}
              registeredCount={registeredCount}
            />
          </div>
        </div>
      </div>
    </>
  )
}
