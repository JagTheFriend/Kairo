import { useState, type FormEvent } from 'react'
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Search,
  Sparkles,
} from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { Countdown } from '../components/Countdown'
import { EventGrid } from '../components/EventGrid'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import {
  HERO_EVENT_SLUG,
  getEventBySlug,
  upcomingEvents,
} from '../data/events'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { formatPrice, getDateParts, formatMonthYear } from '../lib/date'
import { EVENT_CATEGORIES } from '../types'

const reasons = [
  {
    title: 'A shorter list',
    description:
      'We list fewer events, and we check them. If it is on Kairo, it is actually happening.',
  },
  {
    title: 'Details that matter',
    description:
      'Times, prices, access notes, and how to get there. No hunting through five different tabs.',
  },
  {
    title: 'Register in two minutes',
    description:
      'Name, email, phone. That is it. Your confirmation is saved on this device.',
  },
]

export function HomePage() {
  useDocumentTitle()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')

  const heroEvent = getEventBySlug(HERO_EVENT_SLUG) ?? upcomingEvents[0]
  const heroDate = getDateParts(heroEvent.start)
  const nextEvents = upcomingEvents
    .filter((event) => event.slug !== heroEvent.slug)
    .slice(0, 3)

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const term = query.trim()
    navigate(term ? `/events?q=${encodeURIComponent(term)}` : '/events')
  }

  return (
    <>
      <section className="border-b border-line">
        <div className="shell grid lg:grid-cols-[1.04fr_0.96fr]">
          <div className="flex flex-col justify-center py-14 sm:py-20 lg:min-h-[720px] lg:py-24 lg:pr-16">
            <p className="eyebrow">
              <span className="eyebrow-dot" />
              Curated in {heroEvent.city} · {formatMonthYear()}
            </p>

            <h1 className="mt-6 max-w-[11ch] text-[clamp(3.6rem,8vw,7.2rem)] font-medium leading-[0.88] tracking-[-0.055em]">
              Plans worth <em className="text-accent">making.</em>
            </h1>

            <p className="mt-7 max-w-md text-base leading-7 text-muted sm:text-lg">
              A hand-picked calendar of music, food, talks, and good company.
              Find something worth leaving the house for.
            </p>

            <form
              onSubmit={handleSearch}
              className="mt-8 flex max-w-md items-center gap-2 rounded-full border border-line bg-surface py-1.5 pl-4 pr-1.5 transition focus-within:border-ink"
              role="search"
            >
              <Search size={17} className="shrink-0 text-muted" aria-hidden="true" />
              <label htmlFor="hero-search" className="sr-only">
                Search events
              </label>
              <input
                id="hero-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Try “jazz” or “night market”"
                className="min-w-0 flex-1 bg-transparent py-2 text-sm text-ink outline-none placeholder:text-muted/70"
              />
              <button
                type="submit"
                className="grid size-10 shrink-0 place-items-center rounded-full bg-ink text-canvas transition hover:bg-accent hover:text-accent-contrast"
                aria-label="Search events"
              >
                <ArrowRight size={16} aria-hidden="true" />
              </button>
            </form>

            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Link to="/events" className="link-arrow">
                Browse all events
                <ArrowUpRight size={15} aria-hidden="true" />
              </Link>
              <a href="#coming-up" className="link-arrow text-muted">
                See what is on
                <ArrowDown size={15} aria-hidden="true" />
              </a>
            </div>

            <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-line pt-5 text-xs text-muted">
              <span>
                <strong className="font-semibold text-ink">
                  {upcomingEvents.length}
                </strong>{' '}
                events on the calendar
              </span>
              <span>
                <strong className="font-semibold text-ink">
                  {EVENT_CATEGORIES.length}
                </strong>{' '}
                categories
              </span>
              <span>Independent venues only</span>
            </div>
          </div>

          <div className="relative -mx-5 min-h-[460px] border-t border-line sm:-mx-8 lg:mx-0 lg:min-h-[720px] lg:border-l lg:border-t-0">
            <Link
              to={`/events/${heroEvent.slug}`}
              className="group absolute inset-0 block overflow-hidden bg-coal"
              aria-label={`Featured event: ${heroEvent.title}`}
            >
              <img
                src={heroEvent.image}
                alt={heroEvent.imageAlt}
                fetchPriority="high"
                className="h-full w-full object-cover transition duration-[1.2s] ease-out group-hover:scale-[1.025]"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10"
                aria-hidden="true"
              />

              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-cream/25 bg-black/20 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.14em] text-cream backdrop-blur-sm">
                  <Sparkles size={11} aria-hidden="true" />
                  Featured event
                </span>

                <div className="mt-4 flex items-end justify-between gap-6">
                  <div>
                    <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-cream/65">
                      {heroDate.weekday} {heroDate.day} {heroDate.month} ·{' '}
                      {heroEvent.category}
                    </p>
                    <h2 className="mt-2 text-4xl font-medium leading-none tracking-[-0.035em] text-cream sm:text-5xl">
                      {heroEvent.title}
                    </h2>
                    <p className="mt-3 text-sm text-cream/75">
                      {heroEvent.venue} · {heroEvent.time}
                    </p>
                  </div>
                  <span className="grid size-11 shrink-0 place-items-center rounded-full border border-cream/30 text-cream transition duration-300 group-hover:border-cream group-hover:bg-cream group-hover:text-coal">
                    <ArrowUpRight size={18} aria-hidden="true" />
                  </span>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-cream/20 pt-4">
                  <Countdown target={heroEvent.start} variant="inline" />
                  <span className="text-sm font-medium text-cream">
                    {formatPrice(heroEvent.price)}
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <div
        className="marquee overflow-hidden border-b border-line bg-surface py-4"
        aria-hidden="true"
      >
        <div className="marquee-track flex w-max items-center">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex items-center">
              {EVENT_CATEGORIES.map((category) => (
                <span
                  key={`${copy}-${category}`}
                  className="flex items-center gap-7 px-7"
                >
                  <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted">
                    {category}
                  </span>
                  <span className="size-1 rounded-full bg-accent" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <section id="coming-up" className="shell scroll-mt-24 py-16 sm:py-20">
        <Reveal>
          <SectionHeading
            eyebrow="01 / Coming up"
            title="The next few weeks"
            description="Three things we would clear an evening for. The full calendar is only a click away."
            action={
              <Link to="/events" className="link-arrow">
                See all {upcomingEvents.length} events
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            }
          />
        </Reveal>
        <div className="mt-8">
          <EventGrid events={nextEvents} />
        </div>
      </section>

      <section className="border-y border-line bg-surface">
        <div className="shell py-16 sm:py-20">
          <Reveal>
            <SectionHeading
              eyebrow="02 / Browse"
              title="Find your kind of night."
              description="A little music, a little food, and a few things you did not know were on."
            />
          </Reveal>

          <div className="mt-8 grid grid-cols-2 border-l border-t border-line md:grid-cols-4">
            {EVENT_CATEGORIES.map((category, index) => {
              const count = upcomingEvents.filter(
                (event) => event.category === category,
              ).length

              return (
                <Link
                  key={category}
                  to={`/events?category=${encodeURIComponent(category)}`}
                  className="group flex min-h-[132px] flex-col justify-between border-b border-r border-line p-5 transition hover:bg-canvas"
                >
                  <span className="text-[10px] tabular-nums text-muted">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="flex items-end justify-between gap-2">
                    <span className="font-display text-xl font-medium leading-[1.05] tracking-[-0.02em]">
                      {category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted">
                      {count}
                      <ArrowUpRight
                        size={13}
                        className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                        aria-hidden="true"
                      />
                    </span>
                  </span>
                </Link>
              )
            })}
            <Link
              to="/events"
              className="group flex min-h-[132px] flex-col justify-between border-b border-r border-line bg-ink p-5 text-canvas transition hover:bg-accent hover:text-accent-contrast"
            >
              <span className="text-[10px] tabular-nums opacity-60">
                {String(EVENT_CATEGORIES.length + 1).padStart(2, '0')}
              </span>
              <span className="flex items-end justify-between gap-2">
                <span className="font-display text-xl font-medium leading-[1.05] tracking-[-0.02em]">
                  All events
                </span>
                <ArrowUpRight size={14} aria-hidden="true" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      <section className="shell py-16 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <Reveal className="relative">
            <div
              className="absolute -left-3 -top-3 h-full w-full rounded-2xl border border-line-strong"
              aria-hidden="true"
            />
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src="/images/editorial-picnic.jpg"
                alt="A group of friends sharing food at a picnic in the park"
                loading="lazy"
                className="aspect-[4/3] w-full object-cover"
              />
              <span className="absolute bottom-4 left-4 rounded-full bg-cream/95 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.14em] text-coal">
                City Swap · Civic Hall
              </span>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <p className="eyebrow">
              <span className="eyebrow-dot" />
              03 / Why Kairo
            </p>
            <h2 className="mt-4 max-w-lg text-3xl font-medium leading-[1.02] tracking-[-0.03em] sm:text-4xl">
              Less scrolling. More showing up.
            </h2>
            <p className="mt-4 max-w-lg text-sm leading-6 text-muted sm:text-base">
              Most event lists are either endless or out of date. Kairo keeps a
              short, checked list of things happening in the city, with the
              details you actually need to decide.
            </p>

            <ol className="mt-8 border-y border-line">
              {reasons.map((reason, index) => (
                <li
                  key={reason.title}
                  className="grid grid-cols-[2rem_1fr] gap-4 border-b border-line py-5 last:border-b-0"
                >
                  <span className="font-display text-sm text-accent">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="text-base font-medium tracking-[-0.01em]">
                      {reason.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-6 text-muted">
                      {reason.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      <section className="shell pb-16 sm:pb-24">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-coal px-6 py-14 text-cream sm:px-12 sm:py-16 lg:px-16">
            <div
              className="absolute -right-16 -top-20 size-64 rounded-full border border-cream/10"
              aria-hidden="true"
            />
            <div
              className="absolute -right-8 -top-12 size-40 rounded-full border border-cream/10"
              aria-hidden="true"
            />
            <p className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-cream/55">
              <span className="inline-block size-1.5 rounded-full bg-flame" />
              The calendar is open
            </p>
            <div className="mt-5 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <h2 className="max-w-2xl text-4xl font-medium leading-[0.98] tracking-[-0.035em] sm:text-5xl">
                Your next good night is already on the calendar.
              </h2>
              <Link
                to="/events"
                className="btn shrink-0 bg-cream px-6 py-3.5 text-coal hover:-translate-y-0.5 hover:bg-white"
              >
                Find your event
                <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  )
}
