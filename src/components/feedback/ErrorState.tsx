import React from 'react';
import { AlertTriangle } from 'lucide-react';

/** Props for the {@link ErrorState} component. */
export interface ErrorStateProps {
  /** Error title. */
  title?: string;
  /** Detailed error message. */
  message: string;
  /** Optional callback attached to a retry button. */
  onRetry?: () => void;
  /** Additional CSS class names. */
  className?: string;
}

/**
 * A centred error state with icon, message, and optional retry button.
 *
 * @example
 * ```tsx
 * <ErrorState
 *   title="Failed to load"
 *   message="Unable to fetch materials. Please try again."
 *   onRetry={() => refetch()}
 * />
 * ```
 */
export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Something went wrong',
  message,
  onRetry,
  className = '',
}) => (
  <div
    className={`flex flex-col items-center justify-center px-6 py-16 text-center ${className}`}
    role="alert"
  >
    <div className="mb-4 rounded-full bg-red-100 p-4">
      <AlertTriangle className="h-10 w-10 text-red-500" aria-hidden="true" />
    </div>
    <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
    <p className="mt-1 max-w-sm text-sm text-slate-500">{message}</p>
    {onRetry && (
      <button
        type="button"
        onClick={onRetry}
        className="mt-6 inline-flex items-center rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
      >
        Try again
      </button>
    )}
  </div>
);

ErrorState.displayName = 'ErrorState';
