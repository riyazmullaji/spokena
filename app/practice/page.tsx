'use client'

import { Navigation } from "@/components/navigation"
import { FeedbackFormDialog } from "@/components/practice/feedback-form-dialog"
import { FeedbackPanel } from "@/components/practice/feedback-panel"
import { PracticeHeader } from "@/components/practice/practice-header"
import { RecordingInterface } from "@/components/practice/recording-interface"
import { Button } from "@/components/ui/button"
import { createClientComponentClient } from '@/lib/supabaseClient'
import { MessageCircleHeart } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function PracticePage() {
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [feedback, setFeedback] = useState<any>(null)
  const [feedbackDialogOpen, setFeedbackDialogOpen] = useState(false)
  const router = useRouter()
  const supabase = createClientComponentClient()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser()
        
        if (error || !user) {
          router.push('/login')
          return
        }

        // Check if user exists in our users table
        const { data: userProfile, error: profileError } = await supabase
          .from('users')
          .select('id, clarity_goal')
          .eq('id', user.id)
          .single()

        if (profileError && profileError.code === 'PGRST116') {
          // User doesn't exist in users table, redirect to welcome
          router.push('/welcome')
          return
        }

        if (profileError) {
          console.error('Error fetching user profile:', profileError)
          router.push('/login')
          return
        }

        setUser(user)
      } catch (error) {
        console.error('Auth check error:', error)
        router.push('/login')
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [router, supabase])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading your practice session...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null // Will redirect to login
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-6 lg:py-8 max-w-7xl">
        {/* Two-column: left sticky recording, right feedback */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          <aside className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-24">
            <PracticeHeader />
            <div className="mt-6">
              <RecordingInterface user={user} onAnalysisComplete={setFeedback} />
            </div>
            <div className="mt-4">
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground"
                onClick={() => setFeedbackDialogOpen(true)}
              >
                <MessageCircleHeart className="w-4 h-4 mr-2" />
                Feedback and Support
              </Button>
            </div>
            <FeedbackFormDialog
              open={feedbackDialogOpen}
              onOpenChange={setFeedbackDialogOpen}
              userId={user.id}
            />
          </aside>
          <section className="lg:col-span-7 xl:col-span-8">
            <FeedbackPanel feedback={feedback} />
          </section>
        </div>
      </div>
    </main>
  )
}
