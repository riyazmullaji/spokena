import { Button } from "@/components/ui/button"
import { RetroGrid } from "@/components/ui/retro-grid"
import { ArrowRight, Play } from "lucide-react"
import Link from "next/link"
import { ShimmerButton } from "@/components/ui/shimmer-button"

export function HeroSection() {
  return (
    <section className="relative bg-background py-20 px-6 overflow-hidden">
      <RetroGrid className="opacity-40" />
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground tracking-tight mb-6 text-balance">
            Speaking skills that{" "}
            <span className="text-primary">grow with practice</span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto">
            Build real speaking confidence with daily 60-second recordings and clear, focused AI feedback. No gimmicks, just consistent practice.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link href="/login">
            <ShimmerButton className="shadow-2xl">
        <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
          Start practicing free
        </span>
      </ShimmerButton>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="rounded-[var(--radius)] border-border bg-background"
              asChild
            >
              <a href="#how-it-works">
                <Play className="mr-2 h-4 w-4" />
                Watch how it works
              </a>
            </Button>
          </div>

          
        </div>

        {/* Product mockup */}
        <div className="mt-16 rounded-[var(--radius)] overflow-hidden border border-border bg-card shadow-lg">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/50">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-amber-400" />
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
            </div>
            <div className="flex-1 flex justify-center">
              <span className="text-xs text-muted-foreground font-mono">app.spokena.com/practice</span>
            </div>
          </div>
          <div className="p-6 min-h-[280px] bg-background flex items-center justify-center">
            <div className="text-center text-muted-foreground text-sm">
              Practice interface mockup
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
