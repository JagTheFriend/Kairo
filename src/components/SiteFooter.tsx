import { Link } from 'react-router-dom'
import { EVENT_CATEGORIES } from '../types'
import { BrandMark } from './Logo'

const CURRENT_YEAR = new Date().getFullYear()

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="shell py-14 sm:py-16">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <Link
              to="/"
              className="inline-flex items-center gap-2.5"
              aria-label="Kairo home"
            >
              <BrandMark className="size-7" />
              <span className="font-display text-2xl font-semibold tracking-[-0.045em]">
                kairo
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-6 text-muted">
              A curated calendar of music, food, talks, and good company. Find
              something worth leaving the house for.
            </p>
          </div>

          <div>
            <h2 className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted">
              Explore
            </h2>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <Link className="transition hover:text-accent" to="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className="transition hover:text-accent" to="/events">
                  All events
                </Link>
              </li>
              <li>
                <Link
                  className="transition hover:text-accent"
                  to="/registrations"
                >
                  My registrations
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted">
              Browse
            </h2>
            <ul className="mt-4 space-y-3 text-sm">
              {EVENT_CATEGORIES.slice(0, 5).map((category) => (
                <li key={category}>
                  <Link
                    className="transition hover:text-accent"
                    to={`/events?category=${encodeURIComponent(category)}`}
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {CURRENT_YEAR} Kairo. A demo event platform.</p>
          <p>
            Built with React and Tailwind CSS. Photography via{' '}
            <a
              href="https://www.pexels.com/license/"
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-4 hover:text-ink"
            >
              Pexels
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  )
}
