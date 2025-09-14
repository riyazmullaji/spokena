import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mic, Brain, BarChart3, Clock, Target, Zap } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      icon: Mic,
      title: "AI Speech Analysis",
      description:
        "Advanced AI analyzes your delivery, identifying filler words, pace issues, and clarity problems in real-time.",
      badge: "Core Feature",
    },
    {
      icon: Brain,
      title: "Focused Feedback",
      description:
        "No-fluff insights on structure, clarity, and persuasiveness. Get actionable advice that actually improves your speaking.",
      badge: "Smart",
    },
    {
      icon: BarChart3,
      title: "Progress Tracking",
      description:
        "Watch your articulation improve over time with detailed analytics and personalized improvement recommendations.",
      badge: "Analytics",
    },
    {
      icon: Clock,
      title: "Daily Habit Building",
      description:
        "Just 1-2 minutes daily. Built for busy professionals who want consistent improvement without time commitment.",
      badge: "Efficient",
    },
    {
      icon: Target,
      title: "Professional Focus",
      description:
        "Designed specifically for working professionals and public speakers, not generic language learning.",
      badge: "Targeted",
    },
    {
      icon: Zap,
      title: "Instant Results",
      description: "See immediate feedback and start improving from day one. No waiting, no complex setup required.",
      badge: "Fast",
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
