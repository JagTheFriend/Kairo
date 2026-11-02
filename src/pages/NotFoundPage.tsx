import { ArrowRight, Home } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export function NotFoundPage() {
  useDocumentTitle('Page not found')

  return (
    <div className="shell flex min-h-[68svh] flex-col items-center justify-center py-20 text-center">
      <p className="font-display text-[clamp(5rem,16vw,10rem)] font-medium leading-none tracking-[-0.06em] text-accent">
        404
      </p>
      <h1 className="mt-4 text-3xl font-medium tracking-[-0.03em] sm:text-4xl">
        This page missed the guest list.
      </h1>
      <p className="mt-4 max-w-md text-sm leading-6 text-muted">
        The link may be old, or the page may have moved. The calendar is still
        where you left it.
      </p>
      <div className="mt-7 flex flex-col gap-3 sm:flex-row">
        <Link to="/" className="btn btn-primary">
          <Home size={15} aria-hidden="true" />
          Back home
        </Link>
        <Link to="/events" className="btn btn-outline">
          Browse events
          <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </div>
    </div>
  )
}
