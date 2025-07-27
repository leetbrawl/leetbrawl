import { Card, CardContent } from "@/components/ui/card"
import { Zap, TrophyIcon, Brain, Users } from "lucide-react"
import { motion } from "framer-motion"

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

export default function Features() {
  return (
    <section id="features" className="py-20 bg-gradient-to-br from-indigo-950 via-teal-950 to-indigo-950 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(99, 102, 241, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(20, 184, 166, 0.3) 0%, transparent 50%)
          `,
          backgroundSize: '100% 100%, 100% 100%'
        }}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="space-y-16">
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white">Built for competitive programmers</h2>
            <p className="text-xl text-gray-300 max-w-2xl">
              Every feature designed to make you a better coder through real competition.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  ease: "easeOut"
                }}
              >
                <Card className="group relative bg-gradient-to-br from-indigo-900/30 via-teal-950/20 to-indigo-900/30 border border-indigo-700/30 hover:border-indigo-600/50 transition-all duration-300 backdrop-blur-sm hover:shadow-2xl hover:shadow-indigo-500/20 hover:-translate-y-1">
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/10 to-teal-700/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                  
                  <CardContent className="p-6 space-y-4 relative z-10">
                    <div className="h-14 w-14 bg-gradient-to-br from-indigo-500 to-teal-700 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-xl font-bold text-white group-hover:text-indigo-200 transition-colors duration-300">{feature.title}</h3>
                      <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">{feature.description}</p>
                    </div>
                    
                    {/* Hover Indicator */}
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="h-2 w-2 bg-indigo-400 rounded-full animate-pulse"></div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
} 