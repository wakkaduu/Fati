-- ============================================================================
-- Seed Data for Material Price Tracker & Comparison System (MPTCS)
-- ============================================================================
-- This file populates the database with sample data for development/testing.
--
-- IMPORTANT: The created_by fields use a placeholder UUID. After running
-- this seed, update the placeholder with a real user ID from your
-- auth.users / profiles table, or run this seed after creating your
-- first admin user.
-- ============================================================================

-- ---------------------------------------------------------------------------
-- Placeholder user ID
-- Replace this with a real user UUID from your profiles table.
-- You can find it by running: SELECT id FROM profiles LIMIT 1;
-- ---------------------------------------------------------------------------
DO $$
DECLARE
  -- ⚠️ UPDATE THIS with a real user ID from your profiles table
  placeholder_user_id UUID := '00000000-0000-0000-0000-000000000000';

  -- Material IDs
  mat_cement_id      UUID := gen_random_uuid();
  mat_steel_id       UUID := gen_random_uuid();
  mat_pvc_id         UUID := gen_random_uuid();
  mat_wire_id        UUID := gen_random_uuid();

  -- Supplier IDs
  sup_abc_id         UUID := gen_random_uuid();
  sup_xyz_id         UUID := gen_random_uuid();
  sup_metro_id       UUID := gen_random_uuid();

  -- Quote batch IDs
  batch_abc_id       UUID := gen_random_uuid();
  batch_xyz_id       UUID := gen_random_uuid();

BEGIN

  -- =========================================================================
  -- MATERIALS
  -- =========================================================================
  -- 4 common construction materials with their base units for normalization

  INSERT INTO materials (id, name, category, specification, base_unit, description, is_active, created_by)
  VALUES
    (
      mat_cement_id,
      'Cement Type 1',
      'Concrete & Masonry',
      'Portland Cement Type I, 50kg bag',
      'kg',
      'General-purpose portland cement for concrete, mortar, and grout applications.',
      true,
      placeholder_user_id
    ),
    (
      mat_steel_id,
      'Steel Bar 10mm',
      'Steel & Metals',
      'Deformed Steel Bar, 10mm diameter, 6m length',
      'meter',
      'Standard deformed reinforcing steel bar for concrete reinforcement.',
      true,
      placeholder_user_id
    ),
    (
      mat_pvc_id,
      'PVC Pipe 2-inch',
      'Plumbing',
      'PVC Pressure Pipe, 2-inch (50mm) diameter, Series 1000',
      'meter',
      'Rigid PVC pipe for water supply and drainage systems.',
      true,
      placeholder_user_id
    ),
    (
      mat_wire_id,
      'Electrical Wire 2.0mm',
      'Electrical',
      'THHN/THWN Stranded Copper Wire, 2.0mm² (14 AWG)',
      'meter',
      'Stranded copper wire with thermoplastic insulation for general wiring.',
      true,
      placeholder_user_id
    );

  -- =========================================================================
  -- SUPPLIERS
  -- =========================================================================
  -- 3 sample suppliers with contact information

  INSERT INTO suppliers (id, name, contact_person, phone, email, address, notes, is_active)
  VALUES
    (
      sup_abc_id,
      'ABC Construction Supply',
      'Juan Dela Cruz',
      '+63 917 123 4567',
      'sales@abcsupply.ph',
      '123 Rizal Avenue, Quezon City, Metro Manila',
      'Reliable supplier with 15+ years in business. Good bulk pricing on cement and steel.',
      true
    ),
    (
      sup_xyz_id,
      'XYZ Hardware Trading',
      'Maria Santos',
      '+63 918 987 6543',
      'orders@xyzhardware.ph',
      '456 EDSA, Makati City, Metro Manila',
      'Fast delivery within Metro Manila. Specializes in electrical and plumbing materials.',
      true
    ),
    (
      sup_metro_id,
      'Metro Building Materials Corp.',
      'Pedro Reyes',
      '+63 919 555 7890',
      'procurement@metrobmc.ph',
      '789 Commonwealth Avenue, Quezon City, Metro Manila',
      'Large warehouse with wide inventory. Offers credit terms for established accounts.',
      true
    );

  -- =========================================================================
  -- QUOTE BATCHES
  -- =========================================================================
  -- 2 finalized quotations from different suppliers

  INSERT INTO quote_batches (id, supplier_id, quote_reference, quote_date, status, notes, created_by, finalized_by, finalized_at)
  VALUES
    (
      batch_abc_id,
      sup_abc_id,
      'ABC-Q-2024-0042',
      '2024-11-01',
      'finalized',
      'Quarterly price list for Q4 2024. Prices valid until December 31, 2024.',
      placeholder_user_id,
      placeholder_user_id,
      '2024-11-02 10:30:00+08'
    ),
    (
      batch_xyz_id,
      sup_xyz_id,
      'XYZ-2024-1187',
      '2024-11-05',
      'finalized',
      'Updated price list effective November 2024. Free delivery for orders above ₱50,000.',
      placeholder_user_id,
      placeholder_user_id,
      '2024-11-06 14:15:00+08'
    );

  -- =========================================================================
  -- QUOTE ITEMS — Batch 1: ABC Construction Supply
  -- =========================================================================
  -- 4 line items covering all sample materials

  INSERT INTO quote_items (quote_batch_id, material_id, quantity, price_unit, base_quantity_per_price_unit, unit_price)
  VALUES
    (
      batch_abc_id,
      mat_cement_id,
      100.000,           -- quantity: 100 bags
      '50kg bag',        -- price_unit: supplier quotes per 50kg bag
      50.0000,           -- base_quantity_per_price_unit: 50 kg per bag
      270.00             -- unit_price: ₱270 per 50kg bag → ₱5.40/kg
    ),
    (
      batch_abc_id,
      mat_steel_id,
      200.000,           -- quantity: 200 pieces
      '6m piece',        -- price_unit: supplier quotes per 6-meter piece
      6.0000,            -- base_quantity_per_price_unit: 6 meters per piece
      185.00             -- unit_price: ₱185 per 6m piece → ₱30.83/m
    ),
    (
      batch_abc_id,
      mat_pvc_id,
      50.000,            -- quantity: 50 pieces
      '3m piece',        -- price_unit: supplier quotes per 3-meter piece
      3.0000,            -- base_quantity_per_price_unit: 3 meters per piece
      145.00             -- unit_price: ₱145 per 3m piece → ₱48.33/m
    ),
    (
      batch_abc_id,
      mat_wire_id,
      30.000,            -- quantity: 30 rolls
      '150m roll',       -- price_unit: supplier quotes per 150-meter roll
      150.0000,          -- base_quantity_per_price_unit: 150 meters per roll
      2850.00            -- unit_price: ₱2,850 per 150m roll → ₱19.00/m
    );

  -- =========================================================================
  -- QUOTE ITEMS — Batch 2: XYZ Hardware Trading
  -- =========================================================================
  -- 3 line items for comparison pricing

  INSERT INTO quote_items (quote_batch_id, material_id, quantity, price_unit, base_quantity_per_price_unit, unit_price)
  VALUES
    (
      batch_xyz_id,
      mat_cement_id,
      50.000,            -- quantity: 50 bags
      '50kg bag',        -- price_unit: same quoting unit as ABC
      50.0000,           -- base_quantity_per_price_unit: 50 kg per bag
      280.00             -- unit_price: ₱280 per 50kg bag → ₱5.60/kg (more expensive)
    ),
    (
      batch_xyz_id,
      mat_steel_id,
      100.000,           -- quantity: 100 pieces
      '6m piece',        -- price_unit: same quoting unit as ABC
      6.0000,            -- base_quantity_per_price_unit: 6 meters per piece
      178.00             -- unit_price: ₱178 per 6m piece → ₱29.67/m (cheaper)
    ),
    (
      batch_xyz_id,
      mat_wire_id,
      20.000,            -- quantity: 20 boxes
      '75m box',         -- price_unit: different unit than ABC (box vs roll)
      75.0000,           -- base_quantity_per_price_unit: 75 meters per box
      1500.00            -- unit_price: ₱1,500 per 75m box → ₱20.00/m (slightly more)
    );

  RAISE NOTICE '✅ Seed data inserted successfully.';
  RAISE NOTICE '⚠️  Remember to update placeholder_user_id with a real user UUID!';

END $$;
