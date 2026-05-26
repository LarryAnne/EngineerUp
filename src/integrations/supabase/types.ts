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
      contact_messages: {
        Row: {
          created_at: string
          email: string
          id: number
          message: string
          name: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: number
          message: string
          name: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: number
          message?: string
          name?: string
          user_id?: string | null
        }
        Relationships: []
      }
      daily_quote_log: {
        Row: {
          country: string | null
          created_at: string
          day: string
          id: number
          quote_id: number
          user_id: string | null
        }
        Insert: {
          country?: string | null
          created_at?: string
          day?: string
          id?: number
          quote_id: number
          user_id?: string | null
        }
        Update: {
          country?: string | null
          created_at?: string
          day?: string
          id?: number
          quote_id?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "daily_quote_log_quote_id_fkey"
            columns: ["quote_id"]
            isOneToOne: false
            referencedRelation: "generated_quotes"
            referencedColumns: ["id"]
          },
        ]
      }
      favorites: {
        Row: {
          created_at: string
          quote_id: number
          user_id: string
        }
        Insert: {
          created_at?: string
          quote_id: number
          user_id: string
        }
        Update: {
          created_at?: string
          quote_id?: number
          user_id?: string
        }
        Relationships: []
      }
      generated_quotes: {
        Row: {
          author: string
          category: string[]
          country: string | null
          created_at: string
          generated_by: string
          id: number
          image_url: string | null
          text: string
          times_served: number
          tone: string | null
        }
        Insert: {
          author?: string
          category?: string[]
          country?: string | null
          created_at?: string
          generated_by?: string
          id?: number
          image_url?: string | null
          text: string
          times_served?: number
          tone?: string | null
        }
        Update: {
          author?: string
          category?: string[]
          country?: string | null
          created_at?: string
          generated_by?: string
          id?: number
          image_url?: string | null
          text?: string
          times_served?: number
          tone?: string | null
        }
        Relationships: []
      }
      generated_stories: {
        Row: {
          category: string
          content: string
          country: string | null
          created_at: string
          generated_by: string
          id: number
          image_url: string | null
          read_minutes: number
          subtitle: string
          title: string
          tone: string | null
        }
        Insert: {
          category?: string
          content: string
          country?: string | null
          created_at?: string
          generated_by?: string
          id?: number
          image_url?: string | null
          read_minutes?: number
          subtitle?: string
          title: string
          tone?: string | null
        }
        Update: {
          category?: string
          content?: string
          country?: string | null
          created_at?: string
          generated_by?: string
          id?: number
          image_url?: string | null
          read_minutes?: number
          subtitle?: string
          title?: string
          tone?: string | null
        }
        Relationships: []
      }
      generated_tasks: {
        Row: {
          category: string
          country: string | null
          created_at: string
          description: string
          difficulty: string
          generated_by: string
          id: number
          minutes: number
          title: string
        }
        Insert: {
          category?: string
          country?: string | null
          created_at?: string
          description: string
          difficulty?: string
          generated_by?: string
          id?: number
          minutes?: number
          title: string
        }
        Update: {
          category?: string
          country?: string | null
          created_at?: string
          description?: string
          difficulty?: string
          generated_by?: string
          id?: number
          minutes?: number
          title?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          body: string | null
          country: string | null
          created_at: string
          id: string
          title: string
        }
        Insert: {
          body?: string | null
          country?: string | null
          created_at?: string
          id?: string
          title: string
        }
        Update: {
          body?: string | null
          country?: string | null
          created_at?: string
          id?: string
          title?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          contact: string | null
          country: string | null
          created_at: string
          id: string
          updated_at: string
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          contact?: string | null
          country?: string | null
          created_at?: string
          id: string
          updated_at?: string
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          contact?: string | null
          country?: string | null
          created_at?: string
          id?: string
          updated_at?: string
          username?: string | null
        }
        Relationships: []
      }
      reviews: {
        Row: {
          author_name: string | null
          comment: string | null
          created_at: string
          id: string
          rating: number
          user_id: string | null
        }
        Insert: {
          author_name?: string | null
          comment?: string | null
          created_at?: string
          id?: string
          rating: number
          user_id?: string | null
        }
        Update: {
          author_name?: string | null
          comment?: string | null
          created_at?: string
          id?: string
          rating?: number
          user_id?: string | null
        }
        Relationships: []
      }
      streaks: {
        Row: {
          current_streak: number
          last_visit: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          current_streak?: number
          last_visit?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          current_streak?: number
          last_visit?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      task_submissions: {
        Row: {
          completed: boolean
          created_at: string
          id: number
          proof_url: string | null
          task_id: number
          user_id: string
        }
        Insert: {
          completed?: boolean
          created_at?: string
          id?: number
          proof_url?: string | null
          task_id: number
          user_id: string
        }
        Update: {
          completed?: boolean
          created_at?: string
          id?: number
          proof_url?: string | null
          task_id?: number
          user_id?: string
        }
        Relationships: []
      }
      viewed_quotes: {
        Row: {
          quote_id: number
          user_id: string
          viewed_at: string
        }
        Insert: {
          quote_id: number
          user_id: string
          viewed_at?: string
        }
        Update: {
          quote_id?: number
          user_id?: string
          viewed_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "viewed_quotes_quote_id_fkey"
            columns: ["quote_id"]
            isOneToOne: false
            referencedRelation: "generated_quotes"
            referencedColumns: ["id"]
          },
        ]
      }
      viewed_stories: {
        Row: {
          story_id: number
          user_id: string
          viewed_at: string
        }
        Insert: {
          story_id: number
          user_id: string
          viewed_at?: string
        }
        Update: {
          story_id?: number
          user_id?: string
          viewed_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "viewed_stories_story_id_fkey"
            columns: ["story_id"]
            isOneToOne: false
            referencedRelation: "generated_stories"
            referencedColumns: ["id"]
          },
        ]
      }
      viewed_tasks: {
        Row: {
          task_id: number
          user_id: string
          viewed_at: string
        }
        Insert: {
          task_id: number
          user_id: string
          viewed_at?: string
        }
        Update: {
          task_id?: number
          user_id?: string
          viewed_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "viewed_tasks_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "generated_tasks"
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
