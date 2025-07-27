import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Target, Trophy, Briefcase, Users as UsersIcon, MapPin, Lightning } from "@phosphor-icons/react"

export default function Competition() {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
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
              <div className="bg-slate-800/40 backdrop-blur-sm rounded-xl border border-slate-600/30 p-8 shadow-xl shadow-slate-500/10">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-white">Your Local Network</h3>
                    <Badge className="bg-slate-600/20 text-slate-300 border-slate-500/30">
                      Live
                    </Badge>
                  </div>
                  
                  {/* Network Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-slate-700/30 rounded-lg border border-slate-600/20">
                      <div className="text-2xl font-bold text-slate-300">847</div>
                      <div className="text-sm text-gray-400">Nearby Students</div>
                    </div>
                    <div className="text-center p-4 bg-slate-700/30 rounded-lg border border-slate-600/20">
                      <div className="text-2xl font-bold text-blue-400">12</div>
                      <div className="text-sm text-gray-400">Active Rivalries</div>
                    </div>
                    <div className="text-center p-4 bg-slate-700/30 rounded-lg border border-slate-600/20">
                      <div className="text-2xl font-bold text-slate-300">2.4x</div>
                      <div className="text-sm text-gray-400">ELO Multiplier</div>
                    </div>
                  </div>

                  {/* Live Activity Feed */}
                  <div className="space-y-3">
                    <h4 className="font-medium text-white">Recent Activity</h4>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      <div className="flex items-center gap-3 text-sm">
                        <div className="h-2 w-2 rounded-full bg-slate-400"></div>
                        <span className="text-gray-300">alex_chen</span>
                        <span className="text-gray-500">defeated</span>
                        <span className="text-gray-300">sarah_dev</span>
                        <span className="text-slate-300">+45 ELO</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <div className="h-2 w-2 rounded-full bg-orange-400"></div>
                        <span className="text-gray-300">mike_codes</span>
                        <span className="text-gray-500">joined</span>
                        <span className="text-blue-400">Stanford vs Berkeley</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <div className="h-2 w-2 rounded-full bg-slate-400"></div>
                        <span className="text-gray-300">jenny_algo</span>
                        <span className="text-gray-500">solved</span>
                        <span className="text-gray-300">Binary Tree Max Path</span>
                        <span className="text-slate-300">in 8:32</span>
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
                  <div className="h-12 w-12 bg-gradient-to-br from-slate-600 to-slate-700 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-white">Smart Matchmaking</h3>
                    <p className="text-gray-300 leading-relaxed">
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
                    <p className="text-gray-300 leading-relaxed">
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
                    <p className="text-gray-300 leading-relaxed">
                      Practice with problems from top tech companies. Compete against students targeting the same companies and build your professional network.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 