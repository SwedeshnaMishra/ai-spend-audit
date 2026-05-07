import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL!;

const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabaseServiceKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY!;

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);

export const supabaseAdmin = createClient(
  supabaseUrl,
  supabaseServiceKey
);

// Database Types

export type Audit = {
  id: string;
  tools: unknown;
  team_size: number;
  use_case: string;
  result: unknown;
  ai_summary: string | null;
  created_at: string;
};

export type Lead = {
  id: string;
  audit_id: string;
  email: string;
  company_name: string | null;
  role: string | null;
  team_size: number | null;
  created_at: string;
};