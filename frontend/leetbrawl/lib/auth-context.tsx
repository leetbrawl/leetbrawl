"use client"

import React, { createContext, useContext, useEffect, useState } from 'react'
import { apiClient, User } from './api'

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>
  register: (username: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const isAuthenticated = !!user

  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      const token = apiClient.getToken()
      if (token) {
        const response = await apiClient.getProfile()
        if (response.success && response.data) {
          setUser(response.data.user)
        } else {
          apiClient.setToken(null)
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error)
      apiClient.setToken(null)
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (username: string, password: string) => {
    try {
      setIsLoading(true)
      const response = await apiClient.login(username, password)
      
      if (response.success && response.data) {
        setUser(response.data.user)
        return { success: true }
      } else {
        return { success: false, error: response.message || 'Login failed' }
      }
    } catch (error: any) {
      return { success: false, error: error.message || 'Login failed' }
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (username: string, email: string, password: string) => {
    try {
      setIsLoading(true)
      const response = await apiClient.register(username, email, password)
      
      if (response.success && response.data) {
        setUser(response.data.user)
        return { success: true }
      } else {
        return { success: false, error: response.message || 'Registration failed' }
      }
    } catch (error: any) {
      return { success: false, error: error.message || 'Registration failed' }
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    apiClient.logout()
    setUser(null)
  }

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    register,
    logout,
    isAuthenticated,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}