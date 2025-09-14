import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Product Manager",
      company: "Tech Startup",
      image: "/professional-asian-woman-smiling-confidently.jpg",
      rating: 5,
      quote:
        "Spokena helped me eliminate 'um' and 'like' from my presentations. My team noticed the difference immediately. The daily practice is so simple but incredibly effective.",
    },
    {
      name: "Marcus Rodriguez",
      role: "Sales Director",
      company: "Fortune 500",
      image: "/professional-hispanic-man-in-business-suit-smiling.jpg",
      rating: 5,
      quote:
        "As someone who speaks to clients daily, Spokena's feedback on pace and clarity has been game-changing. I sound more confident and persuasive in every conversation.",
    },
    {
      name: "Dr. Emily Watson",
      role: "Conference Speaker",
      company: "Medical Research",
      image: "/professional-woman-doctor-speaking-confidently.jpg",
      rating: 5,
      quote:
        "I've tried other speech apps, but Spokena actually understands professional communication. The AI feedback is spot-on and helps me prepare for keynote presentations.",
    },
  ]

  return (
    <section id="testimonials" className="py-24 bg-card">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Trusted by Professionals
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-card-foreground mb-4">Real Results from Real Users</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            Join thousands of professionals who've improved their communication with Spokena's daily practice approach.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-border/50 hover:border-primary/20 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-secondary text-secondary" />
                  ))}
                </div>

                <blockquote className="text-card-foreground mb-6 leading-relaxed">"{testimonial.quote}"</blockquote>

                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-card-foreground text-sm">{testimonial.name}</div>
                    <div className="text-muted-foreground text-xs">
                      {testimonial.role} • {testimonial.company}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
