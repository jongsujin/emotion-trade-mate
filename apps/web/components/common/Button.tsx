import { type ButtonHTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
  fullWidth?: boolean
}

/**
 * 공통 버튼 컴포넌트
 * 레퍼런스 앱의 디자인 적용
 */
export function Button({
  variant = 'primary',
  size = 'md',
  children,
  fullWidth = false,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center rounded-xl font-bold transition-all duration-200 focus:outline-none disabled:cursor-not-allowed disabled:opacity-40 active:scale-[0.96]'

  const variants = {
    primary:
      'border border-transparent bg-brand-400 text-white shadow-soft hover:bg-brand-500',
    secondary: 'border border-transparent bg-brand-50 text-brand-700 hover:bg-brand-100',
    outline: 'border border-border bg-transparent text-text-secondary hover:bg-surface-muted',
    ghost: 'border border-transparent bg-transparent text-text-secondary hover:bg-surface-muted',
    danger: 'border border-transparent bg-status-up text-white hover:bg-[#D94949]',
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-5 py-3.5 text-[15px]',
    lg: 'px-6 py-4 text-[17px]',
  }

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], fullWidth && 'w-full', className)}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}
