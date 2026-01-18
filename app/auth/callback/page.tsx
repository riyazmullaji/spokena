'use client'

import { createClientComponentClient } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function AuthCallbackPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClientComponentClient()

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Handle the OAuth callback
        const { data, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('Session error:', error)
          setError('Failed to authenticate. Please try again.')
          return
        }

        const { session } = data
        
        if (!session) {
          console.error('No session found')
          setError('Authentication failed. Please try again.')
          return
        }

        // Check if user exists in our users table
        const { data: existingUser, error: userError } = await supabase
          .from('users')
          .select('id')
          .eq('id', session.user.id)
          .single()

        if (userError && userError.code !== 'PGRST116') { // PGRST116 = no rows found
          console.error('Error checking user existence:', userError)
          setError('Failed to verify user. Please try again.')
          return
        }

        if (existingUser) {
          // User exists, redirect to practice
          router.push('/practice')
        } else {
          // New user, redirect to welcome
          router.push('/welcome')
        }
      } catch (error) {
        console.error('Unexpected error in auth callback:', error)
        setError('An unexpected error occurred. Please try again.')
      } finally {
        setIsLoading(false)
      }
    }

    handleAuthCallback()
  }, [router, supabase])

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950 dark:to-orange-950">
        <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md mx-4">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Authentication Error
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {error}
          </p>
          <button
            onClick={() => router.push('/login')}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Back to Login
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950">
      <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md mx-4">
        <div className="text-green-500 text-6xl mb-4">🔄</div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Completing Sign In...
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Please wait while we set up your account.
        </p>
        <div className="flex justify-center">
          <div className="w-8 h-8 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
        </div>
      </div>
    </div>
  )
}
