import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"
import Link from "next/link"

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Product Manager",
      rating: 5,
      quote: "Spokena helped me eliminate 'um' and 'like' from my presentations. My team noticed the difference immediately."
    },
    {
      name: "Marcus Rodriguez",
      role: "Sales Director",
      rating: 5,
      quote: "The daily practice is so simple but incredibly effective. I sound more confident in every client conversation."
    },
    {
      name: "Dr. Emily Watson",
      role: "Conference Speaker",
      rating: 5,
      quote: "Spokena actually understands professional communication. The feedback is spot-on and helps me prepare for keynotes."
    },
    {
      name: "James Park",
      role: "Tech Lead",
      rating: 5,
      quote: "Just 2 minutes a day and I've improved my clarity significantly. Best investment in my communication skills."
    },
    {
      name: "Lisa Thompson",
      role: "Executive Coach",
      rating: 5,
      quote: "The focused feedback is exactly what busy professionals need. No fluff, just actionable improvements."
    },
    {
      name: "David Kim",
      role: "Entrepreneur",
      rating: 5,
      quote: "Practice-first approach is brilliant. It's like going to the gym for your communication skills."
    }
  ]

  return (
    <section id="testimonials" className="bg-black py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            2000+ Professionals improved their communication with Spokena
          </h2>
          <p className="text-xl text-gray-300">We Practice, You Communicate Better!</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-900 p-6 rounded-lg border border-gray-800">
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-white text-sm mb-4 leading-relaxed">"{testimonial.quote}"</p>
              <div>
                <div className="text-white font-semibold">{testimonial.name}</div>
                <div className="text-gray-400 text-sm">{testimonial.role}</div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <Link href="/practice">
            <Button size="lg" className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-3">
              Start Practicing
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
