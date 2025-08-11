"use client"

import { lazy, Suspense } from "react"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import Hero from "@/components/sections/Hero"

const Features = lazy(() => import("@/components/sections/Features"))

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0e0e10] text-white">
      <Header />
      <Hero />
      <Suspense fallback={<div className="py-24 flex justify-center items-center text-white">Loading features...</div>}>
        <Features />
      </Suspense>
      <Footer />
    </div>
  )
}