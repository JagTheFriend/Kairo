import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { SiteLayout } from './components/SiteLayout'
import { RegistrationsProvider } from './context/RegistrationsProvider'
import { EventDetailPage } from './pages/EventDetailPage'
import { EventsPage } from './pages/EventsPage'
import { HomePage } from './pages/HomePage'
import { NotFoundPage } from './pages/NotFoundPage'
import { RegisterPage } from './pages/RegisterPage'
import { RegistrationsPage } from './pages/RegistrationsPage'

export default function App() {
  return (
    <BrowserRouter>
      <RegistrationsProvider>
        <Routes>
          <Route element={<SiteLayout />}>
            <Route index element={<HomePage />} />
            <Route path="events" element={<EventsPage />} />
            <Route path="events/:slug" element={<EventDetailPage />} />
            <Route
              path="events/:slug/register"
              element={<RegisterPage />}
            />
            <Route path="registrations" element={<RegistrationsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </RegistrationsProvider>
    </BrowserRouter>
  )
}
