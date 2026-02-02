"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Lightbulb,
  Clock,
  Gauge,
  MessageSquare,
  Key,
  TrendingUp,
  FileText,
} from "lucide-react"
import { useState, useEffect } from "react"

export interface ApiAnalysisResponse {
  transcript: string
  clarity_score: number
  ai_analysis: {
    positive_summary: string
    improvements: Array<{
      original_sentence: string
      problem_description: string
      fix: {
        suggestion: string
        corrected_sentence: string
      }
    }>
    intelligibility_score: number
    identified_filler_words: string[]
  }
  display_metrics: {
    speaking_pace: number
    duration_seconds: number
    filler_word_count: number
  }
}

interface FeedbackPanelProps {
  feedback?: ApiAnalysisResponse | null
}

export function FeedbackPanel({ feedback }: FeedbackPanelProps) {
  const [currentImprovementIndex, setCurrentImprovementIndex] = useState(0)
  const [showExplanation, setShowExplanation] = useState(true)
  const [transcriptOpen, setTranscriptOpen] = useState(false)
  const [mobileTab, setMobileTab] = useState<"feedback" | "transcript">("feedback")

  const data = feedback || null
  const improvements = data?.ai_analysis?.improvements || []
  const currentImprovement = improvements[currentImprovementIndex]
  const hasMultipleImprovements = improvements.length > 1

  useEffect(() => {
    setCurrentImprovementIndex(0)
  }, [feedback])

  const goToNext = () => {
    if (currentImprovementIndex < improvements.length - 1) {
      setCurrentImprovementIndex(currentImprovementIndex + 1)
    }
  }

  const goToPrevious = () => {
    if (currentImprovementIndex > 0) {
      setCurrentImprovementIndex(currentImprovementIndex - 1)
    }
  }

  const getClarityContext = (score: number) => {
    if (score >= 80) return "Excellent clarity! Your message comes through clearly."
    if (score >= 65) return "You're understandable, but tightening sentences will improve impact."
    if (score >= 50) return "Your message is getting through, but clearer structure will help."
    return "Focus on speaking more clearly and structuring your thoughts."
  }

  const clarityColor = data?.clarity_score != null && data.clarity_score >= 65 ? "text-primary" : "text-amber-600"
  const clarityRingColor = data?.clarity_score != null && data.clarity_score >= 65 ? "stroke-primary" : "stroke-amber-500"

  const formatDuration = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = Math.floor(seconds % 60)
    return `${m}:${s.toString().padStart(2, "0")}`
  }

  const fillerLabel =
    data?.ai_analysis?.identified_filler_words?.length &&
    data.ai_analysis.identified_filler_words.length > 0
      ? data.ai_analysis.identified_filler_words[0]
      : "filler words"

  return (
    <Card className="bg-card border-border overflow-hidden">
      {/* Mobile tabs */}
      <div className="flex lg:hidden border-b border-border">
        <button
          type="button"
          onClick={() => setMobileTab("feedback")}
          className={`flex-1 py-3 text-sm font-medium ${mobileTab === "feedback" ? "text-primary border-b-2 border-primary bg-secondary/30" : "text-muted-foreground"}`}
        >
          Feedback
        </button>
        <button
          type="button"
          onClick={() => setMobileTab("transcript")}
          className={`flex-1 py-3 text-sm font-medium ${mobileTab === "transcript" ? "text-primary border-b-2 border-primary bg-secondary/30" : "text-muted-foreground"}`}
        >
          Transcript
        </button>
      </div>

      <div className="p-6 lg:p-8">
        {(mobileTab === "feedback" || !data?.transcript) && (
          <div className="space-y-6">
            {data ? (
              <>
                {/* Session summary */}
                <div>
                  <p className="text-foreground font-medium leading-relaxed">
                    {getClarityContext(data.clarity_score)}
                  </p>
                  <div className="flex items-center gap-2 mt-2 text-sm text-primary font-medium">
                    <TrendingUp className="w-4 h-4" />
                    <span>+8% from last session</span>
                  </div>
                </div>

                {/* Score ring + metric cards row */}
                <div className="flex flex-col sm:flex-row gap-6 items-start">
                  <div className="flex-shrink-0 flex items-center justify-center">
                    <div className="relative w-28 h-28">
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                        <path
                          className="stroke-muted"
                          strokeWidth="3"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path
                          className={clarityRingColor}
                          strokeWidth="3"
                          strokeDasharray={`${(data.clarity_score ?? 0) * 1} ${100 - (data.clarity_score ?? 0)}`}
                          strokeLinecap="round"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className={`text-2xl font-bold font-heading ${clarityColor}`}>
                          {data.clarity_score ?? 0}%
                        </span>
                      </div>
                    </div>
                    <p className="text-sm font-medium text-foreground mt-2 text-center">Clarity</p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 flex-1 min-w-0">
                    <div className="rounded-xl bg-muted/50 border border-border p-4">
                      <Clock className="w-5 h-5 text-muted-foreground mb-2" />
                      <p className="text-xl font-bold font-heading text-foreground">
                        {data.display_metrics?.duration_seconds != null
                          ? formatDuration(data.display_metrics.duration_seconds)
                          : "0:00"}
                      </p>
                      <p className="text-xs text-muted-foreground">Duration</p>
                    </div>
                    <div className="rounded-xl bg-muted/50 border border-border p-4">
                      <Gauge className="w-5 h-5 text-muted-foreground mb-2" />
                      <p className="text-xl font-bold font-heading text-foreground">
                        {data.display_metrics?.speaking_pace ?? 0} wpm
                      </p>
                      <p className="text-xs text-muted-foreground">Ideal: 120-150 wpm</p>
                    </div>
                    <div className="rounded-xl bg-secondary/50 border border-primary/20 p-4">
                      <MessageSquare className="w-5 h-5 text-primary mb-2" />
                      <p className="text-xl font-bold font-heading text-foreground">
                        {data.display_metrics?.filler_word_count ?? 0}
                      </p>
                      <p className="text-xs text-muted-foreground">{fillerLabel}</p>
                    </div>
                    <div className="rounded-xl bg-amber-50/80 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-800/30 p-4">
                      <Key className="w-5 h-5 text-amber-600 dark:text-amber-400 mb-2" />
                      <p className="text-xl font-bold font-heading text-foreground">
                        {data.ai_analysis?.intelligibility_score ?? 0}%
                      </p>
                      <p className="text-xs text-muted-foreground">Intelligibility</p>
                    </div>
                  </div>
                </div>

                {/* What worked well */}
                {data.ai_analysis?.positive_summary && (
                  <div className="rounded-xl bg-secondary/50 border border-primary/20 p-5">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-foreground font-heading mb-1">What worked well</h3>
                        <p className="text-foreground leading-relaxed font-body">
                          {data.ai_analysis.positive_summary}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Focus areas - Before/After carousel */}
                {currentImprovement && (
                  <div className="space-y-3">
                    <h3 className="font-semibold text-foreground font-heading flex items-center gap-2">
                      <Lightbulb className="w-5 h-5 text-amber-500" />
                      Focus areas
                    </h3>
                    <div className="rounded-xl border border-border bg-card p-5">
                      <h4 className="font-medium text-foreground font-heading flex items-center gap-2 mb-3">
                        <Lightbulb className="w-4 h-4 text-amber-500" />
                        Sentence structure and clarity.
                      </h4>
                      <p className="text-muted-foreground text-sm mb-4 font-body">
                        {currentImprovement.problem_description}
                      </p>

                      {/* Before / After side by side */}
                      <div className="flex flex-col sm:flex-row gap-4 items-stretch mb-4">
                        <div className="flex-1 rounded-lg border border-border bg-muted/30 p-4">
                          <p className="text-xs font-medium text-muted-foreground mb-2">Before</p>
                          <p className="text-sm text-foreground italic font-body">
                            &ldquo;{currentImprovement.original_sentence}&rdquo;
                          </p>
                        </div>
                        <div className="hidden sm:flex items-center justify-center flex-shrink-0 text-muted-foreground">
                          <ChevronRight className="w-5 h-5" />
                        </div>
                        <div className="flex-1 rounded-lg border border-primary/30 bg-secondary/30 p-4">
                          <p className="text-xs font-medium text-primary mb-2">After</p>
                          <p className="text-sm text-foreground italic font-body">
                            &ldquo;{currentImprovement.fix?.corrected_sentence ?? ""}&rdquo;
                          </p>
                        </div>
                      </div>

                      {/* Progressive disclosure: explanation */}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowExplanation(!showExplanation)}
                        className="text-muted-foreground -ml-2"
                      >
                        {showExplanation ? "Hide explanation" : "Show explanation"}
                        {showExplanation ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />}
                      </Button>
                      {showExplanation && currentImprovement.fix?.suggestion && (
                        <p className="text-sm text-muted-foreground mt-2 font-body">
                          {currentImprovement.fix.suggestion}
                        </p>
                      )}
                    </div>

                    {hasMultipleImprovements && (
                      <div className="flex items-center justify-between mt-3">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={goToPrevious}
                          disabled={currentImprovementIndex === 0}
                        >
                          <ChevronLeft className="w-4 h-4 mr-1" />
                          Previous
                        </Button>
                        <span className="text-sm text-muted-foreground">
                          {currentImprovementIndex + 1} of {improvements.length}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={goToNext}
                          disabled={currentImprovementIndex === improvements.length - 1}
                        >
                          Next
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                    )}
                  </div>
                )}

                {/* Collapsible Full transcript - only when viewing feedback tab on desktop, or always in section */}
                {data.transcript && (
                  <div className="border-t border-border pt-4">
                    <Button
                      variant="ghost"
                      className="w-full justify-between py-4 h-auto font-heading"
                      onClick={() => setTranscriptOpen(!transcriptOpen)}
                    >
                      <div className="flex items-center gap-2 text-left">
                        <FileText className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <p className="font-semibold text-foreground">Full transcript</p>
                          <p className="text-sm font-normal text-muted-foreground">View what you said</p>
                        </div>
                      </div>
                      {transcriptOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </Button>
                    {transcriptOpen && (
                      <div className="mt-3 p-4 rounded-xl bg-muted/30 border border-border">
                        <p className="text-sm text-foreground whitespace-pre-wrap leading-relaxed font-body">
                          {data.transcript}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12 text-muted-foreground font-body">
                <p>Complete a recording to see your feedback here.</p>
              </div>
            )}
          </div>
        )}

        {/* Mobile transcript tab content */}
        {mobileTab === "transcript" && data?.transcript && (
          <div className="p-4 rounded-xl bg-muted/30 border border-border">
            <p className="text-sm text-foreground whitespace-pre-wrap leading-relaxed font-body">
              {data.transcript}
            </p>
          </div>
        )}

        {mobileTab === "transcript" && !data?.transcript && (
          <div className="text-center py-12 text-muted-foreground font-body">
            <p>Complete a recording to see your transcript here.</p>
          </div>
        )}
      </div>
    </Card>
  )
}
