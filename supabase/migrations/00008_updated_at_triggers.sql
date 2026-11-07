-- ============================================================================
-- Migration 00008: Automatic updated_at timestamp triggers
-- ============================================================================
-- Creates a generic reusable trigger function that sets updated_at to now()
-- on every UPDATE, then applies it to all tables that have an updated_at column.
-- ============================================================================

-- ---------------------------------------------------------------------------
-- Generic function: update the updated_at column to current timestamp
-- This function is table-agnostic and can be attached to any table that
-- has an updated_at TIMESTAMPTZ column.
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- ---------------------------------------------------------------------------
-- Apply to materials table
-- ---------------------------------------------------------------------------
CREATE TRIGGER trg_materials_updated_at
  BEFORE UPDATE ON materials
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ---------------------------------------------------------------------------
-- Apply to suppliers table
-- ---------------------------------------------------------------------------
CREATE TRIGGER trg_suppliers_updated_at
  BEFORE UPDATE ON suppliers
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ---------------------------------------------------------------------------
-- Apply to quote_batches table
-- ---------------------------------------------------------------------------
CREATE TRIGGER trg_quote_batches_updated_at
  BEFORE UPDATE ON quote_batches
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
