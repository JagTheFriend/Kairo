import type { EventItem } from '../types'
import { EventCard } from './EventCard'
import { Reveal } from './Reveal'

export function EventGrid({
  events,
  className = '',
}: {
  events: EventItem[]
  className?: string
}) {
  return (
    <div className={`grid gap-5 sm:grid-cols-2 lg:grid-cols-3 ${className}`}>
      {events.map((event, index) => (
        <Reveal
          key={event.slug}
          delay={Math.min(index * 60, 240)}
          className="h-full"
        >
          <EventCard event={event} />
        </Reveal>
      ))}
    </div>
  )
}
