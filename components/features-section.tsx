"use client"

import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ChevronRight, Clock, MessageSquare, Mic, Play, TrendingUp, Users } from "lucide-react"
import { useEffect, useRef, useState } from "react"

gsap.registerPlugin(ScrollTrigger)

const features = [
  {
    id: "01",
    title: "Get a daily nudge",
    description: "We remind you once a day to speak for just one minute on a simple prompt",
    link: "Learn about prompts",
    icon: Mic,
    previewType: "practice"
  },
  {
    id: "02",
    title: "You speak, AI helps",
    description: "You record yourself answering a question or talking about your day. AI tells what went well and what could be improved.",
    link: "See how feedback works",
    icon: MessageSquare,
    previewType: "feedback"
  },
  {
    id: "03",
    title: "One small goal for tomorrow",
    description: "Watch your scores improve over days and weeks. We highlight one micro‑skill to focus on next time:",
    link: "Coming soon",
    icon: TrendingUp,
    previewType: "progress"
  }
]

export function Features() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin the left side header
      ScrollTrigger.create({
        trigger: ".sticky-header-container",
        start: "top 10%",
        endTrigger: sectionRef.current,
        end: "bottom 80%",
        pin: true,
        pinSpacing: false,
      })

      // Animate feature cards on scroll
      gsap.utils.toArray<HTMLElement>(".feature-card").forEach((card) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          y: 50,
          duration: 0.8,
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 bg-background relative overflow-visible">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* LEFT SIDE: INTACT HEADER */}
          <div className="lg:w-1/3">
            <div className="sticky-header-container py-10">
              <h4 className="text-3xl font-bold text-foreground mb-6 leading-tight tracking-tight">
                Build speaking skills, One day at a time
              </h4>
              <p className="text-l text-muted-foreground mb-10 leading-relaxed">
              Everything you need to practice speaking consistently, get better feedback, and see real improvement.
              </p>
          
            </div>
          </div>

          {/* RIGHT SIDE: SCROLLING FEATURES & COMPONENTS */}
          <div className="lg:w-2/3 space-y-24">
            {features.map((feature) => (
              <div key={feature.id} className="feature-card bg-secondary/20 rounded-[40px] p-10 md:p-16 border border-border/50">
                <div className="flex flex-col md:flex-row gap-12 items-center">
                  
                  {/* Text Hierarchy */}
                  <div className="flex-1 order-2 md:order-1">
                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded mb-4 uppercase tracking-widest">
                      {feature.id}
                    </span>
                    <h3 className="text-2xl font-bold mb-4 text-foreground">
                      {feature.title}
                    </h3>
                    <p className="text-l text-muted-foreground mb-8">
                      {feature.description}
                    </p>
                    <button className="flex items-center gap-2 text-foreground font-semibold hover:gap-3 transition-all">
                      {feature.link} <ChevronRight size={10} />
                    </button>
                  </div>

                  {/* Component / Illustration */}
                  <div className="flex-1 order-1 md:order-2 w-full">
                    <div className="bg-card rounded-3xl border border-border overflow-hidden min-h-[300px] flex items-center justify-center p-6 
    shadow-2xl shadow-primary/5 transition-shadow duration-300 hover:shadow-2xl hover:shadow-primary/10">
                      {feature.previewType === "practice" && (
                        <div className="w-full text-center">
                           <p className="text-xs text-muted-foreground mb-2">Today&apos;s Prompt</p>
                           <p className="text-lg font-medium mb-6 italic">&quot;Tell me about a skill you&apos;ve been wanting to learn...&quot;</p>
                           <div className="w-20 h-20 bg-primary rounded-full mx-auto flex items-center justify-center shadow-lg">
                              <Mic className="text-white" size={32} />
                           </div>
                        </div>
                      )}
                      
                      {feature.previewType === "feedback" && (
                        <div className="w-full space-y-6">
                           <p className="font-bold text-sm uppercase text-muted-foreground">AI Analysis</p>
                           <div className="space-y-4">
                              <div className="h-12 w-full bg-secondary/50 rounded-lg flex items-center px-4 justify-between">
                                 <span className="text-sm font-medium">Pace</span>
                                 <span className="text-primary text-sm font-bold">Good</span>
                              </div>
                              <div className="h-12 w-full bg-secondary/50 rounded-lg flex items-center px-4 justify-between">
                                 <span className="text-sm font-medium">Filler words</span>
                                 <span className="text-accent text-sm font-bold">Improving</span>
                              </div>
                           </div>
                        </div>
                      )}

                      {feature.previewType === "progress" && (
                        <div className="w-full flex items-end justify-center gap-2 h-40">
                           {[40, 70, 50, 90, 60, 85].map((h, i) => (
                             <div key={i} className="bg-primary/80 rounded-t-sm w-8" style={{ height: `${h}%` }} />
                           ))}
                        </div>
                      )}
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}