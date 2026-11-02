import { Search, X } from 'lucide-react'
import { EVENT_CATEGORIES, type EventCategory } from '../types'

type CategorySelection = EventCategory | 'All'

export function EventFilters({
  query,
  category,
  categoryCounts,
  totalCount,
  onQueryChange,
  onCategoryChange,
}: {
  query: string
  category: CategorySelection
  categoryCounts: Record<string, number>
  totalCount: number
  onQueryChange: (value: string) => void
  onCategoryChange: (value: CategorySelection) => void
}) {
  return (
    <div>
      <div className="relative max-w-2xl">
        <Search
          size={19}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted"
          aria-hidden="true"
        />
        <label htmlFor="event-search" className="sr-only">
          Search events
        </label>
        <input
          id="event-search"
          type="search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search by name, venue, or category"
          className="input h-13 rounded-full py-3.5 pl-11 pr-11 text-[15px]"
        />
        {query ? (
          <button
            type="button"
            onClick={() => onQueryChange('')}
            className="absolute right-3 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-full text-muted transition hover:bg-surface-alt hover:text-ink"
            aria-label="Clear search"
          >
            <X size={15} aria-hidden="true" />
          </button>
        ) : null}
      </div>

      <div className="no-scrollbar -mx-5 mt-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
        <button
          type="button"
          onClick={() => onCategoryChange('All')}
          aria-pressed={category === 'All'}
          className={`chip ${category === 'All' ? 'chip-active' : ''}`}
        >
          All events
          <span className="tabular-nums opacity-60">{totalCount}</span>
        </button>
        {EVENT_CATEGORIES.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => onCategoryChange(item)}
            aria-pressed={category === item}
            className={`chip ${category === item ? 'chip-active' : ''}`}
          >
            {item}
            <span className="tabular-nums opacity-60">
              {categoryCounts[item] ?? 0}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
