"use client"

import { Button } from "@/components/ui/button"
import { Code2, User, LogOut } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import Link from "next/link"

export default function Header() {
  const { user, isAuthenticated, logout, isLoading } = useAuth()

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-gray-900/40 border-b border-gray-700/30 shadow-lg shadow-black/5">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 bg-[#10b981] rounded-lg flex items-center justify-center shadow-lg">
              <Code2 className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              leetbrawl
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-300 hover:text-white transition-colors duration-200 font-medium">
              Features
            </a>
            <a href="#leaderboard" className="text-gray-300 hover:text-white transition-colors duration-200 font-medium">
              Leaderboard
            </a>
            
            {!isLoading && (
              <>
                {isAuthenticated && user ? (
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-gray-300">
                      <User className="h-4 w-4" />
                      <span className="font-medium">{user.username}</span>
                      <span className="text-sm text-gray-400">({user.rating} ELO)</span>
                    </div>
                    <Button
                      onClick={logout}
                      variant="outline"
                      size="sm"
                      className="border-gray-700/50 text-gray-300 hover:bg-gray-800/50 hover:text-white bg-transparent backdrop-blur-sm transition-all duration-200"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <Link href="/signin">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-700/50 text-gray-300 hover:bg-gray-800/50 hover:text-white bg-transparent backdrop-blur-sm transition-all duration-200"
                      >
                        Sign In
                      </Button>
                    </Link>
                    <Link href="/signup">
                      <Button
                        size="sm"
                        className="bg-[#10b981] hover:bg-[#059669] text-white transition-all duration-200"
                      >
                        Sign Up
                      </Button>
                    </Link>
                  </div>
                )}
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
} 