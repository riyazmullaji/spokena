"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Mic, Square, Play, RotateCcw } from "lucide-react"

export function RecordingInterface() {
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [hasRecording, setHasRecording] = useState(false)

  const toggleRecording = () => {
    setIsRecording(!isRecording)
    if (!isRecording) {
      // Start recording logic
      setHasRecording(false)
    } else {
      // Stop recording logic
      setHasRecording(true)
    }
  }

  return (
    <Card className="p-8 bg-card border-border">
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-foreground">Ready to Practice?</h2>
          <p className="text-muted-foreground">
            Speak for 1-2 minutes about any topic. We'll analyze your delivery and give you focused feedback.
          </p>
        </div>

        {/* Recording Button */}
        <div className="flex justify-center">
          <Button
            onClick={toggleRecording}
            size="lg"
            className={`w-24 h-24 rounded-full transition-all duration-300 ${
              isRecording ? "bg-destructive hover:bg-destructive/90 animate-pulse" : "bg-primary hover:bg-primary/90"
            }`}
          >
            {isRecording ? <Square className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
          </Button>
        </div>

        {/* Recording Status */}
        {isRecording && (
          <div className="space-y-3">
            <div className="text-lg font-medium text-foreground">
              Recording... {Math.floor(recordingTime / 60)}:{(recordingTime % 60).toString().padStart(2, "0")}
            </div>
            <Progress value={(recordingTime / 120) * 100} className="w-full max-w-md mx-auto" />
          </div>
        )}

        {/* Playback Controls */}
        {hasRecording && !isRecording && (
          <div className="flex justify-center gap-4">
            <Button variant="outline" size="sm">
              <Play className="w-4 h-4 mr-2" />
              Play Back
            </Button>
            <Button variant="outline" size="sm" onClick={() => setHasRecording(false)}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Record Again
            </Button>
          </div>
        )}

        {/* Suggested Topics */}
        <div className="pt-6 border-t border-border">
          <h3 className="text-sm font-medium text-foreground mb-3">Need inspiration? Try these topics:</h3>
          <div className="flex flex-wrap gap-2 justify-center">
            {[
              "Describe your ideal weekend",
              "Explain a recent project at work",
              "Share your thoughts on remote work",
              "Discuss a book you recently read",
            ].map((topic, index) => (
              <Button key={index} variant="ghost" size="sm" className="text-xs">
                {topic}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </Card>
  )
}
