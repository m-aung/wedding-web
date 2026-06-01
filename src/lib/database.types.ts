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

