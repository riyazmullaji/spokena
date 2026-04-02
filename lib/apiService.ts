import { ApiAnalysisResponse } from '@/components/practice/feedback-panel'
import { convertWebmToMp3, needsConversion } from './audioConverter'
import { refreshUserStreak } from './streakService'
import { createClientComponentClient } from './supabaseClient'

const API_ENDPOINT =
  process.env.NEXT_PUBLIC_ANALYZE_API_URL ??
  'https://riyyaz-spokena.hf.space/api/analyze'
const API_TIMEOUT = 120000

export async function analyzeAudio(
  sessionId: string,
  audioBlob: Blob
): Promise<ApiAnalysisResponse> {
  const supabase = createClientComponentClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()
  const accessToken = session?.access_token
  if (!accessToken) {
    throw new Error('Authentication required. Please sign in again.')
  }

  let audioBlobToSend = audioBlob
  if (needsConversion(audioBlob)) {
    try {
      audioBlobToSend = await convertWebmToMp3(audioBlob)
    } catch (conversionError: unknown) {
      const msg = conversionError instanceof Error ? conversionError.message : 'Unknown error'
      throw new Error(`Failed to convert audio to MP3 format required by API: ${msg}`)
    }
  }

  const formData = new FormData()
  formData.append('session_id', sessionId)
  formData.append('audio_file', audioBlobToSend, 'recording.mp3')

  const controller = new AbortController()
  let timeoutTriggered = false
  const timeoutId = setTimeout(() => {
    timeoutTriggered = true
    controller.abort()
  }, API_TIMEOUT)

  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      body: formData,
      signal: controller.signal,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unknown error')
      let errorMessage = `API request failed: ${response.status} ${response.statusText}.`
      if (errorText.includes('Format not recognised') || errorText.includes('Format not recognized')) {
        errorMessage += ` The API rejected the audio format. Error: ${errorText}`
      } else {
        errorMessage += ` ${errorText}`
      }
      throw new Error(errorMessage)
    }

    const data: ApiAnalysisResponse = await response.json()

    if (!data.transcript || !data.ai_analysis || !data.display_metrics) {
      throw new Error('Invalid API response structure')
    }

    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (user?.id) {
      await refreshUserStreak(supabase, user.id).catch(() => {
        /* streak is best-effort; analysis result still stands */
      })
    }

    return data
  } catch (error: unknown) {
    clearTimeout(timeoutId)

    if (error && typeof error === 'object' && 'name' in error && (error as { name: string }).name === 'AbortError') {
      throw new Error('Request timeout: The analysis took too long. Please try again.')
    }

    if (error instanceof TypeError) {
      if (
        error.message.includes('fetch') ||
        error.message.includes('network') ||
        error.message.includes('CORS')
      ) {
        throw new Error(
          'Network error: Could not connect to the analysis service. Please check your internet connection and CORS settings.'
        )
      }
    }

    throw error
  }
}
