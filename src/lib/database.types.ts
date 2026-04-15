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
          attendance: 'yes' | 'no'
          meal_choice: string | null
          song_request: string | null
          created_at: string
        }
        Insert: {
          id?: string
          full_name: string
          attendance: 'yes' | 'no'
          meal_choice?: string | null
          song_request?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          full_name?: string
          attendance?: 'yes' | 'no'
          meal_choice?: string | null
          song_request?: string | null
          created_at?: string
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
