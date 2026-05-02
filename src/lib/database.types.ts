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
      accommodations: {
        Row: {
          id: string
          sort_order: number
          is_visible: boolean
          created_at: string
          tagline: string
          name: string
          description: string
          image_url: string
          booking_url: string
          meta_1_label: string
          meta_1_value: string
          meta_2_label: string
          meta_2_value: string
          cta_text: string
          cta_variant: 'primary' | 'ghost'
        }
        Insert: {
          id?: string
          sort_order?: number
          is_visible?: boolean
          created_at?: string
          tagline: string
          name: string
          description: string
          image_url: string
          booking_url: string
          meta_1_label: string
          meta_1_value: string
          meta_2_label: string
          meta_2_value: string
          cta_text?: string
          cta_variant?: 'primary' | 'ghost'
        }
        Update: {
          id?: string
          sort_order?: number
          is_visible?: boolean
          tagline?: string
          name?: string
          description?: string
          image_url?: string
          booking_url?: string
          meta_1_label?: string
          meta_1_value?: string
          meta_2_label?: string
          meta_2_value?: string
          cta_text?: string
          cta_variant?: 'primary' | 'ghost'
        }
        Relationships: []
      }
      accommodation_requests: {
        Row: {
          id: string
          created_at: string
          guest_name: string
          email: string
          party_size: number
          notes: string | null
          accommodation_id: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          guest_name: string
          email: string
          party_size?: number
          notes?: string | null
          accommodation_id?: string | null
        }
        Update: {
          id?: string
          guest_name?: string
          email?: string
          party_size?: number
          notes?: string | null
          accommodation_id?: string | null
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
      travel_tips: {
        Row: {
          id: string
          sort_order: number
          is_visible: boolean
          created_at: string
          icon: string
          title: string
          body: string
        }
        Insert: {
          id?: string
          sort_order?: number
          is_visible?: boolean
          created_at?: string
          icon: string
          title: string
          body: string
        }
        Update: {
          id?: string
          sort_order?: number
          is_visible?: boolean
          icon?: string
          title?: string
          body?: string
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

export type AccommodationRow = Database['public']['Tables']['accommodations']['Row']
export type AccommodationRequestInsert = Database['public']['Tables']['accommodation_requests']['Insert']
export type RegistryItemRow = Database['public']['Tables']['registry_items']['Row']
export type TravelTipRow = Database['public']['Tables']['travel_tips']['Row']
