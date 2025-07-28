"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { ProblemStatement } from "@/components/problem-statement"
import { CodeEditor } from "@/components/code-editor"
import { OpponentCodeModal } from "@/components/opponent-code-modal"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Eye, Clock } from "lucide-react"
import { useRouter } from "next/navigation"

const SAMPLE_PROBLEM = {
  id: "valid-parentheses",
  title: "Valid Parentheses",
  difficulty: "Easy" as const,
  description: `Given a string <code>s</code> containing just the characters <code>'('</code>, <code>')'</code>, <code>'{'</code>, <code>'}'</code>, <code>'['</code> and <code>']'</code>, determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.`,
  examples: [
    {
      input: 's = "()"',
      output: "true",
    },
    {
      input: 's = "()[]{}"',
      output: "true",
    },
    {
      input: 's = "(]"',
      output: "false",
    },
  ],
  constraints: ["1 ≤ s.length ≤ 10⁴", "s consists of parentheses only '()[]{}'."],
  testCases: [
    { input: '"()"', output: "true" },
    { input: '"()[]{}"', output: "true" },
    { input: '"(]"', output: "false", hidden: true },
  ],
}

const SAMPLE_OPPONENT = {
  username: "sarah_codes",
  avatar: "/placeholder.svg?height=32&width=32",
  rating: 1654,
  language: "Python",
  submissionTime: "1 minute ago",
  code: `def isValid(s):
    stack = []
    mapping = {")": "(", "}": "{", "]": "["}
    
    for char in s:
        if char in mapping:
            if not stack or stack.pop() != mapping[char]:
                return False
        else:
            stack.append(char)
    
    return not stack

# Clean stack-based solution
# Time: O(n), Space: O(n)`,
}

export default function PlayFriendPage() {
  const router = useRouter()
  const [leftWidth, setLeftWidth] = useState(40)
  const [isDragging, setIsDragging] = useState(false)
  const [showOpponentCode, setShowOpponentCode] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState("29:45")
  const [opponentStatus, setOpponentStatus] = useState<"coding" | "submitted" | "testing">("coding")
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = useCallback(() => {
    setIsDragging(true)
    document.body.classList.add("dragging")
  }, [])

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || !containerRef.current) return

      const container = containerRef.current
      const containerRect = container.getBoundingClientRect()
      const newLeftWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100

      const constrainedWidth = Math.min(Math.max(newLeftWidth, 0), 100)
      setLeftWidth(constrainedWidth)
    },
    [isDragging],
  )

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
    document.body.classList.remove("dragging")
  }, [])

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)

      return () => {
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
      }
    }
  }, [handleMouseMove, handleMouseUp])

  // Simulate countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        const [minutes, seconds] = prev.split(":").map(Number)
        const totalSeconds = minutes * 60 + seconds - 1
        if (totalSeconds <= 0) return "00:00"
        const newMinutes = Math.floor(totalSeconds / 60)
        const newSeconds = totalSeconds % 60
        return `${newMinutes.toString().padStart(2, "0")}:${newSeconds.toString().padStart(2, "0")}`
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleRunTests = async (code: string, language: string) => {
    await new Promise((resolve) => setTimeout(resolve, 2000))

    return [
      {
        id: "1",
        input: '"()"',
        expected: "true",
        actual: "true",
        passed: true,
        executionTime: 32,
        stdout: "Testing parentheses: ()\nValid parentheses found!",
      },
      {
        id: "2",
        input: '"()[]{}"',
        expected: "true",
        actual: "true",
        passed: true,
        executionTime: 28,
        stdout: "Testing parentheses: ()[]{}\nValid parentheses found!",
      },
    ]
  }

  const handleSubmit = async (code: string, language: string) => {
    await new Promise((resolve) => setTimeout(resolve, 3000))

    setIsSubmitted(true)
    setOpponentStatus("submitted")
    return {
      success: true,
      message: "Solution accepted! Waiting for opponent to finish.",
      testsPassed: 3,
      totalTests: 3,
      executionTime: 30,
      stdout: "All test cases passed!\nWaiting for opponent...\nMatch will end when both players submit.",
    }
  }

  const handleViewSolution = () => {
    // TODO: Implement solution viewing logic
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "coding":
        return "text-green-400"
      case "testing":
        return "text-yellow-400"
      case "submitted":
        return "text-green-400"
      default:
        return "text-slate-400"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "coding":
        return "Coding..."
      case "testing":
        return "Testing..."
      case "submitted":
        return "Submitted"
      default:
        return "Unknown"
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white overflow-hidden">
      {/* Header */}
      <header className="border-b border-slate-700/50 bg-slate-800/80 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push("/")}
                className="text-slate-400 hover:text-slate-200 hover:bg-slate-700/50 px-2"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back
              </Button>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-white">leetbrawl</span>
                <span className="text-slate-400">/</span>
                <span className="text-slate-300">Friend Battle</span>
                <Badge variant="outline" className="border-green-500/50 text-green-400 bg-green-500/10 ml-2">
                  <Clock className="h-3 w-3 mr-1" />
                  {timeRemaining}
                </Badge>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Opponent Status */}
              <Card className="bg-slate-800/50 border-slate-700/50 shadow-sm">
                <CardContent className="px-3 py-1.5">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-5 w-5">
                      <AvatarImage src={SAMPLE_OPPONENT.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="text-xs">SC</AvatarFallback>
                    </Avatar>
                    <div className="text-xs">
                      <div className="font-medium text-slate-200">{SAMPLE_OPPONENT.username}</div>
                      <div className={`${getStatusColor(opponentStatus)}`}>{getStatusText(opponentStatus)}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowOpponentCode(true)}
                className="border-green-500/50 text-green-400 hover:bg-green-500/10 bg-slate-800/50 shadow-sm px-3"
              >
                <Eye className="h-4 w-4 mr-1" />
                View Code
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div ref={containerRef} className="flex h-[calc(100vh-64px)] relative w-full">
        {/* Problem Statement */}
        {leftWidth > 0 && (
          <div style={{ width: `${leftWidth}%` }} className="transition-all duration-75 overflow-hidden">
            <ProblemStatement problem={SAMPLE_PROBLEM} isSubmitted={isSubmitted} onViewSolution={handleViewSolution} />
          </div>
        )}

        {/* Resizable Divider */}
        {leftWidth > 0 && leftWidth < 100 && (
          <div
            className="w-2 bg-slate-700/50 hover:bg-green-500/70 cursor-col-resize transition-colors relative group shadow-sm flex items-center justify-center select-none"
            onMouseDown={handleMouseDown}
          >
            <div className="absolute inset-y-0 -left-2 -right-2 group-hover:bg-green-500/10" />
            <div className="w-1 h-12 bg-slate-600 rounded-full group-hover:bg-green-500 transition-colors shadow-sm" />
          </div>
        )}

        {/* Code Editor */}
        {leftWidth < 100 && (
          <div
            style={{ width: leftWidth === 0 ? "100%" : `${100 - leftWidth}%` }}
            className="transition-all duration-75 overflow-hidden"
          >
            <CodeEditor onRunTests={handleRunTests} onSubmit={handleSubmit} initialLanguage="javascript" />
          </div>
        )}
      </div>

      {/* Opponent Code Modal */}
      <OpponentCodeModal
        isOpen={showOpponentCode}
        onClose={() => setShowOpponentCode(false)}
        opponent={SAMPLE_OPPONENT}
      />
    </div>
  )
}
