import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { SiteFooter } from './SiteFooter'
import { SiteHeader } from './SiteHeader'

export function SiteLayout() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [location.pathname])

  return (
    <div className="flex min-h-svh flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-canvas"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main-content" className="flex-1">
        <div key={location.pathname} className="page-enter">
          <Outlet />
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
