"use client"

import { useEffect, useRef } from "react"
import { Quote } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function Testimonial() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".testimonial-content", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      })

      gsap.from(".testimonial-stat", {
        scrollTrigger: {
          trigger: ".testimonial-stat",
          start: "top 80%",
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-32 relative overflow-hidden rounded-t-[40px] md:rounded-t-[100px] lg:rounded-t-[200px]"
      style={{
        background: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #bbf7d0 100%)",
        /* This mask creates the fade effect at the bottom */
        WebkitMaskImage: "linear-gradient(to bottom, black 85%, transparent 100%)",
        maskImage: "linear-gradient(to bottom, black 85%, transparent 100%)",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 ">
        {/* Enterprise Badge */}
        <div className="testimonial-content text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-semibold mb-8">
            Built for serious learners
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 tracking-tight max-w-3xl mx-auto text-balance">
            Practice-ready.
            <br />
            Without the fluff.
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            We believe in honest progress over instant gratification. No gamification tricks, no false fluency claims—just real practice that builds real skills.
          </p>
        </div>

        {/* Feature Pills */}
        <div className="testimonial-content flex flex-wrap justify-center gap-3 mb-16">
          {[
            "Privacy-first design",
            "No subscription traps",
            "Offline recording",
            "Data export anytime",
            "No ads, ever",
            "Works on all devices",
          ].map((feature) => (
            <span
              key={feature}
              className="px-4 py-2 bg-white/70 backdrop-blur-sm border border-primary/10 rounded-full text-sm font-medium text-foreground"
            >
              {feature}
            </span>
          ))}
        </div>

        {/* Testimonial Card */}
        <div className="testimonial-content bg-white rounded-2xl shadow-xl p-8 md:p-12 max-w-4xl mx-auto mb-12">
          <div className="flex items-start gap-6 mb-8">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
              <Quote className="w-8 h-8 text-primary" />
            </div>
            <div>
              <p className="text-xl md:text-2xl text-foreground leading-relaxed mb-6">
                &quot;Spokena helped me prepare for job interviews in a way no other app could. The daily practice built my confidence, and the honest feedback showed me exactly what to work on. After 3 weeks, I stopped saying &apos;um&apos; in interviews without even thinking about it.&quot;
              </p>
              <div>
                <p className="font-semibold text-foreground">Sarah Chen</p>
                <p className="text-muted-foreground">Product Manager at Stripe</p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
            <div className="testimonial-stat text-center">
              <p className="text-4xl font-bold text-primary mb-1">21</p>
              <p className="text-sm text-muted-foreground">Days of practice</p>
            </div>
            <div className="testimonial-stat text-center">
              <p className="text-4xl font-bold text-primary mb-1">68%</p>
              <p className="text-sm text-muted-foreground">Fewer filler words</p>
            </div>
            <div className="testimonial-stat text-center">
              <p className="text-4xl font-bold text-primary mb-1">3</p>
              <p className="text-sm text-muted-foreground">Job offers received</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}