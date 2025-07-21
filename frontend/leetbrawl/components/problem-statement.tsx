"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CheckCircle, Trophy, ChevronDown, ChevronUp } from "lucide-react"

interface ProblemStatementProps {
  problem: {
    id: string
    title: string
    difficulty: "Easy" | "Medium" | "Hard"
    description: string
    examples: Array<{
      input: string
      output: string
      explanation?: string
    }>
    constraints: string[]
    testCases: Array<{
      input: string
      output: string
      hidden?: boolean
    }>
  }
  isSubmitted?: boolean
  onViewSolution?: () => void
}

export function ProblemStatement({ problem, isSubmitted = false, onViewSolution }: ProblemStatementProps) {
  const [showAllTestCases, setShowAllTestCases] = useState(false)

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-500/10 text-green-400 border-green-500/30"
      case "Medium":
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/30"
      case "Hard":
        return "bg-red-500/10 text-red-400 border-red-500/30"
      default:
        return "bg-slate-500/10 text-slate-400 border-slate-500/30"
    }
  }

  const visibleTestCases = showAllTestCases
    ? problem.testCases
    : problem.testCases.filter((tc) => !tc.hidden).slice(0, 2)

  return (
    <Card className="h-full bg-slate-800/50 border-slate-700/50 shadow-xl">
      <CardHeader className="pb-4 border-b border-slate-700/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CardTitle className="text-xl font-bold text-white">{problem.title}</CardTitle>
            <Badge className={getDifficultyColor(problem.difficulty)}>{problem.difficulty}</Badge>
          </div>
          {isSubmitted && (
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-400" />
              <Button
                variant="outline"
                size="sm"
                onClick={onViewSolution}
                className="border-green-500/30 text-green-400 hover:bg-green-500/10 bg-slate-800/50"
              >
                <Trophy className="h-4 w-4 mr-2" />
                View Solution
              </Button>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <ScrollArea className="h-[calc(100vh-200px)] px-6">
          <div className="space-y-6 pb-6 pt-6">
            {/* Description */}
            <div className="prose prose-invert max-w-none">
              <div
                className="text-slate-300 leading-relaxed text-[15px]"
                dangerouslySetInnerHTML={{
                  __html: problem.description.replace(
                    /`([^`]+)`/g,
                    '<code class="bg-slate-700/60 px-2 py-1 rounded text-green-400 font-mono text-sm border border-slate-600/50">$1</code>',
                  ),
                }}
              />
            </div>

            <Separator className="bg-slate-700/50" />

            {/* Examples */}
            <div className="space-y-5">
              <h3 className="font-semibold text-slate-200 text-lg">Examples</h3>
              {problem.examples.map((example, index) => (
                <div key={index} className="space-y-3">
                  <h4 className="font-medium text-slate-300 text-base">Example {index + 1}:</h4>
                  <div className="bg-slate-700/30 p-4 rounded-lg border border-slate-600/50 shadow-sm">
                    <div className="font-mono text-sm space-y-2">
                      <div className="flex flex-wrap items-start gap-2">
                        <span className="text-slate-400 font-medium">Input:</span>
                        <span className="text-green-400">{example.input}</span>
                      </div>
                      <div className="flex flex-wrap items-start gap-2">
                        <span className="text-slate-400 font-medium">Output:</span>
                        <span className="text-green-400">{example.output}</span>
                      </div>
                      {example.explanation && (
                        <div className="flex flex-wrap items-start gap-2 pt-1">
                          <span className="text-slate-400 font-medium">Explanation:</span>
                          <span className="text-slate-300">{example.explanation}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Separator className="bg-slate-700/50" />

            {/* Constraints */}
            <div className="space-y-4">
              <h3 className="font-semibold text-slate-200 text-lg">Constraints</h3>
              <ul className="text-slate-300 space-y-2 text-[15px]">
                {problem.constraints.map((constraint, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-green-400 mt-1.5 text-xs">●</span>
                    <span className="font-mono">{constraint}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Separator className="bg-slate-700/50" />

            {/* Test Cases */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-slate-200 text-lg">Test Cases</h3>
                {problem.testCases.length > 2 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowAllTestCases(!showAllTestCases)}
                    className="text-green-400 hover:text-green-300 hover:bg-green-500/10"
                  >
                    {showAllTestCases ? (
                      <>
                        <ChevronUp className="h-4 w-4 mr-1" />
                        Show Less
                      </>
                    ) : (
                      <>
                        <ChevronDown className="h-4 w-4 mr-1" />
                        Show All ({problem.testCases.length})
                      </>
                    )}
                  </Button>
                )}
              </div>
              <div className="space-y-3">
                {visibleTestCases.map((testCase, index) => (
                  <div key={index} className="bg-slate-700/20 p-4 rounded-lg border border-slate-600/30 shadow-sm">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-medium text-slate-400">Test Case {index + 1}</span>
                      {testCase.hidden && (
                        <Badge variant="outline" className="text-xs border-slate-600 text-slate-400 bg-slate-800/50">
                          Hidden
                        </Badge>
                      )}
                    </div>
                    <div className="font-mono text-sm space-y-2">
                      <div className="flex flex-wrap items-start gap-2">
                        <span className="text-slate-400 font-medium">Input:</span>
                        <span className="text-green-400">{testCase.input}</span>
                      </div>
                      <div className="flex flex-wrap items-start gap-2">
                        <span className="text-slate-400 font-medium">Expected:</span>
                        <span className="text-green-400">{testCase.output}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
