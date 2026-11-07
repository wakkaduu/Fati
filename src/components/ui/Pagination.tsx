import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/** Props for the {@link Pagination} component. */
export interface PaginationProps {
  /** Current page number (1-based). */
  currentPage: number;
  /** Total number of pages. */
  totalPages: number;
  /** Total number of items across all pages. */
  totalItems: number;
  /** Number of items displayed per page. */
  itemsPerPage: number;
  /** Callback fired when the user navigates to a different page. */
  onPageChange: (page: number) => void;
  /** Additional CSS class names. */
  className?: string;
}

/**
 * A pagination control with Previous/Next buttons, page indicator, and
 * items-per-page summary.
 *
 * @example
 * ```tsx
 * <Pagination
 *   currentPage={1}
 *   totalPages={10}
 *   totalItems={96}
 *   itemsPerPage={10}
 *   onPageChange={setPage}
 * />
 * ```
 */
export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  className = '',
}) => {
  const rangeStart = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const rangeEnd = Math.min(currentPage * itemsPerPage, totalItems);

  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  return (
    <nav
      aria-label="Pagination"
      className={`flex items-center justify-between border-t border-slate-200 px-2 py-3 ${className}`}
    >
      {/* Items summary */}
      <p className="text-sm text-slate-500">
        Showing{' '}
        <span className="font-medium text-slate-700">{rangeStart}</span>
        {' – '}
        <span className="font-medium text-slate-700">{rangeEnd}</span>
        {' of '}
        <span className="font-medium text-slate-700">{totalItems}</span>
        {' results'}
      </p>

      {/* Controls */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled={!canGoPrevious}
          onClick={() => onPageChange(currentPage - 1)}
          className="inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          Previous
        </button>

        <span className="px-2 text-sm text-slate-700">
          Page{' '}
          <span className="font-medium">{currentPage}</span>
          {' of '}
          <span className="font-medium">{totalPages}</span>
        </span>

        <button
          type="button"
          disabled={!canGoNext}
          onClick={() => onPageChange(currentPage + 1)}
          className="inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Next page"
        >
          Next
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </nav>
  );
};

Pagination.displayName = 'Pagination';
