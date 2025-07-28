"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Play, Send, CheckCircle, XCircle, Clock, ChevronUp } from "lucide-react"

interface CodeEditorProps {
  onRunTests?: (code: string, language: string) => Promise<TestResult[]>
  onSubmit?: (code: string, language: string) => Promise<SubmissionResult>
  initialCode?: string
  initialLanguage?: string
}

interface TestResult {
  id: string
  input: string
  expected: string
  actual: string
  passed: boolean
  executionTime: number
  stdout?: string
}

interface SubmissionResult {
  success: boolean
  message: string
  testsPassed: number
  totalTests: number
  executionTime: number
  stdout?: string
}

const LANGUAGE_TEMPLATES = {
  javascript: `function solution(nums, target) {
    // Your code here
    return [];
}`,
  python: `def solution(nums, target):
    # Your code here
    print(f"Input: {nums}, {target}")
    pass`,
  cpp: `#include <vector>
#include <iostream>
using namespace std;

class Solution {
public:
    vector<int> solution(vector<int>& nums, int target) {
        // Your code here
        cout << "Input received" << endl;
        return {};
    }
};`,
  java: `class Solution {
    public int[] solution(int[] nums, int target) {
        // Your code here
        System.out.println("Input received");
        return new int[]{};
    }
}`,
  csharp: `public class Solution {
    public int[] TwoSum(int[] nums, int target) {
        // Your code here
        Console.WriteLine("Input received");
        return new int[]{};
    }
}`,
  go: `func solution(nums []int, target int) []int {
    // Your code here
    fmt.Println("Input received")
    return []int{}
}`,
}

export function CodeEditor({ onRunTests, onSubmit, initialCode, initialLanguage = "javascript" }: CodeEditorProps) {
  const [language, setLanguage] = useState(initialLanguage)
  const [code, setCode] = useState(initialCode || LANGUAGE_TEMPLATES[language as keyof typeof LANGUAGE_TEMPLATES])
  const [isRunning, setIsRunning] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [testResults, setTestResults] = useState<TestResult[]>([])
  const [submissionResult, setSubmissionResult] = useState<SubmissionResult | null>(null)
  const [showResults, setShowResults] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (!initialCode) {
      setCode(LANGUAGE_TEMPLATES[language as keyof typeof LANGUAGE_TEMPLATES])
    }
  }, [language, initialCode])

  const handleRunTests = async () => {
    if (!onRunTests) return

    setIsRunning(true)
    setShowResults(true)
    try {
      const results = await onRunTests(code, language)
      setTestResults(results)
    } catch (error) {
      // TODO: Handle test execution errors
    } finally {
      setIsRunning(false)
    }
  }

  const handleSubmit = async () => {
    if (!onSubmit) return

    setIsSubmitting(true)
    setShowResults(true)
    try {
      const result = await onSubmit(code, language)
      setSubmissionResult(result)
    } catch (error) {
      setSubmissionResult({
        success: false,
        message: "Submission failed. Please try again.",
        testsPassed: 0,
        totalTests: 0,
        executionTime: 0
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Tab") {
      e.preventDefault()
      const textarea = textareaRef.current
      if (!textarea) return

      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      const newCode = code.substring(0, start) + "  " + code.substring(end)
      setCode(newCode)

      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 2
      }, 0)
    }
  }

  const lineCount = code.split("\n").length

  return (
    <div className="h-full flex flex-col bg-slate-900">
      {/* Header */}
      <div className="border-b border-slate-700/50 bg-slate-800/50">
        <div className="flex items-center justify-between p-3">
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="w-36 bg-slate-800 border-slate-600 text-slate-200 h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-600">
              <SelectItem value="javascript">JavaScript</SelectItem>
              <SelectItem value="python">Python</SelectItem>
              <SelectItem value="cpp">C++</SelectItem>
              <SelectItem value="java">Java</SelectItem>
              <SelectItem value="csharp">C#</SelectItem>
              <SelectItem value="go">Go</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleRunTests}
              disabled={isRunning}
              className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-slate-800/50 h-8 px-3"
            >
              {isRunning ? <Clock className="h-3 w-3 mr-1 animate-spin" /> : <Play className="h-3 w-3 mr-1" />}
              Run Tests
            </Button>
            <Button
              size="sm"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-green-600 hover:bg-green-500 text-white shadow-lg h-8 px-3"
            >
              {isSubmitting ? <Clock className="h-3 w-3 mr-1 animate-spin" /> : <Send className="h-3 w-3 mr-1" />}
              Submit
            </Button>
          </div>
        </div>
      </div>

      {/* Editor Area */}
      <div className="flex-1 relative">
        <div className="absolute inset-0 flex">
          {/* Line Numbers */}
          <div className="w-12 bg-slate-800/50 border-r border-slate-700/50 text-slate-500 text-sm font-mono p-3 select-none">
            {Array.from({ length: lineCount }, (_, i) => (
              <div key={i + 1} className="leading-6 text-right pr-2">
                {i + 1}
              </div>
            ))}
          </div>

          {/* Code Editor */}
          <div className="flex-1">
            <textarea
              ref={textareaRef}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full h-full bg-transparent text-slate-100 font-mono text-sm p-3 border-none outline-none resize-none leading-6"
              placeholder="Write your solution here..."
              spellCheck={false}
            />
          </div>
        </div>
      </div>

      {/* Results Panel - Slide up from bottom */}
      <div
        className={`transition-all duration-300 ease-in-out ${
          showResults ? "h-80" : "h-0"
        } overflow-hidden border-t border-slate-700/50 bg-slate-800/80`}
      >
        <div className="h-full flex flex-col">
          {/* Results Header */}
          <div className="flex items-center justify-between p-3 border-b border-slate-700/50">
            <h3 className="font-semibold text-slate-200 text-sm">Results</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowResults(false)}
              className="text-slate-400 hover:text-slate-200 h-6 w-6 p-0"
            >
              <ChevronUp className="h-3 w-3" />
            </Button>
          </div>

          {/* Results Content */}
          <ScrollArea className="flex-1">
            <div className="p-3 space-y-3">
              {/* Submission Result */}
              {submissionResult && (
                <Alert
                  className={`border shadow-sm ${
                    submissionResult.success ? "border-green-500/50 bg-green-500/10" : "border-red-500/50 bg-red-500/10"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {submissionResult.success ? (
                      <CheckCircle className="h-4 w-4 text-green-400" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-400" />
                    )}
                    <AlertDescription className={submissionResult.success ? "text-green-300" : "text-red-300"}>
                      {submissionResult.message}
                    </AlertDescription>
                  </div>
                  <div className="mt-2 text-sm text-slate-400">
                    Tests Passed: {submissionResult.testsPassed}/{submissionResult.totalTests} | Execution Time:{" "}
                    {submissionResult.executionTime}ms
                  </div>
                  {submissionResult.stdout && (
                    <div className="mt-2">
                      <div className="text-xs text-slate-500 mb-1">Output:</div>
                      <pre className="text-xs bg-slate-900/50 p-2 rounded font-mono text-slate-300 border border-slate-700/50">
                        {submissionResult.stdout}
                      </pre>
                    </div>
                  )}
                </Alert>
              )}

              {/* Test Results */}
              {testResults.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-semibold text-slate-200 text-sm">Test Cases</h4>
                  {testResults.map((result) => (
                    <Card
                      key={result.id}
                      className={`border shadow-sm ${
                        result.passed ? "border-green-500/30 bg-green-500/5" : "border-red-500/30 bg-red-500/5"
                      }`}
                    >
                      <CardContent className="p-3">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            {result.passed ? (
                              <CheckCircle className="h-3 w-3 text-green-400" />
                            ) : (
                              <XCircle className="h-3 w-3 text-red-400" />
                            )}
                            <span
                              className={`font-medium text-sm ${result.passed ? "text-green-300" : "text-red-300"}`}
                            >
                              {result.passed ? "Passed" : "Failed"}
                            </span>
                          </div>
                          <span className="text-xs text-slate-500">{result.executionTime}ms</span>
                        </div>

                        <div className="space-y-1 font-mono text-xs">
                          <div>
                            <span className="text-slate-500">Input: </span>
                            <span className="text-green-400">{result.input}</span>
                          </div>
                          <div>
                            <span className="text-slate-500">Expected: </span>
                            <span className="text-green-400">{result.expected}</span>
                          </div>
                          <div>
                            <span className="text-slate-500">Actual: </span>
                            <span className={result.passed ? "text-green-400" : "text-red-400"}>{result.actual}</span>
                          </div>
                          {result.stdout && (
                            <div>
                              <span className="text-slate-500">Output: </span>
                              <pre className="text-slate-300 bg-slate-900/50 p-2 rounded mt-1 text-xs border border-slate-700/50">
                                {result.stdout}
                              </pre>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {/* Loading States */}
              {(isRunning || isSubmitting) && (
                <div className="flex items-center justify-center py-6">
                  <div className="flex items-center gap-2 text-slate-400">
                    <Clock className="h-4 w-4 animate-spin" />
                    <span className="text-sm">{isRunning ? "Running tests..." : "Submitting solution..."}</span>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}