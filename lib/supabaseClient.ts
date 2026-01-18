import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Singleton pattern to avoid multiple GoTrueClient instances
let supabaseClientInstance: SupabaseClient | null = null

// Client-side Supabase client with proper cookie handling
export const createClientComponentClient = (): SupabaseClient => {
  // Return existing instance if available (prevents multiple GoTrueClient instances)
  if (supabaseClientInstance) {
    console.log('[DEBUG] Reusing existing Supabase client instance')
    return supabaseClientInstance
  }

  // Create new instance only if one doesn't exist
  console.log('[DEBUG] Creating new Supabase client instance', { url: supabaseUrl, hasKey: !!supabaseAnonKey })
  
  try {
    console.log('[DEBUG] About to call createClient()')
    supabaseClientInstance = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
        storageKey: 'spokena-auth' // Explicit storage key to avoid conflicts
      }
    })
    console.log('[DEBUG] createClient() returned successfully', { hasClient: !!supabaseClientInstance })
  } catch (err: any) {
    console.error('[DEBUG] ERROR in createClient():', err)
    throw err
  }
  
  console.log('[DEBUG] Supabase client instance created successfully')
  return supabaseClientInstance
}

// Server-side Supabase client
export const createServerComponentClient = () => {
  return createClient(supabaseUrl, supabaseAnonKey)
}

// Default client (for backward compatibility) - uses singleton
export const supabase = createClientComponentClient()
