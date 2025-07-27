import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Target, Trophy, Briefcase, Users as UsersIcon, MapPin, Lightning } from "@phosphor-icons/react"

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

export default function Competition() {
  return (
    <section className="container space-y-16 py-24 md:py-32">
      <div className="mx-auto max-w-[58rem] text-center">
        <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl">
          Local Competition, Global Glory
        </h2>
        <p className="mt-4 text-muted-foreground sm:text-lg max-w-3xl mx-auto">
          Start your competitive coding journey close to home. Challenge classmates, rival schools, and nearby universities. Build your reputation in your local scene before taking on the world.
        </p>
      </div>

      {/* Advanced Competition Network */}
      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Left: Interactive Network Visualization */}
        <div className="relative">
          <Card className="bg-background/50 backdrop-blur-sm border-border/50">
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">Your Local Network</h3>
                  <Badge className="bg-primary/20 text-primary border-primary/30">
                    Live
                  </Badge>
                </div>
                
                {/* Network Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-muted/50 rounded-lg border border-border/50">
                    <div className="text-2xl font-bold text-primary">847</div>
                    <div className="text-sm text-muted-foreground">Nearby Students</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg border border-border/50">
                    <div className="text-2xl font-bold text-blue-400">12</div>
                    <div className="text-sm text-muted-foreground">Active Rivalries</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg border border-border/50">
                    <div className="text-2xl font-bold text-primary">2.4x</div>
                    <div className="text-sm text-muted-foreground">ELO Multiplier</div>
                  </div>
                </div>

                {/* Live Activity Feed */}
                <div className="space-y-3">
                  <h4 className="font-medium">Recent Activity</h4>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    <div className="flex items-center gap-3 text-sm">
                      <div className="h-2 w-2 rounded-full bg-primary"></div>
                      <span className="text-muted-foreground">alex_chen</span>
                      <span className="text-muted-foreground">defeated</span>
                      <span className="text-muted-foreground">sarah_dev</span>
                      <span className="text-primary">+45 ELO</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="h-2 w-2 rounded-full bg-orange-400"></div>
                      <span className="text-muted-foreground">mike_codes</span>
                      <span className="text-muted-foreground">joined</span>
                      <span className="text-blue-400">Stanford vs Berkeley</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="h-2 w-2 rounded-full bg-primary"></div>
                      <span className="text-muted-foreground">jenny_algo</span>
                      <span className="text-muted-foreground">solved</span>
                      <span className="text-muted-foreground">Binary Tree Max Path</span>
                      <span className="text-primary">in 8:32</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right: Advanced Features */}
        <div className="space-y-8">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center flex-shrink-0">
                <Target className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Smart Matchmaking</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Our AI finds the perfect opponents from your school, rival universities, and nearby cities. Get matched based on skill level, location, and rivalry preferences.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Trophy className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">School Rivalries</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Earn 2x ELO when competing against rival schools. Create epic rivalries and watch your school dominate the regional leaderboards.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="h-12 w-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <Briefcase className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Interview Preparation</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Practice with problems from top tech companies. Compete against students targeting the same companies and build your professional network.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <Card className="bg-background/50 backdrop-blur-sm border-border/50">
            <CardContent className="p-6">
              <h4 className="font-medium mb-4">Quick Actions</h4>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" size="sm" className="border-border/50 text-muted-foreground hover:bg-primary/10">
                  <MapPin className="h-4 w-4 mr-2" />
                  Find Nearby
                </Button>
                <Button variant="outline" size="sm" className="border-border/50 text-muted-foreground hover:bg-primary/10">
                  <Trophy className="h-4 w-4 mr-2" />
                  Join Rivalry
                </Button>
                <Button variant="outline" size="sm" className="border-border/50 text-muted-foreground hover:bg-primary/10">
                  <UsersIcon className="h-4 w-4 mr-2" />
                  Create Team
                </Button>
                <Button variant="outline" size="sm" className="border-border/50 text-muted-foreground hover:bg-primary/10">
                  <Lightning className="h-4 w-4 mr-2" />
                  View Rankings
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
} 