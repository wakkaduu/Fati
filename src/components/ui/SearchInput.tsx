import React from 'react';
import { Search, X } from 'lucide-react';

/** Props for the {@link SearchInput} component. */
export interface SearchInputProps {
  /** Current search value. */
  value: string;
  /** Change handler receiving the new value. */
  onChange: (value: string) => void;
  /** Placeholder text. @default "Search…" */
  placeholder?: string;
  /** Additional CSS class names. */
  className?: string;
}

/**
 * A search input with a leading search icon and an optional clear button
 * that appears when the value is non-empty.
 *
 * @example
 * ```tsx
 * <SearchInput value={query} onChange={setQuery} placeholder="Search materials…" />
 * ```
 */
export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = 'Search\u2026',
  className = '',
}) => (
  <div className={`relative ${className}`}>
    {/* Search icon */}
    <Search
      className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
      aria-hidden="true"
    />

    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      aria-label={placeholder}
      className={[
        'block w-full rounded-lg border border-slate-300 py-2 pl-10 text-sm text-slate-900',
        'placeholder:text-slate-400',
        'focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/25',
        value ? 'pr-9' : 'pr-3',
      ].join(' ')}
    />

    {/* Clear button */}
    {value && (
      <button
        type="button"
        onClick={() => onChange('')}
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-0.5 text-slate-400 hover:text-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
        aria-label="Clear search"
      >
        <X className="h-4 w-4" />
      </button>
    )}
  </div>
);

SearchInput.displayName = 'SearchInput';
