import { createClient } from '@supabase/supabase-js'

const env = import.meta.env
// VITE_* for manual setup; NEXT_PUBLIC_* are added automatically by the Vercel Supabase integration.
const url = env.VITE_SUPABASE_URL || env.NEXT_PUBLIC_SUPABASE_URL
const key =
  env.VITE_SUPABASE_ANON_KEY || env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabaseEnabled = Boolean(url && key)
export const supabase = supabaseEnabled ? createClient(url, key) : null
