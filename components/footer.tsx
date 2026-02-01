import Link from "next/link"
import { Github, Twitter, Linkedin } from "lucide-react"

const GITHUB_URL = "https://www.github.com/riyazmullaji/spokean"
const TWITTER_URL = "https://twitter.com/spoknaApp"
const LINKEDIN_URL = "https://www.linkedin.com/in/riyazmullaji"

export function Footer() {
  return (
    <footer className="bg-background py-12 px-6 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <Link href="/" className="text-2xl font-bold text-primary mb-3 block">
              Spokena
            </Link>
            <p className="text-muted-foreground text-sm mb-4">
              We make communication practice easy with AI.
            </p>
            <div className="flex gap-3">
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href={TWITTER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="X (Twitter)"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground mb-4">Discover</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/practice" className="text-muted-foreground hover:text-foreground transition-colors">Practice</Link></li>
              <li><Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</Link></li>
              <li><Link href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</Link></li>
              <li><Link href="#blog" className="text-muted-foreground hover:text-foreground transition-colors">Blog</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground mb-4">Easy</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">How it works</Link></li>
              <li><Link href="#testimonials" className="text-muted-foreground hover:text-foreground transition-colors">Testimonials</Link></li>
              <li><Link href="#faq" className="text-muted-foreground hover:text-foreground transition-colors">FAQs</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground mb-4">Community</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#about" className="text-muted-foreground hover:text-foreground transition-colors">About Us</Link></li>
              <li><Link href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact Us</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Spokena. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
