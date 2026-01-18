import { Briefcase, Presentation, Users } from "lucide-react"

export function CaseStudySection() {
  return (
    <section className="bg-white py-20 px-6" id="case-study">
      <div className="max-w-6xl mx-auto">
        <div className="mb-4">
          <span className="text-lg font-medium text-primary bg-primary/10 px-3 py-1 rounded">Use Cases</span>
        </div>

        <p className="text-lg text-gray-600 mb-12 max-w-2xl">
          Spokena helps you communicate with clarity and confidence in the moments that matter most.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-black p-8 rounded-lg text-white">
            <div className="mb-4">
              <Briefcase className="w-8 h-8 text-green-400" />
            </div>
            <h3 className="text-lg font-semibold mb-3">Meetings & Presentations</h3>
            <p className="text-sm mb-6 leading-relaxed text-gray-300">
              Sound clearer and more confident in team meetings, client presentations, and stakeholder updates. Reduce filler words and improve your pacing.
            </p>
          </div>

          <div className="bg-black p-8 rounded-lg text-white">
            <div className="mb-4">
              <Presentation className="w-8 h-8 text-green-400" />
            </div>
            <h3 className="text-lg font-semibold mb-3">Public Speaking</h3>
            <p className="text-sm mb-6 leading-relaxed text-gray-300">
              Prepare for keynotes, conferences, and talks. Build the daily habit of clear articulation so you're ready when it counts.
            </p>
          </div>

          <div className="bg-black p-8 rounded-lg text-white">
            <div className="mb-4">
              <Users className="w-8 h-8 text-green-400" />
            </div>
            <h3 className="text-lg font-semibold mb-3">Interviews & Networking</h3>
            <p className="text-sm mb-6 leading-relaxed text-gray-300">
              Think and express more sharply under pressure. Practice daily so you communicate with clarity and control when opportunities arise.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
