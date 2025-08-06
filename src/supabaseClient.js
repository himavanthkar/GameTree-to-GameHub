import { createClient } from '@supabase/supabase-js'

// For demo purposes, using placeholder values
// In production, these would come from environment variables
const supabaseUrl = 'https://your-project.supabase.co'
const supabaseAnonKey = 'your-anon-key'

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Note: Replace the above with your actual Supabase project URL and anon key
// You can find these in your Supabase project settings under API