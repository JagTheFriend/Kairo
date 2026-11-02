import { useMemo } from 'react'
import { SearchX } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import { EmptyState } from '../components/EmptyState'
import { EventFilters } from '../components/EventFilters'
import { EventGrid } from '../components/EventGrid'
import { PageHeader } from '../components/PageHeader'
import { upcomingEvents } from '../data/events'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import {
  EVENT_CATEGORIES,
  type EventCategory,
} from '../types'

function isEventCategory(value: string | null): value is EventCategory {
  return (
    value !== null &&
    (EVENT_CATEGORIES as readonly string[]).includes(value)
  )
}

export function EventsPage() {
  useDocumentTitle('Events')
  const [searchParams, setSearchParams] = useSearchParams()

  const query = searchParams.get('q') ?? ''
  const categoryParam = searchParams.get('category')
  const category: EventCategory | 'All' = isEventCategory(categoryParam)
    ? categoryParam
    : 'All'

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    for (const event of upcomingEvents) {
      counts[event.category] = (counts[event.category] ?? 0) + 1
    }
    return counts
  }, [])

  const filteredEvents = useMemo(() => {
    const term = query.trim().toLowerCase()

    return upcomingEvents.filter((event) => {
      const matchesCategory =
        category === 'All' || event.category === category
      const matchesQuery =
        !term ||
        [
          event.title,
          event.category,
          event.venue,
          event.city,
          event.address,
          event.summary,
        ]
          .join(' ')
          .toLowerCase()
          .includes(term)

      return matchesCategory && matchesQuery
    })
  }, [category, query])

  const updateParam = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams)
    if (value) next.set(key, value)
    else next.delete(key)
    setSearchParams(next, { replace: true })
  }

  const clearFilters = () => {
    setSearchParams({}, { replace: true })
  }

  const hasFilters = Boolean(query) || category !== 'All'

  return (
    <>
      <PageHeader
        eyebrow="The calendar"
        title="Find something worth doing."
        description="Every event on Kairo, in date order. Search by name or venue, or narrow things down by category."
      />

      <div className="shell py-10 sm:py-12">
        <EventFilters
          query={query}
          category={category}
          categoryCounts={categoryCounts}
          totalCount={upcomingEvents.length}
          onQueryChange={(value) => updateParam('q', value)}
          onCategoryChange={(value) =>
            updateParam('category', value === 'All' ? '' : value)
          }
        />

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted" aria-live="polite">
            <span className="font-medium text-ink">{filteredEvents.length}</span>{' '}
            {filteredEvents.length === 1 ? 'event' : 'events'}
            {query ? (
              <>
                {' '}
                for <span className="text-ink">“{query}”</span>
              </>
            ) : null}
            {category !== 'All' ? (
              <>
                {' '}
                in <span className="text-ink">{category}</span>
              </>
            ) : null}
          </p>

          {hasFilters ? (
            <button
              type="button"
              onClick={clearFilters}
              className="text-sm text-muted underline decoration-line-strong underline-offset-4 transition hover:text-ink"
            >
              Clear filters
            </button>
          ) : null}
        </div>

        <div className="mt-6">
          {filteredEvents.length > 0 ? (
            <EventGrid events={filteredEvents} />
          ) : (
            <EmptyState
              icon={<SearchX size={20} aria-hidden="true" />}
              title="Nothing matches that search."
              description="Try a shorter search, a different category, or clear the filters to see the full calendar."
              action={
                <button
                  type="button"
                  onClick={clearFilters}
                  className="btn btn-primary"
                >
                  Show all events
                </button>
              }
            />
          )}
        </div>
      </div>
    </>
  )
}
