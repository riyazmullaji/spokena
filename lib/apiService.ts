import { ApiAnalysisResponse } from '@/components/practice/feedback-panel'
import { convertWebmToMp3, needsConversion } from './audioConverter'

const API_ENDPOINT = 'https://riyyaz-spokena.hf.space/api/analyze'
const API_TIMEOUT = 120000 // 2 minutes timeout

/**
 * Call the external FastAPI endpoint to analyze audio
 * @param sessionId - The session UUID from Supabase
 * @param audioBlob - The recorded audio as a Blob (will be converted to MP3 if needed)
 * @returns The analysis response from the API
 */
export async function analyzeAudio(
  sessionId: string,
  audioBlob: Blob
): Promise<ApiAnalysisResponse> {
  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/a374c8e4-ecc9-4992-9d1f-f1fd3b8d4afa',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'apiService.ts:12',message:'analyzeAudio started',data:{sessionId,audioBlobSize:audioBlob.size,audioBlobType:audioBlob.type,apiEndpoint:API_ENDPOINT,apiTimeout:API_TIMEOUT},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
  // #endregion
  console.log('[DEBUG] analyzeAudio started', { sessionId, audioBlobSize: audioBlob.size, blobType: audioBlob.type, endpoint: API_ENDPOINT })

  // Convert to MP3 if needed (API only supports MP3)
  let audioBlobToSend = audioBlob
  if (needsConversion(audioBlob)) {
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/a374c8e4-ecc9-4992-9d1f-f1fd3b8d4afa',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'apiService.ts:23',message:'Audio conversion needed, converting to MP3',data:{originalType:audioBlob.type},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
    // #endregion
    console.log('[DEBUG] Converting audio to MP3 format (API requirement)', { originalType: audioBlob.type })
    
    try {
      audioBlobToSend = await convertWebmToMp3(audioBlob)
      console.log('[DEBUG] Audio conversion completed', { 
        originalSize: audioBlob.size, 
        mp3Size: audioBlobToSend.size 
      })
    } catch (conversionError: any) {
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/a374c8e4-ecc9-4992-9d1f-f1fd3b8d4afa',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'apiService.ts:31',message:'Audio conversion failed',data:{error:conversionError?.message},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
      // #endregion
      console.error('[DEBUG] Audio conversion failed:', conversionError)
      throw new Error(`Failed to convert audio to MP3 format required by API: ${conversionError?.message || 'Unknown error'}`)
    }
  } else {
    console.log('[DEBUG] Audio is already in MP3 format, no conversion needed')
  }

  // Create FormData
  const formData = new FormData()
  formData.append('session_id', sessionId)
  formData.append('audio_file', audioBlobToSend, 'recording.mp3')
  
  console.log('[DEBUG] Appending audio file to FormData', { 
    blobType: audioBlobToSend.type, 
    filename: 'recording.mp3',
    blobSize: audioBlobToSend.size 
  })

  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/a374c8e4-ecc9-4992-9d1f-f1fd3b8d4afa',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'apiService.ts:21',message:'FormData created, setting up timeout',data:{timeoutMs:API_TIMEOUT},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
  // #endregion
  console.log('[DEBUG] FormData created, setting up timeout', { timeoutMs: API_TIMEOUT })

  // Create AbortController for timeout
  const controller = new AbortController()
  let timeoutTriggered = false
  const timeoutId = setTimeout(() => {
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/a374c8e4-ecc9-4992-9d1f-f1fd3b8d4afa',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'apiService.ts:27',message:'Timeout triggered, aborting request',data:{elapsedMs:API_TIMEOUT},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
    // #endregion
    console.error('[DEBUG] TIMEOUT TRIGGERED after', API_TIMEOUT, 'ms')
    timeoutTriggered = true
    controller.abort()
  }, API_TIMEOUT)

  try {
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/a374c8e4-ecc9-4992-9d1f-f1fd3b8d4afa',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'apiService.ts:35',message:'Starting fetch request',data:{endpoint:API_ENDPOINT,hasSignal:!!controller.signal},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
    // #endregion
    console.log('[DEBUG] Starting fetch request to', API_ENDPOINT, { hasSignal: !!controller.signal })

    const fetchStartTime = Date.now()
    console.log('[DEBUG] About to call fetch at', new Date().toISOString())
    
    let response: Response
    try {
      response = await fetch(API_ENDPOINT, {
        method: 'POST',
        body: formData,
        signal: controller.signal,
      })
    } catch (fetchError: any) {
      console.error('[DEBUG] Fetch promise rejected:', fetchError)
      throw fetchError
    }

    const fetchDuration = Date.now() - fetchStartTime
    console.log('[DEBUG] Fetch completed in', fetchDuration, 'ms', { status: response.status, ok: response.ok, timeoutTriggered })

    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/a374c8e4-ecc9-4992-9d1f-f1fd3b8d4afa',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'apiService.ts:45',message:'Fetch request completed',data:{status:response.status,statusText:response.statusText,ok:response.ok,elapsedMs:fetchDuration},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
    // #endregion

    clearTimeout(timeoutId)
    console.log('[DEBUG] Timeout cleared after fetch completion')

    if (!response.ok) {
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/a374c8e4-ecc9-4992-9d1f-f1fd3b8d4afa',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'apiService.ts:51',message:'Response not OK',data:{status:response.status,statusText:response.statusText},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
      // #endregion

      const errorText = await response.text().catch(() => 'Unknown error')
      let errorMessage = `API request failed: ${response.status} ${response.statusText}.`
      
      // Check if it's a format error (shouldn't happen now that we convert to MP3)
      if (errorText.includes('Format not recognised') || errorText.includes('Format not recognized')) {
        errorMessage += ` The API rejected the audio format. Audio was converted to MP3 before sending. Please check the API documentation. Error: ${errorText}`
      } else {
        errorMessage += ` ${errorText}`
      }
      
      console.error('[DEBUG] API error details:', { status: response.status, errorText, blobType: audioBlobToSend.type, filename: 'recording.mp3' })
      throw new Error(errorMessage)
    }

    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/a374c8e4-ecc9-4992-9d1f-f1fd3b8d4afa',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'apiService.ts:60',message:'Starting JSON parse',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
    // #endregion

    const data: ApiAnalysisResponse = await response.json()

    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/a374c8e4-ecc9-4992-9d1f-f1fd3b8d4afa',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'apiService.ts:65',message:'JSON parse completed, validating',data:{hasTranscript:!!data.transcript,hasAiAnalysis:!!data.ai_analysis,hasDisplayMetrics:!!data.display_metrics},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
    // #endregion

    // Validate response structure
    if (!data.transcript || !data.ai_analysis || !data.display_metrics) {
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/a374c8e4-ecc9-4992-9d1f-f1fd3b8d4afa',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'apiService.ts:71',message:'Invalid response structure',data:{hasTranscript:!!data.transcript,hasAiAnalysis:!!data.ai_analysis,hasDisplayMetrics:!!data.display_metrics},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
      // #endregion

      throw new Error('Invalid API response structure')
    }

    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/a374c8e4-ecc9-4992-9d1f-f1fd3b8d4afa',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'apiService.ts:77',message:'analyzeAudio success',data:{clarityScore:data.clarity_score},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
    // #endregion

    return data
  } catch (error: any) {
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/a374c8e4-ecc9-4992-9d1f-f1fd3b8d4afa',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'apiService.ts:82',message:'analyzeAudio error caught',data:{errorName:error?.name,errorMessage:error?.message,isAbortError:error?.name==='AbortError',isTypeError:error instanceof TypeError},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
    // #endregion
    console.error('[DEBUG] analyzeAudio ERROR caught:', {
      name: error?.name,
      message: error?.message,
      isAbortError: error?.name === 'AbortError',
      isTypeError: error instanceof TypeError,
      timeoutTriggered,
      errorStack: error?.stack?.substring(0, 500)
    })

    clearTimeout(timeoutId)

    if (error?.name === 'AbortError') {
      console.error('[DEBUG] Request was aborted - timeout or manual abort')
      throw new Error('Request timeout: The analysis took too long. Please try again.')
    }

    if (error instanceof TypeError) {
      console.error('[DEBUG] TypeError caught - possible network/CORS issue')
      if (error.message.includes('fetch') || error.message.includes('network') || error.message.includes('CORS')) {
        throw new Error('Network error: Could not connect to the analysis service. Please check your internet connection and CORS settings.')
      }
    }

    throw error
  }
}
