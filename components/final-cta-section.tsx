import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"

export function FinalCTASection() {
  return (
    <section className="py-24 px-6 bg-background">
      <div className="max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-secondary px-4 py-2 mb-8">
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-primary">Start your speaking journey</span>
        </div>

        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
          Spokena is for people who practice.{" "}
          <span className="text-primary">Start practicing.</span>
        </h2>

        <p className="text-lg text-muted-foreground mb-10">
          Give future you just 60 seconds today. No credit card required to start.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/login">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-[var(--radius)] px-8 py-6 text-base"
            >
              Start practicing free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Button
            variant="secondary"
            size="lg"
            className="rounded-[var(--radius)] border border-border"
            asChild
          >
            <a href="#contact">Talk to our team</a>
          </Button>
        </div>
      </div>
    </section>
  )
}
