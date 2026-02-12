import { type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

type TagVariant = 'default' | 'brand' | 'positive' | 'negative' | 'warning'
type TagSize = 'sm' | 'md'

interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode
  variant?: TagVariant
  size?: TagSize
}

export function Tag({ children, variant = 'default', size = 'md', className, ...props }: TagProps) {
  const variants: Record<TagVariant, string> = {
    default: 'border border-border bg-surface-muted text-text-secondary',
    brand: 'border border-brand-200 bg-brand-50 text-brand-700',
    positive: 'border border-status-up/20 bg-status-upBg text-status-up',
    negative: 'border border-status-down/20 bg-status-downBg text-status-down',
    warning: 'border border-status-warn/20 bg-status-warnBg text-status-warn',
  }

  const sizes: Record<TagSize, string> = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-semibold tracking-tight',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}
