'use client'

import { Navigation } from "@/components/navigation"
import { FeedbackFormDialog } from "@/components/practice/feedback-form-dialog"
import { FeedbackPanel } from "@/components/practice/feedback-panel"
import { PracticeHeader } from "@/components/practice/practice-header"
import { PracticeStats } from "@/components/practice/practice-stats"
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
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [feedbackDialogOpen, setFeedbackDialogOpen] = useState(false)
  const [statsRefreshKey, setStatsRefreshKey] = useState(0)
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
      <div className="container mx-auto max-w-7xl px-4 py-6 lg:py-8">
        {/* Full-width header so the two-column row below aligns topic + feedback cards */}
        <header className="mb-6 border-b border-border pb-6 lg:mb-8 lg:pb-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between lg:gap-8">
            <PracticeHeader />
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:min-w-[min(100%,280px)] lg:shrink-0 lg:items-end">
              <PracticeStats userId={user.id} />
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-center border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground sm:w-auto"
                onClick={() => setFeedbackDialogOpen(true)}
              >
                <MessageCircleHeart className="mr-2 h-4 w-4" />
                Feedback and Support
              </Button>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12 lg:gap-8">
          <aside className="min-w-0 lg:col-span-5 xl:col-span-4 lg:sticky lg:top-20">
            <RecordingInterface
              user={user}
              onAnalysisComplete={(fb) => {
                setFeedback(fb)
                if (fb) setStatsRefreshKey((k) => k + 1)
              }}
              onAnalyzingChange={(analyzing) => {
                setIsAnalyzing(analyzing)
                if (analyzing) setFeedback(null)
              }}
            />
            <FeedbackFormDialog
              open={feedbackDialogOpen}
              onOpenChange={setFeedbackDialogOpen}
              userId={user.id}
            />
          </aside>
          <section className="min-w-0 lg:col-span-7 xl:col-span-8">
            <FeedbackPanel feedback={feedback} isAnalyzing={isAnalyzing} />
          </section>
        </div>
      </div>
    </main>
  )
}
