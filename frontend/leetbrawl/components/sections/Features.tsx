import { Card, CardContent } from "@/components/ui/card"
import { Zap, TrophyIcon, Brain, Users } from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "Real-Time Battles",
    description: "Code against opponents live with instant feedback and synchronized problem solving.",
  },
  {
    icon: TrophyIcon,
    title: "Global Ranking",
    description: "Climb the leaderboard with ELO-based matchmaking and skill-based progression.",
  },
  {
    icon: Brain,
    title: "Adaptive Problems",
    description: "Dynamic difficulty adjustment ensures every match is challenging and fair.",
  },
  {
    icon: Users,
    title: "Challenge Friends",
    description: "Create private matches and settle coding debates with direct competition.",
  },
]

export default function Features() {
  return (
    <section className="container space-y-16 py-24 md:py-32">
      <div className="mx-auto max-w-[58rem] text-center">
        <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl">
          Built for competitive programmers
        </h2>
        <p className="mt-4 text-muted-foreground sm:text-lg">
          Every feature designed to make you a better coder through real competition.
        </p>
      </div>
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
        {features.map((feature) => (
          <Card key={feature.title} className="relative overflow-hidden border bg-background/50 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="flex items-center gap-4">
                <div className="h-8 w-8 text-primary">
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="font-bold">{feature.title}</h3>
              </div>
              <p className="mt-2 text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
} 