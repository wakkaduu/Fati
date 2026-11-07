import { useEffect, useState } from 'react';

/**
 * Debounce a rapidly-changing value.
 *
 * Returns a value that only updates after the specified delay has elapsed
 * since the last change, which is useful for deferring expensive operations
 * like API calls triggered by user input.
 *
 * @typeParam T - The type of the value being debounced.
 * @param value - The value to debounce.
 * @param delay - Debounce delay in milliseconds (defaults to 300).
 * @returns The debounced value.
 *
 * @example
 * ```tsx
 * const [search, setSearch] = useState('');
 * const debouncedSearch = useDebounce(search, 500);
 *
 * useEffect(() => {
 *   // This runs only after the user stops typing for 500ms
 *   fetchResults(debouncedSearch);
 * }, [debouncedSearch]);
 * ```
 */
export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
