import { Button } from "@/components/ui/button"
import { ArrowUpRight } from "lucide-react"

export function CaseStudySection() {
  return (
    <section className="bg-white py-20 px-6" id="case-study">
      <div className="max-w-6xl mx-auto">
        <div className="mb-4">
          <span className="text-lg font-medium text-primary bg-primary/10 px-3 py-1 rounded">Case study</span>
        </div>

        <p className="text-lg text-gray-600 mb-12 max-w-2xl">
          Explore Real-Life Examples of Our Proven Digital Marketing Success through Our Case Studies
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-black p-8 rounded-lg text-white">
            <p className="text-sm mb-6 leading-relaxed">
              For a local restaurant, we implemented a targeted PPC campaign that resulted in a 50% increase in website
              traffic and a 25% increase in sales.
            </p>
            <Button variant="ghost" size="sm" className="text-primary hover:bg-white/10 p-0">
              Learn more <ArrowUpRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

          <div className="bg-black p-8 rounded-lg text-white">
            <p className="text-sm mb-6 leading-relaxed">
              For a B2B software company, we developed an SEO strategy that resulted in a first page ranking for key
              keywords and a 200% increase in organic traffic.
            </p>
            <Button variant="ghost" size="sm" className="text-primary hover:bg-white/10 p-0">
              Learn more <ArrowUpRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

          <div className="bg-black p-8 rounded-lg text-white">
            <p className="text-sm mb-6 leading-relaxed">
              For a national retail chain, we created a social media marketing campaign that increased followers by 25%
              and generated a 20% increase in online sales.
            </p>
            <Button variant="ghost" size="sm" className="text-primary hover:bg-white/10 p-0">
              Learn more <ArrowUpRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
