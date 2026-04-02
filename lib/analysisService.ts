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

export async function saveAnalysis(
  sessionId: string,
  analysisData: ApiAnalysisResponse
): Promise<void> {
  const supabase = createClientComponentClient()

  const { error } = await supabase.from('analyses').insert({
    session_id: sessionId,
    transcript: analysisData.transcript,
    status: 'completed',
    analysis_json: analysisData as unknown as Record<string, unknown>,
    created_at: new Date().toISOString(),
    user_rating: null,
  })

  if (error) {
    console.error('Error saving analysis:', error)
  }
}

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
      return null
    }
    throw new Error(`Failed to fetch analysis: ${error.message}`)
  }

  return data
}
