import React from 'react';

/**
 * Size mappings for the spinner SVG.
 */
const sizeStyles = {
  sm: 'h-5 w-5',
  md: 'h-8 w-8',
  lg: 'h-12 w-12',
} as const;

/** Props for the {@link LoadingSpinner} component. */
export interface LoadingSpinnerProps {
  /** Optional message displayed below the spinner. */
  message?: string;
  /** Spinner size. @default "md" */
  size?: keyof typeof sizeStyles;
  /** When true, the spinner is centred in the viewport. @default false */
  fullPage?: boolean;
  /** Additional CSS class names. */
  className?: string;
}

/**
 * An animated loading spinner with optional descriptive text.
 *
 * @example
 * ```tsx
 * <LoadingSpinner message="Loading materials…" fullPage />
 * ```
 */
export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message,
  size = 'md',
  fullPage = false,
  className = '',
}) => {
  const content = (
    <div
      className={`flex flex-col items-center justify-center gap-3 ${className}`}
      role="status"
      aria-label={message ?? 'Loading'}
    >
      <svg
        className={`animate-spin text-teal-600 ${sizeStyles[size]}`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
        />
      </svg>
      {message && <p className="text-sm text-slate-500">{message}</p>}
    </div>
  );

  if (fullPage) {
    return (
      <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-50/80">
        {content}
      </div>
    );
  }

  return content;
};

LoadingSpinner.displayName = 'LoadingSpinner';
