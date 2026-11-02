import type { ReactNode } from 'react'

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string
  title: string
  description?: string
  action?: ReactNode
}) {
  return (
    <div className="flex flex-col gap-6 border-b border-line pb-7 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="eyebrow">
          <span className="eyebrow-dot" />
          {eyebrow}
        </p>
        <h2 className="mt-4 max-w-2xl text-3xl font-medium leading-[1.02] tracking-[-0.03em] sm:text-4xl">
          {title}
        </h2>
        {description ? (
          <p className="mt-3 max-w-xl text-sm leading-6 text-muted">
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  )
}
