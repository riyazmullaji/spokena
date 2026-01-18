"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight, CheckCircle2, MessageCircle } from "lucide-react"
import { useState, useEffect } from "react"

// API Response Type
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
  const [showFullSummary, setShowFullSummary] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [currentImprovementIndex, setCurrentImprovementIndex] = useState(0)

  const mockFeedback: ApiAnalysisResponse | null = feedback || null

  const improvements = mockFeedback?.ai_analysis?.improvements || []
  const currentImprovement = improvements[currentImprovementIndex]
  const hasMultipleImprovements = improvements.length > 1

  // Reset to first improvement when feedback changes
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

  // Helper to truncate text to 2 lines (approximately 120 characters)
  const truncateText = (text: string, maxLength: number = 120) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength).trim() + "..."
  }

  // Get clarity context message
  const getClarityContext = (score: number) => {
    if (score >= 80) {
      return "Excellent clarity! Your message comes through clearly."
    } else if (score >= 65) {
      return "You're understandable, but tightening sentences will improve impact."
    } else if (score >= 50) {
      return "Your message is getting through, but clearer structure will help."
    } else {
      return "Focus on speaking more clearly and structuring your thoughts."
    }
  }

  return (
    <Card className="p-10 bg-card border-border min-h-[400px]">
      <div className="space-y-8">
        <h2 className="text-2xl font-semibold text-foreground">Your Feedback</h2>

        {mockFeedback ? (
          <>
            {/* Layer 1: ONE Clear Takeaway */}
            {mockFeedback.ai_analysis?.positive_summary && (
              <div className="p-5 rounded-lg bg-green-50/50 border border-green-200/50">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="text-sm font-medium text-green-900 mb-1">What worked well today</div>
                    <p className="text-base text-foreground leading-relaxed">
                      {showFullSummary 
                        ? mockFeedback.ai_analysis.positive_summary 
                        : truncateText(mockFeedback.ai_analysis.positive_summary)
                      }
                    </p>
                    {mockFeedback.ai_analysis.positive_summary.length > 120 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowFullSummary(!showFullSummary)}
                        className="text-xs text-green-700 hover:text-green-900 p-0 h-auto"
                      >
                        {showFullSummary ? "Show less" : "Read more"}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Layer 2: Things to Improve (With Navigation) */}
            {currentImprovement && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-lg font-semibold text-foreground">Things to improve</div>
                  {hasMultipleImprovements && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{currentImprovementIndex + 1} of {improvements.length}</span>
                    </div>
                  )}
                </div>
                
                <div className="relative">
                  <div className="p-5 rounded-lg bg-blue-50/50 border border-blue-200/50">
                    {/* Original Sentence */}
                    {currentImprovement.original_sentence && (
                      <div className="mb-4">
                        <div className="text-sm font-medium text-muted-foreground mb-2">You said</div>
                        <p className="text-sm text-muted-foreground italic">
                          "{currentImprovement.original_sentence}"
                        </p>
                      </div>
                    )}

                    {/* Problem Description */}
                    <p className="text-base text-foreground mb-4 leading-relaxed">
                      {currentImprovement.problem_description}
                    </p>
                    
                    {/* Corrected Sentence */}
                    {currentImprovement.fix?.corrected_sentence && (
                      <div className="space-y-2">
                        <div className="text-sm font-medium text-foreground">Try this instead:</div>
                        <div className="p-3 rounded-md bg-white border border-blue-200">
                          <p className="text-base text-foreground italic">
                            "{currentImprovement.fix.corrected_sentence}"
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Suggestion */}
                    {currentImprovement.fix?.suggestion && (
                      <p className="text-sm text-muted-foreground mt-3 italic">
                        {currentImprovement.fix.suggestion}
                      </p>
                    )}
                  </div>

                  {/* Navigation Arrows */}
                  {hasMultipleImprovements && (
                    <div className="flex items-center justify-between mt-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={goToPrevious}
                        disabled={currentImprovementIndex === 0}
                        className="flex items-center gap-1"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        Previous
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={goToNext}
                        disabled={currentImprovementIndex === improvements.length - 1}
                        className="flex items-center gap-1"
                      >
                        Next
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Clarity Score - Contextual and Supportive */}
            {mockFeedback.clarity_score !== undefined && (
              <div className="space-y-1">
                <div className="text-sm font-medium text-muted-foreground">Clarity: {mockFeedback.clarity_score}%</div>
                <p className="text-sm text-muted-foreground">
                  {getClarityContext(mockFeedback.clarity_score)}
                </p>
              </div>
            )}

            {/* Layer 3: Details (Collapsed by Default) */}
            <div className="pt-4 border-t border-border">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowDetails(!showDetails)}
                className="w-full justify-between text-sm"
              >
                <span className="text-muted-foreground">View details</span>
                {showDetails ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </Button>

              {showDetails && (
                <div className="mt-4 space-y-6">

                  {/* Transcript */}
                  {mockFeedback.transcript && (
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-foreground">Transcript</div>
                      <div className="p-4 rounded-lg bg-muted/30 border border-border">
                        <p className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">
                          {mockFeedback.transcript}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Metrics */}
                  {mockFeedback.display_metrics && (
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="text-sm font-medium text-foreground mb-2">Metrics</div>
                      <div>Duration: {Math.floor(mockFeedback.display_metrics.duration_seconds / 60)}:{(mockFeedback.display_metrics.duration_seconds % 60).toFixed(0).padStart(2, "0")}</div>
                      <div>Speaking Pace: {mockFeedback.display_metrics.speaking_pace} words/min</div>
                      <div>Filler Words: {mockFeedback.display_metrics.filler_word_count}</div>
                      {mockFeedback.ai_analysis?.intelligibility_score && (
                        <div>Intelligibility Score: {mockFeedback.ai_analysis.intelligibility_score}%</div>
                      )}
                      {mockFeedback.ai_analysis?.identified_filler_words && mockFeedback.ai_analysis.identified_filler_words.length > 0 && (
                        <div>Identified Fillers: {mockFeedback.ai_analysis.identified_filler_words.join(", ")}</div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <p>Complete a recording to see your feedback here.</p>
          </div>
        )}
      </div>
    </Card>
  )
}
