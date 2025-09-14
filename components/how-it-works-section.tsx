import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Play, Mic, Brain, TrendingUp } from "lucide-react"

export function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      icon: Mic,
      title: "Speak for 1-2 Minutes",
      description:
        "Choose a topic or use our prompts. Record yourself speaking naturally about anything - work presentations, ideas, or daily thoughts.",
    },
    {
      number: "02",
      icon: Brain,
      title: "AI Analyzes Your Delivery",
      description:
        "Our AI examines your clarity, filler words, pace, structure, and overall persuasiveness. No generic feedback - specific insights for your speaking style.",
    },
    {
      number: "03",
      icon: TrendingUp,
      title: "Get Focused Feedback",
      description:
        "Receive actionable insights on what to improve. Track your progress over time and build the daily habit of clear, confident communication.",
    },
  ]

  return (
    <section id="how-it-works" className="py-24 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Simple Process
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Your Daily Rep for Better Communication
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            Spokena makes articulation practice effortless. No complex exercises or lengthy courses - just speak, get
            feedback, and improve consistently.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {steps.map((step, index) => (
            <Card
              key={index}
              className="border-border/50 relative overflow-hidden group hover:border-primary/20 transition-colors"
            >
              <CardContent className="p-8">
                <div className="absolute top-4 right-4 text-6xl font-bold text-primary/10 group-hover:text-primary/20 transition-colors">
                  {step.number}
                </div>
                <div className="p-3 bg-primary/10 rounded-lg w-fit mb-6 group-hover:bg-primary/20 transition-colors">
                  <step.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3">
            <Play className="w-5 h-5 mr-2" />
            Try It Free Today
          </Button>
        </div>
      </div>
    </section>
  )
}
