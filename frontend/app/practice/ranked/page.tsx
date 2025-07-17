"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { ProblemStatement } from "@/components/problem-statement"
import { CodeEditor } from "@/components/code-editor"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Star, RotateCcw } from "lucide-react"
import { useRouter } from "next/navigation"

const SAMPLE_PROBLEM = {
  id: "binary-tree-max-path",
  title: "Binary Tree Maximum Path Sum",
  difficulty: "Hard" as const,
  description: `A path in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them. A node can only appear in the sequence at most once. Note that the path does not need to pass through the root.

The path sum of a path is the sum of the node's values in the path.

Given the root of a binary tree, return the maximum path sum of any non-empty path.`,
  examples: [
    {
      input: "root = [1,2,3]",
      output: "6",
      explanation: "The optimal path is 2 -> 1 -> 3 with a path sum of 2 + 1 + 3 = 6.",
    },
    {
      input: "root = [-10,9,20,null,null,15,7]",
      output: "42",
      explanation: "The optimal path is 15 -> 20 -> 7 with a path sum of 15 + 20 + 7 = 42.",
    },
  ],
  constraints: ["The number of nodes in the tree is in the range [1, 3 * 10⁴]", "-1000 ≤ Node.val ≤ 1000"],
  testCases: [
    { input: "[1,2,3]", output: "6" },
    { input: "[-10,9,20,null,null,15,7]", output: "42" },
    { input: "[5,4,8,11,null,13,4,7,2,null,null,null,1]", output: "48", hidden: true },
  ],
}

export default function RankedPage() {
  const router = useRouter()
  const [leftWidth, setLeftWidth] = useState(40)
  const [isDragging, setIsDragging] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [currentRating] = useState(1847)
  const [ratingChange, setRatingChange] = useState<number | null>(null)
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

  const handleRunTests = async (code: string, language: string) => {
    await new Promise((resolve) => setTimeout(resolve, 2000))

    return [
      {
        id: "1",
        input: "[1,2,3]",
        expected: "6",
        actual: "6",
        passed: true,
        executionTime: 52,
        stdout: "Processing binary tree...\nCalculating max path sum...\nResult: 6",
      },
      {
        id: "2",
        input: "[-10,9,20,null,null,15,7]",
        expected: "42",
        actual: "42",
        passed: true,
        executionTime: 48,
        stdout: "Processing binary tree...\nCalculating max path sum...\nResult: 42",
      },
    ]
  }

  const handleSubmit = async (code: string, language: string) => {
    await new Promise((resolve) => setTimeout(resolve, 3000))

    setIsSubmitted(true)
    setRatingChange(+23)
    return {
      success: true,
      message: "Solution accepted! Rating increased by +23 points.",
      testsPassed: 3,
      totalTests: 3,
      executionTime: 45,
      stdout: "All test cases passed!\nRating updated: +23 points\nNew rating: 1870",
    }
  }

  const handleViewSolution = () => {
    console.log("Viewing solution")
  }

  const handleRematch = () => {
    setIsSubmitted(false)
    setRatingChange(null)
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
                className="text-slate-400 hover:text-slate-200 px-2"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back
              </Button>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-white">leetbrawl</span>
                <span className="text-slate-400">/</span>
                <span className="text-slate-300">Ranked</span>
                <Badge variant="outline" className="border-green-500/50 text-green-400 bg-green-500/10 ml-2">
                  Competitive
                </Badge>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Rating Display */}
              <Card className="bg-slate-800/50 border-slate-700/50 shadow-sm">
                <CardContent className="px-3 py-1.5">
                  <div className="flex items-center gap-2">
                    <Star className="h-3 w-3 text-yellow-400" />
                    <span className="text-sm font-bold text-white">{currentRating}</span>
                    {ratingChange && (
                      <span className={`text-xs font-medium ${ratingChange > 0 ? "text-green-400" : "text-red-400"}`}>
                        {ratingChange > 0 ? "+" : ""}
                        {ratingChange}
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
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
