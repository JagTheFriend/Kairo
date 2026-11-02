import { useCountdown } from '../hooks/useCountdown'

function pad(value: number): string {
  return String(value).padStart(2, '0')
}

export function Countdown({
  target,
  variant = 'full',
  className = '',
}: {
  target: string
  variant?: 'full' | 'inline'
  className?: string
}) {
  const value = useCountdown(target)

  if (value.isPast) {
    return (
      <p className={`text-sm text-muted ${className}`}>This event is underway.</p>
    )
  }

  if (variant === 'inline') {
    const label =
      value.days > 0
        ? `${value.days}d ${value.hours}h`
        : `${value.hours}h ${value.minutes}m`

    return (
      <span
        className={`inline-flex items-center gap-2 text-xs font-medium text-cream/80 ${className}`}
      >
        <span className="size-1.5 rounded-full bg-flame" aria-hidden="true" />
        <span>
          Starts in <span className="tabular-nums text-cream">{label}</span>
        </span>
      </span>
    )
  }

  const parts = [
    { label: 'Days', value: value.days },
    { label: 'Hrs', value: value.hours },
    { label: 'Min', value: value.minutes },
    { label: 'Sec', value: value.seconds },
  ]

  return (
    <div
      className={`grid grid-cols-4 gap-2 ${className}`}
      role="timer"
      aria-label={`Time until the event: ${value.days} days, ${value.hours} hours, ${value.minutes} minutes, and ${value.seconds} seconds`}
    >
      {parts.map((part) => (
        <div
          key={part.label}
          className="rounded-xl border border-line bg-surface-alt px-1 py-2.5 text-center"
        >
          <span className="block font-display text-xl font-medium tabular-nums leading-none">
            {pad(part.value)}
          </span>
          <span className="mt-1.5 block text-[9px] font-medium uppercase tracking-[0.14em] text-muted">
            {part.label}
          </span>
        </div>
      ))}
    </div>
  )
}
