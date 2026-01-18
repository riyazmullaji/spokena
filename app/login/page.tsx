'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { createClientComponentClient } from '@/lib/supabaseClient'
import { Star } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0)
  const supabase = createClientComponentClient()

  const reviews = [
    {
      name: "Sarah Chen",
      role: "Product Manager",
      company: "Tech Startup",
      image: "/professional-asian-woman-smiling-confidently.jpg",
      rating: 5,
      quote: "Spokena helped me eliminate 'um' and 'like' from my presentations. My team noticed the difference immediately. The daily practice is so simple but incredibly effective.",
    },
    {
      name: "Marcus Rodriguez",
      role: "Sales Director",
      company: "Fortune 500",
      image: "/professional-hispanic-man-in-business-suit-smiling.jpg",
      rating: 5,
      quote: "As someone who speaks to clients daily, Spokena's feedback on pace and clarity has been game-changing. I sound more confident and persuasive in every conversation.",
    },
    {
      name: "Dr. Emily Watson",
      role: "Conference Speaker",
      company: "Medical Research",
      image: "/professional-woman-doctor-speaking-confidently.jpg",
      rating: 5,
      quote: "I've tried other speech apps, but Spokena actually understands professional communication. The AI feedback is spot-on and helps me prepare for keynote presentations.",
    },
  ]

  // Auto-rotate reviews every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReviewIndex((prev) => (prev + 1) % reviews.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [reviews.length])

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true)
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      })

      if (error) {
        console.error('Error signing in with Google:', error.message)
        alert('Failed to sign in with Google. Please try again.')
      }
    } catch (error) {
      console.error('Unexpected error:', error)
      alert('An unexpected error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Login Form */}
      <div className="flex-1 flex items-center justify-center bg-white dark:bg-gray-900 px-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Welcome to Spokena
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Sign in to start improving your speaking clarity
            </p>
          </div>

          <Card className="border-0 shadow-none">
            <CardContent className="p-0">
              <Button
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                className="w-full bg-white text-gray-900 hover:bg-gray-50 border border-gray-300 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:border-gray-600 h-12"
                size="lg"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
                    <span>Signing in...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-3">
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    <span className="text-base">Continue with Google</span>
                  </div>
                )}
              </Button>
              
              <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-6">
                By signing in, you agree to our Terms of Service and Privacy Policy
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Right Side - Reviews Carousel */}
      <div className="flex-1 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950 flex items-center justify-center px-8 relative overflow-hidden">
        <div className="w-full max-w-lg">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              What our users say
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Join thousands of professionals improving their communication
            </p>
          </div>

          <div className="relative">
            <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(reviews[currentReviewIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <blockquote className="text-gray-800 dark:text-white mb-8 text-lg leading-relaxed">
                  "{reviews[currentReviewIndex].quote}"
                </blockquote>

                <div className="flex items-center gap-4">
                  <img
                    src={reviews[currentReviewIndex].image || "/placeholder.svg"}
                    alt={reviews[currentReviewIndex].name}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {reviews[currentReviewIndex].name}
                    </div>
                    <div className="text-gray-600 dark:text-gray-400 text-sm">
                      {reviews[currentReviewIndex].role} • {reviews[currentReviewIndex].company}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Review indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentReviewIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentReviewIndex
                      ? 'bg-green-600 dark:bg-green-400'
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-green-200 dark:bg-green-800 rounded-full opacity-20 blur-xl"></div>
        <div className="absolute bottom-10 left-10 w-24 h-24 bg-blue-200 dark:bg-blue-800 rounded-full opacity-20 blur-xl"></div>
      </div>
    </div>
  )
}

