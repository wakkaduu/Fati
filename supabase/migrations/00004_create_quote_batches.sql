-- ============================================================================
-- Migration 00004: Create quote_batches table
-- ============================================================================
-- Represents a price quotation document from a specific supplier on a given
-- date. Each batch goes through a lifecycle: draft -> finalized -> archived.
-- Only draft batches can have their line items modified.
-- ============================================================================

CREATE TABLE quote_batches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  supplier_id UUID NOT NULL REFERENCES suppliers(id) ON DELETE RESTRICT,
  quote_reference TEXT,
  quote_date DATE NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'finalized', 'archived')),
  notes TEXT,
  created_by UUID NOT NULL REFERENCES profiles(id),
  finalized_by UUID REFERENCES profiles(id),
  finalized_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Supplier lookup index (find all quotes from a supplier)
CREATE INDEX idx_quote_batches_supplier ON quote_batches(supplier_id);

-- Status filter index (e.g. show all draft quotes)
CREATE INDEX idx_quote_batches_status ON quote_batches(status);

-- Date range query index (e.g. quotes from this month)
CREATE INDEX idx_quote_batches_quote_date ON quote_batches(quote_date);

-- Creator lookup index
CREATE INDEX idx_quote_batches_created_by ON quote_batches(created_by);
