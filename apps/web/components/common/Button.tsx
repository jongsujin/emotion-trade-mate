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
    'inline-flex items-center justify-center font-bold transition-all duration-200 rounded-xl focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.96]'

  const variants = {
    primary:
      'bg-[#3182F6] text-white hover:bg-[#1B64DA] shadow-[0_4px_12px_rgba(49,130,246,0.25)] border-transparent',
    secondary: 'bg-[#E8F3FF] text-[#3182F6] hover:bg-[#D6E6FA] border-transparent',
    outline: 'bg-transparent border border-[#E5E8EB] text-[#4E5968] hover:bg-[#F9FAFB]',
    ghost: 'bg-transparent text-[#4E5968] hover:bg-[#F2F4F6]',
    danger: 'bg-[#E42939] text-white hover:bg-[#D12433]',
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
