import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { ServicesSection } from "@/components/services-section"
import { CTASectionMiddle } from "@/components/cta-section-middle"
import { CaseStudySection } from "@/components/case-study-section"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />
      <HeroSection />
      <ServicesSection />
      <CTASectionMiddle />
      <CaseStudySection />
    </main>
  )
}
