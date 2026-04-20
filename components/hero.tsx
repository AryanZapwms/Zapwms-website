// /components/hero.tsx
"use client"

import { useRef, useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Pacifico } from "next/font/google"
import AnimatedButton from "./animated-button"
import CountingStats from "./counting-stats"
import Link from "next/link"
import { cn } from "@/lib/utils"

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pacifico",
})

export default function Hero() {
  const stats = [
    { value: 25, suffix: "+", label: "Years of Experience" },
    { value: 100, suffix: "+", label: "Global Clients" },
    { value: 50, suffix: "+", label: "Digital Projects Delivered" },
  ]

  const videoRef = useRef<HTMLVideoElement | null>(null)

  const PART1 =
    "https://res.cloudinary.com/dxwoomfzw/video/upload/v1776683302/zapwms_bg_video_1_n31zxr.mp4"

  const PART2 =
    "https://res.cloudinary.com/dxwoomfzw/video/upload/v1776683349/zapwms_bg_video_2_sphokt.mp4"

  const [currentSrc, setCurrentSrc] = useState(PART1)

  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="w-full h-full object-cover opacity-80"
          style={{
            filter: "brightness(0.9) contrast(1.1)",
          }}
          onEnded={() => {
            if (currentSrc === PART1) {
              setCurrentSrc(PART2)
            } else {
              setCurrentSrc(PART1)
            }

            setTimeout(() => {
              videoRef.current?.play()
            }, 0)
          }}
        >
          <source src={currentSrc} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-10"
          >
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 border border-white/30 rounded-full text-sm text-white font-medium backdrop-blur-sm"
              >
                <div className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></div>
                <span>Your Trusted Digital Growth Partner Since 1999</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.1]"
              >
                <span className="block text-white mb-2">
                  Empowering Digital Growth
                </span>

                <span className="block text-white mb-2">
                  for Modern Businesses
                </span>

                <span
                  className={cn(
                    "block mb-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent",
                    pacifico.className
                  )}
                  style={{
                    textShadow: "0 0 40px rgba(147, 51, 234, 0.5)",
                  }}
                >
                  Worldwide
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-base sm:text-lg text-gray-300/90 leading-relaxed max-w-2xl mx-auto lg:mx-0"
              >
                With 25+ years of global expertise, ZAPWMS delivers powerful web, branding, and digital marketing solutions — helping businesses scale with strategy, technology, and measurable results.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start lg:items-start"
            >
              <Link href="/get-started">
                <AnimatedButton variant="slim" className="bg-white text-black hover:bg-gray-100">
                  <span className="flex items-center">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                </AnimatedButton>
              </Link>

              <Link href="/services">
                <AnimatedButton variant="slim" className="bg-transparent border border-white/30 text-white hover:bg-white/10">
                  View Services
                </AnimatedButton>
              </Link>
            </motion.div>

            <div className="mt-6 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-white">25+ Years Experience</p>
                  <p className="text-xs text-gray-400">Global Expertise</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L3.09 8.26l1.42 1.42L12 4.16l7.49 5.52 1.42-1.42L12 2z" />
                    <path d="M12 6L6.5 10.5v7h3v-5h5v5h3v-7L12 6z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-white">B2B & B2C Specialists</p>
                  <p className="text-xs text-gray-400">Tailored Solutions</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Trusted Digital Partner</p>
                  <p className="text-xs text-gray-400">End-to-End Solutions</p>
                </div>
              </div>
            </div>

            <div className="mt-16">
              <CountingStats stats={stats} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

