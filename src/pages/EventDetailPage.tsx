import type { ReactNode } from 'react'
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  Clock,
  Info,
  MapPin,
  Sparkles,
} from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { Breadcrumbs } from '../components/Breadcrumbs'
import { Countdown } from '../components/Countdown'
import { EventGrid } from '../components/EventGrid'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { getEventBySlug, upcomingEvents } from '../data/events'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { useRegistrations } from '../hooks/useRegistrations'
import {
  formatLongDate,
  formatPrice,
  formatShortDate,
  isUpcoming,
} from '../lib/date'

function Meta({
  icon,
  label,
  value,
}: {
  icon: ReactNode
  label: string
  value: string
}) {
  return (
    <div className="flex gap-3">
      <span className="mt-0.5 text-muted">{icon}</span>
      <div>
        <dt className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted">
          {label}
        </dt>
        <dd className="mt-1 text-sm leading-6 text-ink">{value}</dd>
      </div>
    </div>
  )
}

export function EventDetailPage() {
  const { slug } = useParams()
  const event = getEventBySlug(slug)
  const { registrations } = useRegistrations()
  useDocumentTitle(event ? event.title : 'Event not found')

  if (!event) {
    return (
      <div className="shell flex min-h-[60svh] flex-col items-center justify-center py-20 text-center">
        <p className="eyebrow">
          <span className="eyebrow-dot" />
          404 / Event
        </p>
        <h1 className="mt-5 text-4xl font-medium tracking-[-0.03em] sm:text-5xl">
          That event is not here.
        </h1>
        <p className="mt-4 max-w-md text-sm leading-6 text-muted">
          It may have ended, or the link may be slightly off. The calendar is
          still full of good options.
        </p>
        <Link to="/events" className="btn btn-primary mt-7">
          Browse all events
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
    )
  }

  const eventRegistrations = registrations.filter(
    (registration) => registration.eventSlug === event.slug,
  )
  const spotsLeft = Math.max(event.capacity - eventRegistrations.length, 0)
  const registrationOpen = isUpcoming(event.start) && spotsLeft > 0

  const related = [
    ...upcomingEvents.filter(
      (item) =>
        item.slug !== event.slug && item.category === event.category,
    ),
    ...upcomingEvents.filter(
      (item) =>
        item.slug !== event.slug && item.category !== event.category,
    ),
  ].slice(0, 3)

  return (
    <>
      <div className="shell pb-28 pt-8 sm:pt-10 lg:pb-16">
        <Breadcrumbs
          items={[
            { label: 'Home', to: '/' },
            { label: 'Events', to: '/events' },
            { label: event.title },
          ]}
        />

        <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_350px] lg:gap-14">
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="rounded-full border border-accent/30 bg-accent/5 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-accent">
                {event.category}
              </span>
              {event.featured ? (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-muted">
                  <Sparkles size={11} aria-hidden="true" />
                  Featured
                </span>
              ) : null}
            </div>

            <h1 className="mt-5 max-w-4xl text-[clamp(2.6rem,5.5vw,4.8rem)] font-medium leading-[0.94] tracking-[-0.045em]">
              {event.title}
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-muted sm:text-lg sm:leading-8">
              {event.summary}
            </p>

            <dl className="mt-8 grid gap-5 border-y border-line py-5 sm:grid-cols-3">
              <Meta
                icon={<CalendarDays size={16} aria-hidden="true" />}
                label="Date"
                value={formatLongDate(event.start)}
              />
              <Meta
                icon={<Clock size={16} aria-hidden="true" />}
                label="Time"
                value={event.time}
              />
              <Meta
                icon={<MapPin size={16} aria-hidden="true" />}
                label="Venue"
                value={`${event.venue}, ${event.city}`}
              />
            </dl>

            <div className="mt-8 overflow-hidden rounded-2xl border border-line">
              <img
                src={event.image}
                alt={event.imageAlt}
                className="aspect-[16/10] w-full object-cover"
              />
            </div>

            <section className="mt-12">
              <h2 className="text-2xl font-medium tracking-[-0.025em]">
                About this event
              </h2>
              <div className="mt-4 max-w-2xl space-y-4 text-[15px] leading-7 text-muted">
                {event.about.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>

            <div className="mt-10 grid gap-8 border-t border-line pt-10 sm:grid-cols-2">
              <section>
                <h2 className="text-xl font-medium tracking-[-0.02em]">
                  What to expect
                </h2>
                <ul className="mt-4 space-y-3">
                  {event.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex gap-3 text-sm leading-6 text-muted"
                    >
                      <Check
                        size={15}
                        className="mt-1 shrink-0 text-accent"
                        aria-hidden="true"
                      />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-medium tracking-[-0.02em]">
                  Good to know
                </h2>
                <ul className="mt-4 space-y-3">
                  {event.goodToKnow.map((note) => (
                    <li
                      key={note}
                      className="flex gap-3 text-sm leading-6 text-muted"
                    >
                      <Info
                        size={15}
                        className="mt-1 shrink-0 text-muted"
                        aria-hidden="true"
                      />
                      {note}
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <section className="mt-10 rounded-2xl border border-line bg-surface p-6">
              <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted">
                Organiser
              </p>
              <div className="mt-2 flex flex-wrap items-center justify-between gap-4">
                <p className="font-display text-xl font-medium">
                  {event.organizer}
                </p>
                <p className="text-xs text-muted">
                  {event.address}, {event.city}
                </p>
              </div>
            </section>
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-2xl border border-line bg-surface p-6">
              <div className="flex items-baseline justify-between gap-3">
                <p className="font-display text-3xl font-medium tracking-[-0.03em]">
                  {formatPrice(event.price)}
                </p>
                <p className="text-xs text-muted">
                  {event.price === 0 ? 'Free entry' : 'per person'}
                </p>
              </div>

              {registrationOpen ? (
                <>
                  <div className="mt-5">
                    <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.16em] text-muted">
                      Countdown
                    </p>
                    <Countdown target={event.start} />
                  </div>

                  <Link
                    to={`/events/${event.slug}/register`}
                    className="btn btn-primary mt-5 w-full"
                  >
                    Register for this event
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </Link>

                  <p className="mt-3 text-center text-[11px] text-muted">
                    {spotsLeft <= 12
                      ? `Only ${spotsLeft} spots left`
                      : `${spotsLeft} spots available`}
                  </p>
                </>
              ) : (
                <p className="mt-5 rounded-xl bg-surface-alt px-4 py-3 text-sm text-muted">
                  Registration is closed for this event.
                </p>
              )}

              <dl className="mt-5 space-y-3 border-t border-line pt-5 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-muted">Date</dt>
                  <dd className="text-right">
                    {formatShortDate(event.start)}
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted">Time</dt>
                  <dd className="text-right">{event.time}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted">Venue</dt>
                  <dd className="max-w-[180px] text-right">{event.venue}</dd>
                </div>
              </dl>

              <p className="mt-5 border-t border-line pt-4 text-[11px] leading-5 text-muted">
                No account needed. Your registration is saved in this browser.
              </p>
            </div>
          </aside>
        </div>
      </div>

      <section className="border-t border-line bg-surface">
        <div className="shell py-16 sm:py-20">
          <Reveal>
            <SectionHeading
              eyebrow="Keep going"
              title="You might also like"
              action={
                <Link to="/events" className="link-arrow">
                  All events
                  <ArrowRight size={15} aria-hidden="true" />
                </Link>
              }
            />
          </Reveal>
          <div className="mt-8">
            <EventGrid events={related} />
          </div>
        </div>
      </section>

      {registrationOpen ? (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-canvas/95 px-5 py-3 backdrop-blur-md lg:hidden">
          <div className="mx-auto flex max-w-lg items-center justify-between gap-4">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-muted">
                {formatPrice(event.price)}
              </p>
              <p className="text-sm font-medium">{event.title}</p>
            </div>
            <Link
              to={`/events/${event.slug}/register`}
              className="btn btn-primary shrink-0 px-5 py-2.5"
            >
              Register
              <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </div>
      ) : null}
    </>
  )
}
