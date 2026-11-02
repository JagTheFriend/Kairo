import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export function Breadcrumbs({
  items,
}: {
  items: Array<{ label: string; to?: string }>
}) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-muted">
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`} className="flex items-center gap-1.5">
            {index > 0 ? (
              <ChevronRight
                size={12}
                className="text-line-strong"
                aria-hidden="true"
              />
            ) : null}
            {item.to ? (
              <Link
                to={item.to}
                className="transition hover:text-ink hover:underline underline-offset-4"
              >
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-ink">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
