"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Code2, Users, Zap, Globe, ArrowRight, Timer, Brain } from "lucide-react"
import { useRouter } from "next/navigation"
import { TrophyIcon } from "@/components/ui/trophy-icon"
import { Target, Trophy, Briefcase, Users as UsersIcon, MapPin, Lightning } from "@phosphor-icons/react"

export default function HomePage() {
  const router = useRouter()

  const handleStartMatch = () => {
    router.push("/practice/ranked")
  }



  const features = [
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Real-Time Battles",
      description: "Code against opponents live with instant feedback and synchronized problem solving.",
    },
    {
      icon: <TrophyIcon className="h-6 w-6" />,
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

  const schoolRivalries = [
    {
      school: "Stanford",
      rival: "UC Berkeley",
      students: 847,
      avgRating: 2156,
      rivalryBonus: "2x ELO",
    },
    {
      school: "MIT",
      rival: "Harvard",
      students: 623,
      avgRating: 2289,
      rivalryBonus: "2x ELO",
    },
    {
      school: "CMU",
      rival: "Georgia Tech",
      students: 445,
      avgRating: 2034,
      rivalryBonus: "2x ELO",
    },
    {
      school: "UIUC",
      rival: "Michigan",
      students: 567,
      avgRating: 1987,
      rivalryBonus: "2x ELO",
    },
  ]

  const interviewPrepFeatures = [
    {
      title: "School Rivalries",
      description: "Compete against students from rival schools. Win 2x ELO when you beat your rivals!",
      icon: "🏆",
    },
    {
      title: "Interview Prep",
      description: "Practice with problems from top tech companies. Get ready for your dream job.",
      icon: "💼",
    },
    {
      title: "Local Leaderboards",
      description: "See how you rank against classmates and nearby schools.",
      icon: "🎯",
    },
    {
      title: "Team Challenges",
      description: "Form teams with classmates and compete against rival schools.",
      icon: "👥",
    },
  ]

  return (
    <div className="min-h-screen bg-[#0e0e10] text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-gray-900/40 border-b border-gray-700/30 shadow-lg shadow-black/5">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-[#10b981] rounded-lg flex items-center justify-center shadow-lg">
                <Code2 className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                leetbrawl
              </span>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-gray-300 hover:text-white transition-colors duration-200 font-medium">
                Features
              </a>
              <a href="#leaderboard" className="text-gray-300 hover:text-white transition-colors duration-200 font-medium">
                Leaderboard
              </a>
              <Button
                variant="outline"
                size="sm"
                className="border-gray-700/50 text-gray-300 hover:bg-gray-800/50 hover:text-white bg-transparent backdrop-blur-sm transition-all duration-200"
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
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  Prep Smarter.
                  <br />
                  <span className="text-[#10b981]">Brawl Harder.</span>
                </h1>
                <p className="text-xl text-gray-300 leading-relaxed max-w-lg">
                Tired of solo grinding? LeetBrawl turns interview prep into real-time 1v1 coding battles. Challenge friends, match with nearby students, or brawl against coders from rival schools. Fast, fun, and built for getting better.                </p>
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
                  <div className="border-b border-gray-600 px-4 py-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <TrophyIcon className="h-5 w-5 text-[#10b981]" />
                        <span className="font-medium text-white">Live Battle</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Timer className="h-4 w-4 text-orange-400" />
                        <span className="text-orange-400 font-mono">12:34</span>
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

      {/* Features Section */}
      <section id="features" className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="space-y-16">
            <div className="space-y-4">
              <h2 className="text-3xl lg:text-4xl font-bold text-white">Built for competitive programmers</h2>
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
                      <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                      <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Local Competition Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="space-y-16">
            <div className="space-y-4">
              <h2 className="text-3xl lg:text-4xl font-bold text-white">Local Competition, Global Glory</h2>
              <p className="text-xl text-gray-300 max-w-3xl leading-relaxed">
                Start your competitive coding journey close to home. Challenge classmates, rival schools, and nearby universities. Build your reputation in your local scene before taking on the world.
              </p>
            </div>

            {/* Advanced Competition Network */}
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Left: Interactive Network Visualization */}
              <div className="relative">
                <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl border border-purple-500/20 p-8 shadow-xl shadow-purple-500/10">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold text-white">Your Local Network</h3>
                      <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                        Live
                      </Badge>
                    </div>
                    
                    {/* Network Stats */}
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-slate-900/50 rounded-lg border border-purple-500/10">
                        <div className="text-2xl font-bold text-purple-400">847</div>
                        <div className="text-sm text-gray-400">Nearby Students</div>
                      </div>
                      <div className="text-center p-4 bg-slate-900/50 rounded-lg border border-purple-500/10">
                        <div className="text-2xl font-bold text-blue-400">12</div>
                        <div className="text-sm text-gray-400">Active Rivalries</div>
                      </div>
                      <div className="text-center p-4 bg-slate-900/50 rounded-lg border border-purple-500/10">
                        <div className="text-2xl font-bold text-purple-400">2.4x</div>
                        <div className="text-sm text-gray-400">ELO Multiplier</div>
                      </div>
                    </div>

                    {/* Live Activity Feed */}
                    <div className="space-y-3">
                      <h4 className="font-medium text-white">Recent Activity</h4>
                      <div className="space-y-2 max-h-32 overflow-y-auto">
                        <div className="flex items-center gap-3 text-sm">
                          <div className="h-2 w-2 rounded-full bg-purple-400"></div>
                          <span className="text-gray-300">alex_chen</span>
                          <span className="text-gray-500">defeated</span>
                          <span className="text-gray-300">sarah_dev</span>
                          <span className="text-purple-400">+45 ELO</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <div className="h-2 w-2 rounded-full bg-orange-400"></div>
                          <span className="text-gray-300">mike_codes</span>
                          <span className="text-gray-500">joined</span>
                          <span className="text-blue-400">Stanford vs Berkeley</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <div className="h-2 w-2 rounded-full bg-purple-400"></div>
                          <span className="text-gray-300">jenny_algo</span>
                          <span className="text-gray-500">solved</span>
                          <span className="text-gray-300">Binary Tree Max Path</span>
                          <span className="text-purple-400">in 8:32</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Advanced Features */}
              <div className="space-y-8">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 bg-gradient-to-br from-purple-500 to-purple-700 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Target className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2 text-white">Smart Matchmaking</h3>
                      <p className="text-gray-400 leading-relaxed">
                        Our AI finds the perfect opponents from your school, rival universities, and nearby cities. Get matched based on skill level, location, and rivalry preferences.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Trophy className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2 text-white">School Rivalries</h3>
                      <p className="text-gray-400 leading-relaxed">
                        Earn 2x ELO when competing against rival schools. Create epic rivalries and watch your school dominate the regional leaderboards.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Briefcase className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2 text-white">Interview Preparation</h3>
                      <p className="text-gray-400 leading-relaxed">
                        Practice with problems from top tech companies. Compete against students targeting the same companies and build your professional network.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-slate-800/40 rounded-lg p-6 border border-purple-500/20">
                  <h4 className="font-medium mb-4 text-white">Quick Actions</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" size="sm" className="border-purple-500/30 text-purple-300 hover:bg-purple-500/10">
                      <MapPin className="h-4 w-4 mr-2" />
                      Find Nearby
                    </Button>
                    <Button variant="outline" size="sm" className="border-purple-500/30 text-purple-300 hover:bg-purple-500/10">
                      <Trophy className="h-4 w-4 mr-2" />
                      Join Rivalry
                    </Button>
                    <Button variant="outline" size="sm" className="border-purple-500/30 text-purple-300 hover:bg-purple-500/10">
                      <UsersIcon className="h-4 w-4 mr-2" />
                      Create Team
                    </Button>
                    <Button variant="outline" size="sm" className="border-purple-500/30 text-purple-300 hover:bg-purple-500/10">
                      <Lightning className="h-4 w-4 mr-2" />
                      View Rankings
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl lg:text-4xl font-bold text-white">Ready to start competing?</h2>
            <p className="text-xl text-gray-300">Join thousands of students in real-time coding battles.</p>
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
              <p className="text-gray-400 text-sm">Real-time competitive coding platform for students and developers.</p>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Platform</h4>
              <div className="space-y-2 text-sm">
                <a href="#" className="text-gray-400 hover:text-white block transition-colors">
                  How it Works
                </a>
                <a href="#" className="text-gray-400 hover:text-white block transition-colors">
                  Problems
                </a>
                <a href="#" className="text-gray-400 hover:text-white block transition-colors">
                  Leaderboards
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
              <h4 className="font-medium">Support</h4>
              <div className="space-y-2 text-sm">
                <a href="#" className="text-gray-400 hover:text-white block transition-colors">
                  Help Center
                </a>
                <a href="#" className="text-gray-400 hover:text-white block transition-colors">
                  Contact
                </a>
                <a href="#" className="text-gray-400 hover:text-white block transition-colors">
                  Status
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
