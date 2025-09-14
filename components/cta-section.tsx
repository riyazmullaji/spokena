import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, ArrowRight } from "lucide-react"

export function CTASection() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5" />

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <Badge variant="secondary" className="mb-6">
          Start Your Journey Today
        </Badge>

        <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 text-balance">
          Ready to Speak with
          <span className="text-primary"> Clarity and Confidence</span>?
        </h2>

        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto text-balance leading-relaxed">
          Join thousands of professionals who practice daily with Spokena. Start your free trial and experience the
          difference focused articulation practice makes.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg">
            <Play className="w-5 h-5 mr-2" />
            Start Free Trial
          </Button>
          <Button variant="outline" size="lg" className="px-8 py-3 text-lg group bg-transparent">
            Learn More
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        <p className="text-sm text-muted-foreground">No credit card required • 7-day free trial • Cancel anytime</p>
      </div>
    </section>
  )
}
