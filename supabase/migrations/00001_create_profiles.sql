-- ============================================================================
-- Migration 00001: Create profiles table and auth helpers
-- ============================================================================
-- Links user profiles to Supabase auth.users. Provides role-based access
-- control (admin, editor, viewer) and active/inactive status tracking.
-- Automatically creates a profile row when a new user signs up.
-- ============================================================================

-- Profiles table linked to Supabase auth
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL DEFAULT '',
  role TEXT NOT NULL DEFAULT 'viewer' CHECK (role IN ('admin', 'editor', 'viewer')),
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index on role for policy lookups
CREATE INDEX idx_profiles_role ON profiles(role);
CREATE INDEX idx_profiles_is_active ON profiles(is_active);

-- ---------------------------------------------------------------------------
-- Helper function: get user role
-- Used by RLS policies to determine access level.
-- SECURITY DEFINER ensures the function runs with table-owner privileges,
-- allowing RLS policies to read the profiles table without recursion.
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION get_user_role(user_id UUID)
RETURNS TEXT
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT role FROM profiles WHERE id = user_id;
$$;

-- ---------------------------------------------------------------------------
-- Helper function: check if user is active
-- Returns false if the user has no profile or is deactivated.
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION is_active_user(user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT COALESCE((SELECT is_active FROM profiles WHERE id = user_id), false);
$$;

-- ---------------------------------------------------------------------------
-- Trigger function: auto-create profile on user signup
-- Fires after a new row is inserted into auth.users. Extracts full_name
-- from the raw_user_meta_data JSON payload if available.
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO profiles (id, full_name, role, is_active)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    'viewer',
    true
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
