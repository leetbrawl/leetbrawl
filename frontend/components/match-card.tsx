"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Clock, Users, Trophy, Zap, Play } from "lucide-react"

interface MatchCardProps {
  match: {
    id: string
    status: "waiting" | "active" | "completed"
    participants: Array<{
      username: string
      avatar?: string
      rating: number
    }>
    problem: {
      title: string
      difficulty: "Easy" | "Medium" | "Hard"
    }
    timeRemaining?: string
    maxParticipants: number
    prize?: number
  }
  onJoin?: (matchId: string) => void
  onView?: (matchId: string) => void
}

export function MatchCard({ match, onJoin, onView }: MatchCardProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-500/20 text-green-400 border-green-500/50"
      case "Medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/50"
      case "Hard":
        return "bg-red-500/20 text-red-400 border-red-500/50"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/50"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "waiting":
        return "bg-blue-500/20 text-blue-400 border-blue-500/50"
      case "active":
        return "bg-green-500/20 text-green-400 border-green-500/50"
      case "completed":
        return "bg-gray-500/20 text-gray-400 border-gray-500/50"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/50"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "waiting":
        return <Clock className="h-3 w-3" />
      case "active":
        return <Zap className="h-3 w-3" />
      case "completed":
        return <Trophy className="h-3 w-3" />
      default:
        return <Clock className="h-3 w-3" />
    }
  }

  const canJoin = match.status === "waiting" && match.participants.length < match.maxParticipants
  const canView = match.status === "active" || match.status === "completed"

  return (
    <Card className="bg-gray-900/50 border-gray-800 hover:border-gray-700 transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/10 group">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-100 group-hover:text-white transition-colors">
            {match.problem.title}
          </CardTitle>
          <Badge className={getDifficultyColor(match.problem.difficulty)}>{match.problem.difficulty}</Badge>
        </div>

        <div className="flex items-center gap-2">
          <Badge className={getStatusColor(match.status)}>
            {getStatusIcon(match.status)}
            <span className="ml-1 capitalize">{match.status}</span>
          </Badge>
          {match.timeRemaining && match.status === "active" && (
            <Badge variant="outline" className="border-orange-500/50 text-orange-400">
              <Clock className="h-3 w-3 mr-1" />
              {match.timeRemaining}
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Participants */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Users className="h-4 w-4" />
            <span>
              Participants ({match.participants.length}/{match.maxParticipants})
            </span>
          </div>

          <div className="flex items-center gap-2">
            {match.participants.map((participant, index) => (
              <div key={index} className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={participant.avatar || "/placeholder.svg?height=24&width=24"} />
                  <AvatarFallback className="text-xs">{participant.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="text-sm">
                  <div className="text-gray-300 font-medium">{participant.username}</div>
                  <div className="text-gray-500 text-xs">{participant.rating}</div>
                </div>
              </div>
            ))}

            {/* Empty slots */}
            {Array.from({ length: match.maxParticipants - match.participants.length }).map((_, index) => (
              <div key={`empty-${index}`} className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full border-2 border-dashed border-gray-700 flex items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-gray-700" />
                </div>
                <div className="text-sm text-gray-500">Waiting...</div>
              </div>
            ))}
          </div>
        </div>

        {/* Prize Pool */}
        {match.prize && (
          <div className="flex items-center gap-2 text-sm">
            <Trophy className="h-4 w-4 text-yellow-500" />
            <span className="text-gray-400">Prize Pool:</span>
            <span className="text-yellow-400 font-medium">${match.prize}</span>
          </div>
        )}

        {/* Action Button */}
        <div className="pt-2">
          {canJoin && (
            <Button
              onClick={() => onJoin?.(match.id)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white group-hover:bg-blue-500 transition-colors"
            >
              <Play className="h-4 w-4 mr-2" />
              Join Match
            </Button>
          )}

          {canView && (
            <Button
              onClick={() => onView?.(match.id)}
              variant="outline"
              className="w-full border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
            >
              {match.status === "active" ? "Watch Live" : "View Results"}
            </Button>
          )}

          {match.status === "waiting" && !canJoin && (
            <Button disabled className="w-full">
              Match Full
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
