import type { UserRole, QuotationStatus, MaterialCategory, BaseUnit, ComparisonResult } from '@/types/enums';

/** User profile linked to a Supabase auth user. */
export interface Profile {
  id: string;
  full_name: string;
  role: UserRole;
  is_active: boolean;
  created_at: string;
}

/** A construction material tracked in the system. */
export interface Material {
  id: string;
  name: string;
  category: MaterialCategory;
  specification: string;
  base_unit: BaseUnit;
  description?: string;
  is_active: boolean;
  created_by?: string;
  created_at: string;
  updated_at: string;
}

/** A supplier who provides price quotations. */
export interface Supplier {
  id: string;
  name: string;
  contact_person?: string;
  phone?: string;
  email?: string;
  address?: string;
  notes?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

/** A batch of quotation items from a single supplier on a given date. */
export interface QuoteBatch {
  id: string;
  supplier_id: string;
  /** Joined supplier record (populated in queries with joins). */
  supplier?: Supplier;
  quote_reference?: string;
  quote_date: string;
  status: QuotationStatus;
  notes?: string;
  created_by: string;
  /** Joined creator profile (populated in queries with joins). */
  creator?: Profile;
  finalized_by?: string;
  /** Joined finalizer profile (populated in queries with joins). */
  finalizer?: Profile;
  finalized_at?: string;
  created_at: string;
  updated_at: string;
}

/** A single line item within a quotation batch. */
export interface QuoteItem {
  id: string;
  quote_batch_id: string;
  material_id: string;
  /** Joined material record (populated in queries with joins). */
  material?: Material;
  quantity: number;
  price_unit: string;
  base_quantity_per_price_unit: number;
  unit_price: number;
  created_at: string;
}

/** A single row in a side-by-side quotation comparison. */
export interface ComparisonRow {
  material: Material;
  quoteA?: {
    quoteItem: QuoteItem;
    normalizedPrice: number;
    supplier: string;
    quoteDate: string;
  };
  quoteB?: {
    quoteItem: QuoteItem;
    normalizedPrice: number;
    supplier: string;
    quoteDate: string;
  };
  priceDifference?: number;
  percentageDifference?: number;
  comparisonResult: ComparisonResult;
}

/** Aggregated statistics shown on the dashboard. */
export interface DashboardStats {
  totalActiveMaterials: number;
  totalActiveSuppliers: number;
  totalFinalizedQuotations: number;
  recentPriceMovements: Array<{
    material: string;
    oldPrice: number;
    newPrice: number;
    changePercent: number;
    supplier: string;
    date: string;
  }>;
}

/** A single entry in a material's price history timeline. */
export interface PriceHistoryEntry {
  material_name: string;
  material_specification: string;
  supplier_name: string;
  quote_date: string;
  original_price: number;
  price_unit: string;
  normalized_price: number;
  base_unit: string;
}
