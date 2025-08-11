"use client"

import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { useEffect } from 'react'
import RegisterForm from '@/components/auth/register-form'
import Link from 'next/link'

export default function SignupPage() {
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/')
    }
  }, [isAuthenticated, router])

  const handleSignupSuccess = () => {
    // User is now logged in via auth context, redirect to home
    router.push('/')
  }

  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0e0e10] flex items-center justify-center">
        <div className="text-white">Redirecting to home...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0e0e10] flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-gray-400">
            Already have an account?{' '}
            <Link href="/signin" className="text-blue-400 hover:text-blue-300 underline">
              Sign in here
            </Link>
          </p>
        </div>
        <RegisterForm onSuccess={handleSignupSuccess} />
      </div>
    </div>
  )
}