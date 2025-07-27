"use client"

import { Button } from "@/components/ui/button"
import { Code2 } from "lucide-react"

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-6 flex items-center space-x-2">
          <div className="h-6 w-6 bg-primary rounded flex items-center justify-center">
            <Code2 className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
            leetbrawl
          </span>
        </div>
        <nav className="flex flex-1 items-center space-x-6 text-sm font-medium">
          <a href="#features" className="transition-colors hover:text-primary">
            Features
          </a>
          <a href="#leaderboard" className="transition-colors hover:text-primary">
            Leaderboard
          </a>
        </nav>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm">
            Sign In
          </Button>
          <Button size="sm">Start Competing</Button>
        </div>
      </div>
    </header>
  )
} 