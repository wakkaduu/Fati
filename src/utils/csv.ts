/**
 * Escape a string value for safe inclusion in a CSV cell.
 *
 * Wraps the value in double quotes if it contains commas, double quotes,
 * or newline characters. Internal double quotes are escaped by doubling them.
 *
 * @param value - The raw cell value.
 * @returns The escaped CSV-safe string.
 */
export function escapeCSV(value: string): string {
  if (value.includes('"') || value.includes(',') || value.includes('\n') || value.includes('\r')) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

/**
 * Generate a CSV file from the given data and trigger a browser download.
 *
 * @param filename - The name for the downloaded file (should end with `.csv`).
 * @param headers - An array of column header strings.
 * @param rows - A 2-D array of string cell values.
 */
export function exportToCsv(
  filename: string,
  headers: string[],
  rows: string[][],
): void {
  const headerLine = headers.map(escapeCSV).join(',');
  const dataLines = rows.map((row) => row.map(escapeCSV).join(','));
  const csvContent = [headerLine, ...dataLines].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.style.display = 'none';
  document.body.appendChild(anchor);
  anchor.click();

  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}
