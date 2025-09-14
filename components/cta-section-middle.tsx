import { Button } from "@/components/ui/button"

export function CTASectionMiddle() {
  return (
    <section className="bg-gray-50 py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-black mb-6">Let's make things happen</h2>

        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Contact us today to learn more about how our digital marketing services can help your business grow and
          succeed online.
        </p>

        <Button size="lg" className="bg-black text-white hover:bg-gray-800 px-8 py-3 text-base">
          Get your free proposal
        </Button>

        <div className="mt-12">
          <img src="/abstract-geometric-shape-with-green-accent.jpg" alt="Abstract illustration" className="mx-auto" />
        </div>
      </div>
    </section>
  )
}
