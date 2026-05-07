/**
 * Auto-generated Supabase database types.
 *
 * To regenerate after schema changes:
 *   npx supabase gen types typescript --project-id <your-project-ref> > src/lib/database.types.ts
 */
export type Database = {
  public: {
    Tables: {
      rsvps: {
        Row: {
          id: string
          full_name: string
          email: string | null
          attendance: 'yes' | 'no'
          meal_choice: string | null
          allergies: string | null
          song_request: string | null
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          full_name: string
          email?: string | null
          attendance: 'yes' | 'no'
          meal_choice?: string | null
          allergies?: string | null
          song_request?: string | null
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          full_name?: string
          email?: string | null
          attendance?: 'yes' | 'no'
          meal_choice?: string | null
          allergies?: string | null
          song_request?: string | null
          notes?: string | null
          created_at?: string
        }
        Relationships: []
      }
      registry_items: {
        Row: {
          id: string
          sort_order: number
          is_visible: boolean
          created_at: string
          subtitle: string
          title: string
          store_name: string
          store_url: string
          image_url: string | null
          is_fund: boolean
          description: string | null
        }
        Insert: {
          id?: string
          sort_order?: number
          is_visible?: boolean
          created_at?: string
          subtitle: string
          title: string
          store_name: string
          store_url: string
          image_url?: string | null
          is_fund?: boolean
          description?: string | null
        }
        Update: {
          id?: string
          sort_order?: number
          is_visible?: boolean
          subtitle?: string
          title?: string
          store_name?: string
          store_url?: string
          image_url?: string | null
          is_fund?: boolean
          description?: string | null
        }
        Relationships: []
      }
    }
    Views: { [_ in never]: never }
    Functions: { [_ in never]: never }
    Enums: { [_ in never]: never }
    CompositeTypes: { [_ in never]: never }
  }
}

/** Convenience alias for a submitted RSVP row */
export type RsvpRow = Database['public']['Tables']['rsvps']['Row']
/** Convenience alias for inserting a new RSVP */
export type RsvpInsert = Database['public']['Tables']['rsvps']['Insert']

export type RegistryItemRow = Database['public']['Tables']['registry_items']['Row']
