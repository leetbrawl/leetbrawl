"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Code2, Trophy, Users, Zap, Globe, ArrowRight, Play, Timer, Brain } from "lucide-react"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const router = useRouter()

  const handleStartMatch = () => {
    router.push("/practice/ranked")
  }

  const handleTryDemo = () => {
    router.push("/practice/free")
  }

  const features = [
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Real-Time Battles",
      description: "Code against opponents live with instant feedback and synchronized problem solving.",
    },
    {
      icon: <Trophy className="h-6 w-6" />,
      title: "Global Ranking",
      description: "Climb the leaderboard with ELO-based matchmaking and skill-based progression.",
    },
    {
      icon: <Brain className="h-6 w-6" />,
      title: "Adaptive Problems",
      description: "Dynamic difficulty adjustment ensures every match is challenging and fair.",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Challenge Friends",
      description: "Create private matches and settle coding debates with direct competition.",
    },
  ]

  const leaderboard = [
    { rank: 1, username: "alex_chen", rating: 2847, avatar: "/placeholder.svg?height=40&width=40" },
    { rank: 2, username: "sarah_dev", rating: 2756, avatar: "/placeholder.svg?height=40&width=40" },
    { rank: 3, username: "mike_codes", rating: 2698, avatar: "/placeholder.svg?height=40&width=40" },
    { rank: 4, username: "jenny_algo", rating: 2634, avatar: "/placeholder.svg?height=40&width=40" },
    { rank: 5, username: "david_py", rating: 2587, avatar: "/placeholder.svg?height=40&width=40" },
  ]

  return (
    <div className="min-h-screen bg-[#0e0e10] text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-[#121212]">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-[#10b981] rounded-lg flex items-center justify-center">
                <Code2 className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-semibold">leetbrawl</span>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-gray-300 hover:text-white transition-colors">
                Features
              </a>
              <a href="#leaderboard" className="text-gray-300 hover:text-white transition-colors">
                Leaderboard
              </a>
              <Button
                variant="outline"
                size="sm"
                className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white bg-transparent"
              >
                Sign In
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <Badge className="bg-[#10b981]/10 text-[#10b981] border-[#10b981]/20 w-fit">
                  Real-time competitive coding
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  Code faster.
                  <br />
                  Think smarter.
                  <br />
                  <span className="text-[#10b981]">Win more.</span>
                </h1>
                <p className="text-xl text-gray-300 leading-relaxed max-w-lg">
                  Challenge developers worldwide in real-time coding battles. Solve algorithmic problems head-to-head
                  and climb the global rankings.
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
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleTryDemo}
                  className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white px-8 py-3 text-lg font-medium bg-transparent"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Try a Demo
                </Button>
              </div>
            </div>

            {/* Right Mockup */}
            <div className="relative">
              <Card className="bg-[#121212] border-gray-800 shadow-2xl">
                <CardContent className="p-0">
                  {/* Mockup Header */}
                  <div className="border-b border-gray-800 p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Trophy className="h-5 w-5 text-[#10b981]" />
                        <span className="font-medium">Live Battle</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Timer className="h-4 w-4 text-orange-400" />
                        <span className="text-orange-400 font-mono">15:42</span>
                      </div>
                    </div>
                  </div>

                  {/* Mockup Content */}
                  <div className="p-6 space-y-6">
                    {/* Problem Title */}
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold">Two Sum</h3>
                      <Badge className="bg-[#10b981]/10 text-[#10b981] border-[#10b981]/20">Easy</Badge>
                    </div>

                    {/* Players */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src="/placeholder.svg?height=24&width=24" />
                            <AvatarFallback>You</AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-medium">You</span>
                          <div className="h-2 w-2 rounded-full bg-[#10b981]"></div>
                        </div>
                        <div className="bg-gray-900 rounded p-3 font-mono text-sm">
                          <div className="text-gray-500">// Your solution</div>
                          <div className="text-blue-400">function</div>
                          <div className="text-gray-300">twoSum(nums, target) {"{"}...</div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src="/placeholder.svg?height=24&width=24" />
                            <AvatarFallback>AC</AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-medium">alex_chen</span>
                          <div className="h-2 w-2 rounded-full bg-orange-400"></div>
                        </div>
                        <div className="bg-gray-900 rounded p-3 font-mono text-sm">
                          <div className="text-gray-500">// Opponent typing...</div>
                          <div className="text-purple-400">def</div>
                          <div className="text-gray-300">two_sum(nums, target):</div>
                        </div>
                      </div>
                    </div>

                    {/* Test Results */}
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-gray-300">Test Results</div>
                      <div className="flex gap-2">
                        <div className="h-2 w-8 bg-[#10b981] rounded"></div>
                        <div className="h-2 w-8 bg-[#10b981] rounded"></div>
                        <div className="h-2 w-8 bg-gray-700 rounded"></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-[#10b981] text-white px-3 py-1 rounded-full text-sm font-medium">
                Live
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-[#121212]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="space-y-16">
            <div className="space-y-4">
              <h2 className="text-3xl lg:text-4xl font-bold">Built for competitive programmers</h2>
              <p className="text-xl text-gray-300 max-w-2xl">
                Every feature designed to make you a better coder through real competition.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="bg-[#0e0e10] border-gray-800 hover:border-gray-700 transition-colors">
                  <CardContent className="p-6 space-y-4">
                    <div className="h-12 w-12 bg-[#10b981]/10 rounded-lg flex items-center justify-center text-[#10b981]">
                      {feature.icon}
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold">{feature.title}</h3>
                      <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leaderboard Section */}
      <section id="leaderboard" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="space-y-12">
            <div className="space-y-4">
              <h2 className="text-3xl lg:text-4xl font-bold">Global Leaderboard</h2>
              <p className="text-xl text-gray-300">
                See where you rank among the world's best competitive programmers.
              </p>
            </div>

            <Card className="bg-[#121212] border-gray-800 max-w-2xl">
              <CardContent className="p-0">
                <div className="border-b border-gray-800 p-4">
                  <div className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-[#10b981]" />
                    <span className="font-medium">Top Players</span>
                  </div>
                </div>
                <div className="divide-y divide-gray-800">
                  {leaderboard.map((player) => (
                    <div
                      key={player.rank}
                      className="p-4 flex items-center justify-between hover:bg-gray-900/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-8 text-center">
                          <span
                            className={`font-bold ${
                              player.rank === 1
                                ? "text-yellow-400"
                                : player.rank === 2
                                  ? "text-gray-300"
                                  : player.rank === 3
                                    ? "text-orange-400"
                                    : "text-gray-500"
                            }`}
                          >
                            #{player.rank}
                          </span>
                        </div>
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={player.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{player.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{player.username}</span>
                      </div>
                      <div className="text-[#10b981] font-bold">{player.rating}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#121212]">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl lg:text-4xl font-bold">Ready to prove your skills?</h2>
            <p className="text-xl text-gray-300">Join thousands of developers competing in real-time coding battles.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={handleStartMatch}
              className="bg-[#10b981] hover:bg-[#059669] text-white px-8 py-3 text-lg font-medium"
            >
              Start Competing Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={handleTryDemo}
              className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white px-8 py-3 text-lg font-medium bg-transparent"
            >
              Watch a Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-[#0e0e10]">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 bg-[#10b981] rounded flex items-center justify-center">
                  <Code2 className="h-4 w-4 text-white" />
                </div>
                <span className="font-semibold">leetbrawl</span>
              </div>
              <p className="text-gray-400 text-sm">Real-time competitive coding platform for developers worldwide.</p>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Platform</h4>
              <div className="space-y-2 text-sm">
                <a href="#" className="text-gray-400 hover:text-white block transition-colors">
                  How it Works
                </a>
                <a href="#" className="text-gray-400 hover:text-white block transition-colors">
                  Pricing
                </a>
                <a href="#" className="text-gray-400 hover:text-white block transition-colors">
                  API
                </a>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Community</h4>
              <div className="space-y-2 text-sm">
                <a href="#" className="text-gray-400 hover:text-white block transition-colors">
                  Discord
                </a>
                <a href="#" className="text-gray-400 hover:text-white block transition-colors">
                  GitHub
                </a>
                <a href="#" className="text-gray-400 hover:text-white block transition-colors">
                  Blog
                </a>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Legal</h4>
              <div className="space-y-2 text-sm">
                <a href="#" className="text-gray-400 hover:text-white block transition-colors">
                  Terms
                </a>
                <a href="#" className="text-gray-400 hover:text-white block transition-colors">
                  Privacy
                </a>
                <a href="#" className="text-gray-400 hover:text-white block transition-colors">
                  Contact
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 text-sm">
            © 2024 leetbrawl. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
