"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { saveAnalysis } from "@/lib/analysisService"
import { analyzeAudio } from "@/lib/apiService"
import { createSession } from "@/lib/sessionService"
import { Mic, Pause, Play, RefreshCw, RotateCcw, Square } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { ApiAnalysisResponse } from "./feedback-panel"

const INSPIRATION_TOPICS = [
  "Describe your ideal weekend",
  "Explain a recent project at work",
  "Share your thoughts on remote work",
  "Discuss a book you recently read",
  "Talk about a skill you want to learn",
  "Describe your favorite hobby",
  "Explain a challenge you overcame",
  "Share a memorable travel experience",
  "Discuss a goal you're working toward",
  "Talk about someone who inspires you",
]

const MAX_RECORDING_TIME = 60 // 1 minute in seconds

interface RecordingInterfaceProps {
  user: { id: string } | null
  onAnalysisComplete?: (feedback: ApiAnalysisResponse | null) => void
}

export function RecordingInterface({ user, onAnalysisComplete }: RecordingInterfaceProps) {
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [hasRecording, setHasRecording] = useState(false)
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showInspiration, setShowInspiration] = useState(false)
  const [currentTopic, setCurrentTopic] = useState<string>(() =>
    INSPIRATION_TOPICS[Math.floor(Math.random() * INSPIRATION_TOPICS.length)]
  )
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const streamRef = useRef<MediaStream | null>(null)

  // Refs for hotkey handlers so the keydown listener always calls latest logic
  const toggleRecordingRef = useRef<() => void>(() => {})
  const handleAnalyzeRef = useRef<() => void>(() => {})

  // Hotkeys: Ctrl+Shift+R toggle recording, Ctrl+Shift+A analyze
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement
      const isInput = target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.tagName === "SELECT" || target.isContentEditable
      if (isInput) return

      const mod = event.ctrlKey || event.metaKey
      const shift = event.shiftKey

      if (mod && shift && event.key.toLowerCase() === "r") {
        event.preventDefault()
        toggleRecordingRef.current()
        return
      }
      if (mod && shift && event.key.toLowerCase() === "a") {
        event.preventDefault()
        handleAnalyzeRef.current()
        return
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  // Timer effect
  useEffect(() => {
    if (isRecording) {
      timerIntervalRef.current = setInterval(() => {
        setRecordingTime((prev) => {
          const newTime = prev + 1
          // Auto-stop at 60 seconds
          if (newTime >= MAX_RECORDING_TIME) {
            // Stop recording when max time reached
            if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
              mediaRecorderRef.current.stop()
              setIsRecording(false)
            }
            return MAX_RECORDING_TIME
          }
          return newTime
        })
      }, 1000)
    } else {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current)
        timerIntervalRef.current = null
      }
    }

    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current)
      }
    }
  }, [isRecording])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
      }
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl)
      }
    }
  }, [audioUrl])

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      streamRef.current = stream
      
      // Try to use a supported MIME type - prefer formats commonly supported by audio APIs
      // Check what formats are supported
      const supportedTypes = [
        'audio/webm;codecs=opus',
        'audio/webm',
        'audio/ogg;codecs=opus',
        'audio/wav',
        'audio/mp4',
        '' // Default - browser will choose
      ]
      
      let selectedType = ''
      for (const type of supportedTypes) {
        if (type === '' || MediaRecorder.isTypeSupported(type)) {
          selectedType = type
          break
        }
      }
      
      console.log('[DEBUG] MediaRecorder type selected:', selectedType)
      const mediaRecorder = selectedType ? new MediaRecorder(stream, { mimeType: selectedType }) : new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data)
        }
      }

      mediaRecorder.onstop = () => {
        // Use the actual MIME type from MediaRecorder, or default to webm
        const blobType = mediaRecorder.mimeType || "audio/webm"
        console.log('[DEBUG] MediaRecorder stopped, creating blob with type:', blobType)
        const audioBlob = new Blob(audioChunksRef.current, { type: blobType })
        setAudioBlob(audioBlob)
        const url = URL.createObjectURL(audioBlob)
        setAudioUrl(url)
        setHasRecording(true)
        stream.getTracks().forEach((track) => track.stop())
        streamRef.current = null
      }

      mediaRecorder.start()
      setIsRecording(true)
      setRecordingTime(0)
      setHasRecording(false)
      if (onAnalysisComplete) {
        onAnalysisComplete(null) // Clear previous feedback
      }
    } catch (err) {
      console.error("Error starting recording:", err)
      alert("Could not access microphone. Please check permissions.")
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }

  const toggleRecording = () => {
    if (!isRecording) {
      startRecording()
    } else {
      stopRecording()
    }
  }

  const handlePlayback = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        audioRef.current.play()
        setIsPlaying(true)
      }
    }
  }

  const handleRecordAgain = () => {
    setHasRecording(false)
    setAudioBlob(null)
    setRecordingTime(0)
    setError(null)
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl)
      setAudioUrl(null)
    }
    setIsPlaying(false)
    setIsAnalyzing(false)
    if (onAnalysisComplete) {
      onAnalysisComplete(null)
    }
  }

  const handleAnalyze = async () => {
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/a374c8e4-ecc9-4992-9d1f-f1fd3b8d4afa',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'recording-interface.tsx:175',message:'handleAnalyze called',data:{hasAudioBlob:!!audioBlob,audioBlobSize:audioBlob?.size,hasUser:!!user,userId:user?.id,recordingTime},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
    // #endregion
    console.log('[DEBUG] handleAnalyze called', { hasAudioBlob: !!audioBlob, audioBlobSize: audioBlob?.size, hasUser: !!user, userId: user?.id, recordingTime })

    if (!audioBlob || !user) {
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/a374c8e4-ecc9-4992-9d1f-f1fd3b8d4afa',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'recording-interface.tsx:179',message:'handleAnalyze validation failed',data:{audioBlob:!!audioBlob,user:!!user},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
      // #endregion
      console.error('[DEBUG] handleAnalyze validation failed', { audioBlob: !!audioBlob, user: !!user })
      setError("Please record audio and ensure you're logged in.")
      return
    }

    setIsAnalyzing(true)
    setError(null)
    console.log('[DEBUG] Starting analysis pipeline')

    try {
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/a374c8e4-ecc9-4992-9d1f-f1fd3b8d4afa',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'recording-interface.tsx:187',message:'Starting Step 1: createSession',data:{userId:user.id,durationSeconds:recordingTime},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
      // #endregion
      console.log('[DEBUG] Step 1: Creating session', { userId: user.id, durationSeconds: recordingTime })

      // Step 1: Create session in Supabase
      const { sessionId } = await createSession(user.id, recordingTime)

      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/a374c8e4-ecc9-4992-9d1f-f1fd3b8d4afa',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'recording-interface.tsx:192',message:'Step 1 completed: session created',data:{sessionId},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
      // #endregion
      console.log('[DEBUG] Step 1 completed: session created', { sessionId })

      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/a374c8e4-ecc9-4992-9d1f-f1fd3b8d4afa',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'recording-interface.tsx:195',message:'Starting Step 2: analyzeAudio',data:{sessionId,audioBlobSize:audioBlob.size,audioBlobType:audioBlob.type},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
      // #endregion
      console.log('[DEBUG] Step 2: Calling analyzeAudio', { sessionId, audioBlobSize: audioBlob.size, audioBlobType: audioBlob.type })

      // Step 2: Call external API with session_id and audio file
      const analysisResult = await analyzeAudio(sessionId, audioBlob)

      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/a374c8e4-ecc9-4992-9d1f-f1fd3b8d4afa',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'recording-interface.tsx:201',message:'Step 2 completed: API call succeeded',data:{hasTranscript:!!analysisResult.transcript,clarityScore:analysisResult.clarity_score},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
      // #endregion
      console.log('[DEBUG] Step 2 completed: API call succeeded', { hasTranscript: !!analysisResult.transcript, clarityScore: analysisResult.clarity_score })

      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/a374c8e4-ecc9-4992-9d1f-f1fd3b8d4afa',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'recording-interface.tsx:204',message:'Starting Step 3: saveAnalysis',data:{sessionId},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
      // #endregion
      console.log('[DEBUG] Step 3: Saving analysis', { sessionId })

      // Step 3: Save analysis to database
      await saveAnalysis(sessionId, analysisResult)

      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/a374c8e4-ecc9-4992-9d1f-f1fd3b8d4afa',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'recording-interface.tsx:209',message:'Step 3 completed: analysis saved',data:{sessionId},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
      // #endregion
      console.log('[DEBUG] Step 3 completed: analysis saved', { sessionId })

      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/a374c8e4-ecc9-4992-9d1f-f1fd3b8d4afa',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'recording-interface.tsx:212',message:'Starting Step 4: display feedback',data:{hasCallback:!!onAnalysisComplete},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'E'})}).catch(()=>{});
      // #endregion
      console.log('[DEBUG] Step 4: Displaying feedback', { hasCallback: !!onAnalysisComplete })

      // Step 4: Display feedback
      if (onAnalysisComplete) {
        onAnalysisComplete(analysisResult)
      }
      console.log('[DEBUG] Analysis complete!')

      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/a374c8e4-ecc9-4992-9d1f-f1fd3b8d4afa',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'recording-interface.tsx:218',message:'handleAnalyze completed successfully',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'E'})}).catch(()=>{});
      // #endregion
    } catch (err: any) {
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/a374c8e4-ecc9-4992-9d1f-f1fd3b8d4afa',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'recording-interface.tsx:221',message:'handleAnalyze error caught',data:{errorName:err?.name,errorMessage:err?.message,errorStack:err?.stack?.substring(0,200)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'F'})}).catch(()=>{});
      // #endregion

      console.error('[DEBUG] Error analyzing audio:', err)
      console.error('[DEBUG] Error details:', { name: err?.name, message: err?.message, stack: err?.stack })
      setError(err.message || "Failed to analyze audio. Please try again.")
      
      // Clear feedback on error
      if (onAnalysisComplete) {
        onAnalysisComplete(null)
      }
    } finally {
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/a374c8e4-ecc9-4992-9d1f-f1fd3b8d4afa',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'recording-interface.tsx:232',message:'handleAnalyze finally block',data:{isAnalyzingBefore:true},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'F'})}).catch(()=>{});
      // #endregion

      console.log('[DEBUG] handleAnalyze finally block - setting isAnalyzing to false')
      setIsAnalyzing(false)
    }
  }

  toggleRecordingRef.current = toggleRecording
  handleAnalyzeRef.current = handleAnalyze

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const showRandomTopic = () => {
    const randomTopic = INSPIRATION_TOPICS[Math.floor(Math.random() * INSPIRATION_TOPICS.length)]
    setCurrentTopic(randomTopic)
    setShowInspiration(true)
  }

  const getNewTopic = () => {
    const topics = INSPIRATION_TOPICS.filter((t) => t !== currentTopic)
    const randomTopic = topics[Math.floor(Math.random() * topics.length)]
    setCurrentTopic(randomTopic)
  }

  return (
    <Card className="p-6 lg:p-8 bg-card border-border">
      <div className="flex flex-col">
        {/* Today's topic */}
        <div className="rounded-xl bg-muted/50 border border-border p-4 mb-6">
          <p className="text-sm font-medium text-muted-foreground mb-1">Today&apos;s topic</p>
          <p className="text-lg font-semibold text-foreground mb-3">{currentTopic}</p>
          <Button
            variant="ghost"
            size="sm"
            onClick={getNewTopic}
            className="text-primary hover:text-primary/90 -ml-2 h-auto py-1"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            New topic
          </Button>
        </div>

        {/* Recording Button */}
        <div className="flex justify-center my-6">
          <div className="relative inline-block">
            <div className="absolute -inset-2 rounded-full">
              <div className="w-full h-full rounded-full border-4 border-primary/50" />
            </div>
            <Button
              onClick={toggleRecording}
              size="lg"
              disabled={isAnalyzing}
              className={`relative w-24 h-24 rounded-full transition-all duration-300 z-10 ${
                isRecording ? "bg-destructive hover:bg-destructive/90 animate-pulse" : "bg-primary hover:bg-primary/90"
              }`}
            >
              {isRecording ? <Square className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
            </Button>
          </div>
        </div>
        <p className="text-center text-sm text-muted-foreground mb-2">Tap to start recording.</p>
        <p className="text-center text-xs text-muted-foreground mb-1">
          <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border font-mono text-[10px]">Ctrl</kbd>+<kbd className="px-1.5 py-0.5 rounded bg-muted border border-border font-mono text-[10px]">Shift</kbd>+<kbd className="px-1.5 py-0.5 rounded bg-muted border border-border font-mono text-[10px]">R</kbd> record · <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border font-mono text-[10px]">Ctrl</kbd>+<kbd className="px-1.5 py-0.5 rounded bg-muted border border-border font-mono text-[10px]">Shift</kbd>+<kbd className="px-1.5 py-0.5 rounded bg-muted border border-border font-mono text-[10px]">A</kbd> analyze
        </p>
        <p className="text-center text-sm text-muted-foreground mb-6">
          Just speak as you like. We&apos;ll give you focused feedback that helps you improve.
        </p>

        {/* Recording Status */}
        {isRecording && (
          <div className="space-y-3 mb-6">
            <div className="text-center text-lg font-medium text-foreground">
              Recording... {formatTime(recordingTime)} / {formatTime(MAX_RECORDING_TIME)}
            </div>
            <Progress value={(recordingTime / MAX_RECORDING_TIME) * 100} className="w-full max-w-md mx-auto" />
          </div>
        )}

        {/* Action Buttons After Recording */}
        {hasRecording && !isRecording && (
          <div className="flex flex-col items-center gap-4">
            {audioUrl && (
              <audio
                ref={audioRef}
                src={audioUrl}
                onEnded={() => setIsPlaying(false)}
                className="hidden"
              />
            )}
            <div className="flex flex-wrap justify-center gap-3">
              <Button variant="outline" size="lg" onClick={handlePlayback}>
                {isPlaying ? <><Pause className="w-4 h-4 mr-2" /> Pause</> : <><Play className="w-4 h-4 mr-2" /> Play Back</>}
              </Button>
              <Button variant="outline" size="lg" onClick={handleRecordAgain}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Record Again
              </Button>
              <Button
                size="lg"
                onClick={handleAnalyze}
                disabled={isAnalyzing || !user}
                className="bg-primary hover:bg-primary/90"
              >
                {isAnalyzing ? "Analyzing..." : "Analyze"}
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">Recording duration: {formatTime(recordingTime)}</p>
            {error && (
              <div className="mt-2 p-3 rounded-md bg-destructive/10 border border-destructive/20 w-full max-w-md">
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}
          </div>
        )}

      </div>
    </Card>
  )
}
