import { createClientComponentClient } from './supabaseClient'

export interface Session {
  id: string
  user_id: string
  audio_file_path: string | null
  duration_seconds: number
  created_at: string
}

export async function createSession(
  userId: string,
  durationSeconds: number
): Promise<{ sessionId: string }> {
  const supabase = createClientComponentClient()

  const { data, error } = await supabase
    .from('sessions')
    .insert({
      user_id: userId,
      duration_seconds: durationSeconds,
      audio_file_path: null,
      created_at: new Date().toISOString(),
    })
    .select('id')
    .single()

  if (error) {
    throw new Error(`Failed to create session: ${error.message}`)
  }

  if (!data) {
    throw new Error('Failed to create session: No data returned')
  }

  return { sessionId: data.id }
}

export async function getUserSessions(
  userId: string,
  limit: number = 10
): Promise<Session[]> {
  const supabase = createClientComponentClient()

  const { data, error } = await supabase
    .from('sessions')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) {
    throw new Error(`Failed to fetch sessions: ${error.message}`)
  }

  return data || []
}
