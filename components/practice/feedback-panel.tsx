import React from "react"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, Minus, AlertCircle, CheckCircle } from "lucide-react"

export function FeedbackPanel() {
  // Mock feedback data
  const feedback = {
    clarity: { score: 78, change: 5, trend: "up" },
    pace: { score: 65, change: -2, trend: "down" },
    fillerWords: { count: 8, change: -3, trend: "up" },
    structure: { score: 82, change: 0, trend: "stable" },
  }

  const insights = [
    {
      type: "improvement",
      icon: CheckCircle,
      title: "Great structure",
      description: "You organized your thoughts clearly with a strong opening and conclusion.",
    },
    {
      type: "attention",
      icon: AlertCircle,
      title: "Watch your pace",
      description: "You spoke a bit fast in the middle section. Try pausing between key points.",
    },
    {
      type: "improvement",
      icon: CheckCircle,
      title: "Fewer filler words",
      description: "Down to 8 'ums' and 'ahs' - that's 3 fewer than yesterday!",
    },
  ]

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return TrendingUp
      case "down":
        return TrendingDown
      default:
        return Minus
    }
  }

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up":
        return "text-secondary"
      case "down":
        return "text-destructive"
      default:
        return "text-muted-foreground"
    }
  }

  return (
    <Card className="p-6 bg-card border-border">
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-2">Your Feedback</h2>
          <p className="text-muted-foreground text-sm">AI analysis of your 1:47 recording</p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Clarity</span>
              <div className="flex items-center gap-1">
                {React.createElement(getTrendIcon(feedback.clarity.trend), {
                  className: `w-3 h-3 ${getTrendColor(feedback.clarity.trend)}`,
                })}
                <span className={`text-xs ${getTrendColor(feedback.clarity.trend)}`}>
                  {feedback.clarity.change > 0 ? "+" : ""}
                  {feedback.clarity.change}
                </span>
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-foreground">{feedback.clarity.score}%</div>
              <Progress value={feedback.clarity.score} className="h-2" />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Pace</span>
              <div className="flex items-center gap-1">
                {React.createElement(getTrendIcon(feedback.pace.trend), {
                  className: `w-3 h-3 ${getTrendColor(feedback.pace.trend)}`,
                })}
                <span className={`text-xs ${getTrendColor(feedback.pace.trend)}`}>
                  {feedback.pace.change > 0 ? "+" : ""}
                  {feedback.pace.change}
                </span>
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-foreground">{feedback.pace.score}%</div>
              <Progress value={feedback.pace.score} className="h-2" />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Filler Words</span>
              <div className="flex items-center gap-1">
                {React.createElement(getTrendIcon(feedback.fillerWords.trend), {
                  className: `w-3 h-3 ${getTrendColor(feedback.fillerWords.trend)}`,
                })}
                <span className={`text-xs ${getTrendColor(feedback.fillerWords.trend)}`}>
                  {feedback.fillerWords.change > 0 ? "+" : ""}
                  {feedback.fillerWords.change}
                </span>
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-foreground">{feedback.fillerWords.count}</div>
              <div className="text-xs text-muted-foreground">per minute</div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Structure</span>
              <div className="flex items-center gap-1">
                {React.createElement(getTrendIcon(feedback.structure.trend), {
                  className: `w-3 h-3 ${getTrendColor(feedback.structure.trend)}`,
                })}
                <span className={`text-xs ${getTrendColor(feedback.structure.trend)}`}>
                  {feedback.structure.change > 0 ? "+" : ""}
                  {feedback.structure.change}
                </span>
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-foreground">{feedback.structure.score}%</div>
              <Progress value={feedback.structure.score} className="h-2" />
            </div>
          </div>
        </div>

        {/* Insights */}
        <div className="space-y-3">
          <h3 className="font-medium text-foreground">Key Insights</h3>
          <div className="space-y-3">
            {insights.map((insight, index) => (
              <div key={index} className="flex gap-3 p-3 rounded-lg bg-muted/30">
                <insight.icon
                  className={`w-5 h-5 mt-0.5 ${insight.type === "improvement" ? "text-secondary" : "text-primary"}`}
                />
                <div className="space-y-1">
                  <div className="font-medium text-sm text-foreground">{insight.title}</div>
                  <div className="text-sm text-muted-foreground">{insight.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  )
}
