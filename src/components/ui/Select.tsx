import React from 'react';

/** A single option in the {@link Select} dropdown. */
export interface SelectOption {
  value: string;
  label: string;
}

/** Props for the {@link Select} component. */
export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'children'> {
  /** Label displayed above the select. */
  label?: string;
  /** Error message displayed below the select in red. */
  error?: string;
  /** Array of selectable options. */
  options: SelectOption[];
  /** Placeholder text shown as the first disabled option. */
  placeholder?: string;
}

/**
 * A styled select dropdown with label, error, and placeholder support.
 *
 * @example
 * ```tsx
 * <Select
 *   label="Category"
 *   options={[{ value: 'steel', label: 'Steel' }]}
 *   placeholder="Select a category"
 * />
 * ```
 */
export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, placeholder, id, className = '', ...rest }, ref) => {
    const selectId =
      id ?? (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={selectId}
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error && selectId ? `${selectId}-error` : undefined}
          className={[
            'block w-full rounded-lg border px-3 py-2 text-sm text-slate-900',
            'bg-white appearance-none',
            'focus:outline-none focus:ring-2 focus:ring-offset-0',
            error
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500/25'
              : 'border-slate-300 focus:border-teal-500 focus:ring-teal-500/25',
            'disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500',
            className,
          ].join(' ')}
          {...rest}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && (
          <p
            id={selectId ? `${selectId}-error` : undefined}
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

Select.displayName = 'Select';
