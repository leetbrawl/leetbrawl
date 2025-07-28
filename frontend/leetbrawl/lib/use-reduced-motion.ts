"use client"

import { useState, useEffect } from "react"

const QUERY = "(prefers-reduced-motion: no-preference)"

export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia(QUERY)
    setPrefersReducedMotion(!mediaQuery.matches)

    const handleChange = () => {
      setPrefersReducedMotion(!mediaQuery.matches)
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  return prefersReducedMotion
}