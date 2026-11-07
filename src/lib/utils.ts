type ClassValue = string | boolean | null | undefined;

/**
 * Conditionally join CSS class names, filtering out falsy values.
 * @param inputs - Class name strings or falsy values to filter out.
 * @returns A single space-separated class name string.
 */
export function cn(...inputs: ClassValue[]): string {
  return inputs.filter(Boolean).join(' ');
}

/**
 * Generate a cryptographically random UUID v4 string.
 * @returns A new UUID string.
 */
export function generateId(): string {
  return crypto.randomUUID();
}
