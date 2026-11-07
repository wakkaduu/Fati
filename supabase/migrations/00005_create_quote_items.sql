-- ============================================================================
-- Migration 00005: Create quote_items table
-- ============================================================================
-- Individual line items within a quote batch. Each row records the price a
-- supplier quoted for a specific material, including:
--   - quantity: amount being quoted (e.g. 100)
--   - price_unit: the supplier's quoting unit (e.g. '50kg bag', '6m piece')
--   - base_quantity_per_price_unit: how many base units are in one price unit
--     (e.g. 50 kg per bag, 6 m per piece)
--   - unit_price: price per price_unit (e.g. ₱270 per 50kg bag)
--
-- The normalized per-base-unit price can be computed as:
--   unit_price / base_quantity_per_price_unit
-- ============================================================================

CREATE TABLE quote_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quote_batch_id UUID NOT NULL REFERENCES quote_batches(id) ON DELETE CASCADE,
  material_id UUID NOT NULL REFERENCES materials(id) ON DELETE RESTRICT,
  quantity NUMERIC(14,3) NOT NULL CHECK (quantity > 0),
  price_unit TEXT NOT NULL,
  base_quantity_per_price_unit NUMERIC(14,4) NOT NULL CHECK (base_quantity_per_price_unit > 0),
  unit_price NUMERIC(14,2) NOT NULL CHECK (unit_price >= 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),

  -- Prevent duplicate materials in the same quotation
  UNIQUE (quote_batch_id, material_id)
);

-- Batch lookup index (all items in a quote)
CREATE INDEX idx_quote_items_batch ON quote_items(quote_batch_id);

-- Material lookup index (all quotes for a given material)
CREATE INDEX idx_quote_items_material ON quote_items(material_id);
