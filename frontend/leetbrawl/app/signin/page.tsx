"use client"

import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { useEffect } from 'react'
import LoginForm from '@/components/auth/login-form'
import Link from 'next/link'

export default function SigninPage() {
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/')
    }
  }, [isAuthenticated, router])

  const handleSigninSuccess = () => {
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
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-gray-400">
            Don't have an account yet?{' '}
            <Link href="/signup" className="text-blue-400 hover:text-blue-300 underline">
              Create one here
            </Link>
          </p>
        </div>
        <LoginForm onSuccess={handleSigninSuccess} />
      </div>
    </div>
  )
}