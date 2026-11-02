import { useState, type ChangeEvent, type FormEvent } from 'react'
import {
  AlertCircle,
  ArrowRight,
  ChevronDown,
  ShieldCheck,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { formatShortDate } from '../lib/date'
import {
  validateRegistration,
  type RegistrationErrors,
  type RegistrationField,
} from '../lib/validation'
import type { EventItem, Registration } from '../types'
import { useRegistrations } from '../hooks/useRegistrations'

const FIELD_IDS: Record<RegistrationField, string> = {
  name: 'field-name',
  email: 'field-email',
  phone: 'field-phone',
  eventSlug: 'field-event',
}

function FieldError({ id, message }: { id: string; message: string }) {
  return (
    <p id={id} className="field-error">
      <AlertCircle size={14} className="mt-0.5 shrink-0" aria-hidden="true" />
      {message}
    </p>
  )
}

export function RegistrationForm({
  events,
  selectedEventSlug,
  onEventChange,
  onSuccess,
}: {
  events: EventItem[]
  selectedEventSlug: string
  onEventChange: (slug: string) => void
  onSuccess: (registration: Registration, event: EventItem) => void
}) {
  const { register } = useRegistrations()
  const [values, setValues] = useState({ name: '', email: '', phone: '' })
  const [touched, setTouched] = useState<
    Partial<Record<RegistrationField, boolean>>
  >({})
  const [submitted, setSubmitted] = useState(false)
  const [duplicateError, setDuplicateError] = useState(false)

  const availableSlugs = events.map((event) => event.slug)
  const errors: RegistrationErrors = validateRegistration(
    { ...values, eventSlug: selectedEventSlug },
    availableSlugs,
  )

  const errorFor = (field: RegistrationField) =>
    submitted || touched[field] ? errors[field] : undefined

  const markTouched = (field: RegistrationField) => {
    setTouched((current) => ({ ...current, [field]: true }))
  }

  const updateValue = (
    field: 'name' | 'email' | 'phone',
    value: string,
  ) => {
    setValues((current) => ({ ...current, [field]: value }))
    setDuplicateError(false)
  }

  const handleBlur = (field: RegistrationField) => {
    markTouched(field)
  }

  const handleEventChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onEventChange(event.target.value)
    markTouched('eventSlug')
    setDuplicateError(false)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitted(true)
    setDuplicateError(false)

    const fields = Object.keys(errors) as RegistrationField[]
    if (fields.length > 0) {
      document.getElementById(FIELD_IDS[fields[0]])?.focus()
      return
    }

    const result = register({ ...values, eventSlug: selectedEventSlug })
    if (!result.ok) {
      setDuplicateError(true)
      return
    }

    const chosenEvent = events.find(
      (item) => item.slug === selectedEventSlug,
    )
    if (chosenEvent) onSuccess(result.registration, chosenEvent)
  }

  const nameError = errorFor('name')
  const emailError = errorFor('email')
  const phoneError = errorFor('phone')
  const eventError = errorFor('eventSlug')

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-2xl border border-line bg-surface p-5 sm:p-7"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-line pb-5">
        <h2 className="text-xl font-medium tracking-[-0.02em]">Your details</h2>
        <p className="text-xs text-muted">All fields are required.</p>
      </div>

      {duplicateError ? (
        <div
          role="alert"
          className="mt-5 flex gap-3 rounded-xl border border-danger/30 bg-danger/5 p-4 text-sm leading-6 text-danger"
        >
          <AlertCircle size={17} className="mt-0.5 shrink-0" aria-hidden="true" />
          <p>
            That email is already registered for this event. Use a different
            email or{' '}
            <Link
              to="/registrations"
              className="font-medium underline underline-offset-4"
            >
              view your registrations
            </Link>
            .
          </p>
        </div>
      ) : null}

      <div className="mt-6 space-y-5">
        <div>
          <label htmlFor={FIELD_IDS.name} className="field-label">
            <span>
              Full name <span className="text-accent">*</span>
            </span>
          </label>
          <input
            id={FIELD_IDS.name}
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={(event) => updateValue('name', event.target.value)}
            onBlur={() => handleBlur('name')}
            placeholder="Alex Morgan"
            aria-invalid={Boolean(nameError)}
            aria-describedby={nameError ? 'name-error' : undefined}
            className="input"
          />
          {nameError ? <FieldError id="name-error" message={nameError} /> : null}
        </div>

        <div>
          <label htmlFor={FIELD_IDS.email} className="field-label">
            <span>
              Email address <span className="text-accent">*</span>
            </span>
          </label>
          <input
            id={FIELD_IDS.email}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            spellCheck={false}
            value={values.email}
            onChange={(event) => updateValue('email', event.target.value)}
            onBlur={() => handleBlur('email')}
            placeholder="alex@example.com"
            aria-invalid={Boolean(emailError)}
            aria-describedby={emailError ? 'email-error' : undefined}
            className="input"
          />
          {emailError ? (
            <FieldError id="email-error" message={emailError} />
          ) : null}
        </div>

        <div>
          <label htmlFor={FIELD_IDS.phone} className="field-label">
            <span>
              Phone number <span className="text-accent">*</span>
            </span>
          </label>
          <input
            id={FIELD_IDS.phone}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={(event) => updateValue('phone', event.target.value)}
            onBlur={() => handleBlur('phone')}
            placeholder="+1 555 014 2277"
            aria-invalid={Boolean(phoneError)}
            aria-describedby={
              phoneError ? 'phone-hint phone-error' : 'phone-hint'
            }
            className="input"
          />
          <p id="phone-hint" className="mt-1.5 text-xs text-muted">
            Include your country code if you are visiting.
          </p>
          {phoneError ? (
            <FieldError id="phone-error" message={phoneError} />
          ) : null}
        </div>

        <div>
          <label htmlFor={FIELD_IDS.eventSlug} className="field-label">
            <span>
              Event <span className="text-accent">*</span>
            </span>
          </label>
          <div className="relative">
            <select
              id={FIELD_IDS.eventSlug}
              name="event"
              value={selectedEventSlug}
              onChange={handleEventChange}
              onBlur={() => handleBlur('eventSlug')}
              aria-invalid={Boolean(eventError)}
              aria-describedby={eventError ? 'event-error' : undefined}
              className="input appearance-none pr-10"
            >
              {events.map((event) => (
                <option key={event.slug} value={event.slug}>
                  {event.title} · {formatShortDate(event.start)}
                </option>
              ))}
            </select>
            <ChevronDown
              size={17}
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted"
              aria-hidden="true"
            />
          </div>
          {eventError ? (
            <FieldError id="event-error" message={eventError} />
          ) : null}
        </div>
      </div>

      <button type="submit" className="btn btn-primary mt-7 w-full py-3.5">
        Confirm registration
        <ArrowRight size={16} aria-hidden="true" />
      </button>

      <p className="mt-4 flex items-start justify-center gap-2 text-center text-xs leading-5 text-muted">
        <ShieldCheck size={14} className="mt-0.5 shrink-0" aria-hidden="true" />
        No account needed. Your details are stored locally in this browser.
      </p>
    </form>
  )
}
