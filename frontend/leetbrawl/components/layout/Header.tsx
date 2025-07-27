"use client"

import { Button } from "@/components/ui/button"
import { Code2 } from "lucide-react"

export default function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-gray-900/40 border-b border-gray-700/30 shadow-lg shadow-black/5">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-[#10b981] rounded-lg flex items-center justify-center shadow-lg">
              <Code2 className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              leetbrawl
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-300 hover:text-white transition-colors duration-200 font-medium">
              Features
            </a>
            <a href="#leaderboard" className="text-gray-300 hover:text-white transition-colors duration-200 font-medium">
              Leaderboard
            </a>
            <Button
              variant="outline"
              size="sm"
              className="border-gray-700/50 text-gray-300 hover:bg-gray-800/50 hover:text-white bg-transparent backdrop-blur-sm transition-all duration-200"
            >
              Sign In
            </Button>
          </nav>
        </div>
      </div>
    </header>
  )
} 