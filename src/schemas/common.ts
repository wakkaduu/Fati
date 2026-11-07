import { z } from 'zod';

/** A non-empty required string field. */
export const requiredString = z.string().min(1, 'This field is required');

/** An optional string field that also accepts an empty string. */
export const optionalString = z.string().optional().or(z.literal(''));

/** A number that must be strictly greater than zero. */
export const positiveNumber = z.number().positive('Must be greater than zero');

/** A number that must be zero or greater. */
export const nonNegativeNumber = z.number().min(0, 'Must be zero or greater');

/**
 * An optional email field.
 * Accepts a valid email address or an empty string.
 */
export const emailSchema = z
  .string()
  .email('Please enter a valid email address')
  .or(z.literal(''));

/**
 * An optional phone number field.
 * Accepts a string of 7–20 characters containing digits, spaces, dashes,
 * parentheses, or a leading plus sign — or an empty string.
 */
export const phoneSchema = z
  .string()
  .regex(
    /^[+]?[\d\s\-()]{7,20}$/,
    'Please enter a valid phone number',
  )
  .or(z.literal(''));
