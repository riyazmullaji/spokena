"use client"

import { Button } from "@/components/ui/button"
import { createClientComponentClient } from "@/lib/supabaseClient"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export function Navigation() {
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const supabase = createClientComponentClient()

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        setUser(user)
      } catch (error) {
        console.error('Error getting user:', error)
      } finally {
        setIsLoading(false)
      }
    }

    getUser()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null)
      setIsLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [supabase])

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut()
      router.push('/')
      router.refresh()
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  const handleRequestQuote = () => {
    if (user) {
      router.push('/practice')
    } else {
      router.push('/login')
    }
  }

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="flex items-center gap-8">
        <Link href="/" className="text-xl font-bold text-green-600">
          Spokena
        </Link>
        <div className="hidden md:flex items-center gap-6">
          <a href="#features" className="text-sm text-gray-600 hover:text-black transition-colors">
            Features
          </a>
          <a href="#pricing" className="text-sm text-gray-600 hover:text-black transition-colors">
            Pricing
          </a>
          <a href="#blog" className="text-sm text-gray-600 hover:text-black transition-colors">
            Blog
          </a>
          <a href="#about" className="text-sm text-gray-600 hover:text-black transition-colors">
            About Us
          </a>
          <a href="#contact" className="text-sm text-gray-600 hover:text-black transition-colors">
            Contact Us
          </a>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {!isLoading && (
          <>
            {user ? (
              <>
                <Link href="/practice">
                  <Button
                    variant="outline"
                    size="sm"
                    className="hidden sm:inline-flex bg-white border-gray-200 text-black hover:bg-gray-50"
                  >
                    Go to Practice
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white border-gray-200 text-black hover:bg-gray-50"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button
                    variant="outline"
                    size="sm"
                    className="hidden sm:inline-flex bg-white border-gray-200 text-black hover:bg-gray-50"
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/login">
                  <Button
                    size="sm"
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </>
        )}
      </div>
    </nav>
  )
}
