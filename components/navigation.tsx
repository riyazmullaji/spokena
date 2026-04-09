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
    <nav className="flex items-center justify-between px-6 py-4 bg-background border-b border-border sticky top-0 z-50">
      <div className="flex items-center gap-8">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-foreground">
          Spokena<span className="text-primary">.</span>
        </Link>
        <Link
          href="/blog"
          className="hidden text-sm font-medium text-muted-foreground hover:text-foreground sm:inline-block"
        >
          Blog
        </Link>
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
                    className="hidden sm:inline-flex"
                  >
                    Go to Practice
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm" className="hidden sm:inline-flex text-muted-foreground hover:text-foreground">
                    Log in
                  </Button>
                </Link>
                <Link href="/login">
                  <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                    Start free
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
