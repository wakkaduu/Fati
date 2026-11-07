/**
 * Supabase Database type definitions.
 *
 * These types are used by the Supabase JS client for type-safe queries.
 * They mirror the underlying PostgreSQL schema.
 */
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string;
          role: string;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id: string;
          full_name: string;
          role?: string;
          is_active?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string;
          role?: string;
          is_active?: boolean;
          created_at?: string;
        };
      };
      materials: {
        Row: {
          id: string;
          name: string;
          category: string;
          specification: string;
          base_unit: string;
          description: string | null;
          is_active: boolean;
          created_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          category: string;
          specification: string;
          base_unit: string;
          description?: string | null;
          is_active?: boolean;
          created_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          category?: string;
          specification?: string;
          base_unit?: string;
          description?: string | null;
          is_active?: boolean;
          created_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      suppliers: {
        Row: {
          id: string;
          name: string;
          contact_person: string | null;
          phone: string | null;
          email: string | null;
          address: string | null;
          notes: string | null;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          contact_person?: string | null;
          phone?: string | null;
          email?: string | null;
          address?: string | null;
          notes?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          contact_person?: string | null;
          phone?: string | null;
          email?: string | null;
          address?: string | null;
          notes?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      quote_batches: {
        Row: {
          id: string;
          supplier_id: string;
          quote_reference: string | null;
          quote_date: string;
          status: string;
          notes: string | null;
          created_by: string;
          finalized_by: string | null;
          finalized_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          supplier_id: string;
          quote_reference?: string | null;
          quote_date: string;
          status?: string;
          notes?: string | null;
          created_by: string;
          finalized_by?: string | null;
          finalized_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          supplier_id?: string;
          quote_reference?: string | null;
          quote_date?: string;
          status?: string;
          notes?: string | null;
          created_by?: string;
          finalized_by?: string | null;
          finalized_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      quote_items: {
        Row: {
          id: string;
          quote_batch_id: string;
          material_id: string;
          quantity: number;
          price_unit: string;
          base_quantity_per_price_unit: number;
          unit_price: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          quote_batch_id: string;
          material_id: string;
          quantity: number;
          price_unit: string;
          base_quantity_per_price_unit: number;
          unit_price: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          quote_batch_id?: string;
          material_id?: string;
          quantity?: number;
          price_unit?: string;
          base_quantity_per_price_unit?: number;
          unit_price?: number;
          created_at?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}
