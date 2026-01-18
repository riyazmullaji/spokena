import { createClientComponentClient } from './supabaseClient'
import { ApiAnalysisResponse } from '@/components/practice/feedback-panel'

export interface Analysis {
  id: string
  session_id: string
  transcript: string
  status: string
  analysis_json: ApiAnalysisResponse
  created_at: string
  user_rating: number | null
}

/**
 * Save analysis result to the analyses table
 * @param sessionId - The session UUID
 * @param analysisData - The complete API response
 */
export async function saveAnalysis(
  sessionId: string,
  analysisData: ApiAnalysisResponse
): Promise<void> {
  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/a374c8e4-ecc9-4992-9d1f-f1fd3b8d4afa',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'analysisService.ts:19',message:'saveAnalysis started',data:{sessionId,hasTranscript:!!analysisData.transcript},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
  // #endregion
  console.log('[DEBUG] saveAnalysis started', { sessionId, hasTranscript: !!analysisData.transcript })

  const supabase = createClientComponentClient()

  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/a374c8e4-ecc9-4992-9d1f-f1fd3b8d4afa',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'analysisService.ts:25',message:'saveAnalysis before Supabase insert',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
  // #endregion

  const { error } = await supabase.from('analyses').insert({
    session_id: sessionId,
    transcript: analysisData.transcript,
    status: 'completed',
    analysis_json: analysisData as any, // Store entire response as JSONB
    created_at: new Date().toISOString(),
    user_rating: null, // Can be set later by user
  })

  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/a374c8e4-ecc9-4992-9d1f-f1fd3b8d4afa',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'analysisService.ts:37',message:'saveAnalysis after Supabase insert',data:{hasError:!!error,errorCode:error?.code,errorMessage:error?.message},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
  // #endregion

  if (error) {
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/a374c8e4-ecc9-4992-9d1f-f1fd3b8d4afa',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'analysisService.ts:42',message:'saveAnalysis error (non-fatal)',data:{errorCode:error.code,errorMessage:error.message},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
    // #endregion

    console.error('[DEBUG] Error saving analysis:', error)
    // Don't throw - we still want to show feedback even if save fails
    // The data is already in the API response
    console.warn('[DEBUG] Analysis saved to API but failed to save to database. Feedback will still be displayed.')
  } else {
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/a374c8e4-ecc9-4992-9d1f-f1fd3b8d4afa',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'analysisService.ts:50',message:'saveAnalysis success',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
    // #endregion
    console.log('[DEBUG] saveAnalysis success', { sessionId })
  }
}

/**
 * Get analysis for a specific session
 * @param sessionId - The session UUID
 * @returns The analysis or null if not found
 */
export async function getAnalysisBySessionId(
  sessionId: string
): Promise<Analysis | null> {
  const supabase = createClientComponentClient()

  const { data, error } = await supabase
    .from('analyses')
    .select('*')
    .eq('session_id', sessionId)
    .single()

  if (error) {
    if (error.code === 'PGRST116') {
      // No rows found
      return null
    }
    console.error('Error fetching analysis:', error)
    throw new Error(`Failed to fetch analysis: ${error.message}`)
  }

  return data
}
