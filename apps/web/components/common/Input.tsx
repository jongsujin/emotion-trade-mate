import { forwardRef, type InputHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, helperText, className, id, ...props },
  ref
) {
  const inputId = id || props.name

  return (
    <div className="space-y-2">
      {label ? (
        <label htmlFor={inputId} className="block text-sm font-semibold text-text-secondary">
          {label}
        </label>
      ) : null}

      <input
        ref={ref}
        id={inputId}
        className={cn(
          'w-full rounded-xl border bg-surface-card px-4 py-3 text-sm text-text-primary outline-none transition-all',
          'border-border focus:border-brand-400 focus:ring-2 focus:ring-brand-100',
          'placeholder:text-text-muted disabled:cursor-not-allowed disabled:bg-gray-100',
          error ? 'border-status-up focus:border-status-up focus:ring-status-upBg' : '',
          className
        )}
        {...props}
      />

      {error ? <p className="text-sm text-status-up">{error}</p> : null}
      {!error && helperText ? <p className="text-xs text-text-muted">{helperText}</p> : null}
    </div>
  )
})
