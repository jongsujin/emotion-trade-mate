import { type ButtonHTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
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
    'inline-flex items-center justify-center font-semibold transition-all duration-200 rounded-button focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'

  const variants = {
    primary:
      'bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700 shadow-soft active:scale-95',
    secondary:
      'bg-surface-elevated text-text-primary border border-gray-200 hover:bg-background-secondary shadow-soft active:scale-95',
    outline:
      'bg-transparent border-2 border-primary-500 text-primary-600 hover:bg-primary-50 active:scale-95',
    ghost: 'bg-transparent text-text-secondary hover:bg-background-secondary active:scale-95',
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-base',
    lg: 'px-6 py-3.5 text-lg',
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
