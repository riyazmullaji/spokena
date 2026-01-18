import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { StatsSection } from "@/components/stats-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { AICopilotSection } from "@/components/ai-copilot-section"
import { WhyChooseSection } from "@/components/why-choose-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { CTASectionMiddle } from "@/components/cta-section-middle"
import { FinalCTASection } from "@/components/final-cta-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />
      <HeroSection />
      <StatsSection />
      <HowItWorksSection />
      <AICopilotSection />
      <WhyChooseSection />
      <TestimonialsSection />
      <CTASectionMiddle />
      <FinalCTASection />
      <Footer />
    </main>
  )
}
