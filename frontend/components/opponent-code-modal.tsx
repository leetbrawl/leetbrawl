"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Eye, EyeOff, Clock, Code, X } from "lucide-react"

interface OpponentCodeModalProps {
  isOpen: boolean
  onClose: () => void
  opponent: {
    username: string
    avatar?: string
    rating: number
    language: string
    submissionTime: string
    code: string
  }
}

export function OpponentCodeModal({ isOpen, onClose, opponent }: OpponentCodeModalProps) {
  const [showFullCode, setShowFullCode] = useState(false)

  const getLanguageColor = (language: string) => {
    const colors = {
      javascript: "bg-yellow-900 text-yellow-200 border-yellow-700",
      python: "bg-blue-900 text-blue-200 border-blue-700",
      cpp: "bg-purple-900 text-purple-200 border-purple-700",
      java: "bg-orange-900 text-orange-200 border-orange-700",
      csharp: "bg-emerald-900 text-emerald-200 border-emerald-700",
      go: "bg-cyan-900 text-cyan-200 border-cyan-700",
    }
    return colors[language.toLowerCase() as keyof typeof colors] || "bg-slate-50 text-slate-700 border-slate-200"
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[80vh] bg-slate-800/95 border-slate-700/50 backdrop-blur-xl shadow-2xl p-0">
        <DialogHeader className="p-6 pb-4 border-b border-slate-700/50">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold text-white flex items-center gap-3">
              <Code className="h-5 w-5" />
              Opponent's Solution
            </DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose} className="text-slate-300 hover:text-white">
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Opponent Info */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src={opponent.avatar || "/placeholder.svg?height=40&width=40"} />
                <AvatarFallback>{opponent.username.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-semibold text-white">{opponent.username}</div>
                <div className="text-sm text-slate-300">Rating: {opponent.rating}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Badge className={getLanguageColor(opponent.language)}>{opponent.language}</Badge>
              <div className="flex items-center gap-1 text-sm text-slate-300">
                <Clock className="h-4 w-4" />
                {opponent.submissionTime}
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 p-6">
          <div className="h-full relative">
            {/* Code Display */}
            <div className="h-full bg-slate-900/80 rounded-lg border border-slate-700/50 overflow-hidden backdrop-blur-sm">
              <div className="flex items-center justify-between p-4 border-b border-slate-700/50 bg-slate-800/50">
                <div className="flex items-center gap-2">
                  <Code className="h-4 w-4 text-slate-300" />
                  <span className="text-sm font-medium text-slate-300">Solution Code</span>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFullCode(!showFullCode)}
                  className="border-blue-700 text-blue-200 hover:bg-blue-900 bg-slate-800/50 shadow-sm"
                >
                  {showFullCode ? (
                    <>
                      <EyeOff className="h-4 w-4 mr-2" />
                      Blur Code
                    </>
                  ) : (
                    <>
                      <Eye className="h-4 w-4 mr-2" />
                      View Full Code
                    </>
                  )}
                </Button>
              </div>

              <ScrollArea className="h-[calc(100%-60px)]">
                <div className="relative">
                  <pre
                    className={`p-4 font-mono text-sm text-slate-200 transition-all duration-300 ${
                      showFullCode ? "" : "blur-sm select-none"
                    }`}
                  >
                    <code>{opponent.code}</code>
                  </pre>

                  {/* Line Numbers */}
                  <div
                    className={`absolute left-0 top-0 w-12 h-full bg-slate-800/50 border-r border-slate-700/50 text-slate-500 text-sm font-mono p-4 pointer-events-none transition-all duration-300 ${
                      showFullCode ? "" : "blur-sm"
                    }`}
                  >
                    {opponent.code.split("\n").map((_, i) => (
                      <div key={i + 1} className="leading-6">
                        {i + 1}
                      </div>
                    ))}
                  </div>

                  {/* Blur Overlay */}
                  {!showFullCode && (
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-900/20 backdrop-blur-[1px]">
                      <div className="text-center">
                        <div className="text-slate-300 text-lg font-medium mb-2">Code Preview</div>
                        <div className="text-slate-400 text-sm mb-4">
                          Click "View Full Code" to see the complete solution
                        </div>
                        <Button
                          onClick={() => setShowFullCode(true)}
                          className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View Full Code
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>

            {/* Warning Message */}
            {showFullCode && (
              <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="flex items-center gap-2 text-amber-700 text-sm">
                  <Eye className="h-4 w-4" />
                  <span className="font-medium">Viewing opponent's solution</span>
                </div>
                <div className="text-amber-600 text-xs mt-1">
                  Use this for learning purposes. Consider the approach and techniques used.
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
