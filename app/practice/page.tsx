import { Navigation } from "@/components/navigation"
import { PracticeHeader } from "@/components/practice/practice-header"
import { RecordingInterface } from "@/components/practice/recording-interface"
import { FeedbackPanel } from "@/components/practice/feedback-panel"
import { ProgressTracker } from "@/components/practice/progress-tracker"
import { DailyGoals } from "@/components/practice/daily-goals"

export default function PracticePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <PracticeHeader />

        <div className="grid lg:grid-cols-3 gap-8 mt-8">
          {/* Main Practice Area */}
          <div className="lg:col-span-2 space-y-6">
            <RecordingInterface />
            <FeedbackPanel />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <DailyGoals />
            <ProgressTracker />
          </div>
        </div>
      </div>
    </main>
  )
}
