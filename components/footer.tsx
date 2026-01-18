import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-white py-12 px-6 border-t border-gray-200">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <Link href="/" className="text-2xl font-bold text-green-600 mb-3 block">
              Spokena
            </Link>
            <p className="text-gray-600 text-sm mb-4">
              We make communication practice easy with AI.
            </p>
            <div className="flex gap-4">
              {/* Social icons placeholder */}
              <div className="w-8 h-8 bg-gray-200 rounded"></div>
              <div className="w-8 h-8 bg-gray-200 rounded"></div>
              <div className="w-8 h-8 bg-gray-200 rounded"></div>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-black mb-4">Discover</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/practice" className="text-gray-600 hover:text-black">Practice</Link></li>
              <li><Link href="#features" className="text-gray-600 hover:text-black">Features</Link></li>
              <li><Link href="#pricing" className="text-gray-600 hover:text-black">Pricing</Link></li>
              <li><Link href="#blog" className="text-gray-600 hover:text-black">Blog</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-black mb-4">Easy</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#how-it-works" className="text-gray-600 hover:text-black">How it works</Link></li>
              <li><Link href="#testimonials" className="text-gray-600 hover:text-black">Testimonials</Link></li>
              <li><Link href="#faq" className="text-gray-600 hover:text-black">FAQs</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-black mb-4">Community</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#about" className="text-gray-600 hover:text-black">About Us</Link></li>
              <li><Link href="#contact" className="text-gray-600 hover:text-black">Contact Us</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-black">Privacy Policy</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-black">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-200 text-center text-sm text-gray-600">
          © 2024 Spokena. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
