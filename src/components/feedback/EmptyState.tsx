import React from 'react';
import { Inbox, type LucideIcon } from 'lucide-react';

/** Props for the {@link EmptyState} component. */
export interface EmptyStateProps {
  /** Large icon displayed above the title. @default Inbox */
  icon?: LucideIcon;
  /** Title text. */
  title: string;
  /** Descriptive text shown below the title. */
  description: string;
  /** Optional action element (e.g. a Button) rendered below the description. */
  action?: React.ReactNode;
  /** Additional CSS class names. */
  className?: string;
}

/**
 * A centred empty-state placeholder with icon, text, and optional CTA.
 *
 * @example
 * ```tsx
 * <EmptyState
 *   title="No materials"
 *   description="Get started by adding your first material."
 *   action={<Button>Add Material</Button>}
 * />
 * ```
 */
export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon = Inbox,
  title,
  description,
  action,
  className = '',
}) => (
  <div
    className={`flex flex-col items-center justify-center px-6 py-16 text-center ${className}`}
  >
    <div className="mb-4 rounded-full bg-slate-100 p-4">
      <Icon className="h-10 w-10 text-slate-400" aria-hidden="true" />
    </div>
    <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
    <p className="mt-1 max-w-sm text-sm text-slate-500">{description}</p>
    {action && <div className="mt-6">{action}</div>}
  </div>
);

EmptyState.displayName = 'EmptyState';
