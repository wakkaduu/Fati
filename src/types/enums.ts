export enum UserRole {
  ADMIN = 'admin',
  EDITOR = 'editor',
  VIEWER = 'viewer',
}

export enum QuotationStatus {
  DRAFT = 'draft',
  FINALIZED = 'finalized',
  ARCHIVED = 'archived',
}

export enum ComparisonResult {
  HIGHER = 'higher',
  LOWER = 'lower',
  EQUAL = 'equal',
  INCREASED = 'increased',
  DECREASED = 'decreased',
  UNCHANGED = 'unchanged',
  ONLY_IN_A = 'only_in_a',
  ONLY_IN_B = 'only_in_b',
}

export const MATERIAL_CATEGORIES = [
  'Masonry',
  'Steel',
  'Plumbing',
  'Electrical',
  'Carpentry',
  'Painting',
  'Roofing',
  'Hardware',
  'Concrete',
  'Finishing',
  'Other',
] as const;

export type MaterialCategory = typeof MATERIAL_CATEGORIES[number];

export const BASE_UNITS = [
  'kg',
  'g',
  'lb',
  'meter',
  'cm',
  'mm',
  'ft',
  'inch',
  'piece',
  'sheet',
  'roll',
  'liter',
  'gallon',
  'bag',
  'box',
  'set',
  'pair',
  'bundle',
  'cubic meter',
  'square meter',
] as const;

export type BaseUnit = typeof BASE_UNITS[number];
