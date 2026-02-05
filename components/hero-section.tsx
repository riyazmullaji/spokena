import { Button } from "@/components/ui/button"
import { RetroGrid } from "@/components/ui/retro-grid"
import { ShimmerButton } from "@/components/ui/shimmer-button"
import { CheckCircle2, ChevronRight, Clock, Gauge, Key, Lightbulb, MessageSquare, Mic, Play, RefreshCw, TrendingUp } from "lucide-react"
import Link from "next/link"

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
              <a
                href="https://www.loom.com/share/e4aeb9b576df473d82c96157c368c7f4"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Play className="mr-2 h-4 w-4" />
                Watch how it works
              </a>
            </Button>
          </div>

          
        </div>

        {/* Practice interface mockup - matches Daily Practice two-column layout */}
        <div className="mt-16 rounded-[var(--radius)] overflow-hidden border border-border bg-card shadow-xl">
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-muted/50">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            </div>
            <div className="flex-1 flex justify-center">
              <span className="text-[10px] text-muted-foreground font-mono">app.spokena.com/practice</span>
            </div>
          </div>
          <div className="bg-background p-4 md:p-5 min-h-[320px] md:min-h-[360px]">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5 h-full">
              {/* Left: Recording interface */}
              <div className="md:col-span-5 space-y-3">
                <div>
                  <h3 className="text-sm font-bold text-foreground font-heading">Daily Practice</h3>
                  <p className="text-[10px] text-muted-foreground">Speak for 1-2 minutes about anything.</p>
                </div>
                <div className="rounded-lg bg-muted/50 border border-border p-3">
                  <p className="text-[10px] text-muted-foreground mb-0.5">Today&apos;s topic</p>
                  <p className="text-xs font-semibold text-foreground mb-2">Discuss a goal you&apos;re working toward</p>
                  <button type="button" className="inline-flex items-center gap-1 text-[10px] font-medium text-primary">
                    <RefreshCw className="w-3 h-3" /> New topic
                  </button>
                </div>
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="absolute -inset-1.5 rounded-full border-2 border-primary/40 animate-pulse" />
                    <div className="relative w-14 h-14 rounded-full bg-primary flex items-center justify-center">
                      <Mic className="w-6 h-6 text-primary-foreground" />
                    </div>
                  </div>
                </div>
                <p className="text-center text-[10px] text-muted-foreground">Tap to start recording.</p>
                <p className="text-center text-[9px] text-muted-foreground leading-tight">Speak for 1-2 minutes. We&apos;ll analyze your delivery and give you focused feedback.</p>
                <div className="flex flex-wrap justify-center gap-1.5 pt-1">
                  <span className="inline-flex items-center px-2 py-1 rounded border border-border text-[9px] text-muted-foreground">Play Back</span>
                  <span className="inline-flex items-center px-2 py-1 rounded border border-border text-[9px] text-muted-foreground">Record Again</span>
                  <span className="inline-flex items-center px-2 py-1 rounded bg-primary text-primary-foreground text-[9px] font-medium">Analyze</span>
                </div>
                <p className="text-center text-[9px] text-muted-foreground">Recording duration: 0:54</p>
              </div>
              {/* Right: Feedback panel */}
              <div className="md:col-span-7 space-y-2.5 overflow-hidden">
                <p className="text-[10px] text-foreground leading-tight">You&apos;re understandable, but tightening sentences will improve impact.</p>
                <div className="flex items-center gap-1 text-[9px] text-primary font-medium">
                  <TrendingUp className="w-3 h-3 shrink-0" /> +8% from last session
                </div>
                <div className="flex flex-wrap gap-2 items-start">
                  <div className="flex items-center gap-2">
                    <div className="relative w-12 h-12 shrink-0">
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                        <path className="stroke-muted" strokeWidth="2.5" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                        <path className="stroke-primary" strokeWidth="2.5" strokeDasharray="67 33" strokeLinecap="round" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xs font-bold text-primary">67%</span>
                      </div>
                    </div>
                    <span className="text-[9px] font-medium text-foreground">Clarity</span>
                  </div>
                  <div className="grid grid-cols-4 gap-1.5 flex-1 min-w-0">
                    <div className="rounded-md bg-muted/50 border border-border p-2 text-center">
                      <Clock className="w-3 h-3 text-muted-foreground mx-auto mb-0.5" />
                      <p className="text-[10px] font-bold text-foreground">0:54</p>
                      <p className="text-[8px] text-muted-foreground">Duration</p>
                    </div>
                    <div className="rounded-md bg-muted/50 border border-border p-2 text-center">
                      <Gauge className="w-3 h-3 text-muted-foreground mx-auto mb-0.5" />
                      <p className="text-[10px] font-bold text-foreground">109 wpm</p>
                      <p className="text-[8px] text-muted-foreground">Ideal: 120-150</p>
                    </div>
                    <div className="rounded-md bg-secondary/50 border border-primary/20 p-2 text-center">
                      <MessageSquare className="w-3 h-3 text-primary mx-auto mb-0.5" />
                      <p className="text-[10px] font-bold text-foreground">1 so</p>
                      <p className="text-[8px] text-muted-foreground">Filler</p>
                    </div>
                    <div className="rounded-md bg-amber-50/80 dark:bg-amber-950/20 border border-amber-200/50 p-2 text-center">
                      <Key className="w-3 h-3 text-amber-600 mx-auto mb-0.5" />
                      <p className="text-[10px] font-bold text-foreground">90%</p>
                      <p className="text-[8px] text-muted-foreground">Intellig.</p>
                    </div>
                  </div>
                </div>
                <div className="rounded-md bg-secondary/50 border border-primary/20 p-2">
                  <div className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[9px] font-semibold text-foreground">What worked well</p>
                      <p className="text-[9px] text-foreground leading-tight line-clamp-2">You&apos;ve articulated your passion and the core concept beautifully. Your advice about consistent practice is valuable.</p>
                    </div>
                  </div>
                </div>
                <div className="rounded-md border border-border bg-card p-2">
                  <div className="flex items-center gap-1 mb-1">
                    <Lightbulb className="w-3 h-3 text-amber-500 shrink-0" />
                    <p className="text-[9px] font-semibold text-foreground">Focus areas — Sentence structure and clarity.</p>
                  </div>
                  <div className="flex gap-1.5 items-stretch text-[8px]">
                    <div className="flex-1 rounded bg-muted/30 p-1.5 border border-border">
                      <span className="text-muted-foreground">Before</span>
                      <p className="text-foreground italic leading-tight line-clamp-2 mt-0.5">&quot;...practicing by showing up daily and being consistent in speaking daily...&quot;</p>
                    </div>
                    <ChevronRight className="w-3 h-3 text-muted-foreground self-center shrink-0" />
                    <div className="flex-1 rounded bg-secondary/30 p-1.5 border border-primary/20">
                      <span className="text-primary">After</span>
                      <p className="text-foreground italic leading-tight line-clamp-2 mt-0.5">&quot;...practicing daily through consistent speaking, no matter what.&quot;</p>
                    </div>
                  </div>
                  <button type="button" className="text-[8px] text-muted-foreground mt-1 flex items-center gap-0.5">
                    Show explanation <span className="text-[10px]">⌄</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
