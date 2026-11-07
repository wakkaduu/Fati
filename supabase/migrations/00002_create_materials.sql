-- ============================================================================
-- Migration 00002: Create materials table
-- ============================================================================
-- Stores the master catalog of construction materials. Each material has a
-- name, category, specification, and a canonical base unit used to normalize
-- price comparisons across different supplier quoting units.
-- ============================================================================

CREATE TABLE materials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  specification TEXT NOT NULL,
  base_unit TEXT NOT NULL,
  description TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Full-text search index on material name for fast lookups
CREATE INDEX idx_materials_name ON materials USING gin(to_tsvector('english', name));

-- Category filter index
CREATE INDEX idx_materials_category ON materials(category);

-- Active/inactive filter index
CREATE INDEX idx_materials_is_active ON materials(is_active);

-- Foreign key lookup index
CREATE INDEX idx_materials_created_by ON materials(created_by);
