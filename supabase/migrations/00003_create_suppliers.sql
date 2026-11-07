-- ============================================================================
-- Migration 00003: Create suppliers table
-- ============================================================================
-- Stores supplier/vendor contact information. Suppliers are referenced by
-- quote_batches to track which vendor provided which price quotation.
-- ============================================================================

CREATE TABLE suppliers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  contact_person TEXT,
  phone TEXT,
  email TEXT,
  address TEXT,
  notes TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Full-text search index on supplier name
CREATE INDEX idx_suppliers_name ON suppliers USING gin(to_tsvector('english', name));

-- Active/inactive filter index
CREATE INDEX idx_suppliers_is_active ON suppliers(is_active);
