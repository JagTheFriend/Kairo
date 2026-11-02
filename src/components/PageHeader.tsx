import type { ReactNode } from 'react'

export function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string
  title: string
  description?: string
  children?: ReactNode
}) {
  return (
    <header className="border-b border-line">
      <div className="shell py-14 sm:py-20">
        <p className="eyebrow">
          <span className="eyebrow-dot" />
          {eyebrow}
        </p>
        <h1 className="mt-5 max-w-4xl text-[clamp(2.7rem,6vw,5rem)] font-medium leading-[0.94] tracking-[-0.04em]">
          {title}
        </h1>
        {description ? (
          <p className="mt-6 max-w-2xl text-base leading-7 text-muted sm:text-lg">
            {description}
          </p>
        ) : null}
        {children}
      </div>
    </header>
  )
}
