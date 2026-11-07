import React from 'react';

/** Props for the {@link FormField} wrapper component. */
export interface FormFieldProps {
  /** Label text for the field. */
  label: string;
  /** The id of the wrapped input element (used for htmlFor). */
  htmlFor?: string;
  /** Whether the field is required. Shows a red asterisk when true. */
  required?: boolean;
  /** Error message displayed below the children in red. */
  error?: string;
  /** The form control element(s) to render. */
  children: React.ReactNode;
  /** Additional CSS class names for the wrapper. */
  className?: string;
}

/**
 * A wrapper component that provides consistent label, required marker, and
 * error message layout around any form control.
 *
 * @example
 * ```tsx
 * <FormField label="Material Name" htmlFor="name" required error={errors.name}>
 *   <input id="name" … />
 * </FormField>
 * ```
 */
export const FormField: React.FC<FormFieldProps> = ({
  label,
  htmlFor,
  required = false,
  error,
  children,
  className = '',
}) => (
  <div className={`w-full ${className}`}>
    <label
      htmlFor={htmlFor}
      className="mb-1.5 block text-sm font-medium text-slate-700"
    >
      {label}
      {required && (
        <span className="ml-0.5 text-red-500" aria-hidden="true">
          *
        </span>
      )}
    </label>

    {children}

    {error && (
      <p
        id={htmlFor ? `${htmlFor}-error` : undefined}
        className="mt-1.5 text-sm text-red-500"
        role="alert"
      >
        {error}
      </p>
    )}
  </div>
);

FormField.displayName = 'FormField';
