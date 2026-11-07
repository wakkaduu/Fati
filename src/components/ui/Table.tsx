import React from 'react';

/* -------------------------------------------------------------------------- */
/*  Table                                                                     */
/* -------------------------------------------------------------------------- */

/** Props for the {@link Table} wrapper component. */
export interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  children: React.ReactNode;
}

/**
 * Responsive table wrapper with horizontal scroll.
 *
 * @example
 * ```tsx
 * <Table>
 *   <TableHeader>
 *     <TableRow><TableHead>Name</TableHead></TableRow>
 *   </TableHeader>
 *   <tbody>
 *     <TableRow><TableCell>Steel</TableCell></TableRow>
 *   </tbody>
 * </Table>
 * ```
 */
export const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ children, className = '', ...rest }, ref) => (
    <div className="overflow-x-auto rounded-lg border border-slate-200">
      <table
        ref={ref}
        className={`w-full border-collapse text-left ${className}`}
        {...rest}
      >
        {children}
      </table>
    </div>
  ),
);
Table.displayName = 'Table';

/* -------------------------------------------------------------------------- */
/*  TableHeader                                                               */
/* -------------------------------------------------------------------------- */

/** Props for the {@link TableHeader} component. */
export interface TableHeaderProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {
  children: React.ReactNode;
}

/** Sticky table header with slate background. */
export const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  TableHeaderProps
>(({ children, className = '', ...rest }, ref) => (
  <thead
    ref={ref}
    className={`sticky top-0 bg-slate-50 ${className}`}
    {...rest}
  >
    {children}
  </thead>
));
TableHeader.displayName = 'TableHeader';

/* -------------------------------------------------------------------------- */
/*  TableRow                                                                  */
/* -------------------------------------------------------------------------- */

/** Props for the {@link TableRow} component. */
export interface TableRowProps
  extends React.HTMLAttributes<HTMLTableRowElement> {
  children: React.ReactNode;
}

/** Table row with hover highlight and bottom border. */
export const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ children, className = '', ...rest }, ref) => (
    <tr
      ref={ref}
      className={`border-b border-slate-200 transition-colors hover:bg-slate-50 ${className}`}
      {...rest}
    >
      {children}
    </tr>
  ),
);
TableRow.displayName = 'TableRow';

/* -------------------------------------------------------------------------- */
/*  TableHead                                                                 */
/* -------------------------------------------------------------------------- */

/** Props for the {@link TableHead} component. */
export interface TableHeadProps
  extends React.ThHTMLAttributes<HTMLTableCellElement> {
  children?: React.ReactNode;
}

/** Uppercase column header cell. */
export const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ children, className = '', ...rest }, ref) => (
    <th
      ref={ref}
      className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500 ${className}`}
      {...rest}
    >
      {children}
    </th>
  ),
);
TableHead.displayName = 'TableHead';

/* -------------------------------------------------------------------------- */
/*  TableCell                                                                 */
/* -------------------------------------------------------------------------- */

/** Props for the {@link TableCell} component. */
export interface TableCellProps
  extends React.TdHTMLAttributes<HTMLTableCellElement> {
  children?: React.ReactNode;
}

/** Standard table body cell. */
export const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ children, className = '', ...rest }, ref) => (
    <td
      ref={ref}
      className={`px-6 py-4 text-sm text-slate-900 ${className}`}
      {...rest}
    >
      {children}
    </td>
  ),
);
TableCell.displayName = 'TableCell';

/* -------------------------------------------------------------------------- */
/*  TableEmpty                                                                */
/* -------------------------------------------------------------------------- */

/** Props for the {@link TableEmpty} component. */
export interface TableEmptyProps {
  /** Number of columns the empty row should span. */
  colSpan: number;
  /** Message to display. @default "No data available" */
  message?: string;
}

/** Full-width row with a centred empty-state message. */
export const TableEmpty: React.FC<TableEmptyProps> = ({
  colSpan,
  message = 'No data available',
}) => (
  <tr>
    <td
      colSpan={colSpan}
      className="px-6 py-12 text-center text-sm text-slate-500"
    >
      {message}
    </td>
  </tr>
);
TableEmpty.displayName = 'TableEmpty';
