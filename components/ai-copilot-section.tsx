import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import Link from "next/link"

export function AICopilotSection() {
  return (
    <section id="ai-copilot" className="bg-black py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Your <span className="text-green-500">Personal AI Speech Coach</span>
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              Get focused feedback on your speech—in seconds, not hours. Smarter analysis, real results.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <Check className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-white">Get hyper-relevant, actionable feedback</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-white">Personalized clarity scores for each session</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-white">Track filler words, pace, and structure</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-white">No generic advice—only focused improvements</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-white">Save hours of manual practice</span>
              </div>
            </div>
            
            <Link href="/practice">
              <Button size="lg" className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-3">
                Start Your Practice
              </Button>
            </Link>
          </div>
          
          <div className="relative">
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <div className="space-y-4">
                <div className="bg-gray-800 rounded p-4">
                  <div className="text-green-500 text-sm mb-2">Clarity Score</div>
                  <div className="text-3xl font-bold text-white">78%</div>
                </div>
                <div className="bg-gray-800 rounded p-4">
                  <div className="text-green-500 text-sm mb-2">Filler Words</div>
                  <div className="text-3xl font-bold text-white">3</div>
                </div>
                <div className="bg-gray-800 rounded p-4">
                  <div className="text-green-500 text-sm mb-2">Pace</div>
                  <div className="text-3xl font-bold text-white">120 wpm</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
