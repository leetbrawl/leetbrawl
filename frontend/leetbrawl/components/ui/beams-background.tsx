"use client"

import { useReducedMotion } from "@/lib/use-reduced-motion"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import React, { useCallback, useEffect, useMemo, useRef } from "react"

interface BeamsBackgroundProps {
  className?: string
  children?: React.ReactNode
  intensity?: "subtle" | "medium" | "strong"
}

interface Beam {
  x: number
  y: number
  width: number
  length: number
  angle: number
  speed: number
  opacity: number
  hue: number
}

export default function BeamsBackground({
  className,
  children,
  intensity = "medium",
}: BeamsBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const prefersReducedMotion = useReducedMotion()

  const opacityMap = useMemo(
    () => ({
      subtle: 0.52,
      medium: 0.78,
      strong: 1.3,
    }),
    []
  )

  const createBeam = useCallback(
    (canvasWidth: number, canvasHeight: number): Beam => {
      return {
        x: Math.random() * canvasWidth * 1.4 - canvasWidth * 0.2,
        y: canvasHeight + Math.random() * 200 + 100,
        width: 30 + Math.random() * 50,
        length: canvasHeight * 0.8,
        angle: -30 + Math.random() * 15,
        speed: 0.5 + Math.random() * 0.5,
        opacity: 0.13 + Math.random() * 0.13, // Increased opacity by 30%
        hue: 200 + Math.random() * 30,
      }
    },
    []
  )

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || prefersReducedMotion) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let canvasWidth = 0
    let canvasHeight = 0
    let beams: Beam[] = []
    let animationFrameId: number

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio, 2)
      canvasWidth = window.innerWidth
      canvasHeight = window.innerHeight
      canvas.width = canvasWidth * dpr
      canvas.height = canvasHeight * dpr
      canvas.style.width = `${canvasWidth}px`
      canvas.style.height = `${canvasHeight}px`
      ctx.scale(dpr, dpr)
      beams = Array.from({ length: 8 }, () => createBeam(canvasWidth, canvasHeight))
    }

    const drawBeam = (beam: Beam) => {
      ctx.save()
      ctx.translate(beam.x, beam.y)
      ctx.rotate((beam.angle * Math.PI) / 180)

      const finalOpacity = beam.opacity * opacityMap[intensity]
      const gradient = ctx.createLinearGradient(0, 0, 0, -beam.length)
      gradient.addColorStop(0, `hsla(${beam.hue}, 70%, 50%, 0)`)
      gradient.addColorStop(0.5, `hsla(${beam.hue}, 70%, 50%, ${finalOpacity})`)
      gradient.addColorStop(1, `hsla(${beam.hue}, 70%, 50%, 0)`)

      ctx.fillStyle = gradient
      ctx.fillRect(-beam.width / 2, -beam.length, beam.width, beam.length)
      ctx.restore()
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight)
      ctx.filter = "blur(12px)"

      beams.forEach((beam, i) => {
        beam.y -= beam.speed
        if (beam.y < -beam.length) {
          beams[i] = createBeam(canvasWidth, canvasHeight)
        }
        drawBeam(beam)
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          resizeCanvas()
          animationFrameId = requestAnimationFrame(animate)
        } else {
          cancelAnimationFrame(animationFrameId)
        }
      },
      { threshold: 0.01 }
    )

    observer.observe(canvas)

    return () => {
      observer.disconnect()
      cancelAnimationFrame(animationFrameId)
    }
  }, [prefersReducedMotion, createBeam, intensity, opacityMap])

  return (
    <div className={cn("relative w-full overflow-hidden bg-neutral-950", className)}>
      {!prefersReducedMotion && (
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      )}
      <motion.div
        className="absolute inset-0 bg-neutral-950/30"
        style={{
          backdropFilter: "blur(12px)",
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  )
}
