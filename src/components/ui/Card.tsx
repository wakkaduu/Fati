import React from 'react';

/* -------------------------------------------------------------------------- */
/*  Card                                                                      */
/* -------------------------------------------------------------------------- */

/** Props for the {@link Card} wrapper component. */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

/**
 * Card wrapper with white background, border, and subtle shadow.
 *
 * @example
 * ```tsx
 * <Card>
 *   <CardHeader title="Revenue" />
 *   <CardContent>…</CardContent>
 * </Card>
 * ```
 */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, className = '', ...rest }, ref) => (
    <div
      ref={ref}
      className={`rounded-lg border border-slate-200 bg-white shadow-sm ${className}`}
      {...rest}
    >
      {children}
    </div>
  ),
);
Card.displayName = 'Card';

/* -------------------------------------------------------------------------- */
/*  CardHeader                                                                */
/* -------------------------------------------------------------------------- */

/** Props for the {@link CardHeader} component. */
export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Title displayed in the header. */
  title: string;
  /** Optional description rendered below the title. */
  description?: string;
  /** Optional action slot (e.g. a button) rendered on the right side. */
  action?: React.ReactNode;
}

/**
 * Header section of a {@link Card} with title, optional description, and
 * an action slot on the right.
 */
export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ title, description, action, className = '', ...rest }, ref) => (
    <div
      ref={ref}
      className={`flex items-center justify-between border-b border-slate-200 px-6 py-4 ${className}`}
      {...rest}
    >
      <div>
        <h3 className="text-base font-semibold text-slate-900">{title}</h3>
        {description && (
          <p className="mt-0.5 text-sm text-slate-500">{description}</p>
        )}
      </div>
      {action && <div className="ml-4 shrink-0">{action}</div>}
    </div>
  ),
);
CardHeader.displayName = 'CardHeader';

/* -------------------------------------------------------------------------- */
/*  CardContent                                                               */
/* -------------------------------------------------------------------------- */

/** Props for the {@link CardContent} component. */
export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

/** Body section of a {@link Card}. */
export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ children, className = '', ...rest }, ref) => (
    <div ref={ref} className={`p-6 ${className}`} {...rest}>
      {children}
    </div>
  ),
);
CardContent.displayName = 'CardContent';
