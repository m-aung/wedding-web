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
          plus_one: boolean
          kids_count: number
          allergies: string | null
          song_request: string | null
          notes: string | null
          created_at: string
          updated_at: string | null
        }
        Insert: {
          id?: string
          full_name: string
          email?: string | null
          attendance: 'yes' | 'no'
          plus_one?: boolean
          kids_count?: number
          allergies?: string | null
          song_request?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          id?: string
          full_name?: string
          email?: string | null
          attendance?: 'yes' | 'no'
          plus_one?: boolean
          kids_count?: number
          allergies?: string | null
          song_request?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string | null
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
    Functions: {
      validate_rsvp_guest: {
        Args: { p_name: string; p_email: string }
        Returns: {
          on_list: boolean
          rsvp_count: number
          existing_rsvp: RsvpRow | null
        }
      }
      update_rsvp: {
        Args: {
          p_id: string
          p_email: string
          p_attendance: string
          p_plus_one: boolean
          p_kids_count: number
          p_allergies: string | null
          p_song_request: string | null
          p_notes: string | null
        }
        Returns: boolean
      }
    }
    Enums: { [_ in never]: never }
    CompositeTypes: { [_ in never]: never }
  }
}

/** Convenience alias for a submitted RSVP row */
export type RsvpRow = Database['public']['Tables']['rsvps']['Row']
/** Convenience alias for inserting a new RSVP */
export type RsvpInsert = Database['public']['Tables']['rsvps']['Insert']

export type RegistryItemRow = Database['public']['Tables']['registry_items']['Row']
