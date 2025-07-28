"use client"

import { motion, useInView } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Eye, 
  ChatCircle, 
  Trophy,
  MapPin,
  Play
} from "@phosphor-icons/react"
import { useRef } from "react"

interface MockupContent {
  type: string
  title: string
  content: {
    player1?: { name: string; rating: number; streak: number; status: string; progress: number }
    player2?: { name: string; rating: number; streak: number; status: string; progress: number }
    problem?: string
    timeLeft?: string
    eloAtStake?: string
    difficulty?: string
    category?: string
    schools?: Array<{ name: string; players: number; rating: number; status: string; winRate: number }>
    distance?: string
    bonus?: string
    totalBattles?: number
    activeMatches?: number
    activePowerup?: string
    target?: string
    duration?: string
    effect?: string
    opponentCode?: string
    availablePowerups?: Array<{ name: string; cooldown: string; icon: string; description?: string }>
    messages?: Array<{ sender: string; text: string; time: string; emoji?: string }>
    tiltMeter?: number
    quickTaunts?: string[]
  }
}

interface Mockup {
  type: string
  title: string
  content: MockupContent['content']
}

const features = [
  {
    id: "elo-system",
    title: "Adaptive ELO System",
    subtitle: "Dynamic Rating & Matchmaking",
    description: "Our Glicko-2 rating system adapts to your skill level. Win consistently and face harder opponents. Lose a few and get matched with similar skill levels. Every battle affects your rating with confidence intervals.",
    color: "from-purple-600 to-pink-600",
    accentColor: "text-purple-400",
    stats: [
      { label: "Rating Range", value: "800-3000" },
      { label: "Active Battles", value: "1,247" },
      { label: "Top Rating", value: "3,847" }
    ],
    mockup: {
      type: "rating_demo",
      title: "Live Rating Battle",
      content: {
        player1: { name: "alex_coder", rating: 2847, streak: 15, status: "Coding...", progress: 75 },
        player2: { name: "legend_3200", rating: 3200, streak: 8, status: "Reviewing...", progress: 60 },
        problem: "Binary Tree Level Order Traversal",
        timeLeft: "12:34",
        eloAtStake: "+45",
        difficulty: "Medium",
        category: "Trees"
      }
    }
  },
  {
    id: "local-rivalries",
    title: "Local Rivalries",
    subtitle: "Geographic Competition",
    description: "Battle students from your school, rival universities, and nearby cities. Earn 2x ELO for defeating local rivals. Territory control through code - dominate your region and claim the local crown.",
    color: "from-blue-600 to-cyan-600",
    accentColor: "text-blue-400",
    stats: [
      { label: "Nearby Players", value: "847" },
      { label: "Active Rivalries", value: "23" },
      { label: "Rivalry Bonus", value: "2x ELO" }
    ],
    mockup: {
      type: "rivalry_map",
      title: "Bay Area Showdown",
      content: {
        schools: [
          { name: "Stanford", players: 50, rating: 2750, status: "Dominating", winRate: 68 },
          { name: "Berkeley", players: 47, rating: 2680, status: "Fighting Back", winRate: 62 }
        ],
        distance: "12 miles",
        bonus: "2x ELO",
        totalBattles: 127,
        activeMatches: 8
      }
    }
  },
  {
    id: "sabotage",
    title: "Strategic Sabotage",
    subtitle: "Code Espionage & Powerups",
    description: "Use powerups to peek at your opponent's code for 10 seconds, blind them temporarily, or freeze their time. Strategic sabotage wins matches. Every advantage counts in the competitive arena.",
    color: "from-red-600 to-orange-600",
    accentColor: "text-red-400",
    stats: [
      { label: "Peek Duration", value: "10s" },
      { label: "Blind Duration", value: "15s" },
      { label: "Freeze Duration", value: "8s" }
    ],
    mockup: {
      type: "sabotage_demo",
      title: "Powerup Arsenal",
      content: {
        activePowerup: "Code Peek",
        target: "opponent_screen",
        duration: "8s remaining",
        effect: "Viewing opponent's solution",
        opponentCode: "function levelOrder(root) {\n  if (!root) return [];\n  const result = [];\n  const queue = [root];\n  \n  while (queue.length > 0) {\n    const level = [];\n    const size = queue.length;\n    \n    for (let i = 0; i < size; i++) {\n      const node = queue.shift();\n      level.push(node.val);\n      \n      if (node.left) queue.push(node.left);\n      if (node.right) queue.push(node.right);\n    }\n    \n    result.push(level);\n  }\n  \n  return result;\n}",
        availablePowerups: [
          { name: "Debugger", cooldown: "Ready", icon: "🐛", description: "Step through code" },
          { name: "AI Assistant", cooldown: "Ready", icon: "🤖", description: "Get hints" },
          { name: "Time Freeze", cooldown: "45s", icon: "⏰", description: "Pause opponent" }
        ]
      }
    }
  },
  {
    id: "taunts",
    title: "Psychological Warfare",
    subtitle: "Mind Games & Taunts",
    description: "Send custom taunts and emojis to psych out your opponent. Mind games are part of the strategy. Tilt your opponent into submission with clever psychological warfare.",
    color: "from-green-600 to-emerald-600",
    accentColor: "text-green-400",
    stats: [
      { label: "Taunt Library", value: "50+" },
      { label: "Custom Emojis", value: "∞" },
      { label: "Tilt Success Rate", value: "73%" }
    ],
    mockup: {
      type: "taunt_chat",
      title: "Battle Chat",
      content: {
        messages: [
          { sender: "opponent", text: "Your code is slower than my grandma 💀", time: "2:34", emoji: "💀" },
          { sender: "you", text: "At least my grandma can debug better than you 🔥", time: "2:35", emoji: "🔥" },
          { sender: "opponent", text: "Typo detected in line 15 😂", time: "2:36", emoji: "😂" },
          { sender: "system", text: "Opponent appears tilted", time: "2:37", emoji: "⚠️" }
        ],
        tiltMeter: 85,
        quickTaunts: ["Too slow!", "Git gud!", "Rage quit?", "Skill issue"]
      }
    }
  }
]

function FeatureMockup({ mockup }: { mockup: Mockup }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="h-full"
    >
      <Card className="h-full bg-gradient-to-br from-slate-900/80 to-slate-800/60 border border-slate-700/50 backdrop-blur-sm">
        <CardContent className="p-4 h-full flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></div>
            <h4 className="text-sm font-semibold text-white competitive-heading">{mockup.title}</h4>
          </div>

          <div className="flex-1 space-y-3 overflow-hidden">
            {mockup.type === "rating_demo" && mockup.content.player1 && mockup.content.player2 && (
              <div className="space-y-3 h-full">
                <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/30">
                  <div className="text-xs text-slate-400 font-ui mb-1">Problem</div>
                  <div className="text-sm text-white font-mono truncate">{mockup.content.problem}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-slate-500 font-ui">{mockup.content.category}</span>
                    <span className="text-xs text-red-400 font-mono">{mockup.content.difficulty}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-slate-800/50 rounded-lg p-2 border border-slate-700/30">
                    <div className="text-xs text-slate-400 font-ui mb-1 truncate">{mockup.content.player1.name}</div>
                    <div className="text-base font-bold text-purple-400 font-mono">{mockup.content.player1.rating}</div>
                    <div className="text-xs text-green-400 font-mono">🔥 {mockup.content.player1.streak}</div>
                    <div className="text-xs text-slate-500 font-ui mt-1 truncate">{mockup.content.player1.status}</div>
                    <div className="w-full bg-slate-700 rounded-full h-1 mt-1">
                      <div className="bg-purple-500 h-1 rounded-full" style={{ width: `${mockup.content.player1.progress}%` }}></div>
                    </div>
                  </div>
                  
                  <div className="bg-slate-800/50 rounded-lg p-2 border border-slate-700/30">
                    <div className="text-xs text-slate-400 font-ui mb-1 truncate">{mockup.content.player2.name}</div>
                    <div className="text-base font-bold text-pink-400 font-mono">{mockup.content.player2.rating}</div>
                    <div className="text-xs text-green-400 font-mono">🔥 {mockup.content.player2.streak}</div>
                    <div className="text-xs text-slate-500 font-ui mt-1 truncate">{mockup.content.player2.status}</div>
                    <div className="w-full bg-slate-700 rounded-full h-1 mt-1">
                      <div className="bg-pink-500 h-1 rounded-full" style={{ width: `${mockup.content.player2.progress}%` }}></div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between bg-slate-800/50 rounded-lg p-2 border border-slate-700/30">
                  <div className="text-sm text-white font-mono">{mockup.content.timeLeft}</div>
                  <div className="text-sm text-purple-400 font-mono">ELO: {mockup.content.eloAtStake}</div>
                </div>
              </div>
            )}

            {mockup.type === "rivalry_map" && mockup.content.schools && (
              <div className="space-y-3 h-full">
                <div className="bg-slate-800/50 rounded-lg p-2 border border-slate-700/30">
                  <div className="text-xs text-slate-400 font-ui mb-1">Distance</div>
                  <div className="text-sm text-white font-mono">{mockup.content.distance}</div>
                  <div className="text-xs text-blue-400 font-ui mt-1">{mockup.content.activeMatches} active matches</div>
                </div>
                
                <div className="space-y-2 flex-1">
                  {mockup.content.schools.map((school, idx: number) => (
                    <div key={idx} className="bg-slate-800/50 rounded-lg p-2 border border-slate-700/30">
                      <div className="flex items-center justify-between mb-1">
                        <div className="text-sm font-semibold text-white competitive-heading truncate">{school.name}</div>
                        <div className="text-xs text-blue-400 font-mono">{school.players}p</div>
                      </div>
                      <div className="text-base font-bold text-blue-400 font-mono">{school.rating}</div>
                      <div className="text-xs text-green-400 font-ui truncate">{school.status}</div>
                      <div className="text-xs text-slate-500 font-mono">{school.winRate}% win rate</div>
                    </div>
                  ))}
                </div>

                <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg p-2">
                  <div className="text-sm font-bold text-white text-center">Bonus: {mockup.content.bonus}</div>
                </div>
              </div>
            )}

            {mockup.type === "sabotage_demo" && mockup.content.availablePowerups && (
              <div className="space-y-3 h-full">
                <div className="bg-slate-800/50 rounded-lg p-2 border border-slate-700/30">
                  <div className="text-xs text-slate-400 font-ui mb-1">Active Powerup</div>
                  <div className="text-sm font-bold text-red-400 font-mono">{mockup.content.activePowerup}</div>
                  <div className="text-xs text-slate-500 font-ui">{mockup.content.duration}</div>
                </div>

                <div className="bg-slate-800/50 rounded-lg p-2 border border-slate-700/30 flex-1">
                  <div className="text-xs text-slate-400 font-ui mb-1">Opponent's Code</div>
                  <pre className="text-xs text-slate-300 font-mono overflow-hidden h-20 bg-slate-900/50 rounded p-2 border border-slate-600/30">
                    <code className="block">
                      <span className="text-blue-400">function</span> <span className="text-yellow-400">levelOrder</span>(<span className="text-orange-400">root</span>) {'{'}
                      {'  '}<span className="text-blue-400">if</span> (!<span className="text-orange-400">root</span>) <span className="text-blue-400">return</span> [];
                      {'  '}<span className="text-blue-400">const</span> <span className="text-yellow-400">result</span> = [];
                      {'  '}<span className="text-blue-400">const</span> <span className="text-yellow-400">queue</span> = [<span className="text-orange-400">root</span>];
                      
                      {'  '}<span className="text-blue-400">while</span> (<span className="text-yellow-400">queue</span>.<span className="text-purple-400">length</span> &gt; 0) {'{'}
                      {'    '}<span className="text-blue-400">const</span> <span className="text-yellow-400">level</span> = [];
                      {'    '}<span className="text-blue-400">const</span> <span className="text-yellow-400">size</span> = <span className="text-yellow-400">queue</span>.<span className="text-purple-400">length</span>;
                      
                      {'    '}<span className="text-blue-400">for</span> (<span className="text-blue-400">let</span> <span className="text-yellow-400">i</span> = 0; <span className="text-yellow-400">i</span> &lt; <span className="text-yellow-400">size</span>; <span className="text-yellow-400">i</span>++) {'{'}
                      {'      '}<span className="text-blue-400">const</span> <span className="text-yellow-400">node</span> = <span className="text-yellow-400">queue</span>.<span className="text-purple-400">shift</span>();
                      {'      '}<span className="text-yellow-400">level</span>.<span className="text-purple-400">push</span>(<span className="text-yellow-400">node</span>.<span className="text-orange-400">val</span>);
                      
                      {'      '}<span className="text-blue-400">if</span> (<span className="text-yellow-400">node</span>.<span className="text-orange-400">left</span>) <span className="text-yellow-400">queue</span>.<span className="text-purple-400">push</span>(<span className="text-yellow-400">node</span>.<span className="text-orange-400">left</span>);
                      {'      '}<span className="text-blue-400">if</span> (<span className="text-yellow-400">node</span>.<span className="text-orange-400">right</span>) <span className="text-yellow-400">queue</span>.<span className="text-purple-400">push</span>(<span className="text-yellow-400">node</span>.<span className="text-orange-400">right</span>);
                      {'    '}{'}'}
                      
                      {'    '}<span className="text-yellow-400">result</span>.<span className="text-purple-400">push</span>(<span className="text-yellow-400">level</span>);
                      {'  '}{'}'}
                      
                      {'  '}<span className="text-blue-400">return</span> <span className="text-yellow-400">result</span>;
                      {'}'}
                    </code>
                  </pre>
                </div>

                <div className="bg-red-500/20 rounded-lg p-2 border border-red-500/30">
                  <div className="text-xs text-red-400 font-ui">{mockup.content.effect}</div>
                </div>

                <div className="grid grid-cols-3 gap-1">
                  {mockup.content.availablePowerups.map((powerup, idx: number) => (
                    <div key={idx} className="bg-slate-800/50 rounded p-1 border border-slate-700/30 text-center">
                      <div className="text-xs">{powerup.icon}</div>
                      <div className="text-xs text-slate-400 font-ui truncate">{powerup.name}</div>
                      <div className="text-xs text-slate-500 font-mono">{powerup.cooldown}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {mockup.type === "taunt_chat" && mockup.content.messages && mockup.content.quickTaunts && (
              <div className="space-y-3 h-full">
                <div className="space-y-2 flex-1 max-h-32 overflow-y-auto">
                  {mockup.content.messages.map((msg, idx: number) => (
                    <div key={idx} className={`p-2 rounded-lg ${
                      msg.sender === 'you' ? 'bg-blue-500/20 border border-blue-500/30' :
                      msg.sender === 'opponent' ? 'bg-slate-800/50 border border-slate-700/30' :
                      'bg-yellow-500/20 border border-yellow-500/30'
                    }`}>
                      <div className="flex items-center justify-between mb-1">
                        <div className={`text-xs font-semibold ${
                          msg.sender === 'you' ? 'text-blue-400' :
                          msg.sender === 'opponent' ? 'text-slate-400' :
                          'text-yellow-400'
                        }`}>
                          {msg.sender === 'you' ? 'You' : msg.sender === 'opponent' ? 'Opponent' : 'System'}
                        </div>
                        <div className="text-xs text-slate-500 font-mono">{msg.time}</div>
                      </div>
                      <div className="text-xs text-white font-ui truncate">{msg.text}</div>
                    </div>
                  ))}
                </div>

                <div className="bg-slate-800/50 rounded-lg p-2 border border-slate-700/30">
                  <div className="text-xs text-slate-400 font-ui mb-1">Tilt Meter</div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="bg-red-500 h-2 rounded-full" style={{ width: `${mockup.content.tiltMeter}%` }}></div>
                  </div>
                  <div className="text-xs text-red-400 font-mono mt-1">{mockup.content.tiltMeter}% tilted</div>
                </div>

                <div className="flex flex-wrap gap-1">
                  {mockup.content.quickTaunts.map((taunt: string, idx: number) => (
                    <button key={idx} className="text-xs bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 px-2 py-1 rounded border border-slate-600/30 transition-colors">
                      {taunt}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function FeatureSection({ feature, index }: { feature: typeof features[0], index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.2,
        ease: "easeOut"
      }}
      className="grid lg:grid-cols-3 gap-8 items-center py-16"
    >
      {/* Explanation Side (2/3 width) */}
      <div className="lg:col-span-2 space-y-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className={`h-12 w-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center text-white shadow-lg`}>
              {feature.id === "elo-system" && <Trophy className="h-6 w-6" />}
              {feature.id === "local-rivalries" && <MapPin className="h-6 w-6" />}
              {feature.id === "sabotage" && <Eye className="h-6 w-6" />}
              {feature.id === "taunts" && <ChatCircle className="h-6 w-6" />}
            </div>
            <div>
              <h3 className="text-3xl font-bold text-white competitive-heading">{feature.title}</h3>
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-mono font-medium bg-slate-800/50 border border-slate-700/30 ${feature.accentColor} tech-metric mt-2`}>
                {feature.subtitle}
              </div>
            </div>
          </div>

          <p className="text-lg text-slate-300 font-ui leading-relaxed">
            {feature.description}
          </p>

          {/* Conditional stats display - only show for features that need them */}
          {(feature.id === "elo-system" || feature.id === "local-rivalries" || feature.id === "sabotage") && (
            <div className="grid grid-cols-3 gap-4">
              {feature.stats.map((stat, idx) => (
                <div key={idx} className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/30">
                  <div className="text-xs text-slate-400 font-ui mb-1">{stat.label}</div>
                  <div className={`text-lg font-bold font-mono ${feature.accentColor} tech-metric`}>
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mockup Side (1/3 width) */}
      <div className="lg:col-span-1 h-80">
        <FeatureMockup mockup={feature.mockup} />
      </div>
    </motion.div>
  )
}

export default function Features() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section ref={ref} className="py-24 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Structured Background */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `
            linear-gradient(90deg, rgba(148, 163, 184, 0.1) 1px, transparent 1px),
            linear-gradient(rgba(148, 163, 184, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
        
        {/* Radial gradients for depth */}
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(139, 92, 246, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(239, 68, 68, 0.2) 0%, transparent 50%)
          `,
          backgroundSize: '800px 800px, 600px 600px, 1000px 1000px'
        }}></div>
        
        {/* Diagonal lines for structure */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `
            linear-gradient(45deg, transparent 40%, rgba(59, 130, 246, 0.1) 50%, transparent 60%),
            linear-gradient(-45deg, transparent 40%, rgba(16, 185, 129, 0.1) 50%, transparent 60%)
          `,
          backgroundSize: '200px 200px, 150px 150px',
          backgroundPosition: '0 0, 100px 100px'
        }}></div>
        
        {/* Floating particles */}
        <div className="absolute inset-0 opacity-40" style={{
          backgroundImage: `
            radial-gradient(circle at 25% 15%, rgba(59, 130, 246, 0.4) 0%, transparent 2px),
            radial-gradient(circle at 75% 85%, rgba(16, 185, 129, 0.4) 0%, transparent 2px),
            radial-gradient(circle at 45% 65%, rgba(139, 92, 246, 0.3) 0%, transparent 1.5px),
            radial-gradient(circle at 65% 35%, rgba(236, 72, 153, 0.3) 0%, transparent 1.5px),
            radial-gradient(circle at 85% 25%, rgba(245, 158, 11, 0.3) 0%, transparent 1px),
            radial-gradient(circle at 15% 75%, rgba(34, 197, 94, 0.3) 0%, transparent 1px)
          `,
          backgroundSize: '300px 300px, 250px 250px, 400px 400px, 350px 350px, 200px 200px, 180px 180px',
          backgroundPosition: '0 0, 50px 50px, 100px 100px, 150px 150px, 200px 200px, 250px 250px'
        }}></div>
        
        {/* Animated grid overlay */}
        <div className="absolute inset-0 opacity-15" style={{
          backgroundImage: `
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(rgba(16, 185, 129, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px'
        }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-6 competitive-heading">
              Competitive Programming <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">Warfare</span>
            </h2>
            <p className="text-xl text-slate-300 font-ui leading-relaxed">
              Real-time battles with ELO rankings, adaptive difficulty, sabotage mechanics, and local rivalries. 
              This isn't just coding - it's war.
            </p>
          </div>
        </motion.div>

        {/* Feature Sections */}
        <div className="space-y-8">
          {features.map((feature, index) => (
            <FeatureSection key={feature.id} feature={feature} index={index} />
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white competitive-heading mb-4">
              Ready to start competing?
            </h3>
            <p className="text-slate-300 text-lg font-ui leading-relaxed mb-6">
              Join thousands of developers who are already improving their skills through real-time coding battles.
            </p>
            
            <div className="flex items-center justify-center gap-6">
              <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 hover:-translate-y-1 flex items-center gap-2">
                <Play className="h-5 w-5" />
                Start Battling
              </button>
              <button className="border border-slate-600 hover:border-slate-500 text-slate-300 px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:bg-slate-800/50">
                View Leaderboard
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}