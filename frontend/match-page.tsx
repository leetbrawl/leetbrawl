"use client"

import { useState, useRef, useCallback } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Clock, Eye, EyeOff, Trophy, Zap } from "lucide-react"

export default function MatchPage() {
  const [leftWidth, setLeftWidth] = useState(40)
  const [isDragging, setIsDragging] = useState(false)
  const [showOpponentCode, setShowOpponentCode] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = useCallback(() => {
    setIsDragging(true)
  }, [])

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || !containerRef.current) return

      const container = containerRef.current
      const containerRect = container.getBoundingClientRect()
      const newLeftWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100

      // Constrain between 20% and 80%
      const constrainedWidth = Math.min(Math.max(newLeftWidth, 20), 80)
      setLeftWidth(constrainedWidth)
    },
    [isDragging],
  )

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  // Add event listeners
  useState(() => {
    if (typeof window !== "undefined") {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)

      return () => {
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
      }
    }
  })

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                <span className="font-semibold text-lg">Competitive Match</span>
              </div>
              <Badge variant="outline" className="border-green-500/50 text-green-400">
                <Clock className="h-3 w-3 mr-1" />
                45:23
              </Badge>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-sm font-medium">vs. alex_coder</div>
                  <div className="text-xs text-gray-400">Rating: 1847</div>
                </div>
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
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
                onClick={() => setShowOpponentCode(!showOpponentCode)}
                className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10"
              >
                {showOpponentCode ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
                {showOpponentCode ? "Hide" : "View"} Opponent Code
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div ref={containerRef} className="flex h-[calc(100vh-80px)] relative">
        {/* Problem Statement - Left Side */}
        <div className="flex flex-col border-r border-gray-800 bg-gray-900/30" style={{ width: `${leftWidth}%` }}>
          <div className="p-6 flex-1 overflow-y-auto">
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-bold text-gray-100">Two Sum</CardTitle>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/50">Easy</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-gray-300 leading-relaxed">
                  <p>
                    Given an array of integers <code className="bg-gray-800 px-2 py-1 rounded text-blue-400">nums</code>{" "}
                    and an integer <code className="bg-gray-800 px-2 py-1 rounded text-blue-400">target</code>, return
                    indices of the two numbers such that they add up to target.
                  </p>
                  <p className="mt-3">
                    You may assume that each input would have exactly one solution, and you may not use the same element
                    twice.
                  </p>
                  <p className="mt-3">You can return the answer in any order.</p>
                </div>

                <Separator className="bg-gray-800" />

                <div>
                  <h3 className="font-semibold text-gray-200 mb-3">Example 1:</h3>
                  <div className="bg-gray-800/50 p-4 rounded-lg font-mono text-sm">
                    <div className="text-gray-400">Input:</div>
                    <div className="text-blue-400">nums = [2,7,11,15], target = 9</div>
                    <div className="text-gray-400 mt-2">Output:</div>
                    <div className="text-green-400">[0,1]</div>
                    <div className="text-gray-400 mt-2">Explanation:</div>
                    <div className="text-gray-300">Because nums[0] + nums[1] == 9, we return [0, 1].</div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-200 mb-3">Example 2:</h3>
                  <div className="bg-gray-800/50 p-4 rounded-lg font-mono text-sm">
                    <div className="text-gray-400">Input:</div>
                    <div className="text-blue-400">nums = [3,2,4], target = 6</div>
                    <div className="text-gray-400 mt-2">Output:</div>
                    <div className="text-green-400">[1,2]</div>
                  </div>
                </div>

                <Separator className="bg-gray-800" />

                <div>
                  <h3 className="font-semibold text-gray-200 mb-3">Constraints:</h3>
                  <ul className="text-gray-300 space-y-1 text-sm">
                    <li>• 2 ≤ nums.length ≤ 10⁴</li>
                    <li>• -10⁹ ≤ nums[i] ≤ 10⁹</li>
                    <li>• -10⁹ ≤ target ≤ 10⁹</li>
                    <li>• Only one valid answer exists.</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Resizable Divider */}
        <div
          className="w-1 bg-gray-800 hover:bg-blue-500/50 cursor-col-resize transition-colors relative group"
          onMouseDown={handleMouseDown}
        >
          <div className="absolute inset-y-0 -left-1 -right-1 group-hover:bg-blue-500/20" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-1 h-8 bg-gray-600 rounded-full group-hover:bg-blue-500/70" />
          </div>
        </div>

        {/* Code Editor - Right Side */}
        <div className="flex flex-col bg-gray-950" style={{ width: `${100 - leftWidth}%` }}>
          {/* Editor Header */}
          <div className="border-b border-gray-800 p-4 bg-gray-900/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <select className="bg-gray-800 border border-gray-700 rounded px-3 py-1 text-sm text-gray-300">
                  <option>Python3</option>
                  <option>JavaScript</option>
                  <option>Java</option>
                  <option>C++</option>
                </select>
                <Badge variant="outline" className="border-yellow-500/50 text-yellow-400">
                  <Zap className="h-3 w-3 mr-1" />
                  Auto-save
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="border-gray-700 text-gray-300 bg-transparent">
                  Run Code
                </Button>
                <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                  Submit
                </Button>
              </div>
            </div>
          </div>

          {/* Code Editor Area */}
          <div className="flex-1 relative">
            <textarea
              className="w-full h-full bg-gray-950 text-gray-100 font-mono text-sm p-4 border-none outline-none resize-none"
              placeholder="# Write your solution here..."
              defaultValue={`def twoSum(nums, target):
    """
    :type nums: List[int]
    :type target: int
    :rtype: List[int]
    """
    # Your code here
    pass`}
            />

            {/* Line Numbers */}
            <div className="absolute left-0 top-0 w-12 h-full bg-gray-900/50 border-r border-gray-800 text-gray-500 text-sm font-mono p-4 pointer-events-none">
              {Array.from({ length: 20 }, (_, i) => (
                <div key={i + 1} className="leading-6">
                  {i + 1}
                </div>
              ))}
            </div>
          </div>

          {/* Opponent Code Overlay */}
          {showOpponentCode && (
            <div className="absolute inset-0 bg-gray-950/95 backdrop-blur-sm flex items-center justify-center">
              <Card className="w-4/5 max-w-2xl bg-gray-900 border-gray-700">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">alex_coder's Solution</CardTitle>
                    <Button variant="ghost" size="sm" onClick={() => setShowOpponentCode(false)}>
                      <EyeOff className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-800/50 p-4 rounded-lg font-mono text-sm text-gray-300 blur-sm select-none">
                    <div>def twoSum(nums, target):</div>
                    <div> hash_map = {"{}"}</div>
                    <div> for i, num in enumerate(nums):</div>
                    <div> complement = target - num</div>
                    <div> if complement in hash_map:</div>
                    <div> return [hash_map[complement], i]</div>
                    <div> hash_map[num] = i</div>
                  </div>
                  <p className="text-gray-400 text-sm mt-3 text-center">Code is blurred during active match</p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
