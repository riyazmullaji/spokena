import { Button } from "@/components/ui/button"
import Link from "next/link"

export function FinalCTASection() {
  return (
    <section className="bg-black py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          No more unclear communication. Just <span className="text-green-500">clear speech in seconds</span>.
        </h2>
        
        <Link href="/practice">
          <Button size="lg" className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-12 py-6 text-lg font-semibold rounded-lg shadow-lg">
            Try Spokena for free
          </Button>
        </Link>
      </div>
    </section>
  )
}
