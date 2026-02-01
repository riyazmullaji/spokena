"use client"

import { useEffect, useRef, useState } from "react"
import { Mic, Zap, BarChart3, Clock, CheckCircle2 } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const HABITS = [
  {
    text: "Build the habit of speaking out loud every day.",
    icon: <Mic className="w-5 h-5" />,
    id: "habit-1"
  },
  {
    text: "Learn to think and speak clearly under time pressure (1-minute constraint).",
    icon: <Clock className="w-5 h-5" />,
    id: "habit-2"
  },
  {
    text: "Reduce ‘um’, ‘uh’, and nervous pauses with targeted nudges.",
    icon: <Zap className="w-5 h-5" />,
    id: "habit-3"
  },
  {
    text: "Hear your own improvement week by week.",
    icon: <BarChart3 className="w-5 h-5" />,
    id: "habit-4"
  },
]

export function HabitSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      HABITS.forEach((_, i) => {
        ScrollTrigger.create({
          trigger: `#habit-item-${i}`,
          start: "top 60%", // Highlights when the item is slightly above center
          end: "bottom 40%",
          onToggle: (self) => {
            if (self.isActive) setActiveIndex(i)
          },
        })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="py-24 px-6 bg-white">
      <div 
        ref={containerRef}
        className="max-w-6xl mx-auto rounded-[3rem] border border-slate-100 bg-slate-50/30 p-12 md:p-20 shadow-sm overflow-hidden"
      >
        {/* Centered Title */}
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
            We know <span className="text-emerald-500">practice</span> is everything
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 relative">
          
          {/* Left Side: Progressive List */}
          <div className="lg:w-1/2 flex flex-col">
            {HABITS.map((habit, i) => (
              <div
                key={i}
                id={`habit-item-${i}`}
                className={`flex items-start gap-6 py-12 transition-all duration-700 ease-in-out ${
                  activeIndex === i 
                    ? "opacity-100 translate-x-4 scale-105" 
                    : "opacity-20 scale-100"
                }`}
              >
                
                <p className="text-2xl md:text-2xl font-semibold text-slate-800 leading-tight italic">
                  {habit.text}
                </p>
              </div>
            ))}
            {/* Added extra space at bottom to allow the last item to hit center */}
            <div className="h-[20vh]" />
          </div>

          {/* Right Side: Sticky UI  */}
          <div className="hidden lg:block lg:w-1/2">
            <div className="sticky top-48 flex items-center justify-center">
              
              {/* Clean UI Card */}
              <div className="w-full max-w-sm bg-white rounded-[2.5rem] shadow-2xl shadow-emerald-900/10 border border-slate-100 p-10">
                <div className="flex items-center justify-between mb-10">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">
                    Real-time Progress
                  </span>
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                </div>

                {/* Bars - Reacting to Scroll */}
                <div className="flex items-end gap-2 h-32 mb-10 justify-center">
                  {[30, 60, 45, 90, 55, 80, 40].map((h, idx) => (
                    <div
                      key={idx}
                      className="w-2.5 bg-emerald-500/10 rounded-full relative overflow-hidden h-full"
                    >
                      <div 
                        className="absolute bottom-0 w-full bg-emerald-500 transition-all duration-1000"
                        style={{ height: activeIndex >= 1 ? `${h}%` : "10%" }}
                      />
                    </div>
                  ))}
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100/50">
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">Pauses</p>
                    <p className="text-2xl font-bold text-slate-900">
                      {activeIndex >= 2 ? "-42%" : "---"}
                    </p>
                  </div>
                  <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100/50">
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">Clarity</p>
                    <p className="text-2xl font-bold text-slate-900">
                      {activeIndex >= 3 ? "94%" : "---"}
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}