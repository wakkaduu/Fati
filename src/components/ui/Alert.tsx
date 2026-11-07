import React from 'react';
import {
  CheckCircle,
  AlertTriangle,
  XCircle,
  Info,
  X,
} from 'lucide-react';

/**
 * Configuration for each alert variant: background, text colour, and icon.
 */
const variantConfig = {
  success: {
    container: 'bg-green-50 border-green-200 text-green-800',
    Icon: CheckCircle,
  },
  warning: {
    container: 'bg-amber-50 border-amber-200 text-amber-800',
    Icon: AlertTriangle,
  },
  danger: {
    container: 'bg-red-50 border-red-200 text-red-800',
    Icon: XCircle,
  },
  info: {
    container: 'bg-blue-50 border-blue-200 text-blue-800',
    Icon: Info,
  },
} as const;

/** Props for the {@link Alert} component. */
export interface AlertProps {
  /** Visual variant of the alert. */
  variant: keyof typeof variantConfig;
  /** Alert message text. */
  message: string;
  /** Optional callback to dismiss the alert. Shows a close button when provided. */
  onDismiss?: () => void;
  /** Additional CSS class names. */
  className?: string;
}

/**
 * An inline alert banner with icon, message, and optional dismiss button.
 *
 * @example
 * ```tsx
 * <Alert variant="success" message="Material saved." onDismiss={() => {}} />
 * ```
 */
export const Alert: React.FC<AlertProps> = ({
  variant,
  message,
  onDismiss,
  className = '',
}) => {
  const { container, Icon } = variantConfig[variant];

  return (
    <div
      role="alert"
      className={`flex items-start gap-3 rounded-lg border p-4 ${container} ${className}`}
    >
      <Icon className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
      <p className="flex-1 text-sm">{message}</p>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className="shrink-0 rounded p-0.5 opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-current"
          aria-label="Dismiss alert"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

Alert.displayName = 'Alert';
