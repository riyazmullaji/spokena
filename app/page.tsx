import type { Metadata } from "next"

import { Features } from "@/components/features-section"
import { FinalCTASection as CTA } from "@/components/final-cta-section"
import { Footer } from "@/components/footer"
import { HeroSection as Hero } from "@/components/hero-section"
import { Navigation as Navbar } from "@/components/navigation"
import { SmoothScroll } from "@/components/smooth-scroll"
import { HabitSection } from "@/components/stats-section"
import { Testimonial } from "@/components/testimonials-section"
import { WhyChooseSection as Comparison } from "@/components/why-choose-section"

export const metadata: Metadata = {
  alternates: { canonical: "/" },
}

export default function HomePage() {
  return (
    <SmoothScroll>
      <main className="min-h-screen">
        <Navbar />
        <Hero />
        <Features />
        <HabitSection />
        <Comparison />
        <Testimonial />
        <CTA />
        <Footer />
      </main>
    </SmoothScroll>
  )
}
