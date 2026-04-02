"use client"

import { AnalyzeLoadingAnimation } from "@/components/practice/analyze-loading-animation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { analyzeAudio } from "@/lib/apiService"
import { ANALYZE_LOADING_STEPS } from "@/lib/analyzeLoadingSteps"
import {
  PROMPT_CATEGORIES,
  pickRandomTopic,
  type PromptCategoryId,
} from "@/lib/promptTopics"
import { createSession } from "@/lib/sessionService"
import { Mic, Pause, Play, RefreshCw, RotateCcw, Square } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { ApiAnalysisResponse } from "./feedback-panel"

const MAX_RECORDING_TIME = 60

interface RecordingInterfaceProps {
  user: { id: string } | null
  onAnalysisComplete?: (feedback: ApiAnalysisResponse | null) => void
  onAnalyzingChange?: (analyzing: boolean) => void
}

export function RecordingInterface({
  user,
  onAnalysisComplete,
  onAnalyzingChange,
}: RecordingInterfaceProps) {
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [hasRecording, setHasRecording] = useState(false)
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [loadingStepIndex, setLoadingStepIndex] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [category, setCategory] = useState<PromptCategoryId>("general")
  const [currentTopic, setCurrentTopic] = useState(() =>
    pickRandomTopic("general")
  )

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const loadingRotateRef = useRef<NodeJS.Timeout | null>(null)

  const toggleRecordingRef = useRef<() => void>(() => {})
  const handleAnalyzeRef = useRef<() => void>(() => {})

  useEffect(() => {
    setCurrentTopic(pickRandomTopic(category))
  }, [category])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement
      const isInput =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.tagName === "SELECT" ||
        target.isContentEditable
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

  useEffect(() => {
    if (isRecording) {
      timerIntervalRef.current = setInterval(() => {
        setRecordingTime((prev) => {
          const newTime = prev + 1
          if (newTime >= MAX_RECORDING_TIME) {
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

  useEffect(() => {
    if (!isAnalyzing) {
      setLoadingStepIndex(0)
      if (loadingRotateRef.current) {
        clearInterval(loadingRotateRef.current)
        loadingRotateRef.current = null
      }
      return
    }
    loadingRotateRef.current = setInterval(() => {
      setLoadingStepIndex((i) => (i + 1) % ANALYZE_LOADING_STEPS.length)
    }, 4500)
    return () => {
      if (loadingRotateRef.current) {
        clearInterval(loadingRotateRef.current)
        loadingRotateRef.current = null
      }
    }
  }, [isAnalyzing])

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      streamRef.current = stream

      const supportedTypes = [
        "audio/webm;codecs=opus",
        "audio/webm",
        "audio/ogg;codecs=opus",
        "audio/wav",
        "audio/mp4",
        "",
      ]

      let selectedType = ""
      for (const type of supportedTypes) {
        if (type === "" || MediaRecorder.isTypeSupported(type)) {
          selectedType = type
          break
        }
      }

      const mediaRecorder = selectedType
        ? new MediaRecorder(stream, { mimeType: selectedType })
        : new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data)
        }
      }

      mediaRecorder.onstop = () => {
        const blobType = mediaRecorder.mimeType || "audio/webm"
        const nextBlob = new Blob(audioChunksRef.current, { type: blobType })
        setAudioBlob(nextBlob)
        const url = URL.createObjectURL(nextBlob)
        setAudioUrl(url)
        setHasRecording(true)
        stream.getTracks().forEach((track) => track.stop())
        streamRef.current = null
      }

      mediaRecorder.start()
      setIsRecording(true)
      setRecordingTime(0)
      setHasRecording(false)
      onAnalysisComplete?.(null)
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
    onAnalyzingChange?.(false)
    onAnalysisComplete?.(null)
  }

  const handleAnalyze = async () => {
    if (!audioBlob || !user) {
      setError("Please record audio and ensure you're logged in.")
      return
    }

    setIsAnalyzing(true)
    onAnalyzingChange?.(true)
    setError(null)

    try {
      const { sessionId } = await createSession(user.id, recordingTime)
      const analysisResult = await analyzeAudio(sessionId, audioBlob)
      onAnalysisComplete?.(analysisResult)
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to analyze audio. Please try again."
      console.error("Error analyzing audio:", err)
      setError(message)
      onAnalysisComplete?.(null)
    } finally {
      setIsAnalyzing(false)
      onAnalyzingChange?.(false)
    }
  }

  toggleRecordingRef.current = toggleRecording
  handleAnalyzeRef.current = handleAnalyze

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const getNewTopic = () => {
    setCurrentTopic(pickRandomTopic(category, currentTopic))
  }

  return (
    <Card className="relative overflow-hidden p-6 lg:p-8 bg-card border-border">
      {isAnalyzing && (
        <div
          className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-background/90 backdrop-blur-sm px-6 py-8"
          role="status"
          aria-live="polite"
        >
          <AnalyzeLoadingAnimation />
          <p className="mt-4 text-center text-sm font-medium text-foreground">
            {ANALYZE_LOADING_STEPS[loadingStepIndex]}
          </p>
          <p className="mt-2 max-w-sm text-center text-xs text-muted-foreground">
            Usually under two minutes. Keep this tab open.
          </p>
        </div>
      )}

      <div className="flex flex-col">
        <div className="mb-6 space-y-3 rounded-xl border border-border bg-muted/50 p-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-medium text-muted-foreground">Today&apos;s topic</p>
            <Select
              value={category}
              onValueChange={(v) => setCategory(v as PromptCategoryId)}
            >
              <SelectTrigger
                aria-label="Topic category"
                className="h-10 w-full sm:max-w-[260px]"
              >
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent align="end" position="popper">
                {PROMPT_CATEGORIES.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <p className="text-xs text-muted-foreground">
            {PROMPT_CATEGORIES.find((c) => c.id === category)?.description}
          </p>
          <p className="text-lg font-semibold leading-snug text-foreground">{currentTopic}</p>
          <Button
            variant="ghost"
            size="sm"
            onClick={getNewTopic}
            className="-ml-2 h-auto py-1 text-primary hover:text-primary/90"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            New topic
          </Button>
        </div>

        <div className="my-6 flex justify-center">
          <div className="relative inline-block">
            <div className="absolute -inset-2 rounded-full">
              <div className="h-full w-full rounded-full border-4 border-primary/50" />
            </div>
            <Button
              onClick={toggleRecording}
              size="lg"
              disabled={isAnalyzing}
              className={`relative z-10 h-24 w-24 rounded-full transition-all duration-300 ${
                isRecording
                  ? "animate-pulse bg-destructive hover:bg-destructive/90"
                  : "bg-primary hover:bg-primary/90"
              }`}
            >
              {isRecording ? <Square className="h-8 w-8" /> : <Mic className="h-8 w-8" />}
            </Button>
          </div>
        </div>
        <p className="mb-2 text-center text-sm text-muted-foreground">Tap to start recording.</p>
        <p className="mb-1 text-center text-xs text-muted-foreground">
          <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px]">
            Ctrl
          </kbd>
          +
          <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px]">
            Shift
          </kbd>
          +
          <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px]">
            R
          </kbd>{" "}
          record ·
          <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px]">
            Ctrl
          </kbd>
          +
          <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px]">
            Shift
          </kbd>
          +
          <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px]">
            A
          </kbd>{" "}
          analyze
        </p>
        <p className="mb-6 text-center text-sm text-muted-foreground">
          Speak naturally for up to a minute. We&apos;ll analyze clarity, pace, and fillers.
        </p>

        {isRecording && (
          <div className="mb-6 space-y-3">
            <div className="text-center text-lg font-medium text-foreground">
              Recording... {formatTime(recordingTime)} / {formatTime(MAX_RECORDING_TIME)}
            </div>
            <Progress
              value={(recordingTime / MAX_RECORDING_TIME) * 100}
              className="mx-auto w-full max-w-md"
            />
          </div>
        )}

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
                {isPlaying ? (
                  <>
                    <Pause className="mr-2 h-4 w-4" /> Pause
                  </>
                ) : (
                  <>
                    <Play className="mr-2 h-4 w-4" /> Play back
                  </>
                )}
              </Button>
              <Button variant="outline" size="lg" onClick={handleRecordAgain}>
                <RotateCcw className="mr-2 h-4 w-4" />
                Record again
              </Button>
              <Button
                size="lg"
                onClick={handleAnalyze}
                disabled={isAnalyzing || !user}
                className="bg-primary hover:bg-primary/90"
              >
                {isAnalyzing ? "Analyzing…" : "Analyze"}
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Recording duration: {formatTime(recordingTime)}
            </p>
            {error && (
              <div className="mt-2 w-full max-w-md rounded-md border border-destructive/20 bg-destructive/10 p-3">
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </Card>
  )
}
