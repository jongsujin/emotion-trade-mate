import { type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  variant?: 'default' | 'flat'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  hoverable?: boolean
}

/**

 */
export function Card({
  children,
  variant = 'default',
  padding = 'md',
  hoverable = false,
  className,
  ...props
}: CardProps) {
  const baseStyles = 'bg-white rounded-3xl transition-all duration-200 overflow-hidden'

  const variants = {
    default: 'shadow-[0_2px_8px_rgba(0,0,0,0.04)]',
    flat: 'bg-[#F2F4F6]',
  }

  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-5',
    lg: 'p-6',
  }

  const hoverStyles = hoverable
    ? 'active:scale-[0.98] active:bg-[#F9FAFB] cursor-pointer'
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
