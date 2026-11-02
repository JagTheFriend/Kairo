import { useState } from 'react'
import { ArrowRight, Ticket } from 'lucide-react'
import { Link } from 'react-router-dom'
import { EmptyState } from '../components/EmptyState'
import { PageHeader } from '../components/PageHeader'
import { getEventBySlug } from '../data/events'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { useRegistrations } from '../hooks/useRegistrations'
import { getDateParts } from '../lib/date'
import type { EventItem, Registration } from '../types'

function RegistrationRow({
  registration,
  event,
  onCancel,
}: {
  registration: Registration
  event: EventItem
  onCancel: () => void
}) {
  const [confirming, setConfirming] = useState(false)
  const date = getDateParts(event.start)

  return (
    <article className="rounded-2xl border border-line bg-surface p-4 sm:p-5">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
        <div className="flex flex-1 gap-4">
          <div className="grid h-[64px] w-[58px] shrink-0 place-items-center rounded-xl border border-line bg-surface-alt text-center">
            <span>
              <span className="block text-[9px] font-semibold uppercase tracking-[0.12em] text-muted">
                {date.month}
              </span>
              <span className="mt-0.5 block font-display text-2xl font-semibold leading-none">
                {date.day}
              </span>
            </span>
          </div>

          <div className="min-w-0">
            <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-muted">
              {event.category}
            </p>
            <h2 className="mt-1 text-lg font-medium leading-tight tracking-[-0.02em]">
              <Link
                to={`/events/${event.slug}`}
                className="transition hover:text-accent"
              >
                {event.title}
              </Link>
            </h2>
            <p className="mt-1.5 text-xs leading-5 text-muted">
              {date.weekday}, {date.day} {date.month} · {event.time} ·{' '}
              {event.venue}
            </p>
            <p className="mt-1 text-[11px] text-muted">
              Ref {registration.reference} · {registration.name}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-3 sm:flex-col sm:items-end">
          <Link
            to={`/events/${event.slug}`}
            className="btn btn-outline px-4 py-2 text-xs"
          >
            View event
            <ArrowRight size={13} aria-hidden="true" />
          </Link>

          {confirming ? (
            <div className="flex items-center gap-3 text-xs">
              <button
                type="button"
                onClick={onCancel}
                className="font-medium text-danger underline underline-offset-4"
              >
                Yes, cancel
              </button>
              <button
                type="button"
                onClick={() => setConfirming(false)}
                className="text-muted underline underline-offset-4 hover:text-ink"
              >
                Keep it
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setConfirming(true)}
              className="text-xs text-muted underline underline-offset-4 transition hover:text-danger"
            >
              Cancel registration
            </button>
          )}
        </div>
      </div>
    </article>
  )
}

export function RegistrationsPage() {
  useDocumentTitle('My registrations')
  const { registrations, cancelRegistration } = useRegistrations()

  return (
    <>
      <PageHeader
        eyebrow="Your plans"
        title="Saved on this device."
        description="Every registration made in this browser lives here. Nothing is sent to a server, and clearing your browser data will remove them."
      />

      <div className="shell py-10 sm:py-14">
        {registrations.length === 0 ? (
          <EmptyState
            icon={<Ticket size={20} aria-hidden="true" />}
            title="No plans yet."
            description="Browse the calendar and register for something. Your confirmation and reference will show up here."
            action={
              <Link to="/events" className="btn btn-primary">
                Find an event
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            }
          />
        ) : (
          <div>
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-muted">
                <span className="font-medium text-ink">
                  {registrations.length}
                </span>{' '}
                {registrations.length === 1 ? 'registration' : 'registrations'}{' '}
                saved
              </p>
              <Link to="/events" className="link-arrow">
                Find another event
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>

            <div className="space-y-4">
              {registrations.map((registration) => {
                const event = getEventBySlug(registration.eventSlug)
                if (!event) return null

                return (
                  <RegistrationRow
                    key={registration.id}
                    registration={registration}
                    event={event}
                    onCancel={() => cancelRegistration(registration.id)}
                  />
                )
              })}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
