export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      events: {
        Row: {
          color: string | null
          created_at: string
          "created-by": number | null
          date: string | null
          duration: number | null
          id: number
          title: string | null
          type: string | null
          updated_at: string | null
        }
        Insert: {
          color?: string | null
          created_at?: string
          "created-by"?: number | null
          date?: string | null
          duration?: number | null
          id?: number
          title?: string | null
          type?: string | null
          updated_at?: string | null
        }
        Update: {
          color?: string | null
          created_at?: string
          "created-by"?: number | null
          date?: string | null
          duration?: number | null
          id?: number
          title?: string | null
          type?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "events_created-by_fkey"
            columns: ["created-by"]
            isOneToOne: false
            referencedRelation: "Users"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string
          id: number
          message: string | null
          read: boolean | null
          title: string | null
          type: string | null
          user_id: number | null
        }
        Insert: {
          created_at?: string
          id?: number
          message?: string | null
          read?: boolean | null
          title?: string | null
          type?: string | null
          user_id?: number | null
        }
        Update: {
          created_at?: string
          id?: number
          message?: string | null
          read?: boolean | null
          title?: string | null
          type?: string | null
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "Users"
            referencedColumns: ["id"]
          },
        ]
      }
      project_members: {
        Row: {
          created_at: string
          id: number
          joned_at: string | null
          project_id: number | null
          role: string | null
          user_id: number | null
        }
        Insert: {
          created_at?: string
          id?: number
          joned_at?: string | null
          project_id?: number | null
          role?: string | null
          user_id?: number | null
        }
        Update: {
          created_at?: string
          id?: number
          joned_at?: string | null
          project_id?: number | null
          role?: string | null
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "project_memebers_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_memebers_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "Users"
            referencedColumns: ["id"]
          },
        ]
      }
      project_tags: {
        Row: {
          created_at: string
          id: number
          project_id: number | null
          tag_name: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          project_id?: number | null
          tag_name?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          project_id?: number | null
          tag_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "project_tags_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          budget_allocated: number | null
          budget_spent: number | null
          created_at: string
          created_by: number | null
          description: string | null
          end_date: string | null
          id: number
          name: string | null
          priority: string | null
          start_date: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          budget_allocated?: number | null
          budget_spent?: number | null
          created_at?: string
          created_by?: number | null
          description?: string | null
          end_date?: string | null
          id?: number
          name?: string | null
          priority?: string | null
          start_date?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          budget_allocated?: number | null
          budget_spent?: number | null
          created_at?: string
          created_by?: number | null
          description?: string | null
          end_date?: string | null
          id?: number
          name?: string | null
          priority?: string | null
          start_date?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "projects_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "Users"
            referencedColumns: ["id"]
          },
        ]
      }
      task_tag: {
        Row: {
          created_at: string
          id: number
          tag_name: string | null
          task_id: number | null
        }
        Insert: {
          created_at?: string
          id?: number
          tag_name?: string | null
          task_id?: number | null
        }
        Update: {
          created_at?: string
          id?: number
          tag_name?: string | null
          task_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "task_tag_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
        ]
      }
      tasks: {
        Row: {
          assignee_id: number | null
          completed: boolean | null
          created_at: string
          created_by: number | null
          description: string | null
          due_date: string | null
          id: number
          project_id: number | null
          status: string | null
          title: string | null
          updated_at: string | null
        }
        Insert: {
          assignee_id?: number | null
          completed?: boolean | null
          created_at?: string
          created_by?: number | null
          description?: string | null
          due_date?: string | null
          id?: number
          project_id?: number | null
          status?: string | null
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          assignee_id?: number | null
          completed?: boolean | null
          created_at?: string
          created_by?: number | null
          description?: string | null
          due_date?: string | null
          id?: number
          project_id?: number | null
          status?: string | null
          title?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tasks_assignee_id_fkey"
            columns: ["assignee_id"]
            isOneToOne: false
            referencedRelation: "Users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "Users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      Users: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string | null
          id: number
          name: string | null
          "updated-at": string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          id?: number
          name?: string | null
          "updated-at"?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          id?: number
          name?: string | null
          "updated-at"?: string | null
        }
        Relationships: []
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
