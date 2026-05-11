export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      behavioral_memory: {
        Row: {
          created_at: string | null
          id: number
          importance: number | null
          memory_key: string | null
          memory_type: string | null
          memory_value: Json | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: never
          importance?: number | null
          memory_key?: string | null
          memory_type?: string | null
          memory_value?: Json | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: never
          importance?: number | null
          memory_key?: string | null
          memory_type?: string | null
          memory_value?: Json | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "behavioral_memory_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      business_profiles: {
        Row: {
          business_type: string | null
          created_at: string | null
          id: string
          main_problem: string | null
          result: Json | null
          revenue_range: string | null
          user_id: string | null
        }
        Insert: {
          business_type?: string | null
          created_at?: string | null
          id?: string
          main_problem?: string | null
          result?: Json | null
          revenue_range?: string | null
          user_id?: string | null
        }
        Update: {
          business_type?: string | null
          created_at?: string | null
          id?: string
          main_problem?: string | null
          result?: Json | null
          revenue_range?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      feedback: {
        Row: {
          created_at: string | null
          id: string
          type: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          type?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          type?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      guide_availability: {
        Row: {
          day_of_week: number
          end_time: string
          guide_id: string | null
          id: string
          is_active: boolean | null
          start_time: string
          timezone: string | null
        }
        Insert: {
          day_of_week: number
          end_time: string
          guide_id?: string | null
          id?: string
          is_active?: boolean | null
          start_time: string
          timezone?: string | null
        }
        Update: {
          day_of_week?: number
          end_time?: string
          guide_id?: string | null
          id?: string
          is_active?: boolean | null
          start_time?: string
          timezone?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "guide_availability_guide_id_fkey"
            columns: ["guide_id"]
            isOneToOne: false
            referencedRelation: "guides"
            referencedColumns: ["id"]
          },
        ]
      }
      guide_requests: {
        Row: {
          best_time: string | null
          created_at: string | null
          email: string | null
          help_needed: string | null
          id: number
          name: string | null
          phone: string | null
          source: string | null
          status: string | null
          user_id: string | null
        }
        Insert: {
          best_time?: string | null
          created_at?: string | null
          email?: string | null
          help_needed?: string | null
          id?: never
          name?: string | null
          phone?: string | null
          source?: string | null
          status?: string | null
          user_id?: string | null
        }
        Update: {
          best_time?: string | null
          created_at?: string | null
          email?: string | null
          help_needed?: string | null
          id?: never
          name?: string | null
          phone?: string | null
          source?: string | null
          status?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      guide_specialties: {
        Row: {
          guide_id: string | null
          id: string
          specialty: string
        }
        Insert: {
          guide_id?: string | null
          id?: string
          specialty: string
        }
        Update: {
          guide_id?: string | null
          id?: string
          specialty?: string
        }
        Relationships: [
          {
            foreignKeyName: "guide_specialties_guide_id_fkey"
            columns: ["guide_id"]
            isOneToOne: false
            referencedRelation: "guides"
            referencedColumns: ["id"]
          },
        ]
      }
      guide_stats: {
        Row: {
          guide_id: string | null
          id: string
          rating: number | null
          reviews_count: number | null
          sessions_completed: number | null
          students_helped: number | null
          xp_earned: number | null
        }
        Insert: {
          guide_id?: string | null
          id?: string
          rating?: number | null
          reviews_count?: number | null
          sessions_completed?: number | null
          students_helped?: number | null
          xp_earned?: number | null
        }
        Update: {
          guide_id?: string | null
          id?: string
          rating?: number | null
          reviews_count?: number | null
          sessions_completed?: number | null
          students_helped?: number | null
          xp_earned?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "guide_stats_guide_id_fkey"
            columns: ["guide_id"]
            isOneToOne: false
            referencedRelation: "guides"
            referencedColumns: ["id"]
          },
        ]
      }
      guides: {
        Row: {
          archetypes: string[] | null
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          expertise: string[] | null
          full_name: string | null
          headline: string | null
          hourly_rate: number | null
          id: string
          profile_image: string | null
          rating: number | null
          sessions_count: number | null
          slug: string | null
          user_id: string | null
        }
        Insert: {
          archetypes?: string[] | null
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          expertise?: string[] | null
          full_name?: string | null
          headline?: string | null
          hourly_rate?: number | null
          id?: string
          profile_image?: string | null
          rating?: number | null
          sessions_count?: number | null
          slug?: string | null
          user_id?: string | null
        }
        Update: {
          archetypes?: string[] | null
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          expertise?: string[] | null
          full_name?: string | null
          headline?: string | null
          hourly_rate?: number | null
          id?: string
          profile_image?: string | null
          rating?: number | null
          sessions_count?: number | null
          slug?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      leads: {
        Row: {
          answers: Json | null
          archetype: string | null
          created_at: string
          email: string
          id: string
          last_action_date: string | null
          last_claim_week: string | null
          last_proof_date: string | null
          level: string | null
          result: Json | null
          source: string | null
          streak: number | null
          user_id: string | null
          weekly_mission: Json | null
          xp: number | null
        }
        Insert: {
          answers?: Json | null
          archetype?: string | null
          created_at?: string
          email: string
          id?: string
          last_action_date?: string | null
          last_claim_week?: string | null
          last_proof_date?: string | null
          level?: string | null
          result?: Json | null
          source?: string | null
          streak?: number | null
          user_id?: string | null
          weekly_mission?: Json | null
          xp?: number | null
        }
        Update: {
          answers?: Json | null
          archetype?: string | null
          created_at?: string
          email?: string
          id?: string
          last_action_date?: string | null
          last_claim_week?: string | null
          last_proof_date?: string | null
          level?: string | null
          result?: Json | null
          source?: string | null
          streak?: number | null
          user_id?: string | null
          weekly_mission?: Json | null
          xp?: number | null
        }
        Relationships: []
      }
      magicpen_sessions: {
        Row: {
          confidence_score: number | null
          created_at: string | null
          exam: string | null
          id: string
          readiness_score: number | null
          risk_level: string | null
          subject: string | null
          user_id: string | null
        }
        Insert: {
          confidence_score?: number | null
          created_at?: string | null
          exam?: string | null
          id?: string
          readiness_score?: number | null
          risk_level?: string | null
          subject?: string | null
          user_id?: string | null
        }
        Update: {
          confidence_score?: number | null
          created_at?: string | null
          exam?: string | null
          id?: string
          readiness_score?: number | null
          risk_level?: string | null
          subject?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      mission_vault: {
        Row: {
          created_at: string | null
          id: number
          mission: string | null
          user_id: string
          xp_earned: number | null
        }
        Insert: {
          created_at?: string | null
          id?: never
          mission?: string | null
          user_id: string
          xp_earned?: number | null
        }
        Update: {
          created_at?: string | null
          id?: never
          mission?: string | null
          user_id?: string
          xp_earned?: number | null
        }
        Relationships: []
      }
      nortnspoil_events: {
        Row: {
          context: Json | null
          created_at: string | null
          id: string
          recovery_plan: Json | null
          status: string | null
          trigger_score: number | null
          trigger_type: string | null
          user_id: string | null
        }
        Insert: {
          context?: Json | null
          created_at?: string | null
          id?: string
          recovery_plan?: Json | null
          status?: string | null
          trigger_score?: number | null
          trigger_type?: string | null
          user_id?: string | null
        }
        Update: {
          context?: Json | null
          created_at?: string | null
          id?: string
          recovery_plan?: Json | null
          status?: string | null
          trigger_score?: number | null
          trigger_type?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          archetype: string | null
          avatar_url: string | null
          created_at: string | null
          current_stage: string | null
          full_name: string | null
          id: string
          last_active_at: string | null
          level: number | null
          onboarding_complete: boolean | null
          streak: number | null
          xp: number | null
        }
        Insert: {
          archetype?: string | null
          avatar_url?: string | null
          created_at?: string | null
          current_stage?: string | null
          full_name?: string | null
          id: string
          last_active_at?: string | null
          level?: number | null
          onboarding_complete?: boolean | null
          streak?: number | null
          xp?: number | null
        }
        Update: {
          archetype?: string | null
          avatar_url?: string | null
          created_at?: string | null
          current_stage?: string | null
          full_name?: string | null
          id?: string
          last_active_at?: string | null
          level?: number | null
          onboarding_complete?: boolean | null
          streak?: number | null
          xp?: number | null
        }
        Relationships: []
      }
      sessions: {
        Row: {
          ai_summary: string | null
          booked_slot: string | null
          created_at: string | null
          description: string | null
          duration: number | null
          guide_id: string | null
          guide_notes: string | null
          id: string
          meeting_room: string | null
          meeting_url: string | null
          notes: string | null
          room_name: string | null
          scheduled_for: string | null
          session_notes: string | null
          status: string | null
          student_email: string | null
          student_id: string | null
          student_name: string | null
          title: string | null
        }
        Insert: {
          ai_summary?: string | null
          booked_slot?: string | null
          created_at?: string | null
          description?: string | null
          duration?: number | null
          guide_id?: string | null
          guide_notes?: string | null
          id?: string
          meeting_room?: string | null
          meeting_url?: string | null
          notes?: string | null
          room_name?: string | null
          scheduled_for?: string | null
          session_notes?: string | null
          status?: string | null
          student_email?: string | null
          student_id?: string | null
          student_name?: string | null
          title?: string | null
        }
        Update: {
          ai_summary?: string | null
          booked_slot?: string | null
          created_at?: string | null
          description?: string | null
          duration?: number | null
          guide_id?: string | null
          guide_notes?: string | null
          id?: string
          meeting_room?: string | null
          meeting_url?: string | null
          notes?: string | null
          room_name?: string | null
          scheduled_for?: string | null
          session_notes?: string | null
          status?: string | null
          student_email?: string | null
          student_id?: string | null
          student_name?: string | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sessions_guide_id_fkey"
            columns: ["guide_id"]
            isOneToOne: false
            referencedRelation: "guides"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sessions_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_events: {
        Row: {
          created_at: string | null
          event_data: Json | null
          event_type: string
          id: number
          user_id: string | null
          xp_delta: number | null
        }
        Insert: {
          created_at?: string | null
          event_data?: Json | null
          event_type: string
          id?: never
          user_id?: string | null
          xp_delta?: number | null
        }
        Update: {
          created_at?: string | null
          event_data?: Json | null
          event_type?: string
          id?: never
          user_id?: string | null
          xp_delta?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "user_events_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_profiles: {
        Row: {
          archetype: string | null
          archetype_data: Json | null
          created_at: string | null
          id: string
          streak: number | null
          user_id: string | null
          xp: number | null
        }
        Insert: {
          archetype?: string | null
          archetype_data?: Json | null
          created_at?: string | null
          id?: string
          streak?: number | null
          user_id?: string | null
          xp?: number | null
        }
        Update: {
          archetype?: string | null
          archetype_data?: Json | null
          created_at?: string | null
          id?: string
          streak?: number | null
          user_id?: string | null
          xp?: number | null
        }
        Relationships: []
      }
      user_stats: {
        Row: {
          consistency_score: number | null
          current_energy: string | null
          current_focus: string | null
          discipline_score: number | null
          growth_score: number | null
          total_focus_minutes: number | null
          total_missions_completed: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          consistency_score?: number | null
          current_energy?: string | null
          current_focus?: string | null
          discipline_score?: number | null
          growth_score?: number | null
          total_focus_minutes?: number | null
          total_missions_completed?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          consistency_score?: number | null
          current_energy?: string | null
          current_focus?: string | null
          discipline_score?: number | null
          growth_score?: number | null
          total_focus_minutes?: number | null
          total_missions_completed?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_stats_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
