import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Search } from "lucide-react"

export function CTASectionMiddle() {
  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-black mb-8">Find your clear voice in a click</h2>
        
        <div className="max-w-2xl mx-auto mb-12">
          <div className="flex items-center gap-4 bg-gray-50 rounded-lg p-4 border border-gray-200">
            <Search className="w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Start practicing now..." 
              className="flex-1 bg-transparent border-none outline-none text-gray-700"
            />
            <Link href="/practice">
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                Go
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
