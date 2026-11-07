-- ============================================================================
-- Migration 00006: Row Level Security (RLS) policies
-- ============================================================================
-- Enables RLS on all tables and creates fine-grained access policies based on
-- user role (admin, editor, viewer) and active status.
--
-- Policy naming convention: {table}_{operation}_{scope}
-- All policies require the user to be authenticated and active.
-- ============================================================================

-- ============================================================================
-- PROFILES
-- ============================================================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Any authenticated active user can view profiles
CREATE POLICY profiles_select_all
  ON profiles
  FOR SELECT
  TO authenticated
  USING (is_active_user(auth.uid()));

-- Users can update their own full_name
CREATE POLICY profiles_update_own
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (
    id = auth.uid()
    AND is_active_user(auth.uid())
  )
  WITH CHECK (
    id = auth.uid()
    AND is_active_user(auth.uid())
    -- Only allow changing full_name (role and is_active unchanged)
    AND role = (SELECT p.role FROM profiles p WHERE p.id = auth.uid())
    AND is_active = (SELECT p.is_active FROM profiles p WHERE p.id = auth.uid())
  );

-- Admins can update any profile (role, is_active, full_name)
CREATE POLICY profiles_update_admin
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (
    get_user_role(auth.uid()) = 'admin'
    AND is_active_user(auth.uid())
  )
  WITH CHECK (
    get_user_role(auth.uid()) = 'admin'
    AND is_active_user(auth.uid())
  );

-- ============================================================================
-- MATERIALS
-- ============================================================================

ALTER TABLE materials ENABLE ROW LEVEL SECURITY;

-- Any authenticated active user can view active and inactive materials
CREATE POLICY materials_select_all
  ON materials
  FOR SELECT
  TO authenticated
  USING (is_active_user(auth.uid()));

-- Admin or editor can insert materials
CREATE POLICY materials_insert_editor
  ON materials
  FOR INSERT
  TO authenticated
  WITH CHECK (
    get_user_role(auth.uid()) IN ('admin', 'editor')
    AND is_active_user(auth.uid())
  );

-- Admin or editor can update materials
CREATE POLICY materials_update_editor
  ON materials
  FOR UPDATE
  TO authenticated
  USING (
    get_user_role(auth.uid()) IN ('admin', 'editor')
    AND is_active_user(auth.uid())
  )
  WITH CHECK (
    get_user_role(auth.uid()) IN ('admin', 'editor')
    AND is_active_user(auth.uid())
  );

-- ============================================================================
-- SUPPLIERS
-- ============================================================================

ALTER TABLE suppliers ENABLE ROW LEVEL SECURITY;

-- Any authenticated active user can view suppliers
CREATE POLICY suppliers_select_all
  ON suppliers
  FOR SELECT
  TO authenticated
  USING (is_active_user(auth.uid()));

-- Admin or editor can insert suppliers
CREATE POLICY suppliers_insert_editor
  ON suppliers
  FOR INSERT
  TO authenticated
  WITH CHECK (
    get_user_role(auth.uid()) IN ('admin', 'editor')
    AND is_active_user(auth.uid())
  );

-- Admin or editor can update suppliers
CREATE POLICY suppliers_update_editor
  ON suppliers
  FOR UPDATE
  TO authenticated
  USING (
    get_user_role(auth.uid()) IN ('admin', 'editor')
    AND is_active_user(auth.uid())
  )
  WITH CHECK (
    get_user_role(auth.uid()) IN ('admin', 'editor')
    AND is_active_user(auth.uid())
  );

-- ============================================================================
-- QUOTE_BATCHES
-- ============================================================================

ALTER TABLE quote_batches ENABLE ROW LEVEL SECURITY;

-- Any authenticated active user can view quote batches
CREATE POLICY quote_batches_select_all
  ON quote_batches
  FOR SELECT
  TO authenticated
  USING (is_active_user(auth.uid()));

-- Admin or editor can insert quote batches
CREATE POLICY quote_batches_insert_editor
  ON quote_batches
  FOR INSERT
  TO authenticated
  WITH CHECK (
    get_user_role(auth.uid()) IN ('admin', 'editor')
    AND is_active_user(auth.uid())
  );

-- Admin or editor can update quote batches
-- Note: immutability of finalized batches is enforced by the trigger in 00007
CREATE POLICY quote_batches_update_editor
  ON quote_batches
  FOR UPDATE
  TO authenticated
  USING (
    get_user_role(auth.uid()) IN ('admin', 'editor')
    AND is_active_user(auth.uid())
  )
  WITH CHECK (
    get_user_role(auth.uid()) IN ('admin', 'editor')
    AND is_active_user(auth.uid())
  );

-- ============================================================================
-- QUOTE_ITEMS
-- ============================================================================

ALTER TABLE quote_items ENABLE ROW LEVEL SECURITY;

-- Any authenticated active user can view quote items
CREATE POLICY quote_items_select_all
  ON quote_items
  FOR SELECT
  TO authenticated
  USING (is_active_user(auth.uid()));

-- Admin or editor can insert items only into draft quote batches
CREATE POLICY quote_items_insert_editor
  ON quote_items
  FOR INSERT
  TO authenticated
  WITH CHECK (
    get_user_role(auth.uid()) IN ('admin', 'editor')
    AND is_active_user(auth.uid())
    AND (
      SELECT qb.status FROM quote_batches qb WHERE qb.id = quote_batch_id
    ) = 'draft'
  );

-- Admin or editor can update items only in draft quote batches
CREATE POLICY quote_items_update_editor
  ON quote_items
  FOR UPDATE
  TO authenticated
  USING (
    get_user_role(auth.uid()) IN ('admin', 'editor')
    AND is_active_user(auth.uid())
    AND (
      SELECT qb.status FROM quote_batches qb WHERE qb.id = quote_batch_id
    ) = 'draft'
  )
  WITH CHECK (
    get_user_role(auth.uid()) IN ('admin', 'editor')
    AND is_active_user(auth.uid())
    AND (
      SELECT qb.status FROM quote_batches qb WHERE qb.id = quote_batch_id
    ) = 'draft'
  );

-- Admin or editor can delete items only from draft quote batches
CREATE POLICY quote_items_delete_editor
  ON quote_items
  FOR DELETE
  TO authenticated
  USING (
    get_user_role(auth.uid()) IN ('admin', 'editor')
    AND is_active_user(auth.uid())
    AND (
      SELECT qb.status FROM quote_batches qb WHERE qb.id = quote_batch_id
    ) = 'draft'
  );
