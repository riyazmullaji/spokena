import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Trophy } from "lucide-react"

export function ProgressTracker() {
  const weeklyData = [
    { day: "Mon", completed: true, score: 78 },
    { day: "Tue", completed: true, score: 82 },
    { day: "Wed", completed: true, score: 75 },
    { day: "Thu", completed: true, score: 88 },
    { day: "Fri", completed: true, score: 85 },
    { day: "Sat", completed: false, score: 0 },
    { day: "Sun", completed: false, score: 0 },
  ]

  return (
    <Card className="p-6 bg-card border-border">
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-secondary" />
          <h3 className="font-semibold text-foreground">Progress Tracker</h3>
        </div>

        {/* Weekly Overview */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">This Week</span>
            <span className="text-sm font-medium text-foreground">5/7 days</span>
          </div>
          <div className="flex gap-2">
            {weeklyData.map((day, index) => (
              <div key={index} className="flex-1 text-center">
                <div
                  className={`w-8 h-8 rounded-full mx-auto mb-1 flex items-center justify-center text-xs font-medium ${
                    day.completed ? "bg-secondary text-secondary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {day.day[0]}
                </div>
                <div className="text-xs text-muted-foreground">{day.day}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Current Streak</span>
              <span className="text-sm font-medium text-foreground">12 days</span>
            </div>
            <Progress value={80} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Monthly Goal</span>
              <span className="text-sm font-medium text-foreground">16/30 days</span>
            </div>
            <Progress value={53} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Average Score</span>
              <span className="text-sm font-medium text-foreground">81%</span>
            </div>
            <Progress value={81} className="h-2" />
          </div>
        </div>

        {/* Achievements */}
        <div className="pt-4 border-t border-border">
          <h4 className="text-sm font-medium text-foreground mb-3">Recent Achievements</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 rounded-full bg-secondary"></div>
              <span className="text-muted-foreground">7-day streak completed</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <span className="text-muted-foreground">Clarity improved by 15%</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
