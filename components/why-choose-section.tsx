import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"

export function WhyChooseSection() {
  return (
    <section id="why-choose" className="bg-white py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-black mb-12 text-center">
          Why professionals choose Spokena?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-lg">
            <Check className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-black mb-2">Skip the Grind - No More Manual Practice</h3>
              <p className="text-gray-600 text-sm">Let AI analyze your speech automatically. Focus on speaking, not on tracking metrics yourself.</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-lg">
            <Check className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-black mb-2">Hyper-Relevant Feedback</h3>
              <p className="text-gray-600 text-sm">Get insights tailored to your speaking style. No generic advice—only what matters for you.</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-lg">
            <Check className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-black mb-2">Personalized Clarity Scores</h3>
              <p className="text-gray-600 text-sm">Track your improvement with detailed scores for clarity, pace, filler words, and structure.</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-lg">
            <Check className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-black mb-2">Real Practice, Not Theory</h3>
              <p className="text-gray-600 text-sm">Practice-first system designed for real-world communication. Built for moments that matter.</p>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white">
            Wait, there's more!
          </Button>
        </div>
      </div>
    </section>
  )
}
