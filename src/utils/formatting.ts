import { format } from 'date-fns';

/**
 * Format a numeric amount as Philippine Peso currency (₱#,##0.00).
 * @param amount - The monetary amount to format.
 * @returns The formatted currency string (e.g. "₱1,234.56").
 */
export function formatCurrency(amount: number | string): string {
  const numericValue = typeof amount === 'string' ? parseFloat(amount) : amount;
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numericValue);
}

/**
 * Format a date as "MMM dd, yyyy" (e.g. "Nov 07, 2026").
 * @param date - An ISO date string or Date object.
 * @returns The formatted date string.
 */
export function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return format(d, 'MMM dd, yyyy');
}

/**
 * Format a date-time as "MMM dd, yyyy h:mm a" (e.g. "Nov 07, 2026 10:30 AM").
 * @param date - An ISO date string or Date object.
 * @returns The formatted date-time string.
 */
export function formatDateTime(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return format(d, 'MMM dd, yyyy h:mm a');
}

/**
 * Format a percentage value with sign prefix.
 * @param value - The percentage value, or null/undefined.
 * @returns A formatted string like "+12.34%", "-5.00%", or "N/A".
 */
export function formatPercentage(value: number | string | null): string {
  if (value === null || value === undefined) {
    return 'N/A';
  }
  const numericValue = typeof value === 'string' ? parseFloat(value) : value;
  if (isNaN(numericValue)) {
    return 'N/A';
  }
  const sign = numericValue > 0 ? '+' : '';
  return `${sign}${numericValue.toFixed(2)}%`;
}
