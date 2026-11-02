import { useEffect, useRef } from 'react'
import {
  ArrowRight,
  CalendarDays,
  Check,
  Clock,
  MapPin,
  User,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { formatLongDate } from '../lib/date'
import type { EventItem, Registration } from '../types'

export function RegistrationSuccess({
  registration,
  event,
}: {
  registration: Registration
  event: EventItem
}) {
  const headingRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true })
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [])

  return (
    <div className="shell py-14 sm:py-20">
      <div className="mx-auto max-w-2xl">
        <div className="text-center">
          <span className="mx-auto grid size-14 place-items-center rounded-full bg-success/10 text-success">
            <Check size={26} strokeWidth={2.2} aria-hidden="true" />
          </span>
          <p className="eyebrow mt-6 justify-center">
            <span className="eyebrow-dot" />
            Registration confirmed
          </p>
          <h1
            ref={headingRef}
            tabIndex={-1}
            className="mt-4 text-4xl font-medium leading-[0.98] tracking-[-0.04em] outline-none sm:text-5xl"
          >
            You are on the list.
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-muted sm:text-base">
            Your spot for <span className="text-ink">{event.title}</span> is
            saved. Keep the reference below or find it again under My
            registrations.
          </p>
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl border border-line bg-surface">
          <div className="border-b border-line bg-surface-alt px-5 py-3">
            <p className="text-center text-[11px] font-medium uppercase tracking-[0.16em] text-muted">
              Reference · <span className="text-ink">{registration.reference}</span>
            </p>
          </div>
          <div className="p-5 sm:p-6">
            <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-accent">
              {event.category}
            </p>
            <h2 className="mt-2 text-2xl font-medium leading-[1.05] tracking-[-0.025em]">
              {event.title}
            </h2>

            <dl className="mt-5 grid gap-4 border-t border-line pt-5 text-sm sm:grid-cols-2">
              <div className="flex gap-3">
                <CalendarDays
                  size={15}
                  className="mt-0.5 shrink-0 text-muted"
                  aria-hidden="true"
                />
                <div>
                  <dt className="text-xs text-muted">Date</dt>
                  <dd className="mt-0.5">{formatLongDate(event.start)}</dd>
                </div>
              </div>
              <div className="flex gap-3">
                <Clock
                  size={15}
                  className="mt-0.5 shrink-0 text-muted"
                  aria-hidden="true"
                />
                <div>
                  <dt className="text-xs text-muted">Time</dt>
                  <dd className="mt-0.5">{event.time}</dd>
                </div>
              </div>
              <div className="flex gap-3">
                <MapPin
                  size={15}
                  className="mt-0.5 shrink-0 text-muted"
                  aria-hidden="true"
                />
                <div>
                  <dt className="text-xs text-muted">Venue</dt>
                  <dd className="mt-0.5">
                    {event.venue}, {event.city}
                  </dd>
                </div>
              </div>
              <div className="flex gap-3">
                <User
                  size={15}
                  className="mt-0.5 shrink-0 text-muted"
                  aria-hidden="true"
                />
                <div>
                  <dt className="text-xs text-muted">Registered to</dt>
                  <dd className="mt-0.5 break-all">
                    {registration.name}
                    <span className="block text-xs text-muted">
                      {registration.email}
                    </span>
                  </dd>
                </div>
              </div>
            </dl>
          </div>
        </div>

        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Link to="/registrations" className="btn btn-primary">
            View my registrations
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
          <Link to="/events" className="btn btn-outline">
            Back to events
          </Link>
        </div>

        <p className="mt-5 text-center text-xs leading-5 text-muted">
          This demo stores registrations on this device only. Clearing your
          browser data will remove them.
        </p>
      </div>
    </div>
  )
}
