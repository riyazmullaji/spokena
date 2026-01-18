'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { createClientComponentClient } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function WelcomePage() {
  const [clarityGoal, setClarityGoal] = useState('')
  const [reminderTime, setReminderTime] = useState('09:00')
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()
  const supabase = createClientComponentClient()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
        return
      }
      setUser(user)
    }
    getUser()
  }, [router, supabase])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!user) {
      alert('User not found. Please try signing in again.')
      return
    }

    if (!clarityGoal.trim()) {
      alert('Please enter your clarity goal.')
      return
    }

    try {
      setIsLoading(true)

      // Create user profile in the users table
      const { error } = await supabase
        .from('users')
        .insert({
          id: user.id,
          email: user.email,
          clarity_goal: clarityGoal.trim(),
          daily_reminder_time: reminderTime,
          current_streak: 0,
          created_at: new Date().toISOString()
        })

      if (error) {
        console.error('Error creating user profile:', error)
        alert('Failed to create your profile. Please try again.')
        return
      }

      // Redirect to practice page
      router.push('/practice')
    } catch (error) {
      console.error('Unexpected error:', error)
      alert('An unexpected error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-green-600 dark:text-green-400">
            Welcome to Spokena! 🎉
          </CardTitle>
          <CardDescription className="text-lg text-gray-600 dark:text-gray-400">
            Let's personalize your speaking clarity journey
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="clarityGoal" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                What's your main clarity goal? *
              </label>
              <textarea
                id="clarityGoal"
                value={clarityGoal}
                onChange={(e) => setClarityGoal(e.target.value)}
                placeholder="e.g., I want to speak more clearly in presentations, reduce my accent, improve pronunciation of difficult words..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white resize-none"
                rows={4}
                required
              />
              <p className="text-xs text-gray-500 dark:text-gray-400">
                This helps us tailor your practice sessions to your specific needs.
              </p>
            </div>

            <div className="space-y-2">
              <label htmlFor="reminderTime" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Daily reminder time
              </label>
              <input
                type="time"
                id="reminderTime"
                value={reminderTime}
                onChange={(e) => setReminderTime(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400">
                We'll send you a gentle reminder to practice at this time each day.
              </p>
            </div>

            <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg border border-green-200 dark:border-green-800">
              <h3 className="font-medium text-green-800 dark:text-green-200 mb-2">
                What happens next?
              </h3>
              <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                <li>• You'll get personalized practice sessions based on your goal</li>
                <li>• Track your progress with daily streaks and improvements</li>
                <li>• Receive gentle reminders to keep you consistent</li>
                <li>• Access detailed feedback on your speaking clarity</li>
              </ul>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg"
              size="lg"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Setting up your profile...</span>
                </div>
              ) : (
                'Start My Journey'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

