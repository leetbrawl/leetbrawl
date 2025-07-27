"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Code2, ArrowRight, Timer } from "lucide-react"
import { useRouter } from "next/navigation"
import { TrophyIcon } from "@/components/ui/trophy-icon"

export default function Hero() {
  const router = useRouter()

  const handleStartMatch = () => {
    router.push("/practice/ranked")
  }

  return (
    <section className="py-20 lg:py-32 relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
      {/* Tech Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(16, 185, 129, 0.3) 0%, transparent 50%),
            linear-gradient(45deg, transparent 40%, rgba(59, 130, 246, 0.1) 50%, transparent 60%),
            linear-gradient(-45deg, transparent 40%, rgba(16, 185, 129, 0.1) 50%, transparent 60%)
          `,
          backgroundSize: '100% 100%, 100% 100%, 60px 60px, 60px 60px',
          backgroundPosition: '0 0, 0 0, 0 0, 30px 30px'
        }}></div>
        {/* Code-like grid pattern */}
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Prep Smarter.
                <br />
                <span className="text-[#10b981]">Brawl Harder.</span>
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed max-w-lg">
                Tired of solo grinding? LeetBrawl turns interview prep into real-time 1v1 coding battles. Challenge friends, match with nearby students, or brawl against coders from rival schools. Fast, fun, and built for getting better.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={handleStartMatch}
                className="bg-[#10b981] hover:bg-[#059669] text-white px-8 py-3 text-lg font-medium"
              >
                Start a Match
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Right Mockup */}
          <div className="relative">
            <Card className="bg-gray-800 border-gray-600 shadow-2xl">
              <CardContent className="p-0">
                {/* Mockup Header */}
                <div className="border-b border-gray-600 px-4 py-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <TrophyIcon className="h-6 w-6 text-[#10b981]" />
                      <span className="font-semibold text-white text-xl">Live Battle</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Timer className="h-5 w-5 text-orange-400" />
                      <span className="text-orange-400 font-mono text-lg">12:34</span>
                    </div>
                  </div>
                </div>

                {/* Mockup Content */}
                <div className="p-6 space-y-6">
                  {/* Problem Title */}
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-white">Binary Tree Maximum Path Sum</h3>
                    <div className="flex gap-2">
                      <Badge className="bg-red-500/10 text-red-400 border-red-500/20">Hard</Badge>
                      <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20">Trees</Badge>
                    </div>
                  </div>

                  {/* Players */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6 bg-blue-500">
                          <AvatarFallback className="text-xs font-semibold">NF</AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium text-white">noforget (You)</span>
                        <div className="h-2 w-2 rounded-full bg-[#10b981]"></div>
                        <Badge className="bg-blue-500/20 text-blue-300 text-xs">C++</Badge>
                      </div>
                      <div className="bg-gray-700 rounded p-3 font-mono text-sm space-y-1">
                        <div className="text-gray-400">// Your solution</div>
                        <div><span className="text-blue-400">class</span> <span className="text-yellow-400">Solution</span> <span className="text-gray-300">{"{"}</span></div>
                        <div className="ml-2"><span className="text-blue-400">int</span> <span className="text-yellow-400">maxPathSum</span><span className="text-gray-300">(</span><span className="text-green-400">TreeNode*</span> <span className="text-gray-300">root) {"{"}</span></div>
                        <div className="ml-4"><span className="text-blue-400">int</span> <span className="text-yellow-400">maxSum</span> <span className="text-gray-300">=</span> <span className="text-purple-400">INT_MIN</span><span className="text-gray-300">;</span></div>
                        <div className="ml-4"><span className="text-yellow-400">dfs</span><span className="text-gray-300">(root, maxSum);</span></div>
                        <div className="ml-4"><span className="text-blue-400">return</span> <span className="text-gray-300">maxSum;</span></div>
                        <div className="ml-2"><span className="text-gray-300">{"}"}</span></div>
                        <div><span className="text-gray-300">{"}"}</span></div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6 bg-purple-500">
                          <AvatarFallback className="text-xs font-semibold">BM</AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium text-white">bigmama44</span>
                        <div className="h-2 w-2 rounded-full bg-orange-400 animate-pulse"></div>
                        <Badge className="bg-orange-500/20 text-orange-300 text-xs">Java</Badge>
                      </div>
                      <div className="bg-gray-700 rounded p-3 font-mono text-sm space-y-1">
                        <div className="text-gray-400">// Opponent typing...</div>
                        <div><span className="text-blue-400">class</span> <span className="text-yellow-400">Solution</span> <span className="text-gray-300">{"{"}</span></div>
                        <div className="ml-2"><span className="text-blue-400">public</span> <span className="text-blue-400">int</span> <span className="text-yellow-400">maxPathSum</span><span className="text-gray-300">(</span><span className="text-green-400">TreeNode</span> <span className="text-gray-300">root) {"{"}</span></div>
                        <div className="ml-4"><span className="text-blue-400">if</span><span className="text-gray-300">(root ==</span><span className="text-purple-400">null</span><span className="text-gray-300">)</span> <span className="text-blue-400">return</span> <span className="text-purple-400">0</span><span className="text-gray-300">;</span></div>
                        <div className="ml-4"><span className="text-blue-400">int</span><span className="text-gray-300">[] maxSum = {"{"}</span><span className="text-green-400">Integer.MIN_VALUE</span><span className="text-gray-300">{"}"};</span></div>
                        <div className="ml-4"><span className="text-yellow-400">dfs</span><span className="text-gray-300">(root, maxSum);</span></div>
                        <div className="ml-4"><span className="text-blue-400">return</span> <span className="text-gray-300">maxSum[0];</span></div>
                        <div className="ml-2"><span className="text-gray-300">{"}"}</span></div>
                        <div><span className="text-gray-300">{"}"}</span></div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
} 