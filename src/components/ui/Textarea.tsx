import React from 'react';

/** Props for the {@link Textarea} component. */
export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Label displayed above the textarea. */
  label?: string;
  /** Error message displayed below the textarea in red. */
  error?: string;
}

/**
 * A styled textarea with label and error support.
 *
 * @example
 * ```tsx
 * <Textarea label="Notes" rows={4} error={errors.notes} />
 * ```
 */
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, id, className = '', ...rest }, ref) => {
    const textareaId =
      id ?? (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={
            error && textareaId ? `${textareaId}-error` : undefined
          }
          className={[
            'block w-full rounded-lg border px-3 py-2 text-sm text-slate-900',
            'placeholder:text-slate-400 resize-y',
            'focus:outline-none focus:ring-2 focus:ring-offset-0',
            error
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500/25'
              : 'border-slate-300 focus:border-teal-500 focus:ring-teal-500/25',
            'disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500',
            className,
          ].join(' ')}
          {...rest}
        />
        {error && (
          <p
            id={textareaId ? `${textareaId}-error` : undefined}
            className="mt-1.5 text-sm text-red-500"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    );
  },
);

Textarea.displayName = 'Textarea';
