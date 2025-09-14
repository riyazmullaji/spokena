"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Navigation() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-100">
      <div className="flex items-center gap-8">
        <Link href="/" className="text-xl font-bold text-black">
          Spokena
        </Link>
        <div className="hidden md:flex items-center gap-6">
          <Link href="/practice" className="text-sm text-gray-600 hover:text-black transition-colors">
            Practice
          </Link>
          <a href="#services" className="text-sm text-gray-600 hover:text-black transition-colors">
            Services
          </a>
          <a href="#case-study" className="text-sm text-gray-600 hover:text-black transition-colors">
            Use Cases
          </a>
          <a href="#pricing" className="text-sm text-gray-600 hover:text-black transition-colors">
            Pricing
          </a>
          <a href="#blog" className="text-sm text-gray-600 hover:text-black transition-colors">
            Blog
          </a>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="sm"
          className="hidden sm:inline-flex bg-white border-gray-200 text-black hover:bg-gray-50"
        >
          Request a quote
        </Button>
      </div>
    </nav>
  )
}
