import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl lg:text-6xl font-bold text-black leading-tight mb-6">
              Navigating the
              <br />
              <span className="text-black">articulation landscape</span>
              <br />
              for success
            </h1>

            <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-lg">
              Our digital marketing agency helps businesses grow and succeed online through a result-driven approach to
              digital marketing.
            </p>

            <Button size="lg" className="bg-black text-white hover:bg-gray-800 px-8 py-3 text-base">
              Book a consultation
            </Button>
          </div>

          <div className="relative">
            <div className="relative z-10">
              <img src="/abstract-geometric-illustration-with-green-accents.jpg" alt="Abstract geometric illustration" className="w-full h-auto" />
            </div>
          </div>
        </div>

        <div className="mt-20 pt-12 border-t border-gray-100">
          <div className="flex items-center justify-center gap-12 opacity-60">
            <div className="text-lg font-medium text-gray-400">amazon</div>
            <div className="text-lg font-medium text-gray-400">dribbble</div>
            <div className="text-lg font-medium text-gray-400">HubSpot</div>
            <div className="text-lg font-medium text-gray-400">Notion</div>
            <div className="text-lg font-medium text-gray-400">NETFLIX</div>
            <div className="text-lg font-medium text-gray-400">zoom</div>
          </div>
        </div>
      </div>
    </section>
  )
}
