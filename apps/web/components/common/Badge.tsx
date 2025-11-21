import { type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'neutral'
  size?: 'sm' | 'md'
}

/**
 * 배지 컴포넌트
 */
export function Badge({
  children,
  variant = 'default',
  size = 'md',
  className,
  ...props
}: BadgeProps) {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-[6px]'

  const variants = {
    default: 'bg-[#F2F4F6] text-[#4E5968]',
    neutral: 'bg-[#F2F4F6] text-[#4E5968]',
    success: 'bg-[#FFF0F1] text-[#E42939]', // 상승 (빨강)
    error: 'bg-[#F0F6FF] text-[#3182F6]',   // 하락 (파랑)
    warning: 'bg-[#FFF8CC] text-[#996B00]',
    info: 'bg-[#E8F3FF] text-[#1B64DA]',
  }

  const sizes = {
    sm: 'px-1.5 py-0.5 text-[11px]',
    md: 'px-2 py-1 text-[13px]',
  }

  return (
    <span className={cn(baseStyles, variants[variant], sizes[size], className)} {...props}>
      {children}
    </span>
  )
}
