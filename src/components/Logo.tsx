import { Link } from 'react-router-dom'

export function BrandMark({ className = 'size-8' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 36 36"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <rect width="36" height="36" rx="9" className="fill-ink" />
      <path
        d="M18 4.5c1.1 7.4 5.7 12 13.1 13.1C23.7 18.7 19.1 23.3 18 30.7 16.9 23.3 12.3 18.7 4.9 17.6 12.3 16.5 16.9 11.9 18 4.5Z"
        className="fill-accent"
      />
    </svg>
  )
}

export function Logo() {
  return (
    <Link
      to="/"
      className="group inline-flex items-center gap-2.5 rounded-sm"
      aria-label="Kairo home"
    >
      <BrandMark className="size-8 transition-transform duration-300 group-hover:-rotate-6" />
      <span className="font-display text-[26px] font-semibold leading-none tracking-[-0.045em]">
        kairo
      </span>
    </Link>
  )
}
