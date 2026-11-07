import Decimal from 'decimal.js';

/**
 * Convert a numeric value to a Decimal instance.
 * @param value - The value to convert (number or numeric string).
 * @returns A Decimal instance.
 */
export function toDecimal(value: number | string): Decimal {
  return new Decimal(value);
}

/**
 * Format a Decimal (or compatible value) to a fixed number of decimal places.
 * @param value - The value to format.
 * @param decimalPlaces - Number of decimal places (defaults to 2).
 * @returns The formatted numeric string.
 */
export function formatDecimal(
  value: Decimal | string | number,
  decimalPlaces: number = 2,
): string {
  return new Decimal(value).toFixed(decimalPlaces);
}

/**
 * Calculate the line total for a quotation item.
 * @param quantity - The quantity of the item.
 * @param unitPrice - The unit price of the item.
 * @returns The line total as a string with 2 decimal places.
 */
export function calculateLineTotal(quantity: number, unitPrice: number): string {
  const result = new Decimal(quantity).times(new Decimal(unitPrice));
  return result.toFixed(2);
}

/**
 * Calculate the normalized price per base unit.
 *
 * For example, if a price is quoted for 50 kg bags but the base unit is kg,
 * dividing the unit price by 50 yields the price per kg.
 *
 * @param unitPrice - The quoted unit price.
 * @param baseQuantityPerPriceUnit - How many base units one price unit contains.
 * @returns The normalized price as a string with 2 decimal places.
 */
export function calculateNormalizedPrice(
  unitPrice: number,
  baseQuantityPerPriceUnit: number,
): string {
  const result = new Decimal(unitPrice).dividedBy(new Decimal(baseQuantityPerPriceUnit));
  return result.toFixed(2);
}

/**
 * Calculate the absolute price difference between two prices (B − A).
 * @param priceA - The first (baseline) price.
 * @param priceB - The second (comparison) price.
 * @returns The difference as a string with 2 decimal places.
 */
export function calculatePriceDifference(priceA: number, priceB: number): string {
  const result = new Decimal(priceB).minus(new Decimal(priceA));
  return result.toFixed(2);
}

/**
 * Calculate the percentage difference between two prices: ((B − A) / A) × 100.
 * @param priceA - The first (baseline) price.
 * @param priceB - The second (comparison) price.
 * @returns The percentage as a string with 2 decimal places, or `null` if priceA is zero.
 */
export function calculatePercentageDifference(
  priceA: number,
  priceB: number,
): string | null {
  const a = new Decimal(priceA);
  if (a.isZero()) {
    return null;
  }
  const result = new Decimal(priceB).minus(a).dividedBy(a).times(100);
  return result.toFixed(2);
}

/**
 * Calculate the grand total for a quotation by summing all line totals.
 * @param items - Array of items, each with a quantity and unit_price.
 * @returns The grand total as a string with 2 decimal places.
 */
export function calculateQuotationTotal(
  items: Array<{ quantity: number; unit_price: number }>,
): string {
  const total = items.reduce(
    (sum, item) => sum.plus(new Decimal(item.quantity).times(new Decimal(item.unit_price))),
    new Decimal(0),
  );
  return total.toFixed(2);
}
