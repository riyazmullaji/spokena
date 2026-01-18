import { createClientComponentClient } from './supabaseClient'

export interface Session {
  id: string
  user_id: string
  audio_file_path: string | null
  duration_seconds: number
  created_at: string
}

/**
 * Create a new session in the database
 * @param userId - The user's UUID from Supabase Auth
 * @param durationSeconds - Duration of the recording in seconds
 * @returns The created session ID
 */
export async function createSession(
  userId: string,
  durationSeconds: number
): Promise<{ sessionId: string }> {
  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/a374c8e4-ecc9-4992-9d1f-f1fd3b8d4afa',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'sessionService.ts:17',message:'createSession started',data:{userId,durationSeconds},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
  // #endregion
  console.log('[DEBUG] createSession started', { userId, durationSeconds })

  console.log('[DEBUG] About to call createClientComponentClient()')
  let supabase
  try {
    supabase = createClientComponentClient()
    console.log('[DEBUG] createClientComponentClient() returned', { hasClient: !!supabase })
  } catch (err: any) {
    console.error('[DEBUG] ERROR in createClientComponentClient():', err)
    throw err
  }

  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/a374c8e4-ecc9-4992-9d1f-f1fd3b8d4afa',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'sessionService.ts:24',message:'createSession before Supabase insert',data:{hasSupabaseClient:!!supabase},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
  // #endregion
  console.log('[DEBUG] Before Supabase insert', { hasSupabaseClient: !!supabase })

  const { data, error } = await supabase
    .from('sessions')
    .insert({
      user_id: userId,
      duration_seconds: durationSeconds,
      audio_file_path: null, // Will be set by the API
      created_at: new Date().toISOString(),
    })
    .select('id')
    .single()

  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/a374c8e4-ecc9-4992-9d1f-f1fd3b8d4afa',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'sessionService.ts:36',message:'createSession after Supabase insert',data:{hasData:!!data,hasError:!!error,errorCode:error?.code,errorMessage:error?.message},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
  // #endregion

  if (error) {
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/a374c8e4-ecc9-4992-9d1f-f1fd3b8d4afa',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'sessionService.ts:40',message:'createSession error',data:{errorCode:error.code,errorMessage:error.message,errorDetails:error},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
    // #endregion

    console.error('[DEBUG] Error creating session:', error)
    throw new Error(`Failed to create session: ${error.message}`)
  }

  if (!data) {
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/a374c8e4-ecc9-4992-9d1f-f1fd3b8d4afa',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'sessionService.ts:48',message:'createSession no data returned',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
    // #endregion

    throw new Error('Failed to create session: No data returned')
  }

  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/a374c8e4-ecc9-4992-9d1f-f1fd3b8d4afa',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'sessionService.ts:52',message:'createSession success',data:{sessionId:data.id},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
  // #endregion
  console.log('[DEBUG] createSession success', { sessionId: data.id })

  return { sessionId: data.id }
}

/**
 * Get user's recent sessions
 * @param userId - The user's UUID
 * @param limit - Maximum number of sessions to return (default: 10)
 * @returns Array of sessions
 */
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
    console.error('Error fetching sessions:', error)
    throw new Error(`Failed to fetch sessions: ${error.message}`)
  }

  return data || []
}
