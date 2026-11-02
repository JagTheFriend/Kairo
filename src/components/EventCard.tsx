import { ArrowUpRight, Clock, MapPin, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { getDateParts } from '../lib/date'
import type { EventItem } from '../types'

export function EventCard({ event }: { event: EventItem }) {
  const date = getDateParts(event.start)

  return (
    <article className="group h-full">
      <Link
        to={`/events/${event.slug}`}
        className="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface transition duration-300 hover:border-line-strong hover:shadow-[0_18px_45px_-30px_rgba(0,0,0,0.55)]"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-surface-alt">
          <img
            src={event.image}
            alt={event.imageAlt}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.035]"
          />
          <div className="absolute left-4 top-4 rounded-xl bg-cream px-3 py-2 text-center text-coal shadow-sm">
            <span className="block text-[10px] font-semibold uppercase tracking-[0.12em]">
              {date.month}
            </span>
            <span className="mt-0.5 block font-display text-xl font-semibold leading-none">
              {date.day}
            </span>
          </div>
          {event.featured ? (
            <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-coal/80 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.12em] text-cream backdrop-blur-sm">
              <Sparkles size={11} aria-hidden="true" />
              Featured
            </span>
          ) : null}
        </div>

        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <div className="flex items-center justify-between gap-3 text-[11px] font-medium uppercase tracking-[0.14em] text-muted">
            <span>{event.category}</span>
            <span className="text-ink">
              {event.price === 0 ? 'Free' : `$${event.price}`}
            </span>
          </div>

          <h3 className="mt-3 text-[1.45rem] font-medium leading-[1.08] tracking-[-0.025em] transition group-hover:text-accent">
            {event.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted">
            {event.summary}
          </p>

          <div className="mt-auto flex items-end justify-between gap-4 border-t border-line pt-4">
            <div className="mt-4 space-y-1.5 text-xs text-muted">
              <p className="flex items-center gap-2">
                <Clock size={13} aria-hidden="true" />
                <time dateTime={event.start}>
                  {date.weekday}, {date.day} {date.month}
                </time>
              </p>
              <p className="flex items-center gap-2">
                <MapPin size={13} aria-hidden="true" />
                {event.venue}
              </p>
            </div>
            <span className="grid size-9 shrink-0 place-items-center rounded-full border border-line text-ink transition duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-canvas">
              <ArrowUpRight size={15} aria-hidden="true" />
            </span>
          </div>
        </div>
      </Link>
    </article>
  )
}
