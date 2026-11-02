import type { ReactNode } from 'react'

export function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon: ReactNode
  title: string
  description: string
  action?: ReactNode
}) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed border-line-strong bg-surface/50 px-6 py-16 text-center">
      <span className="grid size-12 place-items-center rounded-full bg-surface-alt text-muted">
        {icon}
      </span>
      <h2 className="mt-5 text-2xl font-medium tracking-[-0.02em]">{title}</h2>
      <p className="mt-2 max-w-md text-sm leading-6 text-muted">{description}</p>
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  )
}
