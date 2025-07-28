"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { ProblemStatement } from "@/components/problem-statement"
import { CodeEditor } from "@/components/code-editor"
import { OpponentCodeModal } from "@/components/opponent-code-modal"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Clock, Eye, Trophy } from "lucide-react"

// Sample data
const SAMPLE_PROBLEM = {
  id: "two-sum",
  title: "Two Sum",
  difficulty: "Easy" as const,
  description: `Given an array of integers <code>nums</code> and an integer <code>target</code>, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
  examples: [
    {
      input: "nums = [2,7,11,15], target = 9",
      output: "[0,1]",
      explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
    },
    {
      input: "nums = [3,2,4], target = 6",
      output: "[1,2]",
    },
  ],
  constraints: [
    "2 ≤ nums.length ≤ 10⁴",
    "-10⁹ ≤ nums[i] ≤ 10⁹",
    "-10⁹ ≤ target ≤ 10⁹",
    "Only one valid answer exists.",
  ],
  testCases: [
    { input: "[2,7,11,15], 9", output: "[0,1]" },
    { input: "[3,2,4], 6", output: "[1,2]" },
    { input: "[3,3], 6", output: "[0,1]", hidden: true },
  ],
}

const SAMPLE_OPPONENT = {
  username: "alex_coder",
  avatar: "/placeholder.svg?height=32&width=32",
  rating: 1847,
  language: "Python",
  submissionTime: "2 minutes ago",
  code: `def twoSum(nums, target):
    hash_map = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in hash_map:
            return [hash_map[complement], i]
        hash_map[num] = i
    return []

# Time Complexity: O(n)
# Space Complexity: O(n)
# This solution uses a hash map to store the complement
# of each number as we iterate through the array.`,
}

export default function MatchPage() {
  const params = useParams()
  const [leftWidth, setLeftWidth] = useState(40)
  const [isDragging, setIsDragging] = useState(false)
  const [showOpponentCode, setShowOpponentCode] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState("45:23")

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
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    return [
      {
        id: "1",
        input: "[2,7,11,15], 9",
        expected: "[0,1]",
        actual: "[0,1]",
        passed: true,
        executionTime: 45,
      },
      {
        id: "2",
        input: "[3,2,4], 6",
        expected: "[1,2]",
        actual: "[1,2]",
        passed: true,
        executionTime: 38,
      },
    ]
  }

  const handleSubmit = async (code: string, language: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 3000))

    setIsSubmitted(true)
    return {
      success: true,
      message: "Solution accepted! All test cases passed.",
      testsPassed: 3,
      totalTests: 3,
      executionTime: 42,
    }
  }

  const handleViewSolution = () => {
    // TODO: Implement solution viewing logic
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                <span className="font-semibold text-lg">Match #{params.matchId}</span>
              </div>
              <Badge variant="outline" className="border-green-500/50 text-green-400">
                <Clock className="h-3 w-3 mr-1" />
                {timeRemaining}
              </Badge>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-sm font-medium">vs. {SAMPLE_OPPONENT.username}</div>
                  <div className="text-xs text-gray-400">Rating: {SAMPLE_OPPONENT.rating}</div>
                </div>
                <Avatar className="h-8 w-8">
                  <AvatarImage src={SAMPLE_OPPONENT.avatar || "/placeholder.svg"} />
                  <AvatarFallback>AC</AvatarFallback>
                </Avatar>
                <div className="flex items-center gap-1">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <span className="text-xs text-gray-400">Online</span>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowOpponentCode(true)}
                className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10"
              >
                <Eye className="h-4 w-4 mr-2" />
                View Opponent Code
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-80px)]">
        {/* Problem Statement */}
        <div style={{ width: `${leftWidth}%` }} className="border-r border-gray-800">
          <ProblemStatement problem={SAMPLE_PROBLEM} isSubmitted={isSubmitted} onViewSolution={handleViewSolution} />
        </div>

        {/* Resizable Divider */}
        <div className="w-1 bg-gray-800 hover:bg-blue-500/50 cursor-col-resize transition-colors" />

        {/* Code Editor */}
        <div style={{ width: `${100 - leftWidth}%` }}>
          <CodeEditor onRunTests={handleRunTests} onSubmit={handleSubmit} initialLanguage="javascript" />
        </div>
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
