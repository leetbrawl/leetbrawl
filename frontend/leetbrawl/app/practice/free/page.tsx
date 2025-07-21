"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { ProblemStatement } from "@/components/problem-statement"
import { CodeEditor } from "@/components/code-editor"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, RotateCcw } from "lucide-react"
import { useRouter } from "next/navigation"

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

export default function FreePlayPage() {
  const router = useRouter()
  const [leftWidth, setLeftWidth] = useState(40)
  const [isDragging, setIsDragging] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
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

      // Allow full range from 0% to 100%
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

  const handleRunTests = async (code: string, language: string) => {
    await new Promise((resolve) => setTimeout(resolve, 2000))

    return [
      {
        id: "1",
        input: "[2,7,11,15], 9",
        expected: "[0,1]",
        actual: "[0,1]",
        passed: true,
        executionTime: 45,
        stdout: "Input: [2,7,11,15] 9\nProcessing array...\nFound solution!",
      },
      {
        id: "2",
        input: "[3,2,4], 6",
        expected: "[1,2]",
        actual: "[1,2]",
        passed: true,
        executionTime: 38,
        stdout: "Input: [3,2,4] 6\nProcessing array...\nFound solution!",
      },
    ]
  }

  const handleSubmit = async (code: string, language: string) => {
    await new Promise((resolve) => setTimeout(resolve, 3000))

    setIsSubmitted(true)
    return {
      success: true,
      message: "Solution accepted! All test cases passed.",
      testsPassed: 3,
      totalTests: 3,
      executionTime: 42,
      stdout: "All test cases executed successfully!\nGreat job!",
    }
  }

  const handleViewSolution = () => {
    console.log("Viewing solution")
  }

  const handleRematch = () => {
    setIsSubmitted(false)
    // In a real app, this would fetch a new problem
  }

  return (
    <div className="min-h-screen bg-slate-900 overflow-hidden">
      {/* Header */}
      <header className="border-b border-slate-700/50 bg-slate-800/80 backdrop-blur-sm">
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
                <span className="text-slate-300">Free Play</span>
                <Badge variant="outline" className="border-green-500/50 text-green-400 bg-green-500/10 ml-2">
                  Practice
                </Badge>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleRematch}
              className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-slate-800/50 px-3"
            >
              <RotateCcw className="h-4 w-4 mr-1" />
              Rematch
            </Button>
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
    </div>
  )
}
