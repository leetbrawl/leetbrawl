"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Code2, ArrowRight, Timer, TrophyIcon } from "lucide-react"
import { useRouter } from "next/navigation"

export default function Hero() {
  const router = useRouter()

  const handleStartMatch = () => {
    router.push("/practice/ranked")
  }

  return (
    <section className="container flex min-h-[calc(100vh-3.5rem)] max-w-screen-2xl flex-col items-center justify-center space-y-8 py-24 text-center md:py-32">
      <div className="space-y-4">
        <Badge className="bg-primary/10 text-primary border-primary/20 w-fit text-xs font-medium">
          Real-time competitive coding
        </Badge>
        <h1 className="bg-gradient-to-br from-foreground from-30% via-foreground/90 to-foreground/70 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl lg:text-7xl">
          Code faster.
          <br />
          Think smarter.
          <br />
          <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            Win more.
          </span>
        </h1>
        <p className="mx-auto max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          Face off against other developers in real-time 1v1 coding battles. Solve the same algorithmic problems simultaneously and see who comes out on top.
        </p>
      </div>
      
      <div className="flex gap-4">
        <Button size="lg" onClick={handleStartMatch} className="bg-primary hover:bg-primary/90">
          Start a Match
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      {/* Live Battle Preview */}
      <div className="mt-16 w-full max-w-4xl">
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardContent className="p-0">
            {/* Mockup Header */}
            <div className="border-b border-border/50 px-4 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <TrophyIcon className="h-4 w-4 text-primary" />
                  <span className="font-medium text-sm">Live Battle</span>
                </div>
                <div className="flex items-center gap-2">
                  <Timer className="h-3 w-3 text-orange-400" />
                  <span className="text-orange-400 font-mono text-sm">12:34</span>
                </div>
              </div>
            </div>

            {/* Mockup Content */}
            <div className="p-4 space-y-4">
              {/* Problem Title */}
              <div className="space-y-2">
                <h3 className="text-base font-semibold">Binary Tree Maximum Path Sum</h3>
                <div className="flex gap-2">
                  <Badge className="bg-red-500/10 text-red-400 border-red-500/20 text-xs">Hard</Badge>
                  <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 text-xs">Trees</Badge>
                </div>
              </div>

              {/* Players */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-5 w-5 bg-blue-500">
                      <AvatarFallback className="text-xs font-semibold">NF</AvatarFallback>
                    </Avatar>
                    <span className="text-xs font-medium">noforget (You)</span>
                    <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                    <Badge className="bg-blue-500/20 text-blue-300 text-xs">C++</Badge>
                  </div>
                  <div className="bg-muted rounded p-2 font-mono text-xs space-y-0.5">
                    <div className="text-muted-foreground">// Your solution</div>
                    <div><span className="text-blue-400">class</span> <span className="text-yellow-400">Solution</span> <span className="text-foreground">{"{"}</span></div>
                    <div className="ml-2"><span className="text-blue-400">int</span> <span className="text-yellow-400">maxPathSum</span><span className="text-foreground">(</span><span className="text-green-400">TreeNode*</span> <span className="text-foreground">root) {"{"}</span></div>
                    <div className="ml-4"><span className="text-blue-400">int</span> <span className="text-yellow-400">maxSum</span> <span className="text-foreground">=</span> <span className="text-purple-400">INT_MIN</span><span className="text-foreground">;</span></div>
                    <div className="ml-4"><span className="text-yellow-400">dfs</span><span className="text-foreground">(root, maxSum);</span></div>
                    <div className="ml-4"><span className="text-blue-400">return</span> <span className="text-foreground">maxSum;</span></div>
                    <div className="ml-2"><span className="text-foreground">{"}"}</span></div>
                    <div><span className="text-foreground">{"}"}</span></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-5 w-5 bg-purple-500">
                      <AvatarFallback className="text-xs font-semibold">BM</AvatarFallback>
                    </Avatar>
                    <span className="text-xs font-medium">bigmama44</span>
                    <div className="h-1.5 w-1.5 rounded-full bg-orange-400 animate-pulse"></div>
                    <Badge className="bg-orange-500/20 text-orange-300 text-xs">Java</Badge>
                  </div>
                  <div className="bg-muted rounded p-2 font-mono text-xs space-y-0.5">
                    <div className="text-muted-foreground">// Opponent typing...</div>
                    <div><span className="text-blue-400">class</span> <span className="text-yellow-400">Solution</span> <span className="text-foreground">{"{"}</span></div>
                    <div className="ml-2"><span className="text-blue-400">public</span> <span className="text-blue-400">int</span> <span className="text-yellow-400">maxPathSum</span><span className="text-foreground">(</span><span className="text-green-400">TreeNode</span> <span className="text-foreground">root) {"{"}</span></div>
                    <div className="ml-4"><span className="text-blue-400">if</span><span className="text-foreground">(root ==</span><span className="text-purple-400">null</span><span className="text-foreground">)</span> <span className="text-blue-400">return</span> <span className="text-purple-400">0</span><span className="text-foreground">;</span></div>
                    <div className="ml-4"><span className="text-blue-400">int</span><span className="text-foreground">[] maxSum = {"{"}</span><span className="text-green-400">Integer.MIN_VALUE</span><span className="text-foreground">{"}"};</span></div>
                    <div className="ml-4"><span className="text-yellow-400">dfs</span><span className="text-foreground">(root, maxSum);</span></div>
                    <div className="ml-4"><span className="text-blue-400">return</span> <span className="text-foreground">maxSum[0];</span></div>
                    <div className="ml-2"><span className="text-foreground">{"}"}</span></div>
                    <div><span className="text-foreground">{"}"}</span></div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
} 