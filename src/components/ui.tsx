import { forwardRef, type ButtonHTMLAttributes, type InputHTMLAttributes, type ReactNode } from 'react';

/* ── Button (design-direction §3.1) ─────────────────────────────── */

type ButtonVariant = 'primary' | 'gold' | 'secondary' | 'ghost' | 'destructive';
type ButtonSize = 'sm' | 'md' | 'lg';

const buttonVariants: Record<ButtonVariant, string> = {
  primary: 'bg-navy-900 text-white hover:bg-navy-800 active:bg-navy-950',
  gold: 'bg-gold-500 text-navy-950 hover:bg-gold-400 active:bg-gold-600',
  secondary: 'bg-neutral-0 border border-neutral-300 text-navy-900 hover:border-navy-600',
  ghost: 'text-navy-600 hover:bg-navy-50',
  destructive: 'bg-error-500 text-white hover:opacity-90',
};

const buttonSizes: Record<ButtonSize, string> = {
  sm: 'h-9 px-4 text-body-sm',
  md: 'h-11 px-5 text-body',
  lg: 'h-12 px-6 text-body-lg',
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading = false, className = '', children, disabled, ...props }, ref) => (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center gap-2 rounded-md font-semibold transition-colors duration-200 ease-out-expo disabled:opacity-50 disabled:cursor-not-allowed ${buttonVariants[variant]} ${buttonSizes[size]} ${className}`}
      {...props}
    >
      {loading && (
        <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-90" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
        </svg>
      )}
      {children}
    </button>
  ),
);
Button.displayName = 'Button';

/* ── Input (design-direction §3.2) ──────────────────────────────── */

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  required?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, required, id, className = '', ...props }, ref) => {
    const inputId = id || `input-${label.replace(/\W+/g, '-').toLowerCase()}`;
    const errorId = `${inputId}-error`;
    return (
      <div className="flex flex-col gap-1.5">
        <label htmlFor={inputId} className="text-body-sm font-medium text-neutral-700">
          {label}
          {required && <span className="ml-0.5 text-neutral-500" aria-hidden="true">*</span>}
        </label>
        <input
          ref={ref}
          id={inputId}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={`h-12 rounded-md border bg-white px-4 text-body text-neutral-800 placeholder:text-neutral-400 transition-colors duration-200 focus:border-sky-500 focus:shadow-focus focus:outline-none ${
            error ? 'border-error-500' : 'border-neutral-300'
          } ${className}`}
          {...props}
        />
        {error && (
          <p id={errorId} role="alert" className="flex items-center gap-1.5 text-body-sm text-error-500">
            <svg className="h-4 w-4 shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-5a1 1 0 112 0 1 1 0 01-2 0zm1-8a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </p>
        )}
      </div>
    );
  },
);
Input.displayName = 'Input';

/* ── Badge (Klassen / Status) ───────────────────────────────────── */

type BadgeVariant = 'neutral' | 'gold' | 'success' | 'warning' | 'error' | 'info';

const badgeVariants: Record<BadgeVariant, string> = {
  neutral: 'bg-neutral-100 text-neutral-600',
  gold: 'bg-gold-500/15 text-gold-700 border border-gold-500/30',
  success: 'bg-success-50 text-success-500',
  warning: 'bg-warning-50 text-warning-500',
  error: 'bg-error-50 text-error-500',
  info: 'bg-info-50 text-info-500',
};

export function Badge({
  variant = 'neutral',
  dot = false,
  className = '',
  children,
}: {
  variant?: BadgeVariant;
  dot?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-caption font-semibold ${badgeVariants[variant]} ${className}`}
    >
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />}
      {children}
    </span>
  );
}

/* ── SectionHeading: H2 mit goldener Linie (design-direction §2.1) ── */

export function SectionHeading({
  eyebrow,
  title,
  sub,
  center = false,
}: {
  eyebrow?: string;
  title: string;
  sub?: string;
  center?: boolean;
}) {
  return (
    <div className={center ? 'text-center' : ''} data-reveal>
      {eyebrow && (
        <p className="text-caption font-semibold uppercase tracking-wider text-gold-600">{eyebrow}</p>
      )}
      <h2 className="mt-2 text-display-sm md:text-display-md">{title}</h2>
      <span
        aria-hidden="true"
        className={`mt-4 block h-0.5 w-6 bg-gold-500 ${center ? 'mx-auto' : ''}`}
      />
      {sub && <p className={`mt-4 max-w-prose text-body-lg text-neutral-500 ${center ? 'mx-auto' : ''}`}>{sub}</p>}
    </div>
  );
}
