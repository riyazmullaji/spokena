import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Circle, Target } from "lucide-react"

export function DailyGoals() {
  const goals = [
    { id: 1, text: "Complete 2-minute practice", completed: false, primary: true },
    { id: 2, text: "Reduce filler words by 20%", completed: true, primary: false },
    { id: 3, text: "Maintain steady pace", completed: false, primary: false },
    { id: 4, text: "Practice clear articulation", completed: true, primary: false },
  ]

  const completedGoals = goals.filter((goal) => goal.completed).length

  return (
    <Card className="p-6 bg-card border-border">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Target className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">Today's Goals</h3>
        </div>

        <div className="space-y-3">
          {goals.map((goal) => (
            <div key={goal.id} className="flex items-center gap-3">
              {goal.completed ? (
                <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0" />
              ) : (
                <Circle className="w-5 h-5 text-muted-foreground flex-shrink-0" />
              )}
              <span
                className={`text-sm ${
                  goal.completed
                    ? "text-muted-foreground line-through"
                    : goal.primary
                      ? "text-foreground font-medium"
                      : "text-foreground"
                }`}
              >
                {goal.text}
              </span>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-border">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-muted-foreground">Progress</span>
            <span className="text-sm font-medium text-foreground">
              {completedGoals}/{goals.length} completed
            </span>
          </div>

          {completedGoals === goals.length ? (
            <Button className="w-full" size="sm">
              🎉 All goals completed!
            </Button>
          ) : (
            <div className="text-xs text-muted-foreground text-center">
              {goals.length - completedGoals} goals remaining
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}
