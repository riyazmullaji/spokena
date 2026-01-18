import { Button } from "@/components/ui/button"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl lg:text-6xl font-bold text-black leading-tight mb-6">
            Speak with <span className="text-green-600">Clarity & Confidence</span> in Seconds
          </h1>

          <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
            Let our AI analyze your speech and give you focused feedback 10x faster. Practice 1-2 minutes daily and build the habit of clear communication.
          </p>

          <Link href="/practice">
            <Button size="lg" className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-12 py-6 text-lg font-semibold rounded-lg shadow-lg">
              Try Spokena for free
            </Button>
          </Link>
        </div>

        {/* Platform Mockup Placeholder */}
        <div className="mt-16 bg-gray-50 rounded-lg p-8 border border-gray-200">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-8 bg-green-600 rounded"></div>
              <div className="text-sm font-semibold text-gray-700">Spokena Practice</div>
            </div>
            <div className="space-y-4">
              <div className="h-12 bg-blue-50 rounded border border-blue-200 flex items-center px-4">
                <span className="text-sm text-gray-600">Ready to Practice? Record 1-2 minutes...</span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="h-24 bg-green-50 rounded border border-green-200"></div>
                <div className="h-24 bg-blue-50 rounded border border-blue-200"></div>
                <div className="h-24 bg-purple-50 rounded border border-purple-200"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
