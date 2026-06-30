import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let client: SupabaseClient | undefined;

function getSupabaseClient() {
  if (!client) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY');
    }

    client = createClient(supabaseUrl, supabaseAnonKey);
  }

  return client;
}

export const supabase = {
  from: (...args: Parameters<SupabaseClient['from']>) => getSupabaseClient().from(...args),
};

// Types
export interface Department {
  id: string;
  name: string;
  code: string;
}

export interface Professor {
  id: string;
  name: string;
  email: string;
  department_id: string;
  designation: string | null;
  research_interests: string[] | null;
  profile_image_url: string | null;
  google_scholar_url: string | null;
  is_accepting_students: boolean;
  departments?: Department;
}

export interface Lab {
  id: string;
  name: string;
  department_id: string;
  head_professor_id: string | null;
  description: string | null;
  location: string | null;
  website_url: string | null;
  research_areas: string[] | null;
  departments?: Department;
  professors?: Professor;
}

export interface ProjectVacancy {
  id: string;
  lab_id: string;
  professor_id: string | null;
  title: string;
  description: string | null;
  requirements: string[] | null;
  duration: string | null;
  spots_available: number;
  deadline: string | null;
  is_active: boolean;
  labs?: Lab;
  professors?: Professor;
}
