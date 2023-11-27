export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

interface Database {
  public: {
    Tables: {
      event_tags: {
        Row: {
          event_id: string;
          id: string;
          tag_id: string;
        };
        Insert: {
          event_id: string;
          id?: string;
          tag_id: string;
        };
        Update: {
          event_id?: string;
          id?: string;
          tag_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "event_tags_event_id_fkey";
            columns: ["event_id"];
            isOneToOne: false;
            referencedRelation: "events";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "event_tags_tag_id_fkey";
            columns: ["tag_id"];
            isOneToOne: false;
            referencedRelation: "tags";
            referencedColumns: ["id"];
          }
        ];
      };
      events: {
        Row: {
          address: string;
          created_at: string;
          date: string;
          description: string;
          end_time: string;
          id: string;
          lat: number;
          lng: number;
          name: string;
          organizer_id: string;
          poster_url: string | null;
          start_time: string;
          venue_map_url: string | null;
          venue_name: string;
        };
        Insert: {
          address: string;
          created_at?: string;
          date: string;
          description: string;
          end_time: string;
          id?: string;
          lat: number;
          lng: number;
          name: string;
          organizer_id: string;
          poster_url?: string | null;
          start_time: string;
          venue_map_url?: string | null;
          venue_name: string;
        };
        Update: {
          address?: string;
          created_at?: string;
          date?: string;
          description?: string;
          end_time?: string;
          id?: string;
          lat?: number;
          lng?: number;
          name?: string;
          organizer_id?: string;
          poster_url?: string | null;
          start_time?: string;
          venue_map_url?: string | null;
          venue_name?: string;
        };
        Relationships: [
          {
            foreignKeyName: "events_organizer_id_fkey";
            columns: ["organizer_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      profiles: {
        Row: {
          avatar_url: string | null;
          bio: string | null;
          email: string | null;
          first_name: string | null;
          id: string;
          instagram: string | null;
          last_name: string | null;
          twitter: string | null;
        };
        Insert: {
          avatar_url?: string | null;
          bio?: string | null;
          email?: string | null;
          first_name?: string | null;
          id: string;
          instagram?: string | null;
          last_name?: string | null;
          twitter?: string | null;
        };
        Update: {
          avatar_url?: string | null;
          bio?: string | null;
          email?: string | null;
          first_name?: string | null;
          id?: string;
          instagram?: string | null;
          last_name?: string | null;
          twitter?: string | null;
        };
        Relationships: [];
      };
      tags: {
        Row: {
          id: string;
          name: string;
        };
        Insert: {
          id?: string;
          name: string;
        };
        Update: {
          id?: string;
          name?: string;
        };
        Relationships: [];
      };
      tickets: {
        Row: {
          created_at: string;
          event_id: string;
          id: string;
          name: string;
          price: number;
          quantity: number | null;
        };
        Insert: {
          created_at?: string;
          event_id: string;
          id?: string;
          name?: string;
          price: number;
          quantity?: number | null;
        };
        Update: {
          created_at?: string;
          event_id?: string;
          id?: string;
          name?: string;
          price?: number;
          quantity?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "tickets_event_id_fkey";
            columns: ["event_id"];
            isOneToOne: false;
            referencedRelation: "events";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];

export { Database, Tables };
