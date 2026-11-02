import { CalendarDays, Clock, MapPin, Users } from 'lucide-react'
import { formatLongDate, formatPrice } from '../lib/date'
import type { EventItem } from '../types'

export function RegistrationSummary({
  event,
  registeredCount,
}: {
  event: EventItem
  registeredCount: number
}) {
  const spotsLeft = Math.max(event.capacity - registeredCount, 0)

  return (
    <aside className="lg:sticky lg:top-24">
      <div className="overflow-hidden rounded-2xl border border-line bg-surface">
        <img
          src={event.image}
          alt={event.imageAlt}
          className="aspect-[16/9] w-full object-cover"
        />
        <div className="p-5">
          <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted">
            {event.category}
          </p>
          <h2 className="mt-2 text-2xl font-medium leading-[1.05] tracking-[-0.025em]">
            {event.title}
          </h2>

          <dl className="mt-5 space-y-3 border-y border-line py-4 text-sm">
            <div className="flex gap-3">
              <CalendarDays
                size={15}
                className="mt-0.5 shrink-0 text-muted"
                aria-hidden="true"
              />
              <div>
                <dt className="sr-only">Date</dt>
                <dd>{formatLongDate(event.start)}</dd>
              </div>
            </div>
            <div className="flex gap-3">
              <Clock
                size={15}
                className="mt-0.5 shrink-0 text-muted"
                aria-hidden="true"
              />
              <div>
                <dt className="sr-only">Time</dt>
                <dd>{event.time}</dd>
              </div>
            </div>
            <div className="flex gap-3">
              <MapPin
                size={15}
                className="mt-0.5 shrink-0 text-muted"
                aria-hidden="true"
              />
              <div>
                <dt className="sr-only">Venue</dt>
                <dd>
                  {event.venue}
                  <span className="block text-xs text-muted">
                    {event.address}, {event.city}
                  </span>
                </dd>
              </div>
            </div>
          </dl>

          <div className="mt-4 flex items-center justify-between gap-3">
            <span className="font-display text-2xl font-medium tracking-[-0.02em]">
              {formatPrice(event.price)}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-muted">
              <Users size={14} aria-hidden="true" />
              {spotsLeft <= 12 ? `Only ${spotsLeft} left` : `${spotsLeft} spots`}
            </span>
          </div>
        </div>
      </div>
    </aside>
  )
}
