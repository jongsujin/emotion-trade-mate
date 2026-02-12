import { type ReactNode } from 'react'
import { Button } from './Button'

interface EmptyStateProps {
  icon?: ReactNode
  title: string
  description?: string
  ctaLabel?: string
  onCtaClick?: () => void
}

export function EmptyState({
  icon,
  title,
  description,
  ctaLabel,
  onCtaClick,
}: EmptyStateProps) {
  return (
    <div className="surface-card flex flex-col items-center px-6 py-10 text-center">
      <div className="mb-3 text-3xl">{icon ?? '🗂️'}</div>
      <h3 className="text-lg font-bold text-text-primary">{title}</h3>
      {description ? (
        <p className="mt-2 whitespace-pre-line text-sm leading-6 text-text-muted">{description}</p>
      ) : null}
      {ctaLabel ? (
        <Button className="mt-5" variant="secondary" size="sm" onClick={onCtaClick}>
          {ctaLabel}
        </Button>
      ) : null}
    </div>
  )
}
