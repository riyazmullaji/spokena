import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mic, Brain, BarChart3, Clock, Target, Zap } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      icon: Mic,
      title: "Practice-First System",
      description:
        "Not a chat assistant. Spokena is built for daily practice—your communication gym. Just 1-2 minutes of speaking, every day.",
      badge: "Core",
    },
    {
      icon: Brain,
      title: "Focused, Actionable Feedback",
      description:
        "No-fluff insights. We tell you exactly what to improve and how. Real human communication, not robotic perfection.",
      badge: "Smart",
    },
    {
      icon: BarChart3,
      title: "Progress Through Repetition",
      description:
        "Build confidence through daily reps. Track your improvement over time and sharpen your thinking under pressure.",
      badge: "Habit",
    },
    {
      icon: Clock,
      title: "Designed for Busy Professionals",
      description:
        "Working professionals and public speakers who already speak well but want to sound clearer and more confident.",
      badge: "Targeted",
    },
    {
      icon: Target,
      title: "Moments That Matter",
      description:
        "Built for meetings, talks, interviews—real-world situations where clear communication makes the difference.",
      badge: "Impact",
    },
    {
      icon: Zap,
      title: "Self-Awareness & Control",
      description:
        "Understand your speaking patterns. Build awareness of filler words, pace, and structure. Take control of how you communicate.",
      badge: "Growth",
    },
  ]

  return (
    <section id="features" className="py-24 bg-card">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Why Spokena Works
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-card-foreground mb-4">
            Practice-First Communication Training
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            Unlike generic AI assistants, Spokena is built specifically for articulation practice. Every feature is
            designed to help you speak with more clarity and confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border-border/50 hover:border-primary/20 transition-colors group">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {feature.badge}
                  </Badge>
                </div>
                <h3 className="text-lg font-semibold text-card-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
