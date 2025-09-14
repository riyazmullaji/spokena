import { Button } from "@/components/ui/button"
import { ArrowUpRight } from "lucide-react"

export function ServicesSection() {
  return (
    <section className="bg-white py-20 px-6" id="services">
      <div className="max-w-6xl mx-auto">
        <div className="mb-4">
          <span className="text-lg font-medium text-primary bg-primary/10 px-3 py-1 rounded">Services</span>
        </div>

        <p className="text-lg text-gray-600 mb-12 max-w-2xl">
          At our digital marketing agency, we offer a range of services to help businesses grow and succeed online.
          These services include:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-8 rounded-lg">
            <div className="flex items-start justify-between mb-6">
              <h3 className="text-xl font-semibold text-black">
                Speech clarity
                <br />
                optimization
              </h3>
              <Button variant="ghost" size="sm" className="p-2">
                <ArrowUpRight className="w-4 h-4" />
              </Button>
            </div>
            <div className="mb-6">
              <img src="/speech-waveform-visualization.jpg" alt="Speech analysis" className="w-full h-24 object-contain" />
            </div>
            <p className="text-sm text-gray-600">Learn more</p>
          </div>

          <div className="bg-black p-8 rounded-lg text-white">
            <div className="flex items-start justify-between mb-6">
              <h3 className="text-xl font-semibold">
                Pay-per-click
                <br />
                advertising
              </h3>
              <Button variant="ghost" size="sm" className="p-2 text-white hover:bg-white/10">
                <ArrowUpRight className="w-4 h-4" />
              </Button>
            </div>
            <div className="mb-6">
              <img src="/cursor-clicking-interface-dark-theme.jpg" alt="Click interface" className="w-full h-24 object-contain" />
            </div>
            <p className="text-sm text-gray-400">Learn more</p>
          </div>

          <div className="bg-black p-8 rounded-lg text-white">
            <div className="flex items-start justify-between mb-6">
              <h3 className="text-xl font-semibold">
                Social media
                <br />
                marketing
              </h3>
              <Button variant="ghost" size="sm" className="p-2 text-white hover:bg-white/10">
                <ArrowUpRight className="w-4 h-4" />
              </Button>
            </div>
            <div className="mb-6">
              <img src="/social-media-icons-dark-theme.jpg" alt="Social media" className="w-full h-24 object-contain" />
            </div>
            <p className="text-sm text-gray-400">Learn more</p>
          </div>

          <div className="bg-gray-50 p-8 rounded-lg">
            <div className="flex items-start justify-between mb-6">
              <h3 className="text-xl font-semibold text-black">
                E-mail
                <br />
                marketing
              </h3>
              <Button variant="ghost" size="sm" className="p-2">
                <ArrowUpRight className="w-4 h-4" />
              </Button>
            </div>
            <div className="mb-6">
              <img src="/email-interface-with-green-accent.jpg" alt="Email marketing" className="w-full h-24 object-contain" />
            </div>
            <p className="text-sm text-gray-600">Learn more</p>
          </div>
        </div>
      </div>
    </section>
  )
}
