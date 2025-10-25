import { type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  variant?: 'default' | 'elevated' | 'flat'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  hoverable?: boolean
}

/**
 * 카드 컴포넌트
 * 레퍼런스 앱 스타일 적용
 */
export function Card({
  children,
  variant = 'default',
  padding = 'md',
  hoverable = false,
  className,
  ...props
}: CardProps) {
  const baseStyles = 'bg-surface-primary rounded-card transition-all duration-200'

  const variants = {
    default: 'border border-gray-100 shadow-soft',
    elevated: 'shadow-card',
    flat: 'border border-gray-100',
  }

  const paddings = {
    none: '',
    sm: 'p-3',
    md: 'p-5',
    lg: 'p-6',
  }

  const hoverStyles = hoverable
    ? 'hover:shadow-elevated hover:-translate-y-0.5 cursor-pointer active:scale-[0.98]'
    : ''

  return (
    <div
      className={cn(baseStyles, variants[variant], paddings[padding], hoverStyles, className)}
      {...props}
    >
      {children}
    </div>
  )
}
