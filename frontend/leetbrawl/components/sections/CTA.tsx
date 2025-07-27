"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"

export default function CTA() {
  const router = useRouter()

  const handleStartMatch = () => {
    router.push("/practice/ranked")
  }

  return (
    <section className="container space-y-8 py-24 md:py-32 text-center">
      <div className="mx-auto max-w-[58rem] space-y-4">
        <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl">
          Ready to start competing?
        </h2>
        <p className="text-muted-foreground sm:text-lg">
          Join thousands of students in real-time coding battles.
        </p>
      </div>
      <div className="flex justify-center">
        <Button size="lg" onClick={handleStartMatch} className="bg-primary hover:bg-primary/90">
          Start Competing Now
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </section>
  )
} 