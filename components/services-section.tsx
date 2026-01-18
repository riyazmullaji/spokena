import { Mic, TrendingDown, Gauge, Network } from "lucide-react"

export function ServicesSection() {
  return (
    <section className="bg-white py-20 px-6" id="services">
      <div className="max-w-6xl mx-auto">
        <div className="mb-4">
          <span className="text-lg font-medium text-primary bg-primary/10 px-3 py-1 rounded">What We Analyze</span>
        </div>

        <p className="text-lg text-gray-600 mb-12 max-w-2xl">
          Spokena analyzes your speech across four key dimensions to give you focused, actionable feedback that actually improves your communication.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-8 rounded-lg">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Mic className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-black">
                  Clarity
                </h3>
              </div>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              How clearly your message comes through. We identify areas where your articulation can be sharper and more impactful.
            </p>
          </div>

          <div className="bg-black p-8 rounded-lg text-white">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/10 rounded-lg">
                  <TrendingDown className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold">
                  Filler Words
                </h3>
              </div>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              Track and reduce "um," "like," "you know" and other fillers that weaken your message. Build cleaner, more confident speech patterns.
            </p>
          </div>

          <div className="bg-black p-8 rounded-lg text-white">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/10 rounded-lg">
                  <Gauge className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold">
                  Pace
                </h3>
              </div>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              Find your optimal speaking pace. Too fast loses clarity, too slow loses engagement. We help you find the sweet spot.
            </p>
          </div>

          <div className="bg-gray-50 p-8 rounded-lg">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Network className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-black">
                  Structure
                </h3>
              </div>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              How well you organize your thoughts. Clear structure helps listeners follow your points and remember your message.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
