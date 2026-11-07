import React from 'react';

/**
 * Badge variant style mappings.
 */
const variantStyles = {
  default: 'bg-slate-100 text-slate-700',
  success: 'bg-green-100 text-green-700',
  warning: 'bg-amber-100 text-amber-700',
  danger: 'bg-red-100 text-red-700',
  info: 'bg-blue-100 text-blue-700',
} as const;

/** Props for the {@link Badge} component. */
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Visual variant. @default "default" */
  variant?: keyof typeof variantStyles;
  children: React.ReactNode;
}

/**
 * A small pill badge for status labels or counts.
 *
 * @example
 * ```tsx
 * <Badge variant="success">Active</Badge>
 * ```
 */
export const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  children,
  className = '',
  ...rest
}) => (
  <span
    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variantStyles[variant]} ${className}`}
    {...rest}
  >
    {children}
  </span>
);

Badge.displayName = 'Badge';
