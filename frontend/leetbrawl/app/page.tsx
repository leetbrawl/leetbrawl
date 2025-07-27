"use client"

import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import Hero from "@/components/sections/Hero"
import Features from "@/components/sections/Features"
import Competition from "@/components/sections/Competition"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0e0e10] text-white">
      <Header />
      <Hero />
      <Features />
      <Competition />
      <Footer />
    </div>
  )
}
