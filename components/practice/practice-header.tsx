import { Badge } from "@/components/ui/badge"
import { Calendar, Target, TrendingUp } from "lucide-react"

export function PracticeHeader() {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold text-foreground">Daily Practice</h1>
          <Badge variant="secondary" className="bg-secondary/20 text-secondary border-secondary/30">
            Day 12
          </Badge>
        </div>
        <p className="text-muted-foreground text-lg">
          Your daily 2-minute session to sharpen your communication skills
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span>12-day streak</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Target className="w-4 h-4" />
          <span>Goal: 2 min</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <TrendingUp className="w-4 h-4" />
          <span>+15% clarity</span>
        </div>
      </div>
    </div>
  )
}
