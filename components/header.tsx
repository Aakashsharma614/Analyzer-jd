"use client"

import { Sparkles } from "lucide-react"
import ThemeToggle from "@/components/ui/ThemeToggle"

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-gradient-to-br from-slate-950 via-slate-900/95 to-slate-950 border-b border-slate-800/70 shadow-[0_0_30px_rgba(56,189,248,0.15)] backdrop-blur-xl">
      <div className="container mx-auto px-6 py-10 max-w-6xl flex flex-col items-center justify-center text-center">
        {/* Main Title */}
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
          <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-emerald-400 bg-clip-text text-transparent animate-gradient-x">
            AI Resume Analyzer

          </span>
        </h1>

        {/* Subtext / Tagline
        <p className="mt-3 text-slate-400 text-sm sm:text-base flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
         
        </p> */}

        {/* Decorative underline */}
        {/* <div className="mt-4 w-24 h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-emerald-400 rounded-full shadow-[0_0_10px_rgba(56,189,248,0.6)] animate-pulse" /> */}
      
      </div>

    </header>
  )
}
