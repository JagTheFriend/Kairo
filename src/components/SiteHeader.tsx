import { useEffect, useState, type ReactNode } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'
import { useRegistrations } from '../hooks/useRegistrations'
import { Logo } from './Logo'
import { ThemeToggle } from './ThemeToggle'

function NavItem({
  to,
  children,
  count,
}: {
  to: string
  children: ReactNode
  count?: number
}) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `group relative flex items-center gap-2 py-2 text-sm font-medium transition ${
          isActive ? 'text-ink' : 'text-muted hover:text-ink'
        }`
      }
    >
      {({ isActive }) => (
        <>
          <span>{children}</span>
          {typeof count === 'number' && count > 0 ? (
            <span className="grid min-w-5 place-items-center rounded-full bg-surface-alt px-1.5 py-0.5 text-[10px] font-semibold text-muted">
              {count}
            </span>
          ) : null}
          <span
            className={`absolute inset-x-0 -bottom-0.5 h-px origin-left bg-ink transition-transform duration-300 ${
              isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
            }`}
          />
        </>
      )}
    </NavLink>
  )
}

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { registrations } = useRegistrations()

  useEffect(() => {
    if (!menuOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [menuOpen])

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 768px)')
    const closeOnDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setMenuOpen(false)
    }

    desktop.addEventListener('change', closeOnDesktop)
    return () => desktop.removeEventListener('change', closeOnDesktop)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-canvas/90 backdrop-blur-md">
      <div className="shell flex h-[72px] items-center justify-between gap-4">
        <Logo />

        <nav
          className="hidden items-center gap-8 md:flex"
          aria-label="Main navigation"
        >
          <NavItem to="/events">Events</NavItem>
          <NavItem to="/registrations" count={registrations.length}>
            My registrations
          </NavItem>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            to="/events"
            className="btn btn-primary hidden h-10 px-5 sm:inline-flex"
          >
            Find an event
            <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
          <button
            type="button"
            className="grid size-10 place-items-center rounded-full border border-line text-ink transition hover:bg-surface-alt md:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? (
              <X size={19} aria-hidden="true" />
            ) : (
              <Menu size={19} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div className="absolute inset-x-0 top-full h-[calc(100svh-72px)] bg-coal/35 md:hidden">
          <button
            type="button"
            tabIndex={-1}
            aria-label="Close menu"
            className="absolute inset-0 size-full cursor-default"
            onClick={closeMenu}
          />
          <nav
            id="mobile-navigation"
            aria-label="Mobile navigation"
            className="page-enter relative border-b border-line bg-canvas shadow-xl shadow-ink/10"
          >
            <div className="shell py-4">
              <NavLink
                to="/events"
                onClick={closeMenu}
                className="flex items-center justify-between border-b border-line py-4 font-display text-2xl"
              >
                Events
                <ArrowUpRight size={18} aria-hidden="true" />
              </NavLink>
              <NavLink
                to="/registrations"
                onClick={closeMenu}
                className="flex items-center justify-between border-b border-line py-4 font-display text-2xl"
              >
                <span className="flex items-center gap-3">
                  My registrations
                  {registrations.length > 0 ? (
                    <span className="grid size-6 place-items-center rounded-full bg-surface-alt text-xs font-sans font-semibold text-muted">
                      {registrations.length}
                    </span>
                  ) : null}
                </span>
                <ArrowUpRight size={18} aria-hidden="true" />
              </NavLink>
              <Link
                to="/events"
                onClick={closeMenu}
                className="btn btn-primary mt-5 w-full"
              >
                Find an event
                <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  )
}
